import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FF7517",
};

export const metadata: Metadata = {
  title: "the BIRYANI CO. | Real Slow Dum Biryani",
  description:
    "Experience the sublime art of slow-cooked Dum Pukht biryani, prepared with 36 secret spices, aged Jeerakasala and long-grain Basmati, and pure desi cow ghee. Order online via Swiggy & Zomato.",
  keywords: [
    "the Biryani Co",
    "Biryani Co",
    "Thalassery Biryani",
    "Hyderabadi Dum Biryani",
    "Swiggy Biryani Co",
    "Zomato Biryani Co",
    "Dum Biryani Bowl",
  ],
  authors: [{ name: "the BIRYANI CO." }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} ${plusJakarta.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
