import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
export default function SocialProof({ t }: { t: (k: string) => string }) {
  const items = [
    { quote: "Tolles Familienabenteuer – unsere Kids waren voll dabei!", author: "Familie M., Meran", stars: 5 },
    { quote: "Perfekt für den Wandertag: Lernen & Bewegung.", author: "MS Schenna", stars: 5 },
    { quote: "Schöne Mischung aus Natur und Geschichte.", author: "Lena & Tom", stars: 4 },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16" aria-label="Stimmen">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t("social_h2")}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((i, idx) => (
          <motion.figure key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.05 }} viewport={{ once: true }} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-1" aria-label={`${i.stars} von 5 Sternen`}>
              {Array.from({ length: i.stars }).map((_, s) => (<Star key={s} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />))}
            </div>
            <blockquote className="mt-3 text-sm text-gray-700">“{i.quote}”</blockquote>
            <figcaption className="mt-4 text-xs text-gray-500">{i.author}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}