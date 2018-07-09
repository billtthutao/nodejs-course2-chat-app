var generateMessage = (from,text) => {
  return {
    from,
    text,
    createdAt:new Date().getTime()
  };
};

var generateLocationMessage = (from,latitude,longitude){
  return {
    from,
    utl:`https//www.google.com/maps?/q=${latitude},${longitude}`
    createdAt:new Date().getTIme()
  };
};

module.exports = {generateMessage, generateLocationMessage};
