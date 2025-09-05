import React from "react";
import { ArrowRight } from "lucide-react";
export default function HeroB2B({ t }: { t: (k: string) => string }) {
  return (
    <section className="relative overflow-hidden" aria-label="Einführung für Partner">
      <div className="relative h-[56vh] md:h-[64vh] w-full">
        <img src="https://images.unsplash.com/photo-1520975963466-4774b9a1f0a6?q=80&w=1920&auto=format&fit=crop" alt="Historischer Ort in Südtirol" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f766e]/10 to-transparent" aria-hidden="true" />
      </div>
      <div className="mx-auto max-w-7xl px-4 -mt-24 relative z-10">
        <div className="rounded-3xl bg-white/95 p-6 md:p-10 shadow-lg border border-gray-100">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{t("b2b_h1")}</h1>
          <p className="mt-3 text-gray-600 md:text-lg max-w-2xl">{t("b2b_p")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#kontakt" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-[#f59e0b] text-white hover:brightness-95">{t("b2b_cta_demo")} <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#vorteile" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-[#0f766e] text-white hover:brightness-95">{t("b2b_cta_benefits")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}