const hello = require('../hello');

describe('Hello', () => {
  it('should print "Hello stryker!" when no input is provided', () => {
    expect(hello()).toBe('Hello Stryker!');
  });

  it('should print "hello Jest!" when "Jest" is given is input', () => {
    expect(hello('Jest')).toBe('Hello Jest!');
  });
});