'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AppNavigation, BottomTabNavigation } from './app-navigation'
import { PageTransition } from './page-transitions'
import { PullToRefresh } from './swipe-refresh'
import { OfflineIndicator } from './offline-indicator'
import { MobileInstallPrompt } from './mobile-install-prompt'
import { LoadingSpinner } from './loading-states'
import { cn } from '@/lib/utils'

export interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  showBackButton?: boolean
  onBack?: () => void
  actions?: React.ReactNode
  className?: string
  transition?: 'fade' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'scale' | 'none'
  enablePullToRefresh?: boolean
  onRefresh?: () => Promise<void>
  showNavigation?: boolean
  showBottomTabs?: boolean
  fullScreen?: boolean
}

export function AppLayout({
  children,
  title,
  showBackButton = false,
  onBack,
  actions,
  className = '',
  transition,
  enablePullToRefresh = false,
  onRefresh,
  showNavigation = true,
  showBottomTabs = true,
  fullScreen = false
}: AppLayoutProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Handle route changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 100)
    return () => clearTimeout(timer)
  }, [pathname])

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    setIsOnline(navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const defaultRefresh = async () => {
    // Default refresh behavior - reload current page data
    window.location.reload()
  }

  const content = (
    <div className={cn(
      'min-h-screen bg-gray-50 transition-colors duration-200',
      !isOnline && 'bg-yellow-50',
      className
    )}>
      {/* Navigation */}
      {showNavigation && (
        <AppNavigation
          title={title}
          showBackButton={showBackButton}
          onBack={onBack}
          actions={actions}
        />
      )}

      {/* Offline Indicator */}
      <OfflineIndicator position="top" />

      {/* Main Content Area */}
      <main className={cn(
        'transition-all duration-200',
        !fullScreen && showNavigation && 'pt-14',
        !fullScreen && showBottomTabs && 'pb-20 lg:pb-4',
        !fullScreen && 'lg:pl-64' // Desktop sidebar spacing
      )}>
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center lg:pl-64"
            >
              <LoadingSpinner text="Loading..." />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content with Transitions */}
        <PageTransition transition={transition} duration={0.3}>
          {enablePullToRefresh && (onRefresh || !isOnline) ? (
            <PullToRefresh
              onRefresh={onRefresh || defaultRefresh}
              threshold={80}
              disabled={!isOnline && !onRefresh}
              className="min-h-screen"
            >
              <div className="container mx-auto px-4 py-6 max-w-7xl">
                {children}
              </div>
            </PullToRefresh>
          ) : (
            <div className="container mx-auto px-4 py-6 max-w-7xl">
              {children}
            </div>
          )}
        </PageTransition>
      </main>

      {/* Bottom Navigation */}
      {showBottomTabs && <BottomTabNavigation />}

      {/* PWA Install Prompt */}
      <MobileInstallPrompt />
    </div>
  )

  return content
}

// Specialized layouts for different page types
export function DashboardLayout({ children, ...props }: Omit<AppLayoutProps, 'transition'>) {
  return (
    <AppLayout
      transition="fade"
      enablePullToRefresh={true}
      {...props}
    >
      {children}
    </AppLayout>
  )
}

export function ModalLayout({ 
  children, 
  isOpen, 
  onClose,
  title,
  className = '' 
}: {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
  className?: string
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
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
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            {title && (
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-center">{title}</h2>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function OnboardingLayout({ 
  children, 
  currentStep, 
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  className = '' 
}: {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  onNext?: () => void
  onPrevious?: () => void
  onSkip?: () => void
  className?: string
}) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <AppLayout 
      fullScreen={true}
      showNavigation={false}
      showBottomTabs={false}
      className={cn('bg-gradient-to-br from-blue-50 to-indigo-100', className)}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-white/30">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col min-h-screen pt-8">
        {/* Skip Button */}
        {onSkip && (
          <div className="flex justify-end px-6 pb-4">
            <button
              onClick={onSkip}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <PageTransition transition="slideLeft">
            {children}
          </PageTransition>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between p-6">
          <motion.button
            onClick={onPrevious}
            disabled={currentStep === 1}
            className={cn(
              'px-6 py-3 rounded-full font-medium transition-all',
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            )}
            whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
          >
            Previous
          </motion.button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  i + 1 === currentStep ? 'bg-blue-600' : 'bg-white/50'
                )}
              />
            ))}
          </div>

          <motion.button
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentStep === totalSteps ? 'Get Started' : 'Next'}
          </motion.button>
        </div>
      </div>
    </AppLayout>
  )
}

// Context for app-wide layout state
import { createContext, useContext } from 'react'

interface AppLayoutContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  showGlobalLoading: (message?: string) => void
  hideGlobalLoading: () => void
}

const AppLayoutContext = createContext<AppLayoutContextType | null>(null)

export function AppLayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string>()

  const showGlobalLoading = (message?: string) => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const hideGlobalLoading = () => {
    setIsLoading(false)
    setLoadingMessage(undefined)
  }

  return (
    <AppLayoutContext.Provider value={{
      isLoading,
      setIsLoading,
      showGlobalLoading,
      hideGlobalLoading
    }}>
      {children}
      
      {/* Global Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center"
          >
            <LoadingSpinner text={loadingMessage} size="lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayoutContext.Provider>
  )
}

export function useAppLayout() {
  const context = useContext(AppLayoutContext)
  if (!context) {
    throw new Error('useAppLayout must be used within AppLayoutProvider')
  }
  return context
}