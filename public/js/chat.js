 var socket = io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

 socket.on('connect',() => {
   var params = jQuery.deparam(window.location.search);
   socket.emit('join',params,function (err){
     if(err){
       alert(err);
       window.location.href = "/";
     }else{
       console.log('No error');
     }
   });
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
   scrollToBottom();
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
   scrollToBottom();
 });

 socket.on('updateUserList',function(users) {
   var ol = jQuery('<ol></ol>');

   users.forEach((user) => {
     ol.append(jQuery('<li><>/li').text(user));
   });

   jQuery('#users').html(ol);
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
