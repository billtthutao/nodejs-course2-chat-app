 var socket = io();
 socket.on('connect',() => {
   console.log('connect to server');
   //socket.emit('createMessage',{from:'bill',text:' has joined'});
 });

 socket.on('newMessage',(message) => {
   console.log('newMessage',message);
   //create DOM element
   var li = jQuery('<li></li>');
   
   li.text(`${message.from}: ${message.text}`);

   jQuery('#messages').append(li);
 });

 socket.on('disconnect', () => {
   console.log('DIsconect from server');
 });

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',
             {from:'User',text:jQuery('[name=message]').val()},
  //add callback function for server socket.on to invoke
             function (data) {
             }
  );
});
