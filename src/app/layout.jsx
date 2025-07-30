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
  description:
    "CuratED empowers learners with expertly curated educational content, interactive lessons, and personalized learning paths to fuel growth and innovation.",
  keywords:
    "education, e-learning, digital learning, curated content, online courses, interactive lessons, personalized learning, productivity, technology, lifelong learning, CuratED",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      {
        url: "/favicon/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },

      { url: "/favicon/favicon.ico" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
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
