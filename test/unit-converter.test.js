const assert = require('assert');
const {
  Length,
  Area,
  Volume,
  Mass,
  Temperature,
  Unit,
  OffsetUnit } = require('../unit-converter');

describe('unit-converter library', () => {
  it('should expose all the unit classes', () => {
    assert.equal(Length.name, 'Length');
    assert.equal(Area.name, 'Area');
    assert.equal(Volume.name, 'Volume');
    assert.equal(Mass.name, 'Mass');
    assert.equal(Temperature.name, 'Temperature');
    assert.equal(Unit.name, 'Unit');
    assert.equal(OffsetUnit.name, 'OffsetUnit');
  });
});