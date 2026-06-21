// ── i18n konfiguracija ─────────────────────────────────────
// Svi tekstovi žive u src/locales/<lang>.json.
// Da dodaš/izmijeniš tekst → uredi taj JSON. Da dodaš jezik →
// dodaj kod ovdje u LOCALES + napravi novi <kod>.json.

import me from "@/locales/me.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import ru from "@/locales/ru.json";
import de from "@/locales/de.json";

export const LOCALES = ["me", "en", "fr", "ru", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "me";

// Oznake u language switcheru
export const LOCALE_LABELS: Record<Locale, string> = {
  me: "ME",
  en: "EN",
  fr: "FR",
  ru: "RU",
  de: "DE",
};

// Pune oznake (za <html lang> i hreflang)
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  me: "sr-ME",
  en: "en",
  fr: "fr",
  ru: "ru",
  de: "de",
};

// Tip rječnika izvodimo iz primarnog (me), garantuje da svi
// jezici imaju isti oblik objekta.
export type Dictionary = typeof me;

const DICTIONARIES: Record<Locale, Dictionary> = {
  me,
  en: en as Dictionary,
  fr: fr as Dictionary,
  ru: ru as Dictionary,
  de: de as Dictionary,
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}
