
const Unit = require('./unit');
const Length = require('./length');
const factors = require('./area.json');

function Area(value = 0, unit = 'sqm', strict = true) {
  Unit.call(this, Area, value, unit, strict);
}

Object.assign(Area, Unit);

Area.init();
Area.addUnits(factors);
Area.addUnits(Length.square());
Area.addSIPrefixes('a');

module.exports = Area;
