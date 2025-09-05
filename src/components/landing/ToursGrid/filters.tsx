import React from "react";
import { Filter } from "lucide-react";
import type { TFunction } from "../../i18n/lazy";


interface FilterProps {
  q: string;
  setQ: (v: string) => void;
  loc: string;
  setLoc: (v: string) => void;
  cat: string;
  setCat: (v: string) => void;
  locations: string[];
  categories: string[];
  t: TFunction;
}


export default function ToursFilters({
  q, setQ, loc, setLoc, cat, setCat, locations, categories, t,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 border border-gray-200">
        <Filter className="h-4 w-4" aria-hidden="true" /> {t("tours_filter")}
      </div>

      <label className="sr-only" htmlFor="searchTitle">{t("tours_search_ph")}</label>
      <input
        id="searchTitle"
        type="search"
        placeholder={t("tours_search_ph")}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-48 md:w-64 rounded-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
      />

      <label className="sr-only" htmlFor="selectLoc">{t("tours_loc_label")}</label>
      <select
        id="selectLoc"
        value={loc}
        onChange={(e) => setLoc(e.target.value)}
        className="rounded-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
      >
        {locations.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>

      <label className="sr-only" htmlFor="selectCat">{t("tours_cat_label")}</label>
      <select
        id="selectCat"
        value={cat}
        onChange={(e) => setCat(e.target.value)}
        className="rounded-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
      >
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}