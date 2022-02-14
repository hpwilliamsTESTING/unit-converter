const assert = require('assert');
const { Unit, safeDivMul } = require('../lib/unit');

describe('Unit', () => {

  let TestUnit;

  beforeEach(() => {
    TestUnit = function(value, unit, strict) {
      Unit.call(this, TestUnit, value, unit, strict);
    }
    Object.assign(TestUnit, Unit);
  });

  afterEach(() => {
    delete TestUnit;
  });

  it('should initialise correctly', () => {
    TestUnit.init();
    assert.equal(Object.keys(TestUnit.factors).length, 0, 'initialised with an empty factors list');
  });

  it('should add a factor defined in integers', () => {
    TestUnit.init();
    TestUnit.addUnit('p', { num: 2, den: 3 });

    assert.equal(TestUnit.factors.p.num, 2n);
    assert.equal(TestUnit.factors.p.den, 3n);
  });

  it('should add a factor defined in big integers', () => {
    TestUnit.init();
    TestUnit.addUnit('p', { num: 4n, den: 5n });
    assert.equal(TestUnit.factors.p.num, 4n);
    assert.equal(TestUnit.factors.p.den, 5n);
  });

  it('should add a factor defined in number strings', () => {
    TestUnit.init();
    TestUnit.addUnit('p', { num: '6', den: '7' });
    assert.equal(TestUnit.factors.p.num, 6n);
    assert.equal(TestUnit.factors.p.den, 7n);
  });

  it('should allow multiple factors to be added and converted between', () => {
    TestUnit.init();
    const testFactors = {
      p: {
        num: 10,
        den: 1
      },
      q: {
        num: 1,
        den: 10
      }
    };
    TestUnit.addUnits(testFactors);
    const t1 = new TestUnit(1, 'p');
    assert.equal(t1.p, 1);
    assert.equal(t1.q, 100);
    const t2 = new TestUnit(1, 'q');
    assert.equal(t2.p, 0.01);
    assert.equal(t2.q, 1);
  });

  it('should correctly return current factors squared', () => {
    TestUnit.init();
    const testFactors = {
      p: {
        num: 100,
        den: 1
      },
      q: {
        num: 1,
        den: 1000
      }
    };
    TestUnit.addUnits(testFactors);
    const squaredUnits = TestUnit.square();
    assert.deepEqual(squaredUnits, {
      sqp: {
        num: 10000n,
        den: 1n,
      },
      sqq: {
        num: 1n,
        den: 1000000n
      }
    });
  });

  it('should apply SI prefixes to selected units', () => {
    TestUnit.init();
    const testFactors = {
      p: {
        num: 2,
        den: 3
      },
      q: {
        num: 4,
        den: 5
      }
    };
    TestUnit.addUnits(testFactors);
    const addedUnits = TestUnit.addSIPrefixes('p');
    assert.deepEqual(
      addedUnits,
      new Set(['yp', 'zp', 'ap', 'fp', 'pp', 'np', 'up', 'mp', 'cp', 'dp', 'dap', 'hp', 'kp', 'Mp', 'Gp', 'Tp', 'Pp', 'Ep', 'Zp', 'Yp'])
    );
    assert.deepEqual(TestUnit.getFactor('yp'), { num: 2n, den: 3n * 10n ** 24n}, 'yocto-');
    assert.equal(TestUnit.getFactor('yq'), undefined);
    assert.deepEqual(TestUnit.getFactor('zp'), { num: 2n, den: 3n * 10n ** 21n}, 'zepto-');
    assert.equal(TestUnit.getFactor('zq'), undefined);
    assert.deepEqual(TestUnit.getFactor('ap'), { num: 2n, den: 3n * 10n ** 18n}, 'atto-');
    assert.equal(TestUnit.getFactor('aq'), undefined);
    assert.deepEqual(TestUnit.getFactor('fp'), { num: 2n, den: 3n * 10n ** 15n}, 'femto-');
    assert.equal(TestUnit.getFactor('fq'), undefined);
    assert.deepEqual(TestUnit.getFactor('pp'), { num: 2n, den: 3n * 10n ** 12n}, 'pico-');
    assert.equal(TestUnit.getFactor('pq'), undefined);
    assert.deepEqual(TestUnit.getFactor('np'), { num: 2n, den: 3n * 10n ** 9n}, 'nano-');
    assert.equal(TestUnit.getFactor('nq'), undefined);
    assert.deepEqual(TestUnit.getFactor('up'), { num: 2n, den: 3n * 10n ** 6n}, 'micro-');
    assert.equal(TestUnit.getFactor('uq'), undefined);
    assert.deepEqual(TestUnit.getFactor('mp'), { num: 2n, den: 3000n}, 'milli-');
    assert.equal(TestUnit.getFactor('mq'), undefined);
    assert.deepEqual(TestUnit.getFactor('cp'), { num: 2n, den: 300n}, 'centi-');
    assert.equal(TestUnit.getFactor('cq'), undefined);
    assert.deepEqual(TestUnit.getFactor('dp'), { num: 2n, den: 30n}, 'deci-');
    assert.equal(TestUnit.getFactor('dq'), undefined);
    assert.deepEqual(TestUnit.getFactor('p'), { num: 2n, den: 3n}, 'base unit');
    assert.deepEqual(TestUnit.getFactor('q'), { num: 4n, den: 5n}, 'base unit (unmodified)');
    assert.deepEqual(TestUnit.getFactor('dap'), { num: 20n, den: 3n}, 'deca-');
    assert.equal(TestUnit.getFactor('daq'), undefined);
    assert.deepEqual(TestUnit.getFactor('hp'), { num: 200n, den: 3n}, 'hecta-');
    assert.equal(TestUnit.getFactor('hq'), undefined);
    assert.deepEqual(TestUnit.getFactor('kp'), { num: 2000n, den: 3n}, 'kilo-');
    assert.equal(TestUnit.getFactor('kq'), undefined);
    assert.deepEqual(TestUnit.getFactor('Mp'), { num: 2n * 10n ** 6n, den: 3n}, 'mega-');
    assert.equal(TestUnit.getFactor('Mq'), undefined);
    assert.deepEqual(TestUnit.getFactor('Gp'), { num: 2n * 10n ** 9n, den: 3n}, 'giga-');
    assert.equal(TestUnit.getFactor('Gq'), undefined);
    assert.deepEqual(TestUnit.getFactor('Tp'), { num: 2n * 10n ** 12n, den: 3n}, 'tera-');
    assert.equal(TestUnit.getFactor('Tq'), undefined);
    assert.deepEqual(TestUnit.getFactor('Pp'), { num: 2n * 10n ** 15n, den: 3n}, 'peta-');
    assert.equal(TestUnit.getFactor('Pq'), undefined);
    assert.deepEqual(TestUnit.getFactor('Ep'), { num: 2n * 10n ** 18n, den: 3n}, 'exa-');
    assert.equal(TestUnit.getFactor('Eq'), undefined);
    assert.deepEqual(TestUnit.getFactor('Zp'), { num: 2n * 10n ** 21n, den: 3n}, 'zetta-');
    assert.equal(TestUnit.getFactor('Zq'), undefined);
    assert.deepEqual(TestUnit.getFactor('Yp'), { num: 2n * 10n ** 24n, den: 3n}, 'yotta-');
    assert.equal(TestUnit.getFactor('Yq'), undefined);
  });

  it('should throw exception no ??? for trying to create a new value with an unknown unit', () => {
    TestUnit.init();
    TestUnit.addUnit('p', { num: 8, den: 9 });
    assert.throws(() => new TestUnit(1, 'q'), /^E.../, 'Unit q does not exist');
  });

  it('should throw an exception in strict mode when conversion factors exceed safe integer', () => {
    TestUnit.init();
    const testFactors = {
      p: {
        num: 1e20,
        den: 1
      },
      q: {
        num: 1,
        den: 1e20
      }
    };
    TestUnit.addUnits(testFactors);
    const hi = new TestUnit(1, 'p', true);
    assert.throws(() => hi.q, /^E.../, 'Safe threshold high to low');
    const lo = new TestUnit(1, 'q', true);
    assert.throws(() => lo.p, /^E.../, 'Safe threshold low to high');
  });

  it('should not throw an exception in when not in strict mode when conversion factors exceed safe integer', () => {
    TestUnit.init();
    const testFactors = {
      p: {
        num: 1e20,
        den: 1
      },
      q: {
        num: 1,
        den: 1e20
      }
    };
    TestUnit.addUnits(testFactors);
    const hi = new TestUnit(1, 'p', false);
    assert(hi.q > 0, 'Safe threshold ignored high to low');
    const lo = new TestUnit(1, 'q', false);
    assert(lo.p > 0, 'Safe threshold ignored low to high');
  });


});