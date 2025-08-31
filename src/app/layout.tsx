import type { Metadata } from 'next';
// 👇 1. Import Montserrat instead of Inter
import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';

// 👇 2. Configure the font with desired weights and subsets
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  // You can update your site's title here!
  title: 'Portfolio',
  description: 'Built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 👇 3. Apply the new font's className to the body */}
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}