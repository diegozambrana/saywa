/**
 * Tipo de caracteres para generar el string aleatorio.
 * - NUMBERS: solo dígitos 0-9
 * - ALPHANUMERIC: dígitos 0-9 + letras a-z + A-Z
 * - ALPHANUMERIC_SIGNS: dígitos + letras + signos comunes (-_.)
 */
export type RandomStringCharSet =
  | "NUMBERS"
  | "ALPHANUMERIC"
  | "ALPHANUMERIC_SIGNS";

const CHARS: Record<RandomStringCharSet, string> = {
  NUMBERS: "0123456789",
  ALPHANUMERIC:
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ALPHANUMERIC_SIGNS:
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.",
};

/**
 * Genera un string aleatorio de la longitud y tipo de caracteres indicados.
 * @param length - Longitud del string a generar.
 * @param charSet - Tipo de caracteres: NUMBERS, ALPHANUMERIC o ALPHANUMERIC_SIGNS.
 * @returns String aleatorio.
 */
export function getRandomString(
  length: number,
  charSet: RandomStringCharSet = "ALPHANUMERIC"
): string {
  const pool = CHARS[charSet];
  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[Math.floor(Math.random() * pool.length)];
  }
  return result;
}
