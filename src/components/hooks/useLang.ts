import { useEffect, useState } from "react";
import type { Lang } from "../types/tour";

const STORAGE_KEY = "stq.lang" as const;

export function useLang(initial: Lang = "de"): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>(initial);

  useEffect(() => {
    const fromStorage = (localStorage.getItem(STORAGE_KEY) as Lang | null);
    if (fromStorage) setLang(fromStorage);
    else {
      const nav = navigator?.language?.slice(0, 2).toLowerCase();
      if (nav === "de" || nav === "it" || nav === "en") setLang(nav as Lang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  return [lang, setLang];
}