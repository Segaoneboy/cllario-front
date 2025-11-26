import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FetchProvider from "@/providers/FetchProvider";
import YandexMetrika from "@/components/YandexMetrika";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cllario",
  description: "The next generation of self-development apps",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
      <YandexMetrika />
      <Header/>
        <FetchProvider>
            {children}
        </FetchProvider>
      </body>
    </html>
  );
}
