const expect = require('expect');
const {isRealString} = require('./validation.js'); 

describe('validation.js',() => {
  it('should return true', () => {
    expect(isRealString('abc')).toBe(true);
  });
  it('should return false with number', () => {
    expect(isRealString(88)).toBe(false);
  });
  it('should return false with zero-length str', () => {
    expect(isRealString('')).toBe(false);
  });
});
