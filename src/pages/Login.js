import React, { useState, useContext } from 'react';
import { Context as ChatContext } from '../context/ChatContext';
import { Context as SocketContext } from '../context/SocketContext';

const Login = () => {
  const {
    state: { user },
    setUser,
  } = useContext(ChatContext);
  const {
    state: { socket },
  } = useContext(SocketContext);

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser(socket, username);

    if (user === null) {
      setError('Username taken!!!');
    } else {
      setError('');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 m-auto'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='text-center mb-3'>Login</h2>
              {error ? (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              ) : null}
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label>Username</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Please Enter Username'
                    name='name'
                    onChange={handleChange}
                  />
                </div>
                <button type='submit' className='btn btn-primary btn-block'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
