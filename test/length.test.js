const assert = require('assert');
const Length = require('../lib/length');

describe('Length', () => {

  it('should create a default length of 0m', () => {
    const h = new Length();

    assert.equal(h.$unit, 'm', 'default unit metres');
    assert.equal(h.m, 0, 'default valu e0m');
  });

  it('should take a length in metres and convert to other SI', () => {
    const h = new Length(123, 'm', false);

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

  it('should correctly add lengths in differing units (metric)', () => {
    const h1 = new Length(23, 'm');
    const h2 = new Length(450, 'cm');
    
    const resm = h1.$add(h2);
    assert.equal(resm.$unit, 'm');
    assert.equal(resm.m, 27.5);

    const rescm = h2.$add(h1);
    assert.equal(rescm.$unit, 'cm');
    assert.equal(rescm.cm, 2750);

    const resmm1 = h1.$add(h2, 'mm');
    const resmm2 = h2.$add(h1, 'mm');
    assert.deepEqual(resmm1, resmm2);
    assert.equal(resmm1.$unit, 'mm');
    assert.equal(resmm2.mm, 27500);
  });

  it('should correctly add lengths in differing units (imperial)', () => {
    const h1 = new Length(34, 'yd');
    const h2 = new Length(456, 'ft');

    const resyd = h1.$add(h2);
    assert.equal(resyd.$unit, 'yd');
    assert.equal(resyd.yd, 186);

    const resft = h2.$add(h1);
    assert.equal(resft.$unit, 'ft');
    assert.equal(resft.ft, 558);

    const resmm1 = h1.$add(h2, 'in');
    const resmm2 = h2.$add(h1, 'in');
    assert.deepEqual(resmm1, resmm2);
    assert.equal(resmm1.$unit, 'in');
    assert.equal(resmm2.in, 6696);
  });
});