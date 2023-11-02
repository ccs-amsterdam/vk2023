import { absoluteUrl } from "@/lib/utils";
import "./globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Roboto } from "next/font/google";
import CssWindowVariables from "@/components/CssWindowVariables";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VU Verkiezingsonderzoek 2023",
    template: "%s | VU Verkiezingsonderzoek 2023",
  },
  description:
    "Resultaten en achtergrondinformatie van het VU Verkiezingsonderzoek 2023",

  openGraph: {
    title: "VU Verkiezingsonderzoek 2023",
    description:
      "Resultaten en achtergrondinformatie van het VU Verkiezingsonderzoek 2023",
    url: absoluteUrl("/"),
    locale: "nl_NL",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon/favicon-32x32.png" }],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="relative flex flex-col min-h-screen scroll-smooth">
        <CssWindowVariables />
        <Navbar />

        <div className="w-full py-6 md:py-12">{children}</div>
      </body>
    </html>
  );
}
