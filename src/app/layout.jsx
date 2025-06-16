import "@/app/styles/globals.css";
import { Poppins } from "next/font/google";
import { ToastProvider } from "@/components/Toast/ToastProvider";
import "@/api/mock"; // Mock API setup
import NextTopLoader from "@/components/ui/top-loader";

// Define the font only in this file — not in any shared utility or component
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-poppins",
  fallback: ["manrope", "sans-serif"],
  preload: true,
});

export const metadata = {
  title: "CuratED - Curated Education",
  description: "Empowering digital learning experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        <NextTopLoader />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
