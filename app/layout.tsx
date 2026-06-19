import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers"
import Header from "@/components/Header";
import YandexMetrika from "@/components/YandexMetrika";
import {Toaster} from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cllario",
  description: "The next generation of self-development apps",
    verification:{
        yandex: "1cdb6b0d41774794",
    },
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
      <YandexMetrika />
          <Toaster/>
          <Header/>
          <Providers>
              {children}
          </Providers>
          <Footer/>
      </body>
    </html>
  );
}
