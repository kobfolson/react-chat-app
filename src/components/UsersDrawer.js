import React, { useContext } from 'react';
import { differenceBy } from 'lodash';

import { Context as ChatContext } from '../context/ChatContext';
import { Context as SocketContext } from '../context/SocketContext';
import ProfileImage from './ProfileImage';

const UsersDrawer = () => {
  const {
    state: { user, users, activeChat },
    createPrivateChat,
  } = useContext(ChatContext);
  const {
    state: { socket },
  } = useContext(SocketContext);

  return (
    <>
      {users.lenght !== 0
        ? differenceBy(users, [user], 'name').map((u) => {
            return (
              <div
                key={u.id}
                onClick={() =>
                  createPrivateChat(socket, u.name, user.name, activeChat)
                }
              >
                <div className='friend-drawer friend-drawer--onhover'>
                  <ProfileImage image={u.name[0].toUpperCase()} />
                  <div className='text'>
                    <h6>{u.name}</h6>
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        : null}
    </>
  );
};

export default UsersDrawer;
