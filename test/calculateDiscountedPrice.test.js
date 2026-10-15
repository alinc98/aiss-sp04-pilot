import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateDiscountedPrice } from '../src/calculateDiscountedPrice.js';

const relErr = (actual, expected) => Math.abs(actual - expected) / Math.abs(expected);

test('exemplul (100, 20) întoarce 80', () => {
  assert.equal(calculateDiscountedPrice(100, 20), 80);
});

test('reducerea 0 păstrează prețul rotunjit la două zecimale', () => {
  assert.equal(calculateDiscountedPrice(59.99, 0), 59.99);
  assert.equal(calculateDiscountedPrice(19.999, 0), 20);
  assert.equal(calculateDiscountedPrice(123456789.12, 0), 123456789.12);
  assert.equal(calculateDiscountedPrice(Number.MAX_VALUE, 0), Number.MAX_VALUE);
});

test('reducerea 100 întoarce +0 pentru orice preț valid', () => {
  for (const p of [0, 1, 59.99, 123456789.12, Number.MAX_VALUE]) {
    assert.ok(Object.is(calculateDiscountedPrice(p, 100), 0), `preț ${p}`);
  }
});

test('prețul 0 este valid și întoarce 0', () => {
  assert.ok(Object.is(calculateDiscountedPrice(0, 20), 0));
  assert.ok(Object.is(calculateDiscountedPrice(-0, 20), 0));
});

test('prețul negativ produce RangeError', () => {
  assert.throws(() => calculateDiscountedPrice(-1, 10), RangeError);
  assert.throws(() => calculateDiscountedPrice(-0.01, 0), RangeError);
});

test('reducerea sub 0 sau peste 100 produce RangeError', () => {
  assert.throws(() => calculateDiscountedPrice(100, -0.01), RangeError);
  assert.throws(() => calculateDiscountedPrice(100, 100.01), RangeError);
  assert.throws(() => calculateDiscountedPrice(100, 101), RangeError);
});

test('tipurile greșite produc TypeError, în oricare argument', () => {
  const bad = ['10', null, undefined, true, {}, [], new Number(5)];
  for (const v of bad) {
    assert.throws(() => calculateDiscountedPrice(v, 10), TypeError);
    assert.throws(() => calculateDiscountedPrice(100, v), TypeError);
  }
});

test('NaN și Infinity produc TypeError, în oricare argument', () => {
  for (const v of [NaN, Infinity, -Infinity]) {
    assert.throws(() => calculateDiscountedPrice(v, 10), TypeError);
    assert.throws(() => calculateDiscountedPrice(100, v), TypeError);
  }
});

test('TypeError are prioritate față de RangeError', () => {
  assert.throws(() => calculateDiscountedPrice('-5', 10), TypeError);
  assert.throws(() => calculateDiscountedPrice(-5, '10'), TypeError);
  assert.throws(() => calculateDiscountedPrice(100, null), TypeError);
  assert.throws(() => calculateDiscountedPrice(-1, Infinity), TypeError);
  assert.throws(() => calculateDiscountedPrice(NaN, 150), TypeError);
});

test('fără conversie implicită', () => {
  assert.throws(() => calculateDiscountedPrice('100', 0), TypeError);
  assert.throws(() => calculateDiscountedPrice(100, '0'), TypeError);
});

test('prețuri foarte mari: fără depășire, eroare relativă mică', () => {
  assert.ok(relErr(calculateDiscountedPrice(Number.MAX_VALUE, 50), Number.MAX_VALUE / 2) <= 1e-12);
  assert.ok(relErr(calculateDiscountedPrice(1e300, 20), 8e299) <= 1e-12);
  assert.ok(relErr(calculateDiscountedPrice(Number.MAX_VALUE, 99.5), Number.MAX_VALUE * 0.005) <= 1e-12);
});

test('rezultatul este rotunjit la 2 zecimale', () => {
  assert.equal(calculateDiscountedPrice(99.99, 10), 89.99);
  assert.equal(calculateDiscountedPrice(100, 33.333), 66.67);
  assert.equal(calculateDiscountedPrice(1.015, 0), 1.01);
  assert.equal(calculateDiscountedPrice(2.675, 0), 2.68);
  assert.equal(calculateDiscountedPrice(10.005, 0), 10.01);
});
