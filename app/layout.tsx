import { abril_fatface, merriweather } from '@/app/font';
import "@/app/globals.css";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";


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
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
