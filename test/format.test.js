import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatPercent } from '../src/format.js';

test('formatPercent rounds to whole percent by default', () => {
  assert.equal(formatPercent(0.4567), '46%');
});

test('formatPercent respects digits', () => {
  assert.equal(formatPercent(0.4567, 1), '45.7%');
});

test('formatPercent handles 1 and 0', () => {
  assert.equal(formatPercent(1), '100%');
  assert.equal(formatPercent(0), '0%');
});

test('formatPercent accepts digits 0 through 4', () => {
  for (let d = 0; d <= 4; d++) {
    assert.equal(typeof formatPercent(0.5, d), 'string');
  }
  assert.equal(formatPercent(0.5, 4), '50.0000%');
});

test('formatPercent throws RangeError for non-finite ratios', () => {
  assert.throws(() => formatPercent(NaN), RangeError);
  assert.throws(() => formatPercent(Infinity), RangeError);
  assert.throws(() => formatPercent(-Infinity), RangeError);
});

test('formatPercent throws RangeError for invalid digits', () => {
  assert.throws(() => formatPercent(0.5, -1), RangeError);
  assert.throws(() => formatPercent(0.5, 5), RangeError);
  assert.throws(() => formatPercent(0.5, 1.5), RangeError);
  assert.throws(() => formatPercent(0.5, NaN), RangeError);
});
