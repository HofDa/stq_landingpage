import React from "react";
export default function AppCTA({ t }: { t: (k: string) => string }) {
  return (
    <section id="app" className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-2xl border border-gray-200 p-6 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t("app_h2")}</h2>
        <p className="mt-2 text-gray-600">{t("app_p")}</p>
        <div className="mt-4 flex justify-center gap-3">
          <a className="rounded-full px-5 py-3 bg-[#1f2937] text-white font-semibold" href="#">{t("app_badges")}</a>
        </div>
      </div>
    </section>
  );
}