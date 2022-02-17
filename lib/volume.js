const Unit = require('./unit');
const Length = require('./length');
const { _meta, ...factors } = require('./volume.json');

function Volume(value = 0, unit = 'cbm', strict = true) {
  Unit.call(this, Volume, value, unit, strict);
}

Unit.extend(Volume);

Volume.init(_meta);
Volume.addUnits(factors);
Volume.addUnits(Length.cube());
Volume.addSIPrefixes('l');

module.exports = Volume;