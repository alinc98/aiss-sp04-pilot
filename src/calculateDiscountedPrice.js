/**
 * Calculează prețul după aplicarea unei reduceri procentuale.
 *
 * Reguli:
 * - Ambele argumente trebuie să fie numere primitive (typeof 'number') și finite
 *   (Number.isFinite). Nu se face conversie implicită: șirurile, null, undefined,
 *   boolean, obiectele (inclusiv new Number(5)), NaN, Infinity și -Infinity produc TypeError.
 *   Verificarea tipului are prioritate față de verificarea intervalului.
 * - price >= 0 și 0 <= discountPercent <= 100; altfel RangeError.
 * - Rezultatul este r = price / 100 * (100 - discountPercent), calculat în double IEEE 754.
 *   Împărțirea la 100 înainte de înmulțire evită depășirea intermediară pentru orice preț finit.
 * - Rotunjire: dacă r >= 2**52, r se întoarce neschimbat (la această mărime un double
 *   nu mai are zecimale, iar r * 100 nu se mai calculează). Altfel rezultatul este
 *   Math.round(r * 100) / 100, adică rotunjire binară la două zecimale, cu jumătățile
 *   spre +infinit.
 * - Limitele aritmeticii în virgulă mobilă: valorile zecimale la jumătate (ex. 1.005)
 *   nu sunt rotunjite zecimal exact, ci după valoarea binară (1.005 -> 1). Pentru valori
 *   cu r în [2**53 / 100, 2**52), produsul r * 100 nu mai este exact, deci rezultatul
 *   poate diferi de r cu câteva unități din ultima poziție.
 * - Un rezultat -0 (de ex. pentru prețul -0) este normalizat la +0.
 *
 * ATENȚIE: funcția este doar demonstrativă. Nu se folosește pentru calcule
 * contabile sau monetare.
 *
 * @param {number} price Prețul inițial, număr finit >= 0.
 * @param {number} discountPercent Reducerea în procente, număr finit între 0 și 100.
 * @returns {number} Prețul după reducere.
 * @throws {TypeError} Dacă un argument nu este număr primitiv finit.
 * @throws {RangeError} Dacă prețul este negativ sau reducerea este în afara [0, 100].
 */
export function calculateDiscountedPrice(price, discountPercent) {
  if (typeof price !== 'number' || !Number.isFinite(price)) {
    throw new TypeError('price trebuie să fie un număr finit');
  }
  if (typeof discountPercent !== 'number' || !Number.isFinite(discountPercent)) {
    throw new TypeError('discountPercent trebuie să fie un număr finit');
  }
  if (price < 0) {
    throw new RangeError('price trebuie să fie mai mare sau egal cu 0');
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError('discountPercent trebuie să fie între 0 și 100');
  }

  const r = price / 100 * (100 - discountPercent);
  if (r >= 2 ** 52) {
    return r === 0 ? 0 : r;
  }

  const rounded = Math.round(r * 100) / 100;
  // Normalizează -0 la +0.
  return rounded === 0 ? 0 : rounded;
}
