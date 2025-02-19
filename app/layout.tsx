import { ReactNode } from 'react';

// import { headers } from 'next/headers';

// import { cookieToInitialState } from 'wagmi';

import { abril_fatface, merriweather } from '@/app/font';
import "@/app/globals.css";
import { Providers } from '@/app/providers';
import '@coinbase/onchainkit/styles.css';

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Based Place",
  description: "Community experiment",
}

export default function RootLayout(props: { children: ReactNode }) {
/*   const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie')
  ); */
  return (
    <html lang="en">
      <body className={`${abril_fatface.variable} ${merriweather.variable} relative`}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}