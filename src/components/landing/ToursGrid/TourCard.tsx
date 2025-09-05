import React from "react";
import { motion } from "framer-motion";
import { MapPin, Timer, ArrowRight } from "lucide-react";
import type { Lang, Tour } from "../../types/tour";
import type { TFunction } from "../../i18n/lazy";

export default function TourCard({
  tour,
  t,
  lang,
}: {
  tour: Tour;
  t: TFunction;
  lang: Lang;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`h-2 ${tour.color}`} aria-hidden="true" />
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-tight">
          {tour.title[lang] ?? tour.title.de}
        </h3>

        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Dauer</dt>
            <dd>{tour.duration}</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Distanz</dt>
            <dd>{tour.distance}</dd>
          </div>
        </dl>

        <div className="mt-2 text-xs text-gray-500">
          {tour.location} • {tour.category}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {tour.langs.map((l) => (
            <span key={l} className="rounded-full bg-gray-100 px-2 py-1 text-xs">
              {l}
            </span>
          ))}
          <span className="ml-auto rounded-full bg-[#f3f4f6] px-2 py-1 text-xs">
            {tour.tag}
          </span>
        </div>

        <button className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-[#0f766e] text-white hover:brightness-95">
          {t("start")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
}
