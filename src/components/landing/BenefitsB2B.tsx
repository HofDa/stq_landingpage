import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Phone } from "lucide-react";
export default function BenefitsB2B({ t }: { t: (k: string) => string }) {
  const benefits = [
    { icon: ShieldCheck, title: t("benefit1_t"), text: t("benefit1_d") },
    { icon: Users, title: t("benefit2_t"), text: t("benefit2_d") },
    { icon: Phone, title: t("benefit3_t"), text: t("benefit3_d") },
  ];
  return (
    <section id="vorteile" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t("benefits_h2")}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {benefits.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <b.icon className="h-6 w-6 text-[#0f766e]" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-semibold">{b.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}