export function truncate(text, max) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  if (!Number.isInteger(max) || max < 1 || max > 10000) {
    throw new RangeError('max must be an integer between 1 and 10000');
  }
  // Măsurăm în puncte de cod Unicode (Array.from iterează după code points).
  const chars = Array.from(text);
  if (chars.length <= max) {
    return text;
  }
  // Limita include „…”, deci păstrăm max - 1 puncte de cod.
  return chars.slice(0, max - 1).join('') + '…';
}
