import React from "react";
import type { TFunction } from "../i18n/lazy";

export default function ValueVsBuild({ t }: { t: TFunction }) {
  // Arrays aus den Locales (readonly) in normale Arrays umwandeln
  const leftItems = [...t("vvb_left_list")];
  const rightItems = [...t("vvb_right_list")];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16" aria-label="Vergleich">
      <div className="rounded-2xl bg-gray-50 p-8 shadow-inner">
        <h3 className="text-xl font-bold text-center text-[#1f2937]">
          {t("vvb_h3")}
        </h3>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* STQ */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="font-semibold text-[#0f766e]">SouthTyrolQuests</h4>
            <p className="mt-2 text-sm text-gray-600">{t("vvb_left_p")}</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-600 space-y-1">
              {leftItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Eigenentwicklung */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="font-semibold text-red-600">{t("vvb_right_h4")}</h4>
            <p className="mt-2 text-sm text-gray-600">{t("vvb_right_p")}</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-600 space-y-1">
              {rightItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}