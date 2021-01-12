const { createUser, createMessage, createChat } = require('./utils/chat');

let connectedUsers = {};

let communityChat = createChat({ isCommunity: true });

/*
 * Returns a function that will take a chat id and a boolean isTyping
 * and then emit a broadcast to the chat id that the sender is typing
 * @param sender {string} username of sender
 * @return function(chatId, message)
 */
function sendTypingToChat(user, io) {
  return (chatId, isTyping) => {
    io.emit(`TYPING-${chatId}`, { user, isTyping });
  };
}

/*
 * Adds user to list passed in.
 * @param userList {Object} Object with key value pairs of users
 * @param user {User} the user to added to the list.
 * @return userList {Object} Object with key value pairs of Users
 */
function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

/*
 * Removes user from the list passed in.
 * @param userList {Object} Object with key value pairs of Users
 * @param username {string} name of user to be removed
 * @return userList {Object} Object with key value pairs of Users
 */
function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

/*
 * Checks if the user is in list passed in.
 * @param userList {Object} Object with key value pairs of Users
 * @param username {String}
 * @return userList {Object} Object with key value pairs of Users
 */
function isUser(userList, username) {
  return username in userList;
}

module.exports = function (socket, io) {
  console.log('Socket Id:' + socket.id);
  let sendTypingFromUser;

  //Verify Username
  socket.on('VERIFY_USER', (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
    } else {
      callback({
        isUser: false,
        user: createUser({ name: nickname, socketId: socket.id }),
      });
    }
  });

  //User Connects with username
  socket.on('USER_CONNECTED', (user) => {
    user.socketId = socket.id;
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendTypingFromUser = sendTypingToChat(user.name, io);

    io.emit('USER_CONNECTED', connectedUsers);
    console.log(connectedUsers);
  });

  //User disconnects
  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      io.emit('USER_DISCONNECTED', connectedUsers);
      console.log('Disconnect', connectedUsers);
    }
  });

  socket.on('error', (err) => {
    console.log('Caught flash policy server socket error: ');
    console.log(err.stack);
  });

  //User logsout
  socket.on('LOGOUT', () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit('USER_DISCONNECTED', connectedUsers);
    console.log('Disconnect', connectedUsers);
  });

  //Get Community Chat
  socket.on('COMMUNITY_CHAT', (callback) => {
    callback(communityChat);
  });

  socket.on('MESSAGE_SENT', ({ sender, chatid, message }) => {
    const chat = createMessage({ message, sender });
    io.sockets.emit(`MESSAGE_SENT-${chatid}`, chat);
  });

  socket.on('TYPING', ({ chatId, isTyping }) => {
    sendTypingFromUser(chatId, isTyping);
  });

  socket.on('PRIVATE_MESSAGE', ({ reciever, sender, activeChat }) => {
    if (reciever in connectedUsers) {
      const recieverSocket = connectedUsers[reciever].socketId;
      if (activeChat === null || activeChat.id === communityChat.id) {
        const newChat = createChat({
          name: `${reciever}&${sender}`,
          users: [reciever, sender],
        });
        socket.to(recieverSocket).emit('PRIVATE_MESSAGE', newChat);
        socket.emit('PRIVATE_MESSAGE', newChat);
      } else {
        socket.to(recieverSocket).emit('PRIVATE_MESSAGE', activeChat);
      }
    }
  });
};
