import React, { useContext, useEffect, useState } from 'react';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as ChatContext } from '../context/ChatContext';

import ChatBoxTray from '../components/ChatBoxTray';
import ChatHeader from '../components/ChatHeader';
import ChatPanel from '../components/ChatPanel';
import SideBar from '../components/SideBar';

const Chat = ({ user }) => {
  const [init, setInit] = useState(false);
  const {
    state: { socket },
  } = useContext(SocketContext);
  const {
    state: { users, chats, activeChat },
    addMessage,
    addUser,
    chatUsers,
    addPrivateChat,
    createCommunityChat,
  } = useContext(ChatContext);
  useEffect(() => {
    let msg_sent;
    if (!init) {
      addUser(socket, user);
      createCommunityChat(socket);
      setInit(true);
    }

    chats.map((chat) => {
      msg_sent = `MESSAGE_SENT-${chat.id}`;
      socket.once(msg_sent, addMessage(chat.id, chats));
      return true;
    });

    socket.once('PRIVATE_MESSAGE', (chat) => {
      addPrivateChat(chat);
    });

    socket.once('USER_CONNECTED', (users) => {
      chatUsers(users);
    });

    return () => {
      socket.off(msg_sent);
      socket.off('USER_CONNECTED');
      socket.off('PRIVATE_MESSAGE');
    };
  }, [
    user,
    users,
    chats,
    init,
    chatUsers,
    addUser,
    addMessage,
    createCommunityChat,
    addPrivateChat,
    socket,
  ]);

  return (
    <div className='container'>
      <div className='card'>
        <div className='row no-gutters'>
          <div className='col-md-4 border-right col-xs-12 sidebar'>
            <SideBar />
          </div>
          <div
            className={`col-md-8 col-xs-12 panel ${
              !activeChat
                ? 'd-flex justify-content-center align-items-center'
                : null
            }`}
          >
            {activeChat !== null ? (
              <div>
                <ChatHeader chat={activeChat} />
                <ChatPanel chat={activeChat} user={user} />
                <ChatBoxTray chat={activeChat} />
              </div>
            ) : (
              <div>
                <h3>Choose a chat!!!</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
