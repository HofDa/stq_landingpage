// src/features/landing/components/HowItWorks.tsx
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Users } from "lucide-react";
import type { TFunction } from "../i18n/lazy";

export default function HowItWorks({ t }: { t: TFunction }) {
  const steps = [
    {
      title: t("how_step1_title"),
      icon: MapPin,
      description: t("how_step1_desc"),
    },
    {
      title: t("how_step2_title"),
      icon: Sparkles,
      description: t("how_step2_desc"),
    },
    {
      title: t("how_step3_title"),
      icon: Users,
      description: t("how_step3_desc"),
    },
  ];

  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
        {t("how_h2")}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <s.icon className="h-6 w-6 text-[#0f766e]" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}