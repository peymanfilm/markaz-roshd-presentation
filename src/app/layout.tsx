import type { Metadata, Viewport } from "next";
import { Amiri, Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "آیین‌نامه مرکز رشد واحدهای فناور علوم انسانی اسلامی | جامعه‌المصطفی العالمیه",
  description:
    "ارائه HTML آیین‌نامه مرکز رشد واحدهای فناور علوم انسانی اسلامی — معاونت پژوهش، جامعه‌المصطفی العالمیه، مهر ۱۴۰۵",
  icons: {
    /* آیکون محلی است تا در حالت آفلاین هیچ درخواستی به اینترنت زده نشود. */
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#04091a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazir.variable} ${vazir.className} ${amiri.variable} antialiased`}>{children}</body>
    </html>
  );
}
