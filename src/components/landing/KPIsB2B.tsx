import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock4, Languages as LanguagesIcon, Settings, Euro, Leaf } from "lucide-react";
export default function KPIsB2B({ t }: { t: (k: string) => string }) {
  const kpis = [
    { icon: BarChart3, title: t("kpi1_t"), text: t("kpi1_d") },
    { icon: Clock4, title: t("kpi2_t"), text: t("kpi2_d") },
    { icon: LanguagesIcon, title: t("kpi3_t"), text: t("kpi3_d") },
    { icon: Settings, title: t("kpi4_t"), text: t("kpi4_d") },
    { icon: Euro, title: t("kpi5_t"), text: t("kpi5_d") },
    { icon: Leaf, title: t("kpi6_t"), text: t("kpi6_d") },
  ];
  return (
    <section id="kpis" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="sr-only">{t("kpis_h2_sr")}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {kpis.map((k, i) => (
          <motion.div key={k.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <k.icon className="h-6 w-6 text-[#0f766e]" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-semibold">{k.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{k.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}