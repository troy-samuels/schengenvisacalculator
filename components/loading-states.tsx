'use client'

import { motion } from 'framer-motion'
import { Loader2, Wifi, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// Page Loading Skeleton
export function PageLoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={cn('animate-pulse space-y-6 p-4', className)}>
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>

      {/* Card Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-gray-200 rounded" />
                <div className="h-5 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </Card>
        ))}
      </div>

      {/* List Skeleton */}
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="h-12 w-12 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Animated Loading Spinner
export function LoadingSpinner({ 
  size = 'default',
  text,
  className = '' 
}: {
  size?: 'sm' | 'default' | 'lg'
  text?: string
  className?: string
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8', 
    lg: 'h-12 w-12'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={cn('text-blue-600', sizeClasses[size])} />
      </motion.div>
      {text && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Progressive Loading Component
export function ProgressiveLoader({
  steps,
  currentStep,
  className = ''
}: {
  steps: string[]
  currentStep: number
  className?: string
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: index <= currentStep ? 1 : 0.5,
              x: 0
            }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'flex items-center space-x-3 p-2 rounded-lg transition-colors',
              index === currentStep && 'bg-blue-50',
              index < currentStep && 'bg-green-50'
            )}
          >
            <div className={cn(
              'w-2 h-2 rounded-full transition-colors',
              index < currentStep ? 'bg-green-500' :
              index === currentStep ? 'bg-blue-500' :
              'bg-gray-300'
            )} />
            <span className={cn(
              'text-sm transition-colors',
              index <= currentStep ? 'text-gray-900' : 'text-gray-500'
            )}>
              {step}
            </span>
            {index < currentStep && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto"
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Data Loading States
export function DataLoadingState({
  type = 'default',
  message,
  onRetry,
  className = ''
}: {
  type?: 'loading' | 'error' | 'empty' | 'offline'
  message?: string
  onRetry?: () => void
  className?: string
}) {
  const states = {
    loading: {
      icon: Loader2,
      title: 'Loading...',
      message: message || 'Please wait while we fetch your data',
      color: 'text-blue-600',
      animate: { rotate: 360 }
    },
    error: {
      icon: AlertCircle,
      title: 'Something went wrong',
      message: message || 'We encountered an error loading your data',
      color: 'text-red-600'
    },
    empty: {
      icon: AlertCircle,
      title: 'No data found',
      message: message || 'There's nothing to show here yet',
      color: 'text-gray-500'
    },
    offline: {
      icon: Wifi,
      title: 'You're offline',
      message: message || 'Check your connection and try again',
      color: 'text-yellow-600'
    }
  }

  const state = states[type]
  const Icon = state.icon

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <motion.div
        animate={state.animate}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="mb-4"
      >
        <Icon className={cn('h-12 w-12', state.color)} />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {state.title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {state.message}
      </p>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  )
}

// Shimmer Loading Effect
export function ShimmerEffect({ 
  width = '100%', 
  height = '1rem',
  className = '' 
}: {
  width?: string
  height?: string
  className?: string
}) {
  return (
    <div 
      className={cn('bg-gray-200 rounded overflow-hidden relative', className)}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{ x: [-100, 400] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Content Loading with Fade-in
export function ContentLoader({
  isLoading,
  children,
  fallback,
  className = ''
}: {
  isLoading: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}) {
  return (
    <motion.div 
      className={className}
      animate={{ opacity: isLoading ? 0.6 : 1 }}
      transition={{ duration: 0.2 }}
    >
      {isLoading ? (fallback || <PageLoadingSkeleton />) : children}
    </motion.div>
  )
}

// Interactive Loading Button
export function LoadingButton({
  isLoading,
  children,
  loadingText = 'Loading...',
  disabled,
  className = '',
  ...props
}: {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  disabled?: boolean
  className?: string
  [key: string]: any
}) {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn('relative', className)}
      {...props}
    >
      <motion.div
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          {loadingText}
        </motion.div>
      )}
    </Button>
  )
}

// Skeleton for specific components
export function TripCardSkeleton() {
  return (
    <Card className="p-4 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="flex space-x-2 mt-3">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
        </div>
        <div className="h-8 w-8 bg-gray-200 rounded" />
      </div>
    </Card>
  )
}

export function CalculationSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="text-center space-y-2">
              <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto" />
              <div className="h-6 bg-gray-200 rounded w-16 mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-1/3" />
        </div>
      </Card>
    </div>
  )
}