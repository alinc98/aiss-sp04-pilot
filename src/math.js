export function add(a, b) {
  if (typeof a !== 'number' || !Number.isFinite(a) || typeof b !== 'number' || !Number.isFinite(b)) {
    throw new TypeError('add: both arguments must be finite primitive numbers');
  }
  return a + b;
}
