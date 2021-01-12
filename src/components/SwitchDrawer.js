import React from 'react';

function SwitchDrawer({ onClick, chats, users }) {
  return (
    <ul className='nav nav-pills nav-fill border-bottom border-top'>
      <li className='nav-item'>
        <div onClick={() => onClick(chats)} className='nav nav-link'>
          Chats
        </div>
      </li>
      <li className='nav-item'>
        <div onClick={() => onClick(users)} className='nav-link'>
          Users
        </div>
      </li>
    </ul>
  );
}

export default SwitchDrawer;
