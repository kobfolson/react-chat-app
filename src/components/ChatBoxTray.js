import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context as ChatContext } from '../context/ChatContext';
import { Context as SocketContext } from '../context/SocketContext';

const ChatBoxTray = ({ sendTyping, chat }) => {
  const {
    state: { user },
    sendMessage,
  } = useContext(ChatContext);
  const {
    state: { socket },
  } = useContext(SocketContext);

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  let lastUpdateTime;
  let typingInterval;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(socket, user, chat, message);
    setMessage('');
  };

  const sendUserTyping = () => {
    lastUpdateTime = Date.now();
    if (!isTyping) {
      setIsTyping(true);
      // sendTyping(true);
      startCheckingTyping();
    }
  };

  const startCheckingTyping = () => {
    console.log('Typing');
    typingInterval = setInterval(() => {
      if (Date.now() - lastUpdateTime > 300) {
        setIsTyping(false);
        stopCheckingTyping();
      }
    }, 300);
  };

  const stopCheckingTyping = useCallback(() => {
    console.log('Stop Typing');
    if (typingInterval) {
      clearInterval(typingInterval);
      // sendTyping(false);
    }
  }, [typingInterval]);

  useEffect(() => {
    return () => {
      stopCheckingTyping();
    };
  }, [stopCheckingTyping]);

  return (
    <div className='row'>
      <div className='col-12'>
        <form onSubmit={handleSubmit} className='chat-box-tray'>
          <i className='material-icons'>sentiment_very_satisfied</i>
          <input
            type='text'
            placeholder='Type Message'
            value={message}
            autoComplete={'off'}
            onKeyPress={(e) => {
              sendUserTyping();
            }}
            onChange={handleChange}
          />
          <i className='material-icons'>mic</i>
          <button
            disabled={message.length < 1}
            type='submit'
            className='btn p-0 ml-4'
          >
            <i className='material-icons'>send</i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBoxTray;
