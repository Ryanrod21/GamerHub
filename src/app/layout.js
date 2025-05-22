'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/sections/NavBar';
import ProfileData from '@/data/ProfileData';
import SideHero from '@/sections/SideHero';
import '../app/games-list/games-list.css';
import { AuthProvider } from '@/context/authContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// app/layout.js (App Router)

import { usePathname } from 'next/navigation';

// Define routes where you want to hide layout components

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideLayoutOn = ['/login', '/register'];

  const hideLayout = hideLayoutOn.includes(pathname);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="page-wrapper">
          <div className="inner-wrapper">
            <AuthProvider>
            {!hideLayout && <SideHero ProfileData={ProfileData} />}
            <div className="nav-content-wrapper">
              {!hideLayout && <Navbar />}
              {!hideLayout && (
                <div className="scrollable-content">{children}</div>
              )}
              {hideLayout && <div>{children} </div>}
            </div>
              </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
