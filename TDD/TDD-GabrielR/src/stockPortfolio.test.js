/*
Reflection: 

Following the TDD approach was very straight forward and simple. Asserting a failing test,  
then fulfilling the test requirements was quite satisfying, sort fo like a gamification 
of the process. Watching red go to green. Its also just a good way to assure that your code does exactly 
as you expect it to do. I would certainly use this process again in the future. I find it very helpful 
when developing code. It adds structure and decreases the chaos of the process. 
 
*/

const Portfolio = require('./stockPortfolio');

test('new portfolio empty when started', () => {
  const port = new Portfolio();
  expect(port.countSymbols()).toBe(0);
  expect(port.sharesOf('stock-A')).toBe(0);
});

test('portfolio tells whether us its empty', () => {
  const port = new Portfolio();
  expect(port.isEmpty()).toBe(true);
  port.buy('stock-A', 1);
  expect(port.isEmpty()).toBe(false);
});

test('purchase adds shares to specific stock in question', () => {
  const p = new Portfolio();
  p.buy('stock-A', 1);
  p.buy('stock-A', 2);
  expect(p.sharesOf('stock-A')).toBe(3);
});

test('properly subtracts shares', () => {
  const p = new Portfolio();
  p.buy('stock-A', 2);
  p.sell('stock-A', 1);
  expect(p.sharesOf('stock-A')).toBe(1);
});

test('counts unique ticker', () => {
  const port = new Portfolio();
  port.buy('stock-A', 5);
  port.buy('stock-B', 10);
  expect(port.countSymbols()).toBe(2);
});

test('toss stocks with 0', () => {
  const p = new Portfolio();
  p.buy('stock-A', 2);
  p.sell('stock-A', 2);
  expect(p.countSymbols()).toBe(0);
  expect(p.sharesOf('stock-A')).toBe(0);
});

test('shares Of returns 0 for missing stock', () => {
  const port = new Portfolio();
  expect(port.sharesOf('stock-A')).toBe(0);
});

test('cannot sell more than owned', () => {
  const port = new Portfolio();
  port.buy('stock-A', 1);
  expect(() => port.sell('stock-A', 2)).toThrow('Not possible to sell this number of shares.');
});
