const cancel = (n, d) => {

  let num = n;
  let den = d;

  [2n, 3n, 5n, 7n].forEach(divisor => { // eslint-disable-line no-magic-numbers
    while (num % divisor === 0n && den % divisor === 0n) {
      num /= divisor;
      den /= divisor;
    }
  });
  return { num, den };
};

const safeDivMul = (n, a, b, c, d, strict = true) => {
  const { num, den } = cancel(a * b, c * d);

  if (num > den) {
    const ratio = Number(num) / Number(den);
    if (strict && ratio > Number.MAX_SAFE_INTEGER) {
      throw new Error('E002: Conversion ratio greater than max safe integer');
    }
    return n * ratio;
  }

  const invratio = Number(den) / Number(num);

  if (strict && invratio > Number.MAX_SAFE_INTEGER) {
    throw new Error('E003: Inverse conversion ratio greater than max safe integer');
  }

  return n / invratio;
};

module.exports = { safeDivMul };