'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { RefreshCw, ArrowDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  threshold?: number
  maxPull?: number
  className?: string
  disabled?: boolean
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  maxPull = 120,
  className = '',
  disabled = false
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshComplete, setRefreshComplete] = useState(false)
  const y = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Transform values for smooth animations
  const pullProgress = useTransform(y, [0, threshold], [0, 1])
  const rotation = useTransform(y, [0, threshold], [0, 180])
  const iconOpacity = useTransform(y, [20, 60], [0, 1])
  const textOpacity = useTransform(y, [40, 80], [0, 1])

  const handlePanStart = useCallback(() => {
    if (disabled || isRefreshing) return
    
    // Only allow pull-to-refresh when at the top of the page
    const isAtTop = containerRef.current?.scrollTop === 0 && window.scrollY === 0
    return isAtTop
  }, [disabled, isRefreshing])

  const handlePanEnd = useCallback(async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disabled || isRefreshing) return

    const shouldRefresh = info.offset.y >= threshold
    
    if (shouldRefresh) {
      setIsRefreshing(true)
      y.set(threshold)
      
      try {
        await onRefresh()
        setRefreshComplete(true)
        
        // Show completion state briefly
        setTimeout(() => {
          setRefreshComplete(false)
          setIsRefreshing(false)
          y.set(0)
        }, 800)
      } catch (error) {
        console.error('Refresh failed:', error)
        setIsRefreshing(false)
        y.set(0)
      }
    } else {
      y.set(0)
    }
  }, [disabled, isRefreshing, onRefresh, threshold, y])

  const getRefreshIcon = () => {
    if (refreshComplete) return Check
    if (isRefreshing) return RefreshCw
    return ArrowDown
  }

  const getRefreshText = () => {
    if (refreshComplete) return 'Updated!'
    if (isRefreshing) return 'Refreshing...'
    return pullProgress.get() >= 1 ? 'Release to refresh' : 'Pull to refresh'
  }

  const RefreshIcon = getRefreshIcon()

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Pull-to-refresh indicator */}
      <motion.div
        style={{ y }}
        className="relative"
      >
        <motion.div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-transparent"
          style={{ 
            height: useTransform(y, [0, maxPull], [0, maxPull]),
            opacity: useTransform(y, [0, 20], [0, 1])
          }}
        >
          <div className="flex flex-col items-center space-y-2 pb-4">
            <motion.div
              style={{ 
                rotate: isRefreshing ? 0 : rotation,
                opacity: iconOpacity,
                scale: useTransform(y, [0, threshold], [0.8, 1])
              }}
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full transition-colors',
                refreshComplete 
                  ? 'bg-green-500 text-white' 
                  : pullProgress.get() >= 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
              )}
            >
              <RefreshIcon className="h-4 w-4" />
            </motion.div>
            
            <motion.p 
              style={{ opacity: textOpacity }}
              className={cn(
                'text-xs font-medium transition-colors',
                refreshComplete 
                  ? 'text-green-600'
                  : pullProgress.get() >= 1
                    ? 'text-blue-600'
                    : 'text-gray-500'
              )}
            >
              {getRefreshText()}
            </motion.p>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.3, bottom: 0 }}
          onDragStart={handlePanStart}
          onDragEnd={handlePanEnd}
          style={{ y }}
          className="bg-white"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

// Horizontal swipe navigation
export interface SwipeNavigationProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  leftLabel?: string
  rightLabel?: string
  threshold?: number
  className?: string
}

export function SwipeNavigation({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftLabel = 'Previous',
  rightLabel = 'Next',
  threshold = 100,
  className = ''
}: SwipeNavigationProps) {
  const x = useMotionValue(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const leftProgress = useTransform(x, [0, threshold], [0, 1])
  const rightProgress = useTransform(x, [-threshold, 0], [1, 0])

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const shouldTrigger = Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 800
    
    if (shouldTrigger) {
      if (offset.x > 0 && onSwipeRight) {
        setDirection('right')
        onSwipeRight()
      } else if (offset.x < 0 && onSwipeLeft) {
        setDirection('left')
        onSwipeLeft()
      }
    }
    
    x.set(0)
    setTimeout(() => setDirection(null), 300)
  }, [onSwipeLeft, onSwipeRight, threshold, x])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Left swipe indicator */}
      {onSwipeRight && (
        <motion.div
          style={{ opacity: leftProgress, scale: leftProgress }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <div className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg">
            <ArrowDown className="h-4 w-4 rotate-90" />
            <span className="text-sm font-medium">{rightLabel}</span>
          </div>
        </motion.div>
      )}

      {/* Right swipe indicator */}
      {onSwipeLeft && (
        <motion.div
          style={{ opacity: rightProgress, scale: rightProgress }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <div className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg">
            <span className="text-sm font-medium">{leftLabel}</span>
            <ArrowDown className="h-4 w-4 -rotate-90" />
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -threshold, right: threshold }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x }}
        animate={{
          x: direction === 'left' ? -window.innerWidth : 
             direction === 'right' ? window.innerWidth : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Swipe-to-delete component
export interface SwipeToDeleteProps {
  children: React.ReactNode
  onDelete: () => void
  deleteLabel?: string
  threshold?: number
  className?: string
}

export function SwipeToDelete({
  children,
  onDelete,
  deleteLabel = 'Delete',
  threshold = 120,
  className = ''
}: SwipeToDeleteProps) {
  const x = useMotionValue(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteProgress = useTransform(x, [-threshold, 0], [1, 0])
  const backgroundColor = useTransform(
    deleteProgress,
    [0, 0.5, 1],
    ['rgb(255, 255, 255)', 'rgb(254, 226, 226)', 'rgb(239, 68, 68)']
  )

  const handleDragEnd = useCallback(async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -threshold) {
      setIsDeleting(true)
      x.set(-window.innerWidth)
      
      setTimeout(async () => {
        await onDelete()
      }, 300)
    } else {
      x.set(0)
    }
  }, [onDelete, threshold, x])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Delete background */}
      <motion.div
        style={{ 
          backgroundColor,
          opacity: deleteProgress
        }}
        className="absolute inset-0 flex items-center justify-end pr-6"
      >
        <div className="flex items-center space-x-2 text-white">
          <motion.div
            style={{ scale: deleteProgress }}
            className="p-2 rounded-full bg-red-600"
          >
            <RefreshCw className="h-4 w-4" />
          </motion.div>
          <motion.span
            style={{ opacity: deleteProgress }}
            className="text-sm font-medium"
          >
            {deleteLabel}
          </motion.span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -threshold * 1.2, right: 0 }}
        dragElastic={{ left: 0.1, right: 0.3 }}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="bg-white relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}

// Generic swipe actions container
export interface SwipeActionsProps {
  children: React.ReactNode
  leftActions?: SwipeAction[]
  rightActions?: SwipeAction[]
  className?: string
}

interface SwipeAction {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  color: string
  action: () => void
}

export function SwipeActions({
  children,
  leftActions = [],
  rightActions = [],
  className = ''
}: SwipeActionsProps) {
  const x = useMotionValue(0)
  const actionWidth = 80

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset } = info
    const leftThreshold = actionWidth * leftActions.length
    const rightThreshold = actionWidth * rightActions.length

    if (offset.x >= leftThreshold && leftActions.length > 0) {
      x.set(leftThreshold)
    } else if (offset.x <= -rightThreshold && rightActions.length > 0) {
      x.set(-rightThreshold)
    } else {
      x.set(0)
    }
  }, [leftActions.length, rightActions.length, x])

  const executeAction = useCallback((action: SwipeAction) => {
    action.action()
    x.set(0)
  }, [x])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Left actions */}
      {leftActions.length > 0 && (
        <div className="absolute left-0 top-0 bottom-0 flex">
          {leftActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => executeAction(action)}
                className={cn(
                  'flex flex-col items-center justify-center text-white text-xs font-medium',
                  action.color
                )}
                style={{ width: actionWidth }}
              >
                {Icon && <Icon className="h-5 w-5 mb-1" />}
                <span>{action.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Right actions */}
      {rightActions.length > 0 && (
        <div className="absolute right-0 top-0 bottom-0 flex">
          {rightActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => executeAction(action)}
                className={cn(
                  'flex flex-col items-center justify-center text-white text-xs font-medium',
                  action.color
                )}
                style={{ width: actionWidth }}
              >
                {Icon && <Icon className="h-5 w-5 mb-1" />}
                <span>{action.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Main content */}
      <motion.div
        drag="x"
        dragConstraints={{
          left: rightActions.length > 0 ? -actionWidth * rightActions.length : 0,
          right: leftActions.length > 0 ? actionWidth * leftActions.length : 0
        }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="bg-white relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}