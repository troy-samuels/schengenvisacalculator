'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Page transition variants
const pageVariants = {
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  },
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 }
  },
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 }
  },
  slideDown: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 }
  },
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
}

// Transition configurations for different routes
const routeTransitions: Record<string, string> = {
  '/': 'fade',
  '/dashboard': 'slideLeft',
  '/trips': 'slideLeft',
  '/notifications': 'slideUp',
  '/profile': 'slideLeft',
  '/settings': 'slideLeft'
}

export interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  transition?: keyof typeof pageVariants
  duration?: number
}

export function PageTransition({ 
  children, 
  className = '',
  transition,
  duration = 0.3 
}: PageTransitionProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Determine transition type
  const transitionType = transition || routeTransitions[pathname] || 'fade'
  const variants = pageVariants[transitionType as keyof typeof pageVariants] || pageVariants.fade

  // Create a unique key for route changes
  const routeKey = `${pathname}${searchParams?.toString()}`

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ 
          duration,
          ease: [0.22, 1, 0.36, 1] // Custom easing curve
        }}
        className={cn('w-full', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Loading transition component
export function LoadingTransition({ 
  isLoading, 
  children, 
  loadingText = "Loading...",
  className = '' 
}: {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  className?: string
}) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'flex flex-col items-center justify-center min-h-64 space-y-4',
            className
          )}
        >
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-muted-foreground">{loadingText}</p>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Staggered list animation
export function StaggeredList({ 
  children, 
  className = '',
  stagger = 0.1 
}: {
  children: React.ReactNode[]
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger
          }
        }
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.4,
                ease: 'easeOut'
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Slide up modal transition
export function ModalTransition({
  isOpen,
  children,
  onClose,
  className = ''
}: {
  isOpen: boolean
  children: React.ReactNode
  onClose?: () => void
  className?: string
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 500 
            }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-white rounded-t-3xl shadow-xl',
              'max-h-[90vh] overflow-hidden',
              className
            )}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Card hover animations
export function AnimatedCard({
  children,
  className = '',
  hover = true,
  tap = true,
  ...props
}: {
  children: React.ReactNode
  className?: string
  hover?: boolean
  tap?: boolean
  [key: string]: any
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      whileTap={tap ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'transition-shadow duration-200',
        hover && 'hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Pull to refresh animation
export function PullToRefresh({
  onRefresh,
  children,
  threshold = 100,
  className = ''
}: {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  threshold?: number
  className?: string
}) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [startY, setStartY] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && startY > 0) {
      const currentY = e.touches[0].clientY
      const distance = Math.max(0, currentY - startY)
      setPullDistance(Math.min(distance, threshold * 1.5))
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }
    setPullDistance(0)
    setStartY(0)
  }

  const pullProgress = Math.min(pullDistance / threshold, 1)
  const rotation = pullProgress * 180

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-0 left-0 right-0 z-10 flex justify-center py-4"
            style={{ transform: `translateY(${pullDistance}px)` }}
          >
            <div className="flex items-center space-x-2 text-blue-600">
              <motion.div
                animate={{ rotate: isRefreshing ? 360 : rotation }}
                transition={{ 
                  duration: isRefreshing ? 1 : 0.1,
                  repeat: isRefreshing ? Infinity : 0,
                  ease: 'linear'
                }}
              >
                <Loader2 className="h-5 w-5" />
              </motion.div>
              <span className="text-sm font-medium">
                {isRefreshing 
                  ? 'Refreshing...' 
                  : pullProgress >= 1 
                    ? 'Release to refresh' 
                    : 'Pull to refresh'
                }
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        animate={{ y: pullDistance }}
        transition={{ type: 'tween', duration: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Route-specific transition hook
export function usePageTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [pathname])
  
  return { isTransitioning }
}