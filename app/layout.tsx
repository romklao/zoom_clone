import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YOOM',
  description: 'Video calling app',
  icons: {
    icon: '/icons/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: '/icons/yoom-logo.svg',
            socialButtonsVariant: 'iconButton',
          },
          variables: {
            colorText: '#fff',
            colorPrimary: '#0E78F9',
            colorBackground: '#1c1f2e',
            colorInputBackground: '#252a41',
            colorInputText: '#fff',
          },
        }}
      >
        <body
          className={`${inter.className} bg-[#161925] text-[#fff] antialiased`}
          suppressHydrationWarning
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  )
}
