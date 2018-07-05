const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

var publicPath = path.join(__dirname,'..','public');
var io = socketIo(server);

io.on('connection',(socket) => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('User was disconnected from server');
  });
});

app.use(express.static(publicPath));

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
