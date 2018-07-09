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


var locationButton = jQuery('#send-location');
locationButton.on('click', 
  function () {
    if(!navigator.geolocation){
      return alert('Geolocation is not supported by your browser');
    }
    //more to add
    navigator.geolocation.getCurrentPosition(
      function(position){
        socket.emit('createLocationMessage',
                    {latitude:position.coords.latitude,
                     longitude:position.coords.longitude 
                    });
      },
      function(){
        alert('Unable to fetch location');
    });
  });
