
function Unit(child, value, unit, strict) {
  const factor = child.getFactor(unit);
  if (factor) {
    this.unit = unit;
    this.value = value;
    this.num = factor.num;
    this.den = factor.den;
    this.strict = strict;
  } else {
    throw `E001: Unknown unit ${unit} for quantity ${child.name}`;
  }
}

Unit.getFactor = function(unit) {
  return this.factors[unit];
};

const safeDivMul = (n, a, b, c, d, strict = true) => {
  let num = a * b;
  let den = c * d;
  while (num % 10n === 0n && den % 10n === 0n) {
    num /= 10n;
    den /= 10n;
  }
  if (num > den) {
    const ratio = Number(num) / Number(den);
    if (strict && ratio > Number.MAX_SAFE_INTEGER) {
      throw 'E002: Conversion ratio greater than max safe integer';
    }
    return n * ratio;
  }
  const invratio = Number(den) / Number(num);
  if (strict && invratio > Number.MAX_SAFE_INTEGER) {
    throw 'E003: Inverse conversion ratio greater than max safe integer';
  }
  return n / invratio;
};

Unit.init = function() {
  this.factors = {};
};
  
Unit.addUnit = function(unit, factor) {
  const num = BigInt(factor.num);
  const den = BigInt(factor.den);
  this.factors[unit] = {num, den};
  Object.defineProperty(this.prototype, unit, {
    get() { return safeDivMul(this.value, this.num, den, this.den, num, this.strict); },
    set(v) { this.value = safeDivMul(v, num, this.den, den, this.num, this.strict); }
  });
};

Unit.addUnits = function(factors) {
  for (let unit in factors) {
    this.addUnit(unit, factors[unit]);
  }
};

Unit.addSIPrefixes = function(...units) {
  units.forEach( unit => {
    const {num, den} = this.factors[unit];
    this.addUnits({
      [`y${unit}`]: { num, den: den * 10n ** 24n },
      [`z${unit}`]: { num, den: den * 10n ** 21n },
      [`a${unit}`]: { num, den: den * 10n ** 18n },
      [`f${unit}`]: { num, den: den * 10n ** 15n },
      [`p${unit}`]: { num, den: den * 10n ** 12n },
      [`n${unit}`]: { num, den: den * 10n ** 9n },
      [`u${unit}`]: { num, den: den * 10n ** 6n },
      [`m${unit}`]: { num, den: den * 1000n },
      [`c${unit}`]: { num, den: den * 100n },
      [`d${unit}`]: { num, den: den * 10n },
      [`da${unit}`]: { num: num * 10n, den },
      [`h${unit}`]: { num: num * 100n, den },
      [`k${unit}`]: { num: num * 1000n, den },
      [`M${unit}`]: { num: num * 10n ** 6n, den },
      [`G${unit}`]: { num: num * 10n ** 9n, den },
      [`T${unit}`]: { num: num * 10n ** 12n, den },
      [`P${unit}`]: { num: num * 10n ** 15n, den },
      [`E${unit}`]: { num: num * 10n ** 18n, den },
      [`Z${unit}`]: { num: num * 10n ** 21n, den },
      [`Y${unit}`]: { num: num * 10n ** 24n, den }
    });
  })
};

Unit.square = function() {
  const squareFactors = {};
  for (let unit in this.factors) {
    // TODO should some factors be excluded?
    squareFactors[`sq${unit}`] = {
      num: this.factors[unit].num ** 2n,
      den: this.factors[unit].den ** 2n
    }
  }
  return squareFactors;
};

module.exports = Unit;