import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RwaSafe | Landslide Early Warning System",
  description: "Real-time satellite-based landslide monitoring and intelligence platform for Rwanda.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-cyan-500/30">
        <Navbar />
        <Sidebar />
        <main className="lg:pl-64 pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
