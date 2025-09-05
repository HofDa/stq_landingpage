export type Lang = "de" | "it" | "en";
export type Mode = "b2c" | "b2b";

export type Localized = { de: string; it: string; en: string };

export type Tour = {
  id: string;
  title: Localized;
  duration: string;
  distance: string;
  langs: string[]; // e.g., ["DE","IT","EN"]
  tag: string; // e.g., "Kultur"
  color: string; // tailwind bg class
  location: string; // e.g., "Meran (Burggrafenamt)"
  category: string; // e.g., "Geschichte"
};