const assert = require('assert');
const Area = require('../lib/area');

describe('Area', () => {
  it('should take an area in square metres and convert to other SI (midrange)', () => {
    const h = new Area(123, 'sqm', false);

    // prefices smaller than atto too small for accurate JS numbers even with strict off
    assert.equal(h.sqam, 123e36, 'square attometres');
    assert.equal(h.sqfm, 123e30, 'square femtometres');
    assert.equal(h.sqpm, 123e24, 'square picometres');
    assert.equal(h.sqnm, 123e18, 'square nanometres');
    assert.equal(h.squm, 123e12, 'square micrometres');
    assert.equal(h.sqmm, 123000000, 'square millimetres');
    assert.equal(h.sqcm, 1230000, 'square centimetres');
    assert.equal(h.sqdm, 12300, 'square decimetres');
    assert.equal(h.sqm, 123, 'square metres');
    assert.equal(h.sqdam, 1.23, 'square decametres');
    assert.equal(h.sqhm, 0.0123, 'square hectometres');
    assert.equal(h.sqkm, 0.000123, 'square kilometres');
    assert.equal(h.sqMm, 123e-12, 'square megametres');
    assert.equal(h.sqGm, 123e-18, 'square gigametres');
    assert.equal(h.sqTm, 123e-24, 'square terametres');
    assert.equal(h.sqPm, 123e-30, 'square petametres');
    assert.equal(h.sqEm, 123e-36, 'square exametres');
    // prefices greater than exa too big for accurate JS numbers even with strict off
  });

  it('should take an area in barns and convert to SI units', () => {
    const h = new Area(4, 'barn', false);

    assert.equal(h.sqym, 4e20, 'square yottametres');
    assert.equal(h.sqzm, 4e14, 'square zettometres');
    assert.equal(h.sqam, 4e8, 'square attometres');
    assert.equal(h.sqfm, 400, 'square femtometres');
    assert.equal(h.barn, 4, 'barns');
  });

  it('should take an area in hectares and convert to SI units', () => {
    const h = new Area(500000, 'ha', false);

    assert.equal(h.ha, 500000, 'hectares');
    assert.equal(h.sqkm, 5000, 'square kilometres');
    assert.equal(h.sqMm, 5e-3, 'square megametres');
    assert.equal(h.sqGm, 5e-9, 'square gigametres');
    assert.equal(h.sqTm, 5e-15, 'square terametres');
    assert.equal(h.sqPm.toExponential(3), '5.000e-21', 'square petametres');
    assert.equal(h.sqEm.toExponential(3), '5.000e-27', 'square exametres');
    assert.equal(h.sqZm.toExponential(3), '5.000e-33', 'square zettametres');
    assert.equal(h.sqYm.toExponential(3), '5.000e-39', 'square yottametres');
  });

});