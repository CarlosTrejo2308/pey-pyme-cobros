"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  detectLang,
  formatMxn,
  LOC,
  persistLang,
  translate,
  type Lang,
  type MsgKey,
  type Vars,
} from "@/lib/i18n";

type I18nCtx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: MsgKey, vars?: Vars) => string;
  mx: (amount: number) => string;
  locale: string;
};

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const detected = detectLang();
    setLangState(detected);
    document.documentElement.lang = LOC[detected];
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persistLang(next);
    document.documentElement.lang = LOC[next];
  }, []);

  const t = useCallback(
    (key: MsgKey, vars?: Vars) => translate(lang, key, vars),
    [lang],
  );

  const mx = useCallback((amount: number) => formatMxn(lang, amount), [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, mx, locale: LOC[lang] }),
    [lang, setLang, t, mx],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nCtx {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
