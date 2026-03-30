import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "Jainam Shah | Cybersecurity & ML",
  description: "CS undergraduate specializing in cybersecurity operations and machine learning. Building secure systems and intelligent solutions.",
  keywords: ["cybersecurity", "machine learning", "software engineer", "portfolio", "Jainam Shah"],
  authors: [{ name: "Jainam Shah" }],
  openGraph: {
    title: "Jainam Shah | Cybersecurity & ML",
    description: "CS undergraduate specializing in cybersecurity operations and machine learning.",
    type: "website",
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
      <body style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
