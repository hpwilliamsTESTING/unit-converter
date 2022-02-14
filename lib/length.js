
const { Unit } = require('./unit');
const factors = require('./length.json');

function Length(value = 0, unit = 'm', strict = true) {
  Unit.call(this, Length, value, unit, strict);
}

Unit.extend(Length);

Length.init();
Length.addUnits(factors);
Length.addSIPrefixes('m');

module.exports = Length;