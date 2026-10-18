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
  title: "Jainam Shah",
  description: "Computer Science - Toronto Metropolitan University",
  keywords: ["software engineer", "portfolio", "Jainam Shah"],
  authors: [{ name: "Jainam Shah" }],
  metadataBase: new URL("https://j9shah.vercel.app"),
  openGraph: {
    title: "Jainam Shah",
    description: "Computer Science - Toronto Metropolitan University",
    type: "website",
    siteName: "Jainam Shah's Portfolio",
    url: "https://j9shah.vercel.app",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jainam Shah - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jainam Shah",
    description: "Computer Science - Toronto Metropolitan University",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
