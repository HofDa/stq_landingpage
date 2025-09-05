import React, { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { demoTours } from "../data/tours.demo";
import type { Lang, Mode, Tour } from "../types/tour";
import { useLang } from "../hooks/useLang";
import { loadDict, type Dict, type TFunction } from "../i18n/lazy";

import Header from "./Header";
import HeroB2C from "./HeroB2C";
import HeroB2B from "./HeroB2B";
import HowItWorks from "./HowItWorks";
import AppCTA from "./AppCTA";
import ToursGrid from "./ToursGrid";
import SocialProof from "./SocialProof";
import BenefitsB2B from "./BenefitsB2B";
import KPIsB2B from "./KPIsB2B";
import PricingB2B from "./PricingB2B";
import ValueVsBuild from "./ValueVsBuild";
import ContactB2B from "./ContactB2B";
import Footer from "./Footer";
import TopoBg from "./TopoBg";



export default function SouthTyrolQuestsLanding() {
  const [mode, setMode] = useState<Mode>("b2c");
  const [lang, setLang] = useLang("de");

  // lazy i18n dict
  const [dict, setDict] = useState<Dict | null>(null);
  useEffect(() => {
    let alive = true;
    loadDict(lang).then((d) => alive && setDict(d));
    return () => { alive = false; };
  }, [lang]);
  const t: TFunction = (k) => (dict?.[k as keyof Dict] as string) ?? "";

  // filters
  const [loc, setLoc] = useState("alle");
  const [cat, setCat] = useState("alle");
  const [q, setQ] = useState("");

  const locations = useMemo(
  () => ["alle", ...Array.from(new Set(demoTours.map((t) => t.location)))],
  []
);
const categories = useMemo(() => {
  const raw = ["alle", ...demoTours.map((t) => t.category), ...demoTours.map((t) => t.tag)];
  return Array.from(new Set(raw));
}, []);

const filteredTours: Tour[] = useMemo(() => {
  return demoTours.filter(
    (t) =>
      (loc === "alle" || t.location === loc) &&
      (cat === "alle" || t.category === cat || t.tag === cat) &&
      (q.trim() === "" ||
        (t.title[lang] ?? t.title.de).toLowerCase().includes(q.toLowerCase()))
  );
}, [loc, cat, q, lang]);

  // font inject for preview
  useEffect(() => {
    const id = "stq-inter-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-[#0f766e] px-3 py-2 rounded">{t("skip")}</a>
      <main id="main" className="min-h-screen bg-white text-[#1f2937]" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial' }}>
        <TopoBg />
        <Header mode={mode} setMode={setMode} lang={lang} setLang={setLang} t={t} />
        {mode === "b2c" ? <HeroB2C t={t} /> : <HeroB2B t={t} />}
        {mode === "b2c" ? (
          <>
            <HowItWorks t={t} />
            <AppCTA t={t} />
            <ToursGrid tours={filteredTours} loc={loc} setLoc={setLoc} cat={cat} setCat={setCat} q={q} setQ={setQ} locations={locations} categories={categories} t={t} lang={lang} />
            <SocialProof t={t} />
          </>
        ) : (
          <>
            <BenefitsB2B t={t} />
            <KPIsB2B t={t} />
            <PricingB2B t={t} />
            <ValueVsBuild t={t} />
            <ContactB2B t={t} />
          </>
        )}
        <Footer t={t} />
      </main>
    </MotionConfig>
  );
}