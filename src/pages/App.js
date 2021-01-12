import React, { useContext, useEffect } from 'react';

import { Context as ChatContext } from '../context/ChatContext';
import { Context as SocketContext } from '../context/SocketContext';
import Login from './Login';
import Chat from './Chat';

const App = () => {
  const {
    state: { user },
  } = useContext(ChatContext);
  const {
    state: { socket },
    createSocket,
  } = useContext(SocketContext);

  useEffect(() => {
    if (socket === null) {
      createSocket();
    }
    return () => {
      if (socket !== null) {
        socket.disconnect();
        return true;
      }
    };
  }, [createSocket, socket]);

  return <div>{user === null ? <Login /> : <Chat user={user} />}</div>;
};

export default App;
