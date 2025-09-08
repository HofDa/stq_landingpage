import React, { useMemo } from "react";
import type { TFunction } from "../i18n/lazy";

type Props = {
  t: TFunction;
  // Optional helpers if you pass them from the parent (as in our latest Landing):
  tv?: (k: string) => any;      // returns any value (string | string[] | object)
  ta?: (k: string) => string[]; // returns string[] or []
};

// Turn a locale key into string[] robustly.
// Priority: ta(key) -> tv(key) if array -> split string (newline / • / | / ;)
function toList(key: string, t: TFunction, tv?: Props["tv"], ta?: Props["ta"]): string[] {
  if (ta) {
    const arr = ta(key);
    if (Array.isArray(arr)) return arr.filter(Boolean);
  }
  if (tv) {
    const v = tv(key);
    if (Array.isArray(v)) return v.filter(Boolean);
  }
  const raw = t(key);
  if (!raw || raw === key) return [];
  return raw
    .split(/\r?\n|[•|;]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

// Safe text: returns "" if the key is missing (i.e., t returns the key)
function toText(key: string, t: TFunction): string {
  const v = t(key);
  return v === key ? "" : v;
}

export default function ValueVsBuild({ t, tv, ta }: Props) {
  const leftItems = useMemo(() => toList("vvb_left_list", t, tv, ta), [t, tv, ta]);
  const rightItems = useMemo(() => toList("vvb_right_list", t, tv, ta), [t, tv, ta]);

  const title = toText("vvb_h3", t);
  const leftHeading =
    toText("vvb_left_h4", t) || "SouthTyrolQuests";
  const rightHeading =
    toText("vvb_right_h4", t) || "Eigenentwicklung";
  const leftDesc = toText("vvb_left_desc", t);   // optional desc key
  const rightDesc = toText("vvb_right_desc", t); // optional desc key

  // nothing meaningful? bail out gracefully
  if (!title && !leftItems.length && !rightItems.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16" aria-label="Vergleich">
      <div className="rounded-2xl bg-gray-50 p-8 shadow-inner">
        {title && (
          <h3 className="text-xl font-bold text-center text-[#1f2937]">
            {title}
          </h3>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* SouthTyrolQuests column */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="font-semibold text-[#0f766e]">{leftHeading}</h4>
            {leftDesc && <p className="mt-2 text-sm text-gray-600">{leftDesc}</p>}
            {leftItems.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600 space-y-1">
                {leftItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Build-it-yourself column */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="font-semibold text-red-600">{rightHeading}</h4>
            {rightDesc && <p className="mt-2 text-sm text-gray-600">{rightDesc}</p>}
            {rightItems.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600 space-y-1">
                {rightItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
