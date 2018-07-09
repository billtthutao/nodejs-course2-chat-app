const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate message correctly', () => {
    var from = 'billhu';
    var text = 'test message';
    var message = generateMessage(from,text);
    
    expect(message).toExist();
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate location message correctly', () => {
    var from = 'billhu';
    var latitude = 1;
    var longitude = 1;

    var message = generateLocationMessage(from,latitude,longitude);

    expect(message).toExist();
    expect(message.from).toBe(from);
    expect(message.url).toBe('https://www.google.com/maps?q=1,1');
    expect(message.createdAt).toBeA('number');
  });
});
