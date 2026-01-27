const myFunctions = require('./sampleFunctions');



test('div yields decimal values', () => {
  expect(myFunctions.div(1, 4)).toBe(0.25);
});


test('containsNumbers detects numbers with non-numbers', () => {
  expect(myFunctions.containsNumbers('abc123')).toBe(true);
});


test('div by zero is properly underfined', () => {
  expect(myFunctions.div(5, 0)).toBe(Infinity);
});

test('returns false when no numbers', () => {
  expect(myFunctions.containsNumbers('abcdef')).toBe(false);
});


test('good with only spaces)', () => {
  expect(myFunctions.containsNumbers('   ')).toBe(false);
});

test('works on an empty string', () => {
  expect(myFunctions.containsNumbers('')).toBe(false);
});

test('good on normal nums', () => {
  expect(myFunctions.div(10, 2)).toBe(5);
});
