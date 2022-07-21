import '../styles/globals.css'
import * as React from 'react';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { UserType, MessageType } from '../contexts/Types';
import AuthContext from '../contexts/AuthContext';
import FriendContext from '../contexts/FriendContext';
import MessageContext from '../contexts/MessageContext';
import AuthApi from '../services/Auth';
import SocketApi from '../services/Socket';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<UserType|null>(null);
  const [friends, setFriends] = React.useState<Array<UserType>>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [messages, setMessages] = React.useState<Array<MessageType>>([]);

  const selectFriend = (user: any) => {
      setSelectedIndex(friends.findIndex((friend) => friend._id == user._id));
  };
  const pushFriends = (newFriends: Array<UserType>, isReset: boolean) => {
      if ( isReset )
          setFriends(newFriends);
      else {
        setFriends((friends) => [...friends, ...newFriends])
      }
  };

  const spliceFriend = (user: UserType) => {
    setFriends((friends) => friends.filter((friend) => friend._id != user._id));
  }
  
  const pushMessage = (msg: Array<MessageType>, isReset: boolean) => {
      if ( isReset )
          setMessages(msg);
      else
          setMessages((messages) => [...messages, ...msg])
  };
  

  const signup = (user: UserType, subscriber: any, onError: any) => {
    AuthApi.signup(user, subscriber, onError);
  }

  const login = (email: string, password: string, isRemember: boolean, subscriber: any, onError: any) => {
    AuthApi.login(email, password, isRemember, (res: any) => {
      setUser(res.user);
      router.push('/');
      if ( subscriber ) subscriber(res.token);
    }, onError);
  }

  const logout = () => {
    router.replace('/login');
    setTimeout(() => {
      setUser(null);
      SocketApi.disconnect();
      localStorage.setItem('app_token', '');
      sessionStorage.setItem('app_token', '');
    }, 500);
  }

  return (
    <AuthContext.Provider value={{user, signup, login, logout, setUser}}>
    <FriendContext.Provider value={{list: friends, selectedIndex, selectFriend, push: pushFriends, splice: spliceFriend}} >
    <MessageContext.Provider value={{list: messages, push: pushMessage}} >
      <Component {...pageProps} />
    </MessageContext.Provider>
    </FriendContext.Provider>
    </AuthContext.Provider>
  ) 
}

export default MyApp
