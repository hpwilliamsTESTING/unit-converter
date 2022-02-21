const assert = require('assert');
const Volume = require('../lib/volume');

describe('Volume', () => {

  it('should create a defaultv olume of 0cbm', () => {
    const h = new Volume();

    assert.equal(h.$unit, 'cbm', 'default unit cubic metres');
    assert.equal(h.cbm, 0, 'defauly value 0cbm');
  });

  it('should take a volume in cubic metres and convert to other SI (midrange)', () => {
    const h = new Volume(123, 'cbm', false);

    // prefixes smaller than cubed pico too small for accurate JS numbers even with strict off
    assert.equal(h.cbpm, 123e36, 'cubic picometres');
    assert.equal(h.cbnm, 123e27, 'cubic nanometres');
    assert.equal(h.yl, 123e27,'yoctolitres');
    assert.equal(h.zl, 123e24, 'zeptolitres');
    assert.equal(h.al, 123e21, 'attolitres');
    assert.equal(h.cbum, 123e18, 'cubic micrometres');
    assert.equal(h.fl, 123e18, 'femtolitres');
    assert.equal(h.pl, 123e15, 'picolitres');
    assert.equal(h.nl, 123e12, 'microlitres');
    assert.equal(h.cbmm, 123e9, 'cubic millimetres');
    assert.equal(h.ul, 123e9, 'microlitres');
    assert.equal(h.cbcm, 123000000, 'cubic centimetres');
    assert.equal(h.ml, 123000000, 'millilitres');
    assert.equal(h.cl, 12300000, 'centilitres');
    assert.equal(h.dl, 1230000, 'decilitres');
    assert.equal(h.cbdm, 123000, 'cubic decimetres');
    assert.equal(h.l, 123000, 'litres');
    assert.equal(h.dal, 12300, 'decalitres');
    assert.equal(h.hl, 1230, 'hectalitres');
    assert.equal(h.cbm, 123, 'cubic metres');
    assert.equal(h.kl, 123, 'kilolitres');
    assert.equal(h.cbdam, 0.123, 'cubic decametres');
    assert.equal(h.Ml, 0.123, 'megalitres');
    assert.equal(h.cbhm, 0.000123, 'cubic hectometres');
    assert.equal(h.Gl, 0.000123, 'gigalitres');
    assert.equal(h.cbkm, 123e-9, 'cubic kilometres');
    assert.equal(h.Tl, 123e-9, 'teralitres');
    assert.equal(h.Pl, 123e-12, 'petalitres');
    assert.equal(h.El, 123e-15, 'exalitres');
    assert.equal(h.cbMm, 123e-18, 'cubic megametres');
    assert.equal(h.Zl, 123e-18, 'zettalitres');
    assert.equal(h.Yl, 123e-21, 'yottalitres');
    assert.equal(h.cbGm, 123e-27, 'cubic gigametres');
    assert.equal(h.cbTm, 123e-36, 'cubic terametres');
    // prefixes greater than cubed tera too large for accurate JS numbers even with strict off
  });

  it('should convert a volume in imperial length cubed units', () => {
    const h = new Volume(1, 'cbyd');

    assert.equal(h.cbyd, 1, 'cubic yard');
    assert.equal(h.cbft, 27, 'cubic feet');
    assert.equal(h.cbin, 46656, 'cubic inches');
  });

  it('should convert a volume in imperial gallons', () => {
    const h = new Volume(3, 'impgal');

    assert.equal(h.impgal, 3, 'imperial gallons');
    assert.equal(h.imppt, 24, 'imperial pints');
    assert.equal(h.impfloz, 480, 'imperial fluid ounces');
  });

  it('should convert a volume in US gallons', () => {
    const h = new Volume(7, 'USgal');

    assert.equal(h.USgal, 7, 'US gallons');
    assert.equal(h.USpt, 56, 'US pints');
    assert.equal(h.USfloz, 896, 'US fluid ounces');
  });
});