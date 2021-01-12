import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatPanel = ({ chat, user }) => {
  return (
    <ScrollToBottom className='scroll-view'>
      <div className='chat-panel'>
        {chat.messages.map((mes) => {
          return (
            <div className='row no-gutterse' key={mes.id}>
              <div
                className={`d-flex flex-wrap w-100 ${
                  mes.sender === user.name ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`chat-bubble ${
                    mes.sender === user.name
                      ? 'chat-bubble'
                      : 'chat-bubble chat-bubble--blue'
                  }`}
                >
                  {mes.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollToBottom>
  );
};

export default ChatPanel;
