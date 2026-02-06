class Portfolio {
  constructor() {
    this.stocks = {};
  }

  isEmpty() {
    return Object.keys(this.stocks).length === 0;
  }

  buy(symbol, shares) {
    this.stocks[symbol] = (this.stocks[symbol] || 0) + shares;
  }

  sell(symbol, shares) {
    const owned = this.sharesOf(symbol);
    if (shares > owned) {
      throw new Error('Not possible to sell this number of shares.');
    }
    const remaining = owned - shares;
    if (remaining === 0) delete this.stocks[symbol];
    else this.stocks[symbol] = remaining;
  }

  countSymbols() {
    return Object.keys(this.stocks).length;
  }

  sharesOf(symbol) {
    return this.stocks[symbol] || 0;
  }
}

module.exports = Portfolio;
