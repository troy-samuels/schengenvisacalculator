import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Schengen Visa Calculator - 90/180 Day Rule Tracker',
  description: 'Calculate your Schengen visa compliance with our rolling 180-day period tracker. Plan your European travel and avoid overstaying with accurate 90/180 rule calculations.',
  keywords: 'Schengen visa, 90/180 rule, Europe travel, visa calculator, travel planning',
  openGraph: {
    title: 'Schengen Visa Calculator - 90/180 Day Rule Tracker',
    description: 'Calculate your Schengen visa compliance with our rolling 180-day period tracker. Plan your European travel and avoid overstaying.',
    url: 'https://www.schengenvisacalculator.com',
    siteName: 'Schengen Visa Calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schengen Visa Calculator - 90/180 Day Rule Tracker',
    description: 'Calculate your Schengen visa compliance with our rolling 180-day period tracker. Plan your European travel and avoid overstaying.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
