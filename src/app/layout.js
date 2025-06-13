'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/sections/NavBar';
import SideHero from '@/sections/SideHero';
import '../app/games-list/games-list.css';
import { AuthProvider } from '@/context/authContext';
import ProfileData from '@/data/ProfileData';
import { MessageProvider } from '@/context/messageContext/messageContext';

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
import SideHeroMobile from '@/sections/SideHeroMobile';

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
              <MessageProvider>
                {!hideLayout && <SideHero ProfileData={ProfileData} />}
                <div className="nav-content-wrapper">
                  {!hideLayout && <Navbar />}
                  {!hideLayout && <SideHeroMobile ProfileData={ProfileData} />}
                  {!hideLayout && (
                    <div className="scrollable-content">{children}</div>
                  )}
                  {hideLayout && <div>{children} </div>}
                </div>
              </MessageProvider>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
