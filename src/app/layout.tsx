import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
      <body className={`${inter.className} bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
