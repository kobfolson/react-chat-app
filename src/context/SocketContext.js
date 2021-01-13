import createDataContext from './createDataContext';
import io from 'socket.io/client-dist/socket.io';

const socket = io('/');

const socketReducer = (state, action) => {
  switch (action.type) {
    case 'create_socket':
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};

const createSocket = (dispatch) => () => {
  socket.on('connect', () => {
    console.log('Connected');
  });
  dispatch({ type: 'create_socket', payload: socket });
};

export const { Context, Provider } = createDataContext(
  socketReducer,
  { createSocket },
  { socket: null }
);
