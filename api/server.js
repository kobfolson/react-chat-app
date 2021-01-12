const path = require('path');
// const cors = require('cors');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const socketManager = require('./socketManager/');

const app = express();
const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, '../buld')));

io.on('connection', (socket) => {
  socketManager(socket, io);
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
