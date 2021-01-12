import React, { useState } from 'react';

const SearchBox = ({ onSendPrivateMessage }) => {
  const [reciever, setReciever] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSendPrivateMessage(reciever);
    setReciever('');
  };

  const handleChange = (e) => {
    setReciever(e.target.value);
  };

  return (
    <div className='search-box'>
      <form className='input-wrapper' onSubmit={handleSubmit}>
        <i className='material-icons'>search</i>
        <input
          type='text'
          value={reciever}
          placeholder='Search'
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBox;
