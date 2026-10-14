import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from '../src/slug.js';

test('lowercases and replaces punctuation with a single hyphen', () => {
  assert.equal(slugify('Hello, World!'), 'hello-world');
});

test('collapses runs of whitespace and trims', () => {
  assert.equal(slugify('  Multiple   spaces  '), 'multiple-spaces');
});

test('removes diacritics and keeps digits', () => {
  assert.equal(slugify('Ăla-Bala 2026'), 'ala-bala-2026');
});

test('returns empty string when nothing alphanumeric remains', () => {
  assert.equal(slugify('---'), '');
});

test('throws TypeError for non-string input', () => {
  for (const value of [null, undefined, 42, {}, ['a'], Symbol('x')]) {
    assert.throws(() => slugify(value), TypeError);
  }
});
