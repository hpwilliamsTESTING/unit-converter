const Unit = require('./unit');
const { _meta, ...factors } = require('./mass.json');

function Mass(value = 0, unit = 'kg', strict = true) {
  Unit.call(this, Mass, value, unit, strict);
}

Unit.extend(Mass);

Mass.init(_meta);
Mass.addUnits(factors);
Mass.addSIPrefixes('g');

module.exports = Mass;