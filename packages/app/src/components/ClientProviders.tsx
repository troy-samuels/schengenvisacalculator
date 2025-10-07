'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { PhaseControlProvider } from '@/providers/PhaseControlProvider'
import PostHogInit from '@/components/analytics/PostHogInit'
import ToasterClient from '@/components/ui/ToasterClient'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <PhaseControlProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <PostHogInit />
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <ToasterClient />
        </div>
      </ThemeProvider>
    </PhaseControlProvider>
  )
}


