"use client";

import "./ui/global.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
