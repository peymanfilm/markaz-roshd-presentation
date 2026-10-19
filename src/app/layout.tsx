import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "آیین‌نامه مرکز رشد واحدهای فناور علوم انسانی اسلامی | جامعه‌المصطفی العالمیه",
  description:
    "ارائه HTML آیین‌نامه مرکز رشد واحدهای فناور علوم انسانی اسلامی — معاونت پژوهش، جامعه‌المصطفی العالمیه، مهر ۱۴۰۵",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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
      <body className={`${vazir.variable} antialiased`}>{children}</body>
    </html>
  );
}
