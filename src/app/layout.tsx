import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Switchive',
  description: 'Switchive App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkModeProvider>
          <Navbar />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
