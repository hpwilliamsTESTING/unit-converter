
const { safeDivMul } = require('./util');

function Unit(child, value, unit, strict) {
  const factor = child.getFactor(unit);
  if (factor) {
    this.$unit = unit;
    this.$value = value;
    this.$num = factor.num;
    this.$den = factor.den;
    this.$strict = strict;
  } else {
    throw new Error(`E001: Unknown unit ${unit} for quantity ${child.name}`);
  }
}

Unit.getFactor = function(unit) {
  return this.factors[unit];
};

Unit.prototype.toString = function() {
  return `${this.$value}${this.$unit}`;
};

Unit.extend = function(subclass) {
  Object.assign(subclass, this);
  Object.assign(subclass.prototype, this.prototype);
};

Unit.init = function(metadata = {}) {
  this.factors = {};
  Object.assign(this, metadata);
};

Unit.addUnit = function(unit, factor) {
  const num = BigInt(factor.num);
  const den = BigInt(factor.den);
  this.factors[unit] = { num, den };
  Object.defineProperty(this.prototype, unit, {
    get() {
      return safeDivMul(this.$value, this.$num, den, this.$den, num, this.$strict);
    },
    set(v) {
      this.$value = safeDivMul(v, num, this.$den, den, this.$num, this.$strict);
    }
  });
};

Unit.addUnits = function(factors) {
  for (const unit in factors) {
    this.addUnit(unit, factors[unit]);
  }
};

Unit.addSIPrefixes = function(...units) {
  const unitsAdded = new Set();
  units.forEach(unit => {
    const { num, den } = this.factors[unit];
    const siUnits = {
      /* eslint-disable no-magic-numbers */
      [`y${unit}`]: { num, den: den * (10n ** 24n) },
      [`z${unit}`]: { num, den: den * (10n ** 21n) },
      [`a${unit}`]: { num, den: den * (10n ** 18n) },
      [`f${unit}`]: { num, den: den * (10n ** 15n) },
      [`p${unit}`]: { num, den: den * (10n ** 12n) },
      [`n${unit}`]: { num, den: den * (10n ** 9n) },
      [`u${unit}`]: { num, den: den * (10n ** 6n) },
      [`m${unit}`]: { num, den: den * 1000n },
      [`c${unit}`]: { num, den: den * 100n },
      [`d${unit}`]: { num, den: den * 10n },
      [`da${unit}`]: { num: num * 10n, den },
      [`h${unit}`]: { num: num * 100n, den },
      [`k${unit}`]: { num: num * 1000n, den },
      [`M${unit}`]: { num: num * (10n ** 6n), den },
      [`G${unit}`]: { num: num * (10n ** 9n), den },
      [`T${unit}`]: { num: num * (10n ** 12n), den },
      [`P${unit}`]: { num: num * (10n ** 15n), den },
      [`E${unit}`]: { num: num * (10n ** 18n), den },
      [`Z${unit}`]: { num: num * (10n ** 21n), den },
      [`Y${unit}`]: { num: num * (10n ** 24n), den }
      /* eslint-enable no-magic-numbers */
    };
    this.addUnits(siUnits);
    for (const addedUnit in siUnits) {
      unitsAdded.add(addedUnit);
    }
  });
  return unitsAdded;
};

Unit.square = function() {
  const squareFactors = {};
  for (const unit in this.factors) {
    // TODO should some factors be excluded?
    squareFactors[`sq${unit}`] = {
      /* eslint-disable no-magic-numbers */
      num: this.factors[unit].num ** 2n,
      den: this.factors[unit].den ** 2n
      /* eslint-enable no-magic-numbers */
    };
  }
  return squareFactors;
};

Unit.cube = function() {
  const cubeFactors = {};
  for (const unit in this.factors) {
    // TODO should some factors be excluded?
    cubeFactors[`cb${unit}`] = {
      /* eslint-disable no-magic-numbers */
      num: this.factors[unit].num ** 3n,
      den: this.factors[unit].den ** 3n
      /* eslint-enable no-magic-numbers */
    };
  }
  return cubeFactors;
};

Unit.prototype.$convert = function(targetunit) {
  const result = new this.constructor(0, targetunit);
  result[targetunit] = this[targetunit];
  return result;
};

Unit.prototype.$add = function(value, targetunit = this.$unit) {
  const result = this.$convert(targetunit);
  result.$value += value[targetunit];
  return result;
};

module.exports = Unit;