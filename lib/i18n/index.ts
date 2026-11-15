import { MESSAGES, type MsgKey } from "./messages";

export type Lang = "es" | "en" | "zh" | "fr";

export const LANGS: readonly { code: Lang; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "fr", label: "Français" },
] as const;

export const LI: Record<Lang, 0 | 1 | 2 | 3> = {
  es: 0,
  en: 1,
  zh: 2,
  fr: 3,
};

export const LOC: Record<Lang, string> = {
  es: "es-MX",
  en: "en-US",
  zh: "zh-CN",
  fr: "fr-FR",
};

const STORAGE_KEY = "cobrolibre-lang";

export function isLang(v: string): v is Lang {
  return v === "es" || v === "en" || v === "zh" || v === "fr";
}

export function detectLang(): Lang {
  if (typeof window === "undefined") return "es";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isLang(saved)) return saved;
  } catch {
    /* ignore */
  }
  try {
    const n = (navigator.language || "es").slice(0, 2).toLowerCase();
    if (isLang(n)) return n;
  } catch {
    /* ignore */
  }
  return "es";
}

export function persistLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

export type Vars = Record<string, string | number | undefined>;

/** Resolve a 4-tuple message like prototipo `tl()`. */
export function translate(lang: Lang, key: MsgKey, vars?: Vars): string {
  const tuple = MESSAGES[key];
  const raw = tuple[LI[lang]] || tuple[0];
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] != null ? String(vars[name]) : "",
  );
}

export function formatMxn(lang: Lang, amount: number): string {
  return amount.toLocaleString(LOC[lang], {
    style: "currency",
    currency: "MXN",
  });
}

export type { MsgKey };
export { MESSAGES };
