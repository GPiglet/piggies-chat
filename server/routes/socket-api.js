const ChatController = require('../controllers/ChatController');

module.exports = (io) => (socket) => {
  ChatController.onConnect(io, socket);
  socket.on('disconnect', (reason)=>{
    ChatController.onDisconnect(io, socket, reason);
  });

  socket.on('private message', (receiver, msg) => {
    ChatController.onRecvPM(io, socket, receiver, msg);
  })
}
