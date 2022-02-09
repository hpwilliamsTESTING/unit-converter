
const Unit = require('./unit');

const factors = {
  sqm: 1,
  sqcm: 0.0001,
  sqkm: 1000000
};

function Area(value = 0, unit = 'sqm', format = {}) {
  this.unit = unit;
  this.value = value;
  this.factor = factors[unit];
}

Object.assign(Area, Unit);

Area.addUnits(factors);

module.exports = Area;
