'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import NavbarComponent from './navbar'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })


const disableNavbar = ['/login', '/register']

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {!disableNavbar.includes(pathname) && <NavbarComponent />}
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
