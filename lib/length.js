
const Unit = require('./unit');

const factors = {
  m: 1,
  cm: 0.01,
  km: 1000
};

function Length(value = 0, unit = 'm', format = {}) {
  this.unit = unit;
  this.value = value;
  this.factor = factors[unit];
}

Object.assign(Length, Unit);

Length.addUnits(factors);

/*

for (let unit in factors) {
  Object.defineProperty(Length.prototype, unit, {
    get() { return this.value * this.factor / factors[unit]; },
    set(v) { this.value = v * factors[unit] / this.factor; }
  });
}

*/

module.exports = Length;