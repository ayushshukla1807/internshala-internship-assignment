import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import CommandMenu from '@/components/CommandMenu';
import ScrollToTop from '@/components/ScrollToTop';
import MobileBottomNav from '@/components/MobileBottomNav';
import { SavedInternshipsDrawer } from '@/components/SavedInternshipsDrawer';
import { ApplicationsHub } from '@/components/ApplicationsHub';

export const metadata: Metadata = {
  title: 'Internship Search | Internshala',
  description: 'Enterprise-grade clone of the Internshala internship search page. Built with Next.js 14, Tailwind CSS, Framer Motion, and Cmd+K Search.',
  openGraph: {
    title: 'Internship Search | Internshala',
    description: 'Enterprise-grade clone of the Internshala internship search page. Features staggered animations, skeleton loaders, and spotlight search.',
    url: 'https://internshala-clone-jnzbr2ztw-ayushs-projects-e98c33db.vercel.app',
    siteName: 'Internshala Clone',
    images: [
      {
        url: 'https://internshala.com/static/images/internships_for_facebook.png',
        width: 1200,
        height: 630,
        alt: 'Internshala Search Clone',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internship Search | Internshala',
    description: 'Enterprise-grade clone of the Internshala internship search page.',
    images: ['https://internshala.com/static/images/internships_for_facebook.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="bottom-right" richColors theme="system" closeButton />
          <CommandMenu />
          <ScrollToTop />
          <MobileBottomNav />
          <SavedInternshipsDrawer />
          <ApplicationsHub />
        </ThemeProvider>
      </body>
    </html>
  );
}
