import React from "react";
import { CheckCircle2, HomeIcon, BuildingIcon, GlobeIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { TFunction } from "../i18n/lazy";

export default function PricingB2B({ t }: { t: TFunction }) {
  const plans = [
    {
      name: t("pricing_package_basic_name"),
      setup: t("pricing_package_basic_setup"),
      yearly: t("pricing_package_basic_yearly"),
      features: [...t("pricing_package_basic_features")],
      color: "border-[#0f766e]",
      icon: <HomeIcon className="h-6 w-6 text-[#0f766e]" aria-hidden="true" />,
    },
    {
      name: t("pricing_package_custom_name"),
      setup: t("pricing_package_custom_setup"),
      yearly: t("pricing_package_custom_yearly"),
      features: [...t("pricing_package_basic_features")],
      color: "border-[#f59e0b]",
      icon: <BuildingIcon className="h-6 w-6 text-[#f59e0b]" aria-hidden="true" />,
    },
    {
      name: t("pricing_package_exclusive_name"),
      setup: t("pricing_package_exclusive_setup"),
      yearly: t("pricing_package_exclusive_yearly"),
      features: [...t("pricing_package_basic_features")],
      color: "border-[#1f2937]",
      icon: <GlobeIcon className="h-6 w-6 text-[#1f2937]" aria-hidden="true" />,
    },
  ];

  const addons = [
    { label: t("pricing_addon_extra_lang"), price: "500–1.000 €" },
    { label: t("pricing_addon_extra_station"), price: "500–1.000 €" },
    { label: t("pricing_addon_rewards"), price: "ab 800 €" },
    { label: t("pricing_addon_analytics"), price: "500 €/Jahr" },
  ];

  return (
    <section id="pakete" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
        {t("pricing_h2")}
      </h2>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {plans.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className={`flex flex-col justify-between rounded-2xl border-2 bg-white p-6 shadow-md transition hover:shadow-lg ${p.color}`}
          >
            <div>
              <div className="flex items-center gap-3">
                {p.icon}
                <h3 className="text-xl font-semibold">{p.name}</h3>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 text-[#0f766e]"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t pt-4 text-center">
              <div className="text-lg font-bold text-[#1f2937]">
                {p.setup}
              </div>
              <div className="mt-1 text-xs text-gray-500">{p.yearly}</div>
              <a
                href="#kontakt"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-[#0f766e] text-white hover:brightness-95"
              >
                {t("ask_offer")}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-sm text-gray-600">
        <span className="font-semibold">{t("pricing_addons_title")}:</span>
        <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-4">
          {addons.map((a, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2"
            >
              <span>{a.label}</span>
              <span className="font-medium text-[#1f2937]">{a.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
