'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { ArrowLeft, ArrowRight, X, Check, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Swipe to dismiss component
export interface SwipeToDismissProps {
  children: React.ReactNode
  onDismiss: () => void
  threshold?: number
  className?: string
  dismissDirection?: 'left' | 'right' | 'both'
}

export function SwipeToDismiss({
  children,
  onDismiss,
  threshold = 150,
  className = '',
  dismissDirection = 'both'
}: SwipeToDismissProps) {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-threshold, 0, threshold], [0.3, 1, 0.3])
  const scale = useTransform(x, [-threshold, 0, threshold], [0.9, 1, 0.9])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldDismiss = 
      (dismissDirection === 'both' && Math.abs(info.offset.x) > threshold) ||
      (dismissDirection === 'left' && info.offset.x < -threshold) ||
      (dismissDirection === 'right' && info.offset.x > threshold)

    if (shouldDismiss) {
      onDismiss()
    } else {
      x.set(0)
    }
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -threshold * 1.5, right: threshold * 1.5 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ x, opacity, scale }}
      className={cn('cursor-grab active:cursor-grabbing', className)}
    >
      {children}
    </motion.div>
  )
}

// Swipe actions component (like iOS mail)
export interface SwipeActionsProps {
  children: React.ReactNode
  leftActions?: SwipeAction[]
  rightActions?: SwipeAction[]
  className?: string
}

interface SwipeAction {
  icon: React.ComponentType<{ className?: string }>
  label: string
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
  const [isRevealed, setIsRevealed] = useState<'left' | 'right' | null>(null)
  const threshold = 80

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset } = info
    
    if (offset.x > threshold && leftActions.length > 0) {
      setIsRevealed('left')
      x.set(threshold * leftActions.length)
    } else if (offset.x < -threshold && rightActions.length > 0) {
      setIsRevealed('right')  
      x.set(-threshold * rightActions.length)
    } else {
      setIsRevealed(null)
      x.set(0)
    }
  }

  const executeAction = (action: SwipeAction) => {
    action.action()
    setIsRevealed(null)
    x.set(0)
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Left Actions */}
      {leftActions.length > 0 && (
        <div className="absolute left-0 top-0 bottom-0 flex">
          {leftActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                onClick={() => executeAction(action)}
                className={cn(
                  'flex flex-col items-center justify-center px-4 text-white text-xs font-medium',
                  `w-${threshold}`,
                  action.color
                )}
                style={{ width: threshold }}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{action.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Right Actions */}
      {rightActions.length > 0 && (
        <div className="absolute right-0 top-0 bottom-0 flex">
          {rightActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                onClick={() => executeAction(action)}
                className={cn(
                  'flex flex-col items-center justify-center px-4 text-white text-xs font-medium',
                  action.color
                )}
                style={{ width: threshold }}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{action.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Main Content */}
      <motion.div
        drag="x"
        dragConstraints={{ 
          left: rightActions.length > 0 ? -threshold * rightActions.length : 0,
          right: leftActions.length > 0 ? threshold * leftActions.length : 0
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

// Long press gesture
export interface LongPressProps {
  children: React.ReactNode
  onLongPress: () => void
  delay?: number
  className?: string
}

export function LongPress({ 
  children, 
  onLongPress, 
  delay = 500,
  className = '' 
}: LongPressProps) {
  const [isPressed, setIsPressed] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const scale = useMotionValue(1)

  const startPress = () => {
    setIsPressed(true)
    scale.set(0.95)
    timerRef.current = setTimeout(() => {
      onLongPress()
      setIsPressed(false)
      scale.set(1)
    }, delay)
  }

  const endPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setIsPressed(false)
    scale.set(1)
  }

  return (
    <motion.div
      style={{ scale }}
      className={cn('cursor-pointer select-none', className)}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {isPressed && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 bg-blue-500/20 rounded-lg"
        />
      )}
    </motion.div>
  )
}

// Pinch to zoom gesture
export interface PinchToZoomProps {
  children: React.ReactNode
  minScale?: number
  maxScale?: number
  className?: string
}

export function PinchToZoom({ 
  children, 
  minScale = 0.5, 
  maxScale = 3,
  className = '' 
}: PinchToZoomProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault()
    const delta = event.deltaY * -0.01
    const newScale = Math.min(Math.max(minScale, scale + delta), maxScale)
    setScale(newScale)
  }

  return (
    <div 
      className={cn('overflow-hidden touch-none', className)}
      onWheel={handleWheel}
    >
      <motion.div
        animate={{ scale, x: position.x, y: position.y }}
        transition={{ type: 'tween', duration: 0.1 }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDrag={(event, info) => {
          setPosition({
            x: position.x + info.delta.x,
            y: position.y + info.delta.y
          })
        }}
        className="cursor-move"
      >
        {children}
      </motion.div>
    </div>
  )
}

// Drag to reorder list
export interface DragToReorderProps {
  items: any[]
  onReorder: (newOrder: any[]) => void
  renderItem: (item: any, index: number) => React.ReactNode
  className?: string
}

export function DragToReorder({ 
  items, 
  onReorder, 
  renderItem,
  className = '' 
}: DragToReorderProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, index: number) => {
    if (draggedItem === null) return

    const draggedDistance = info.offset.y
    const itemHeight = 60 // Approximate item height
    const newIndex = Math.round(draggedDistance / itemHeight) + index

    if (newIndex >= 0 && newIndex < items.length && newIndex !== index) {
      const newItems = [...items]
      const [removed] = newItems.splice(index, 1)
      newItems.splice(newIndex, 0, removed)
      onReorder(newItems)
    }

    setDraggedItem(null)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.id || index}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragStart={() => handleDragStart(index)}
          onDragEnd={(e, info) => handleDragEnd(e, info, index)}
          whileDrag={{ 
            scale: 1.05, 
            zIndex: 1000,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
          animate={{
            y: 0,
            scale: draggedItem === index ? 1.05 : 1
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </div>
  )
}

// Swipe navigation (like mobile browsers)
export interface SwipeNavigationProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  className?: string
}

export function SwipeNavigation({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 100,
  className = ''
}: SwipeNavigationProps) {
  const x = useMotionValue(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const leftArrowOpacity = useTransform(x, [0, threshold], [0, 1])
  const rightArrowOpacity = useTransform(x, [-threshold, 0], [1, 0])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    
    if (Math.abs(velocity.x) > 500 || Math.abs(offset.x) > threshold) {
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
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Navigation Indicators */}
      {onSwipeLeft && (
        <motion.div 
          style={{ opacity: leftArrowOpacity }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none"
        >
          <div className="bg-blue-500 text-white p-2 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </div>
        </motion.div>
      )}
      
      {onSwipeRight && (
        <motion.div 
          style={{ opacity: rightArrowOpacity }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none"
        >
          <div className="bg-blue-500 text-white p-2 rounded-full">
            <ArrowRight className="h-5 w-5" />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: onSwipeLeft ? -threshold : 0, right: onSwipeRight ? threshold : 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x }}
        animate={{
          x: direction === 'left' ? -window.innerWidth : direction === 'right' ? window.innerWidth : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Custom hook for gesture detection
export function useGesture() {
  const [gesture, setGesture] = useState<{
    type: 'swipe' | 'pinch' | 'tap' | 'longPress' | null
    direction?: 'up' | 'down' | 'left' | 'right'
    scale?: number
    duration?: number
  }>({ type: null })

  const startTime = useRef(0)
  const startPosition = useRef({ x: 0, y: 0 })

  const handleTouchStart = (e: TouchEvent) => {
    startTime.current = Date.now()
    if (e.touches.length === 1) {
      startPosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const endTime = Date.now()
    const duration = endTime - startTime.current

    if (e.changedTouches.length === 1) {
      const endPosition = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }

      const deltaX = endPosition.x - startPosition.current.x
      const deltaY = endPosition.y - startPosition.current.y
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (duration > 500) {
        setGesture({ type: 'longPress', duration })
      } else if (distance > 50) {
        const angle = Math.atan2(deltaY, deltaX)
        const direction = 
          angle > -Math.PI/4 && angle <= Math.PI/4 ? 'right' :
          angle > Math.PI/4 && angle <= 3*Math.PI/4 ? 'down' :
          angle > 3*Math.PI/4 || angle <= -3*Math.PI/4 ? 'left' : 'up'
        
        setGesture({ type: 'swipe', direction, duration })
      } else {
        setGesture({ type: 'tap', duration })
      }
    }

    // Reset gesture after a short delay
    setTimeout(() => setGesture({ type: null }), 100)
  }

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return gesture
}