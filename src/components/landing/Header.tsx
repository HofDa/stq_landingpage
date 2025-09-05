import React from "react";
import { Smartphone, Languages as LanguagesIcon } from "lucide-react";
import type { Lang, Mode } from "../types/tour";
import LogoSTQ from "./LogoSTQ";

export default function Header({ mode, setMode, lang, setLang, t }: { mode: Mode; setMode: (m: Mode) => void; lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }) {
  type NavItem =
  | { label: string; href: string; onClick?: never }
  | { label: string; onClick: () => void; href?: never };
  const navB2C: NavItem[] = [
  { label: t("nav_tours"), href: "#touren" },
  { label: t("nav_how"), href: "#how" },
  { label: t("nav_app"), href: "#app" },
  {
    label: t("nav_partners"),
    onClick: () => {
      setMode("b2b");
      setTimeout(() => document.querySelector("#vorteile")?.scrollIntoView({ behavior: "smooth" }), 0);
    },
  },
];

const navB2B: NavItem[] = [
  { label: t("benefits_h2"), href: "#vorteile" },
  { label: t("pricing_h2"), href: "#pakete" },
  { label: t("contact_h2"), href: "#kontakt" },
];
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoSTQ className="h-9 w-9 text-[#0f766e]" />
          <div className="font-extrabold tracking-tight text-lg">SouthTyrolQuests</div>
        </div>
        <nav className="hidden md:flex items-center gap-6" aria-label="Hauptnavigation">
          {(mode === "b2c" ? navB2C : navB2B).map((n) =>
            "onClick" in n ? (
              <button
                key={n.label}
                onClick={n.onClick}
                className="text-sm hover:text-[#0f766e] transition-colors"
                type="button"
              >
                {n.label}
              </button>
            ) : (
              <a key={n.href} href={n.href} className="text-sm hover:text-[#0f766e] transition-colors">
                {n.label}
              </a>
            )
          )}
        </nav>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="langsel">Language</label>
          <div className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-2 py-1">
            <LanguagesIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />
            <select id="langsel" value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="bg-transparent text-sm focus:outline-none" aria-label="Change language">
              <option value="de">DE</option>
              <option value="it">IT</option>
              <option value="en">EN</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-xs" aria-label="Modus umschalten">
            <span className={"px-2 py-1 rounded-full " + (mode === 'b2c' ? 'bg-[#0f766e] text-white' : 'bg-gray-100')}>B2C</span>
            <button onClick={() => setMode(mode === 'b2c' ? 'b2b' : 'b2c')} className="px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-100" aria-label="Switch mode">↔</button>
            <span className={"px-2 py-1 rounded-full " + (mode === 'b2b' ? 'bg-[#0f766e] text-white' : 'bg-gray-100')}>B2B</span>
          </div>
          <a href="#app" className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-[#f59e0b] text-white hover:brightness-95">
            <Smartphone className="h-4 w-4" aria-hidden="true" /> {t("nav_app")}
          </a>
        </div>
      </div>
    </header>
  );
}