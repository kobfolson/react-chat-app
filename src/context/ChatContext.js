import createDataContext from './createDataContext';
import { values } from 'lodash';

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'chat_users':
      return { ...state, users: action.payload };
    case 'set_user':
      return { ...state, user: action.payload };
    case 'community_chat':
      return { ...state, chats: [...state.chats, action.payload] };
    case 'set_active_chat':
      return { ...state, activeChat: action.payload };
    case 'send_message':
      return { ...state, chats: action.payload };
    case 'add_private_chat':
      return { ...state, chats: [...state.chats, action.payload] };
    default:
      return state;
  }
};

const createGroupChat = (dispatch) => () => {};

const createPrivateChat = (dispatch) => (
  socket,
  reciever,
  sender,
  activeChat
) => {
  socket.emit('PRIVATE_MESSAGE', { reciever, sender, activeChat });
};

const addPrivateChat = (dispatch) => (chat) => {
  dispatch({ type: 'add_private_chat', payload: chat });
};

const setActiveChat = (dispatch) => (chat) => {
  dispatch({ type: 'set_active_chat', payload: chat });
};

const sendMessage = (dispatch) => (socket, user, chat, message) => {
  const chatid = chat.id;
  const sender = user.name;

  socket.emit('MESSAGE_SENT', { sender, chatid, message });
};

const addMessage = (dispatch) => (chatid, chats) => {
  return (msg) => {
    let newChats = chats.map((c) => {
      if (c.id === chatid) {
        c.messages.push(msg);
      }
      return c;
    });
    dispatch({ type: 'send_message', payload: newChats });
  };
};

const createCommunityChat = (dispatch) => (socket) => {
  socket.emit('COMMUNITY_CHAT', (chat) => {
    dispatch({ type: 'community_chat', payload: chat });
  });
};

const addUser = (dispatch) => (socket, user) => {
  socket.emit('USER_CONNECTED', user);
};

const chatUsers = (dispatch) => (users) => {
  const onlineUsers = values(users);
  dispatch({ type: 'chat_users', payload: onlineUsers });
};

const setUser = (dispatch) => (socket, username) => {
  socket.emit('VERIFY_USER', username, ({ isUser, user }) => {
    if (isUser) return null;
    dispatch({ type: 'set_user', payload: user });
  });
};

export const { Context, Provider } = createDataContext(
  chatReducer,
  {
    setUser,
    addUser,
    chatUsers,
    addMessage,
    sendMessage,
    setActiveChat,
    addPrivateChat,
    createGroupChat,
    createPrivateChat,
    createCommunityChat,
  },
  { user: null, users: null, chats: [], activeChat: null, msg: null }
);
