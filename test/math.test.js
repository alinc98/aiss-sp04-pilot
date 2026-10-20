import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add } from '../src/math.js';

test('add', () => {
  assert.equal(add(2, 3), 5);
});

test('add throws TypeError for non-finite-number arguments', () => {
  const bad = ['2', '', null, undefined, true, false, 1n, {}, [], [1], new Number(1), NaN, Infinity, -Infinity];
  for (const v of bad) {
    assert.throws(() => add(v, 1), TypeError);
    assert.throws(() => add(1, v), TypeError);
  }
  assert.throws(() => add(1), TypeError);
  assert.throws(() => add(), TypeError);
});

test('add returns sum for valid finite primitive numbers', () => {
  assert.equal(add(-2, -3), -5);
  assert.equal(add(0, 0), 0);
  assert.equal(add(-0, 5), 5);
  assert.equal(add(1.5, 2.25), 3.75);
  assert.equal(add(-1.5, 1.5), 0);
});
