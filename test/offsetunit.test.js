const assert = require('assert');
const OffsetUnit = require('../lib/offsetunit');

describe('OffsetUnit', () => {

  let TestUnit;

  beforeEach(() => {
    TestUnit = function(value, unit, strict) {
      OffsetUnit.call(this, TestUnit, value, unit, strict);
    }
    OffsetUnit.extend(TestUnit);
  });

  afterEach(() => {
    delete TestUnit;
  });

  it('should initialise correctly', () => {
    TestUnit.init({offsetd: 1});
    assert.equal(Object.keys(TestUnit.factors).length, 0, 'initialised with an empty factors list');
    assert.equal(TestUnit.offsetd, 1);
  });

  it('should convert between units with offsets', () => {
    TestUnit.init({offsetd: 1});
    const testFactors = {
      p: {
        num: 1,
        den: 1,
        offset: 0
      },
      q: {
        num: 1,
        den: 1,
        offset: 99
      }
    };
    TestUnit.addUnits(testFactors);
    const t1 = new TestUnit(1, 'p');
    assert.equal(t1.p, 1);
    assert.equal(t1.q, -98);
    const t2 = new TestUnit(1, 'q');
    assert.equal(t2.p, 100);
    assert.equal(t2.q, 1);
  });

  it('should allow multiple factors to be added and set', () => {
    TestUnit.init({offsetd: 1});
    const testFactors = {
      p: {
        num: 1,
        den: 1,
        offset: 0
      },
      q: {
        num: 1,
        den: 1,
        offset: 99
      }
    };
    TestUnit.addUnits(testFactors);
    const t = new TestUnit(0, 'p');
    assert.equal(t.p, 0);
    assert.equal(t.q, -99);
    t.p = 20;
    assert.equal(t.p, 20);
    assert.equal(t.q, -79);
    t.q = 30;
    assert.equal(t.p, 129);
    assert.equal(t.q, 30);
  });

});