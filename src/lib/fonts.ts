import {
  Inter,
  Poppins,
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Playfair_Display,
  Merriweather,
  Raleway,
  Nunito,
  Work_Sans,
  DM_Sans,
  Plus_Jakarta_Sans,
  Source_Sans_3,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

// Clase que combina todas las variables de fuentes
export const allFontsClassName = [
  inter.variable,
  poppins.variable,
  roboto.variable,
  openSans.variable,
  lato.variable,
  montserrat.variable,
  playfairDisplay.variable,
  merriweather.variable,
  raleway.variable,
  nunito.variable,
  workSans.variable,
  dmSans.variable,
  plusJakartaSans.variable,
  sourceSans3.variable,
].join(" ");

// Mapa de nombres de fuente a variables CSS
export const fontVariableMap: Record<string, string> = {
  "Inter": "var(--font-inter)",
  "Poppins": "var(--font-poppins)",
  "Roboto": "var(--font-roboto)",
  "Open Sans": "var(--font-open-sans)",
  "Lato": "var(--font-lato)",
  "Montserrat": "var(--font-montserrat)",
  "Playfair Display": "var(--font-playfair-display)",
  "Merriweather": "var(--font-merriweather)",
  "Raleway": "var(--font-raleway)",
  "Nunito": "var(--font-nunito)",
  "Work Sans": "var(--font-work-sans)",
  "DM Sans": "var(--font-dm-sans)",
  "Plus Jakarta Sans": "var(--font-plus-jakarta-sans)",
  "Source Sans 3": "var(--font-source-sans-3)",
};
