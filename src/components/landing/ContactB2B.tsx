import React from "react";
import { Mail, Phone } from "lucide-react";
export default function ContactB2B({ t }: { t: (k: string) => string }) {
  return (
    <section id="kontakt" className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t("contact_h2")}</h2>
        <p className="mt-2 text-gray-600">{t("contact_p")}</p>
        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); alert('Danke! Wir melden uns.'); }}>
          <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="col-span-2 md:col-span-1"><label className="text-sm font-medium" htmlFor="org">{t("contact_org")}</label><input id="org" name="org" required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f766e]" placeholder="Tourismusverein Musterstadt" /></div>
          <div className="col-span-2 md:col-span-1"><label className="text-sm font-medium" htmlFor="email">{t("contact_email")}</label><input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f766e]" placeholder="name@domain.tld" /></div>
          <div className="col-span-2"><label className="text-sm font-medium" htmlFor="details">{t("contact_details")}</label><textarea id="details" name="details" rows={4} required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f766e]" placeholder={t("contact_placeholder_details")} /></div>
          <div className="col-span-2 flex flex-wrap gap-3"><button type="submit" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-[#f59e0b] text-white hover:brightness-95"><Mail className="h-4 w-4" aria-hidden="true" /> {t("contact_send")}</button><a href="tel:+39123456789" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-[#1f2937] text-white hover:brightness-110"><Phone className="h-4 w-4" aria-hidden="true" /> {t("contact_call")}</a></div>
        </form>
      </div>
    </section>
  );
}