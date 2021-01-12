import React from 'react';
import ProfileImage from './ProfileImage';

const ChatHeader = ({ chat }) => {
  const status = 'Online';

  return (
    <div className='settings-tray'>
      <div className='friend-drawer friend-drawer--grey p-0'>
        <ProfileImage image={chat.name[0].toUpperCase()} />
        <div className='text'>
          <h6>{chat.name}</h6>
          <p>{status}</p>
        </div>
        <span className='float-right'>
          <i className='material-icons'>attach_file</i>
          <i className='material-icons'>videocam</i>
          <i className='material-icons'>more_vert</i>
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
