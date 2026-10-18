import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { personalInfo } from '@/lib/data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(personalInfo.url),
  title: `${personalInfo.name} — Portfolio`,
  description: personalInfo.introduction,
  authors: [{ name: personalInfo.name }],
  alternates: { canonical: '/' },
  openGraph: {
    title: personalInfo.name,
    description: personalInfo.introduction,
    type: 'website',
    siteName: `${personalInfo.name} — Portfolio`,
    url: personalInfo.url,
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: personalInfo.name,
    description: personalInfo.introduction,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
