const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message.js');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

var publicPath = path.join(__dirname,'..','public');
var io = socketIo(server);

io.on('connection',(socket) => {
  console.log('New user connected');
  
  //welcome message to who login
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));
  //broadcast message to everyone except the one who login
  socket.broadcast.emit('newMessage',
                        generateMessage('Admin','New user joined!'));

  socket.on('createMessage', (message,callback) => {
    console.log('createmessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords,callback) => {
    console.log('createLocationMessage',coords);
    io.emit('newMessage',generateMessage('Admin',
                                         `${coords.latitude},${coords.longitude}`));
    callback('This loc is from the server');
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected from server');
  });
});

app.use(express.static(publicPath));

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
