import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from "@/components/theme-providers";
import { Toaster } from 'sonner';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brawl TV",
  description: "stream brawl stars or any other game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{ baseTheme: neobrutalism }}>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            forcedTheme="light"
            storageKey="brawltv-theme"
          >
            <Toaster theme="dark" position='bottom-center'/>
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
