import ig1 from "@/assets/ig/ig-1.jpg.asset.json";
import ig2 from "@/assets/ig/ig-2.jpg.asset.json";
import ig3 from "@/assets/ig/ig-3.jpg.asset.json";
import ig4 from "@/assets/ig/ig-4.jpg.asset.json";
import ig5 from "@/assets/ig/ig-5.jpg.asset.json";
import ig6 from "@/assets/ig/ig-6.jpg.asset.json";

export type GalleryItem = {
  url: string;
  alt: string;
};

export const GALLERY: GalleryItem[] = [
  { url: ig1.url, alt: "Rosen-Unterarm-Tattoo in Schwarz-Grau mit römischen Ziffern" },
  { url: ig2.url, alt: "Stairway-to-Heaven-Tattoo mit Kreuz und Wolken auf dem Unterarm" },
  { url: ig3.url, alt: "The World Is Yours Lettering-Tattoo am Unterschenkel" },
  { url: ig4.url, alt: "Chicano-Tattoo mit Statuen und Lettering am Bein" },
  { url: ig5.url, alt: "Mexiko-Sleeve mit Pyramide, Palmen und Totenkopf" },
  { url: ig6.url, alt: "Freiheitsstatue-Tattoo mit One-Way-Schild am Unterarm" },
];
