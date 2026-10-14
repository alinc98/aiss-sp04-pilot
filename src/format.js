/**
 * Format a ratio as a percentage string.
 *
 * @param {number} ratio - Finite number, e.g. 0.4567 for 45.67%.
 * @param {number} [digits=0] - Integer from 0 to 4 for decimal places.
 * @returns {string} e.g. formatPercent(0.4567) === '46%'.
 * @throws {RangeError} If ratio is not finite or digits is not an integer in [0, 4].
 */
export function formatPercent(ratio, digits = 0) {
  if (!Number.isFinite(ratio)) {
    throw new RangeError(`ratio must be a finite number, got ${ratio}`);
  }
  if (!Number.isInteger(digits) || digits < 0 || digits > 4) {
    throw new RangeError(`digits must be an integer from 0 to 4, got ${digits}`);
  }
  return `${(ratio * 100).toFixed(digits)}%`;
}
