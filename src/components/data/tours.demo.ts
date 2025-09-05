import type { Tour } from "@/types/tour";

export const demoTours: Tour[] = [
  { id: "sisi", title: { de: "Sisi & das süße Geheimnis", it: "Sisi e il dolce segreto", en: "Sisi & the Sweet Secret" }, duration: "60–90 Min", distance: "2.5 km", langs: ["DE","IT","EN"], tag: "Kultur", color: "bg-[#6b1e1e]", location: "Meran (Burggrafenamt)", category: "Geschichte" },
  { id: "sparrows", title: { de: "Die Piraten der Lüfte", it: "I pirati del cielo", en: "Pirates of the Skies" }, duration: "60 Min", distance: "1.8 km", langs: ["DE","IT"], tag: "Familie", color: "bg-[#2563eb]", location: "Schenna (Burggrafenamt)", category: "Familie" },
  { id: "trees", title: { de: "Geheime Sprache der Bäume", it: "Il linguaggio segreto degli alberi", en: "Secret Language of Trees" }, duration: "75–90 Min", distance: "3.0 km", langs: ["DE","EN"], tag: "Natur", color: "bg-[#166534]", location: "Bozen & Umgebung", category: "Natur" },
  { id: "matrix", title: { de: "Matrix‑Quest: Folge dem Löffel", it: "Matrix‑Quest: segui il cucchiaio", en: "Matrix Quest: Follow the Spoon" }, duration: "45–60 Min", distance: "2.0 km", langs: ["DE","EN"], tag: "Rätsel", color: "bg-[#22c55e]", location: "Unterland", category: "Geschichte" },
  { id: "kitchen", title: { de: "Kulinarik: Der geheime Kräutermarkt", it: "Cucina: il mercato delle erbe", en: "Culinary: The Secret Herb Market" }, duration: "60 Min", distance: "2.2 km", langs: ["DE","IT"], tag: "Kulinarik", color: "bg-[#d97706]", location: "Bozen & Umgebung", category: "Kulinarik" },
];