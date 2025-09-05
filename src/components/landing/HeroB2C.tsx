import React from "react";
import { Sparkles, MapPin, Play } from "lucide-react";
export default function HeroB2C({ t }: { t: (k: string) => string }) {
  return (
    <section className="relative overflow-hidden" aria-label="Einführung für Spieler:innen">
      <div className="relative h-[64vh] md:h-[72vh] w-full">
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop" alt="Südtiroler Landschaft als Abenteuerkulisse" className="absolute inset-0 h-full w-full object-cover" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center">
          <button className="group inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow hover:bg-white" aria-label="Teaser-Video öffnen">
            <Play className="h-4 w-4" aria-hidden="true" /> Placeholder Video
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 -mt-28 relative z-10">
        <div className="rounded-3xl bg-white/95 p-6 md:p-10 shadow-lg border border-gray-100">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{t("hero_b2c_h1")}</h1>
          <p className="mt-3 text-gray-600 md:text-lg max-w-2xl">{t("hero_b2c_p")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#touren" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-[#0f766e] text-white hover:brightness-95"><Sparkles className="h-4 w-4" aria-hidden="true" /> {t("hero_b2c_play")}</a>
            <a href="#touren" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-[#f59e0b] text-white hover:brightness-95"><MapPin className="h-4 w-4" aria-hidden="true" /> {t("hero_b2c_browse")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}