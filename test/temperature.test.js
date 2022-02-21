const assert = require('assert');
const Temperature = require('../lib/temperature');

describe('Temperature', () => {

  it('should create a default temperature at 0K', () => {
    const h = new Temperature();
    assert.equal(h.$unit, 'K', 'defauly unit Kelvin');
    assert.equal(h.K, 0, 'default value 0K');
  });

  it('should take a temperature in Kelvin and convert', () => {
    const h = new Temperature(100, 'K');

    assert.equal(h.K, 100, 'Kelvin');
    assert.equal(h.degC, -173.15, 'degrees Celsius');
    assert.equal(h.degF, -279.67, 'degrees Fahrenheit');
    assert.equal(h.degRa, 180, 'degrees Rankine');
  });

  it('should take a temperature in degrees Celsius and convert', () => {
    const h = new Temperature(100, 'degC');

    assert.equal(h.K, 373.15, 'Kelvin');
    assert.equal(h.degC, 100, 'degrees Celsius');
    assert.equal(h.degF, 212, 'degrees Fahrenheit');
    assert.equal(h.degRa, 671.67, 'degrees Rankine');
  });

  it('should take a temperature in degree Fahrenheit and convert', () => {
    const h = new Temperature(32, 'degF');

    assert.equal(h.K, 273.15, 'Kelvin');
    assert.equal(h.degC, 0, 'degrees Celsius');
    assert.equal(h.degF, 32, 'degrees Fahrenheit');
    assert.equal(h.degRa, 491.67, 'degrees Rankine');
  });
});