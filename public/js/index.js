 var socket = io();
 socket.on('connect',() => {
   console.log('connect to server');
   //socket.emit('createMessage',{from:'bill',text:' has joined'});
 });

 socket.on('newMessage',(message) => {
   var formattedTime = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template,{
     text:message.text,
     from:message.from,
     createdAt: formattedTime
   });
   //create DOM element
   //var li = jQuery('<li></li>');
   //li.text(`${message.from} ${time}: ${message.text}`);

   //jQuery('#messages').append(li);
   jQuery('#messages').append(html);
 });

 socket.on('newLocationMessage',(message) => {
   var formattedTime = moment(message.createdAt).format('h:mm a');

   //generate html with mustache.js

   var template = jQuery('#location-message-template').html();
   var html = Mustache.render(template,{
     from:message.from,
     createdAt:formattedTime,
     url:message.url
   });
   //generate html without mustache.js
   //var li = jQuery('<li></li>');
   //var a = jQuery('<a target="_blank">My current location</a>');
   
   //li.text(`${message.from} ${time}: `);
   //a.attr('href',message.url);

   //li.append(a);
   //jQuery('#messages').append(li);
  
   jQuery('#messages').append(html);
 });

 socket.on('disconnect', () => {
   console.log('DIsconect from server');
 });

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage',
             {from:'User',text:messageTextBox.val()},
  //add callback function for server socket.on to invoke
             function (data) {
               messageTextBox.val('');
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
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(
      function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',
                    {latitude:position.coords.latitude,
                     longitude:position.coords.longitude 
                    });
      },
      function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
  });
