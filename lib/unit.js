
function Unit(child, value, unit) {
  this.unit = unit;
  this.value = value;
  this.num = child.getFactor(unit).num;
  this.den = child.getFactor(unit).den;
}

Unit.getFactor = function(unit) {
  return this.factors[unit];
};

Unit.addUnit = function(unit, factor) {
  this.factors[unit] = factor;
  Object.defineProperty(this.prototype, unit, {
    get() { return this.value * this.num * factor.den / this.den / factor.num; },
    set(v) { this.value = v * factor.num * this.den / factor.den / this.num; }
  });
};

Unit.addUnits = function(factors) {
  this.factors = this.factors || {};
  for (let unit in factors) {
    this.addUnit(unit, factors[unit]);
  }
};

module.exports = Unit;