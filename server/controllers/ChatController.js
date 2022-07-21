const UserModel = require('../models/User');

const getRoomName = (ids) => {
  return ids.sort().join('_');
}

exports.onConnect = (io, socket) => {
  console.log('connect: ', socket.request.user)

  UserModel.findOne({_id: socket.request.user._id})
  .then((user) => {
    // change status with active in db
    user.cstatus = 'ACTIVE';
    user.save();

    // notify connected to the other users
    socket.broadcast.emit('user connected', user);

    // response all connected users
    UserModel.find({cstatus: 'ACTIVE', _id: {$ne: user._id}})
    .then((users) => {
      if ( users ) socket.emit('connected users', users); 
    })
    .catch((err) => {
      console.log(err);
    })

  })
  .catch((err) => {
    console.log(err)
  })

  
}

exports.onDisconnect = (io, socket, reason) => {
  console.log('disconnect: ', socket.request.user)
  UserModel.findOne({_id: socket.request.user._id})
  .then((user) => {
    // notify disconnected to the other users
    socket.broadcast.emit('user disconnected', user);

    // change status with offline in db
    user.cstatus = 'OFFLINE';
    user.save();
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.onRecvPM = (io, socket, receiver, msg) => {
  const roomName = getRoomName([socket.request.user._id, receiver]);
  console.log(roomName, socket.rooms, socket.rooms.indexOf(roomName));
  if ( socket.rooms.indexOf(roomName) == -1 ) socket.join(roomName);
  socket.to(roomName).emit('private message', socket.request._id, msg);
}