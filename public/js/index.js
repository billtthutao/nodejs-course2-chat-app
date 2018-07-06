 var socket = io();
 socket.on('connect',() => {
   console.log('connect to server');
   //socket.emit('createMessage',{from:'bill',text:' has joined'});
 });

 socket.on('newMessage',(message) => {
   console.log('newMessage',message);
 });

 socket.on('disconnect', () => {
   console.log('DIsconect from server');
 });

