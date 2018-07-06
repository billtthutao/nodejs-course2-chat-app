const expect = require('expect');
const {generateMessage} = require('./message.js');

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
