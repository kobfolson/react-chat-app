const { v4: uuidv4 } = require('uuid');

/*
 *	createUser
 *	Creates a user.
 *	@prop id {string}
 *	@prop name {string}
 *	@param {object}
 *		name {string}
 */
const createUser = ({ name = '', socketId = null } = {}) => ({
  id: uuidv4(),
  name,
  socketId,
});

/*
 *	createMessage
 *	Creates a messages object.
 * 	@prop id {string}
 * 	@prop time {Date} the time in 24hr format i.e. 14:22
 * 	@prop message {string} actual string message
 * 	@prop sender {string} sender of the message
 *	@param {object}
 *		message {string}
 *		sender {string}
 */
const createMessage = ({ message = '', sender = '' } = {}) => ({
  id: uuidv4(),
  time: new Date(Date.now()),
  message,
  sender,
});

/*
 *	createChat
 *	Creates a Chat object
 * 	@prop id {string}
 * 	@prop name {string}
 * 	@prop messages {Array.Message}
 * 	@prop users {Array.string}
 *	@param {object}
 *		messages {Array.Message}
 *		name {string}
 *		users {Array.string}
 *
 */
const createChat = ({
  messages = [],
  name = 'Community',
  users = [],
  isCommunity = false,
} = {}) => ({
  id: uuidv4(),
  name: isCommunity ? 'Community' : createChatNameFromUsers(users),
  messages,
  users,
  typingUsers: [],
  isCommunity,
});

const createChatNameFromUsers = (users, excludedUser = '') => {
  return users.filter((u) => u !== excludedUser).join('&') || 'Empty Users';
};

module.exports = {
  createMessage,
  createChat,
  createUser,
  createChatNameFromUsers,
};
