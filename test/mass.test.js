const assert = require('assert');
const Mass = require('../lib/mass');

describe('Mass', () => {
  it('should take a mass in kilogrammes and convert to other SI', () => {
    const h = new Mass(0.123, 'kg', false);

    assert.equal(h.yg, 123000000000000000000000000, 'yoctogrammes');
    assert.equal(h.zg, 123000000000000000000000, 'zeptogrammes');
    assert.equal(h.ag, 123000000000000000000, 'attogrammes');
    assert.equal(h.fg, 123000000000000000, 'femtogrammes');
    assert.equal(h.pg, 123000000000000, 'picogrammes');
    assert.equal(h.ng, 123000000000, 'nanogrammes');
    assert.equal(h.ug, 123000000, 'microgrammes');
    assert.equal(h.mg, 123000, 'milligrammes');
    assert.equal(h.cg, 12300, 'centigrammes');
    assert.equal(h.dg, 1230, 'decigrammes');
    assert.equal(h.g, 123, 'grammes');
    assert.equal(h.dag, 12.3, 'decagrammes');
    assert.equal(h.hg, 1.23, 'hectogrammes');
    assert.equal(h.kg, 0.123, 'kilogrammes');
    assert.equal(h.Mg, 0.000123, 'megagrammes');
    assert.equal(h.Gg, 0.000000123, 'gigagrammes');
    assert.equal(h.Tg, 0.000000000123, 'teragrammes');
    assert.equal(h.Pg, 0.000000000000123, 'petagrammes');
    assert.equal(h.Eg, 0.000000000000000123, 'exagrammes');
    assert.equal(h.Zg, 0.000000000000000000123, 'zettagrammes');
    assert.equal(h.Yg, 0.000000000000000000000123, 'yottagrammes');
  });

  it('should correctly convert imperial (avoirdupois) masses', () => {
    const h = new Mass(7, 'lont');

    assert.equal(h.lont, 7, 'long tons');
    assert.equal(h.loncwt, 140, 'long hundredweight');
    assert.equal(h.st, 1120, 'stone');
    assert.equal(h.lbm, 15680, 'pounds');
    assert.equal(h.oz, 250880, 'ounces');
  });

  it('should correctly convert imperial (US short) masses', () => {
    const h = new Mass(7, 'shot');

    assert.equal(h.shot, 7, 'short tons');
    assert.equal(h.shocwt, 140, 'short hundredweight');
    assert.equal(h.lbm, 14000, 'pounds');
    assert.equal(h.oz, 224000, 'ounces');
  });
});