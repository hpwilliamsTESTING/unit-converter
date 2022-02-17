
const Unit = require('./unit');
const Length = require('./length');
const { _meta, ...factors } = require('./area.json');

function Area(value = 0, unit = 'sqm', strict = true) {
  Unit.call(this, Area, value, unit, strict);
}

Unit.extend(Area);

Area.init(_meta);
Area.addUnits(factors);
Area.addUnits(Length.square());
Area.addSIPrefixes('a');

module.exports = Area;