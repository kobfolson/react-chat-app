import React, { useState } from 'react';

import FriendDrawer from '../components/FriendDrawer';
import UsersDrawer from '../components/UsersDrawer';
import SearchBox from '../components/SearchBox';
import SettingsTray from '../components/SettingsTray';
import SwitchDrawer from '../components/SwitchDrawer';

const CHATS = 'CHATS';
const USERS = 'USERS';

const SideBar = () => {
  const [activeDrawer, setActiveDrawer] = useState(CHATS);

  return (
    <>
      <SettingsTray />
      <SearchBox />
      <SwitchDrawer onClick={setActiveDrawer} chats={CHATS} users={USERS} />
      <div className='overflow-auto w-100 h-100'>
        {activeDrawer === CHATS ? <FriendDrawer /> : <UsersDrawer />}
      </div>
    </>
  );
};

export default SideBar;
