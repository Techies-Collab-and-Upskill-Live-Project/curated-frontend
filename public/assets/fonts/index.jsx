import { Poppins } from "next/font/google";

export const poppins = Poppins({
    weight:["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    display: "auto",
    subsets: ["latin", "latin-ext"],
    variable: "--font-poppins",
    preload: true,
    fallback: ["manrope", "sans-serif"],
    adjustFontFallback: true,
})