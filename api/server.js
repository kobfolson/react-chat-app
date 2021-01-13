const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const socketManager = require('./socketManager/');
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res, next) => res.sendFile(__dirname + '../build'));

io.on('connection', (socket) => {
  socketManager(socket, io);
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
