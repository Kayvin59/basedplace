import { ReactNode } from 'react';

import { abril_fatface, merriweather } from '@/app/font';
import "@/app/globals.css";
import { Providers } from '@/components/providers';

import '@coinbase/onchainkit/styles.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Based Place",
  description: "Community experiment",
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${abril_fatface.variable} ${merriweather.variable} relative`}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}