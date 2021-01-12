import React, { useContext } from 'react';
import Moment from 'react-moment';
import { last, get } from 'lodash';

import { Context as ChatContext } from '../context/ChatContext';
import ProfileImage from './ProfileImage';

const FriendDrawer = () => {
  const {
    state: { chats },
    setActiveChat,
  } = useContext(ChatContext);

  return (
    <>
      {chats.lenght !== 0
        ? chats.map((chat) => {
            return (
              <div onClick={() => setActiveChat(chat)} key={chat.id}>
                <div className='friend-drawer friend-drawer--onhover'>
                  <ProfileImage image={chat.name[0].toUpperCase()} />
                  <div className='text'>
                    <h6>{chat.name}</h6>
                    <p>{get(last(chat.messages), 'message', '')}</p>
                  </div>
                  <span className='time small'>
                    <Moment format='h:mm A'>{chat.time}</Moment>
                  </span>
                </div>
                <hr />
              </div>
            );
          })
        : null}
    </>
  );
};

export default FriendDrawer;
