import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import CommandMenu from '@/components/CommandMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Internships | Internshala',
  description: 'Apply to the best internships in India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="bottom-right" richColors theme="system" />
          <CommandMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
