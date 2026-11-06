import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const editorialSerif = localFont({
  src: [
    {
      path: "./fonts/NewYork.ttf",
      style: "normal",
    },
    {
      path: "./fonts/NewYorkItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-editorial-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F1EEE9",
};

export const metadata: Metadata = {
  title: "Aura Skin & Laser | Medical-Grade Skin & Laser Treatments",
  description:
    "Advanced, science-backed treatments designed to reveal your healthiest, most radiant skin — with genuine care and expert guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${editorialSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F1EEE9] text-[#1C1917] selection:bg-[#FC5E2F]/20 selection:text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}
