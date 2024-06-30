import { abril_fatface, merriweather } from '@/app/font';
import "@/app/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";


export const metadata: Metadata = {
  title: "Based Place",
  description: "Community experiment",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abril_fatface.variable} ${merriweather.variable} relative`}>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
