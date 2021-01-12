const path = require('path');
// const cors = require('cors');
const http = require('http');
const express = require('express');
// const socketio = require('socket.io');

const socketManager = require('./socketManager/');

const app = express();
app.use(express.static(path.join(__dirname, '../buld')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'));
});
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 5000;

io.on('connection', (socket) => {
  socketManager(socket, io);
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
