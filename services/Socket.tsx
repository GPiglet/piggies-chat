import { io } from "socket.io-client";

type SubscriberArray = {
  [index: string]: any
}

class socket {
  instance: any = null;
  subscribers: SubscriberArray = [];

  constructor() {
    this.onConnect = this.onConnect.bind(this);
    this.onRecvPM = this.onRecvPM.bind(this);
  }

  init() {
    if ( this.instance ) return this;
    const token = sessionStorage.getItem('app_token') || localStorage.getItem('app_token');
    this.instance = io('http://localhost:5001', {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.instance.on('connect', this.onConnect);
    this.instance.on('connected users', (users: any) => {
      const subscriber = this.subscribers['connected users'];
      if ( subscriber ) subscriber(users);
    });
    this.instance.on('user connected', (user: any) => {
      const subscriber = this.subscribers['user connected'];
      if ( subscriber ) subscriber(user);
    });
    this.instance.on('user disconnected', (user: any) => {
      const subscriber = this.subscribers['user disconnected'];
      if ( subscriber ) subscriber(user);
    });
    this.instance.on('private message', this.onRecvPM);
    return this;
  }

  disconnect() {
    if ( this.instance ) {
      this.instance.disconnect();
      this.instance = null;
    }
  }

  sendPM(receiver: string, msg: string) {
    this.instance.emit('private message', receiver, msg);
  }

  onConnect() {
  }

  setSubscriber(key: string, handler: any) {
    this.subscribers[key] = handler;
  }

  onRecvPM(sender: string, msg: string) {
    // console.log(sender, msg);
  }
  
}

const SocketApi = new socket();
export default SocketApi;
