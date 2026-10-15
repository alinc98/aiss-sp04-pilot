import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from '../src/truncate.js';

test('truncate: taie și adaugă „…” în limita max', () => {
  assert.equal(truncate('abcdef', 4), 'abc…');
  assert.equal(truncate('abcdef', 1), '…');
  assert.equal(truncate('abcdef', 2), 'a…');
});

test('truncate: lungime totală (inclusiv „…”) este exact max', () => {
  assert.equal(Array.from(truncate('abcdefghij', 5)).length, 5);
});

test('truncate: text mai scurt sau egal cu max rămâne neschimbat', () => {
  assert.equal(truncate('abc', 5), 'abc');
  assert.equal(truncate('abc', 3), 'abc');
  assert.equal(truncate('', 1), '');
});

test('truncate: măsoară în puncte de cod Unicode, nu în unități UTF-16', () => {
  // „😀” are 2 unități UTF-16 dar 1 punct de cod.
  assert.equal(truncate('😀😀😀', 3), '😀😀😀'); // 3 puncte de cod, nu se taie
  assert.equal(truncate('😀😀😀', 2), '😀…');
  assert.equal(truncate('😀😀😀', 2).length, 3); // 2 + 1 unități UTF-16
  assert.equal(truncate('😀😀', 2), '😀😀');
  assert.equal(truncate('😀😀', 1), '…');
});

test('truncate: text care nu este string aruncă TypeError', () => {
  assert.throws(() => truncate(123, 5), TypeError);
  assert.throws(() => truncate(null, 5), TypeError);
  assert.throws(() => truncate(undefined, 5), TypeError);
  assert.throws(() => truncate(['abc'], 5), TypeError);
});

test('truncate: max care nu este întreg între 1 și 10000 aruncă RangeError', () => {
  assert.throws(() => truncate('abc', 0), RangeError);
  assert.throws(() => truncate('abc', -1), RangeError);
  assert.throws(() => truncate('abc', 10001), RangeError);
  assert.throws(() => truncate('abc', 2.5), RangeError);
  assert.throws(() => truncate('abc', NaN), RangeError);
  assert.throws(() => truncate('abc', Infinity), RangeError);
  assert.throws(() => truncate('abc', '4'), RangeError);
  assert.throws(() => truncate('abc', undefined), RangeError);
});

test('truncate: limitele 1 și 10000 sunt acceptate', () => {
  assert.equal(truncate('abc', 1), '…');
  const long = 'a'.repeat(20000);
  assert.equal(truncate(long, 10000), 'a'.repeat(9999) + '…');
});
