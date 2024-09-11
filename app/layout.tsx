import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Schoolie LMS | Dashboard',
  description: 'Schoolie is an LMS (Learning Management System) and an online tutoring platform.',
  // Favicon meta should be added here, but we'll also include it in the <head> for accuracy.
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Link to favicon */}
          <link rel="icon" href="public/cap.svg" type="image/svg+xml" />
        </head>
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
