
const Unit = require('./unit');
const factors = require('./length.json');

function Length(value = 0, unit = 'm') {
  Unit.call(this, Length, value, unit);
}
/*
function Length(value = 0, unit = 'm', format = {}) {
  this.unit = unit;
  this.value = value;
  this.factor = factors[unit].value;
}
*/

Object.assign(Length, Unit);

Length.addUnits(factors);

module.exports = Length;