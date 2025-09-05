import React from "react";
import LogoSTQ from "./LogoSTQ";
export default function Footer({ t }: { t: (k: string) => string }) {
  return (
    <footer className="border-t border-gray-200 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3"><LogoSTQ className="h-9 w-9 text-[#0f766e]" /><div className="font-extrabold tracking-tight text-lg">SouthTyrolQuests</div></div>
          <p className="mt-3 text-sm text-gray-600">{t("tagline")}</p>
        </div>
        <div className="text-sm text-gray-600">
          <div className="font-semibold text-[#1f2937]">{t("legal")}</div>
          <ul className="mt-2 space-y-1"><li><a href="#" className="hover:text-[#0f766e]">{t("imprint")}</a></li><li><a href="#" className="hover:text-[#0f766e]">{t("privacy")}</a></li></ul>
        </div>
        <div className="text-sm text-gray-600">
          <div className="font-semibold text-[#1f2937]">{t("nav")}</div>
          <ul className="mt-2 space-y-1"><li><a href="#touren" className="hover:text-[#0f766e]">{t("nav_tours")}</a></li><li><a href="#how" className="hover:text-[#0f766e]">{t("nav_how")}</a></li><li><a href="#vorteile" className="hover:text-[#0f766e]">{t("nav_partners")}</a></li></ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} SouthTyrolQuests</div>
    </footer>
  );
}