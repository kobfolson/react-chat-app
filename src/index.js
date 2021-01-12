import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';

import { Provider as ChatProvider } from './context/ChatContext';
import { Provider as SocketProvider } from './context/SocketContext';

import './styles/App.scss';
// import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(
  <React.StrictMode>
    <ChatProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ChatProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
