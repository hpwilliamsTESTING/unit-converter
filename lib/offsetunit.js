const { Unit, safeDivMul } = require('./unit');

function OffsetUnit(child, value, unit, strict) {
  Unit.call(this, child, value, unit, strict);
  this.offset = child.getFactor(unit).offset;
}

Unit.extend(OffsetUnit);

OffsetUnit.addUnit = function(unit, factor) {
  const num = BigInt(factor.num);
  const den = BigInt(factor.den);
  const offset = factor.offset;
  const offsetd = this.offsetd;
  this.factors[unit] = {num, den, offset};
  Object.defineProperty(this.prototype, unit, {
    get() {
      return (safeDivMul(
        this.value * offsetd + this.offset,
        this.num,
        den,
        this.den,
        num,
        this.strict
      ) - offset) / offsetd;
    },
    set(v) { this.value = safeDivMul(v + offset, num, this.den, den, this.num, this.strict) - this.offset; }
  });
};

OffsetUnit.setOffsetd = function(offsetd) {
  this.offsetd = offsetd;
};

module.exports = OffsetUnit;