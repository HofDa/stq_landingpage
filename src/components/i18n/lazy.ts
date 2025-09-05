// Define the supported languages
export type Lang = "de" | "it" | "en";

// Type import from one locale to get the shape of the dictionary
import type deDict from "./locales/de";
export type Dict = typeof deDict;

// Shared translator function type used across components
export type TFunction = <K extends keyof Dict>(k: K) => Dict[K];

// Explicit loader map (safer with Vite/TS than template-string dynamic import)
const loaders: Record<Lang, () => Promise<Dict>> = {
  de: () => import("./locales/de").then((m) => (m.default ?? (m as any).dict) as Dict),
  it: () => import("./locales/it").then((m) => (m.default ?? (m as any).dict) as Dict),
  en: () => import("./locales/en").then((m) => (m.default ?? (m as any).dict) as Dict),
};

/**
 * Load dictionary for a given language.
 * Falls back to English on any error.
 */
export async function loadDict(lang: Lang): Promise<Dict> {
  try {
    return await loaders[lang]();
  } catch {
    return await loaders.en();
  }
}