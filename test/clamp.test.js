import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from '../src/clamp.js';

test('valoarea din interval rămâne neschimbată', () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test('valoarea sub min întoarce min', () => {
  assert.equal(clamp(-3, 0, 10), 0);
});

test('valoarea peste max întoarce max', () => {
  assert.equal(clamp(42, 0, 10), 10);
});

test('valorile egale cu limitele rămân neschimbate', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('numere negative', () => {
  assert.equal(clamp(-5, -10, -1), -5);
  assert.equal(clamp(-20, -10, -1), -10);
  assert.equal(clamp(0, -10, -1), -1);
});

test('numere zecimale', () => {
  assert.equal(clamp(0.25, 0.5, 1.5), 0.5);
  assert.equal(clamp(1.75, 0.5, 1.5), 1.5);
  assert.equal(clamp(0.75, 0.5, 1.5), 0.75);
});
