import type { Metadata } from "next";

import { Providers } from "@/app/provider";
import { abril_fatface, merriweather } from './font';
import "./globals.css";


export const metadata: Metadata = {
  title: "Based Place",
  description: "Community experiment",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abril_fatface.variable} ${merriweather.variable} relative`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
