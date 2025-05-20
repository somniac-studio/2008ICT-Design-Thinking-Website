import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Quicksand } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// layout.tsx handles setting up our metadata, fonts and the fundamentals, Hydration warnings are a debugging tool which for dev purposes will stay on.

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BCC Climate Change Intiative',
  description: 'Learn about climate change, its effects on the people of Queensland and what you can do to help!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
