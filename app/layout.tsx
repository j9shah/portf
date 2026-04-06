import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "Jainam Shah",
  description: "CS undergraduate strudent at Toronto Metropolitan University.",
  keywords: ["cybersecurity", "machine learning", "software engineer", "portfolio", "Jainam Shah"],
  authors: [{ name: "Jainam Shah" }],
  metadataBase: new URL("https://j9shah.vercel.app/"),
  openGraph: {
    title: "Jainam Shah",
    description: "CS undergraduate strudent at Toronto Metropolitan University.",
    type: "website",
    siteName: "Jainam Shah's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jainam Shah",
    description: "CS undergraduate student at Toronto Metropolitan University.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" as="style" href="/globals.css" />
      </head>
      <body suppressHydrationWarning style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
