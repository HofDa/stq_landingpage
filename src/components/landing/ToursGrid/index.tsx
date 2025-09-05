import React from "react";
import type { Lang, Tour } from "../../types/tour";
import ToursFilters from "./filters";
import TourCard from "./TourCard";
import type { TFunction } from "../../i18n/lazy";

interface ToursGridProps {
  tours: Tour[];
  loc: string;
  setLoc: (s: string) => void;
  cat: string;
  setCat: (s: string) => void;
  q: string;
  setQ: (s: string) => void;
  locations: string[];
  categories: string[];
  t: TFunction;   // 👈 here
  lang: Lang;
}


export default function ToursGrid({
  tours,
  loc,
  setLoc,
  cat,
  setCat,
  q,
  setQ,
  locations,
  categories,
  t,
  lang,
}: {
  tours: Tour[];
  loc: string;
  setLoc: (s: string) => void;
  cat: string;
  setCat: (s: string) => void;
  q: string;
  setQ: (s: string) => void;
  locations: string[];
  categories: string[];
  t: (k: string) => string;
  lang: Lang;
}) {
  return (
    <section id="touren" className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {t("tours_h2")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{t("tours_p")}</p>
        </div>

        <ToursFilters
          q={q}
          setQ={setQ}
          loc={loc}
          setLoc={setLoc}
          cat={cat}
          setCat={setCat}
          locations={locations}
          categories={categories}
          t={t}
        />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} t={t} lang={lang} />
        ))}
      </div>

      {tours.length === 0 && (
        <div className="mt-8 text-sm text-gray-500">{t("tours_none")}</div>
      )}
    </section>
  );
}
