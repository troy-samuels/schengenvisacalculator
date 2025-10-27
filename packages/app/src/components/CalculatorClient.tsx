'use client'

// Client Component Wrapper for Lazy Loading
// This component handles dynamic import of the calculator

import dynamic from 'next/dynamic'
import CalculatorSkeleton from './CalculatorSkeleton'

// Lazy load the calculator page (deferred loading for performance)
const CalculatorPageClient = dynamic(
  () => import('../app/CalculatorPage'),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false // Calculator has client-only features (Supabase, local state)
  }
)

export default function CalculatorClient() {
  return <CalculatorPageClient />
}
