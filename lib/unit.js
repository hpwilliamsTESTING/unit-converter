
function Unit() {
}

Unit.factors = {}

Unit.addUnit = function(unit, factor) {
  this.factors[unit] = factor;
  Object.defineProperty(this.prototype, unit, {
    get() { return this.value * this.factor / factor; },
    set(v) { this.value = v * factor / this.factor; }
  });
};

Unit.addUnits = function(factors) {
  for (let unit in factors) {
    this.addUnit(unit, factors[unit]);
  }
};

module.exports = Unit;