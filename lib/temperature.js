const OffsetUnit = require('./offsetunit');
const { _meta, ...factors } = require('./temperature.json');

function Temperature(value = 0, unit = 'K', strict = true) {
  OffsetUnit.call(this, Temperature, value, unit, strict);
}

OffsetUnit.extend(Temperature);

Temperature.init(_meta);
Temperature.addUnits(factors);
Temperature.addSIPrefixes('K').forEach(addedUnit => {
  Temperature.factors[addedUnit].offset = 0;
});

module.exports = Temperature;