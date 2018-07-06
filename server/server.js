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
  
  //welcome message to who login
  socket.emit('newMessage',{from:'Admin',
                            text:'Welcome to the chat app!',
                            createdAt:new Date().getTime()
                           }
             );
  //broadcast message to everyone except the one who login
  socket.broadcast.emit('newMessage',{from:'Admin',
                                      text:'New user joined!',
                                      createdAt:new Date().getTime()
                                     }
                       );

  socket.on('createMessage', (message) => {
    console.log('createmessage',message);
    io.emit('newMessage',{from:message.from,
                          text:message.text,
                          createdAt:new Date().getTime()
                         });
  });
  socket.on('disconnect', () => {
    console.log('User was disconnected from server');
  });
});

app.use(express.static(publicPath));

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
