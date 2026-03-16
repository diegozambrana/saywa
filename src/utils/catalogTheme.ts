import type { CatalogTheme } from "@/types/Catalog";
import type { CSSProperties } from "react";
import { fontVariableMap } from "@/lib/fonts";

/**
 * Safely parses the theme JSONB from the catalog into a typed CatalogTheme.
 * Returns an empty object if the theme is empty, null, or invalid.
 */
export function parseCatalogTheme(theme: unknown): CatalogTheme {
  if (!theme || typeof theme !== "object" || Array.isArray(theme)) return {};
  return theme as CatalogTheme;
}

/**
 * Converts a font name to its CSS variable, if available.
 * Otherwise returns the font name as-is (for fallback).
 */
function getFontFamily(fontName?: string | null): string | undefined {
  if (!fontName) return undefined;
  return fontVariableMap[fontName] || fontName;
}

/**
 * Generates root-level inline styles for the catalog container.
 * Applies global typography and color overrides. Non-null values override
 * the default shadcn/Tailwind styles; null values are ignored.
 */
export function getCatalogRootStyles(theme: CatalogTheme): CSSProperties {
  return filterNullish({
    fontFamily: getFontFamily(theme.typography?.fontFamily),
    fontSize: theme.typography?.baseFontSize,
    fontWeight: theme.typography?.bodyFontWeight,
    backgroundColor: theme.colors?.background,
    color: theme.colors?.foreground,
  });
}

/**
 * Returns inline styles for heading elements (h1, h2, h3, h4).
 * Falls back to the base foreground color if no specific heading color is given.
 */
export function getHeadingStyles(
  theme: CatalogTheme,
  overrideColor?: string | null,
): CSSProperties {
  return filterNullish({
    fontFamily: getFontFamily(theme.typography?.headingFontFamily),
    fontWeight: theme.typography?.headingFontWeight,
    color: overrideColor ?? theme.colors?.foreground,
  });
}

/**
 * Removes entries with null or undefined values from a style object,
 * so React only applies properties that are explicitly set.
 */
function filterNullish(styles: Record<string, unknown>): CSSProperties {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(styles)) {
    if (value != null) {
      result[key] = value;
    }
  }
  return result as CSSProperties;
}
