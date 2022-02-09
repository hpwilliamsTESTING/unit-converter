const assert = require('assert');
const Length = require('../lib/length');

describe('Length', () => {
  it('should take a length in metres and convert to other SI', () => {
    const h = new Length(123, 'm');

    assert.equal(h.ym, 123000000000000000000000000, 'yoctometres');
    assert.equal(h.zm, 123000000000000000000000, 'zeptometres');
    assert.equal(h.am, 123000000000000000000, 'attometres');
    assert.equal(h.fm, 123000000000000000, 'femtometres');
    assert.equal(h.pm, 123000000000000, 'picometres');
    assert.equal(h.nm, 123000000000, 'nanometres');
    assert.equal(h.um, 123000000, 'micrometres');
    assert.equal(h.mm, 123000, 'millimetres');
    assert.equal(h.cm, 12300, 'centimetres');
    assert.equal(h.dm, 1230, 'decimetres');
    assert.equal(h.m, 123, 'metres');
    assert.equal(h.dam, 12.3, 'decametres');
    assert.equal(h.hm, 1.23, 'hectometres');
    assert.equal(h.km, 0.123, 'kilometres');
    assert.equal(h.Mm, 0.000123, 'megametres');
    assert.equal(h.Gm, 0.000000123, 'gigametres');
    assert.equal(h.Tm, 0.000000000123, 'terametres');
    assert.equal(h.Pm, 0.000000000000123, 'petametres');
    assert.equal(h.Em, 0.000000000000000123, 'exametres');
    assert.equal(h.Zm, 0.000000000000000000123, 'zettametres');
    assert.equal(h.Ym, 0.000000000000000000000123, 'yottametres');
  });

  it('should take a length in feet and convert to other imperial', () => {
    const h = new Length(456, 'ft');

    assert.equal(h.th, 5472000, 'thou');
    assert.equal(h.in, 5472, 'inches');
    assert.equal(h.ft, 456, 'feet');
    assert.equal(h.yd, 152, 'yards');
    assert.equal(h.mi.toFixed(4), '0.0864', 'miles');
  });

  it('should take a length in miles and accurately convert to shorter units', () => {
    const h = new Length(500, 'mi');

    assert.equal(h.mi, 500, 'miles');
    assert.equal(h.yd, 880000, 'yards');
    assert.equal(h.ft, 2640000, 'feet');
    assert.equal(h.in, 31680000, 'inches');
  });

  it('should convert metres to feet', () => {
    const h = new Length(8848.86, 'm');
    assert.equal(h.ft.toFixed(1), '29031.7', 'Mt Everest in feet');
  });

  it('should convert feet to metres', () => {
    const h = new Length(35827, 'ft');
    assert.equal(h.m.toFixed(0), '10920', 'Challenger Deep in metres');
  });
});