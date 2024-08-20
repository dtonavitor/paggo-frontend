import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { authConfig } from "@/auth.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paggo OCR",
  description: "Extraindo dados de boletos com OCR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider options={authConfig}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
