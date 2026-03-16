export interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

/**
 * Country codes for Latin American Spanish-speaking countries + USA + Spain.
 * Sorted alphabetically by name (Spanish).
 */
export const COUNTRY_CODES: CountryCode[] = [
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+506", name: "Costa Rica", flag: "🇨🇷" },
  { code: "+53", name: "Cuba", flag: "🇨🇺" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+503", name: "El Salvador", flag: "🇸🇻" },
  { code: "+34", name: "España", flag: "🇪🇸" },
  { code: "+1", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "+502", name: "Guatemala", flag: "🇬🇹" },
  { code: "+504", name: "Honduras", flag: "🇭🇳" },
  { code: "+52", name: "México", flag: "🇲🇽" },
  { code: "+505", name: "Nicaragua", flag: "🇳🇮" },
  { code: "+507", name: "Panamá", flag: "🇵🇦" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+51", name: "Perú", flag: "🇵🇪" },
  { code: "+1849", name: "República Dominicana", flag: "🇩🇴" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
];

/** Default country code (Bolivia) */
export const DEFAULT_COUNTRY_CODE = "+591";
