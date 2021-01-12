import React from 'react';

const ProfileImage = ({ image }) => {
  return (
    <div className='profile-image bg-secondary d-flex'>
      <h4 className='text-white m-auto'>{image}</h4>
    </div>
  );
};

export default ProfileImage;
