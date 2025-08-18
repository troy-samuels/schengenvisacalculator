'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Calculator, 
  Calendar, 
  Bell, 
  Settings, 
  User,
  Menu,
  X,
  ArrowLeft,
  Search,
  MoreHorizontal
} from 'lucide-react'
import { OfflineIndicatorCompact } from './offline-indicator'
import { cn } from '@/lib/utils'

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  disabled?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    id: 'calculator',
    label: 'Calculator',
    href: '/dashboard',
    icon: Calculator
  },
  {
    id: 'trips',
    label: 'Trips',
    href: '/trips',
    icon: Calendar
  },
  {
    id: 'notifications',
    label: 'Alerts',
    href: '/notifications',
    icon: Bell,
    badge: 2
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: User
  }
]

export interface AppNavigationProps {
  title?: string
  showBackButton?: boolean
  onBack?: () => void
  actions?: React.ReactNode
  className?: string
}

export function AppNavigation({ 
  title, 
  showBackButton = false, 
  onBack,
  actions,
  className = '' 
}: AppNavigationProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Get current page info
  const currentPage = navigationItems.find(item => pathname === item.href)
  const pageTitle = title || currentPage?.label || 'Schengen Calculator'

  return (
    <>
      {/* Top Navigation Bar */}
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        'bg-white/80 backdrop-blur-md border-b',
        scrolled && 'shadow-sm bg-white/90',
        className
      )}>
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            {showBackButton ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-9 w-9 p-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 p-0 lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}

            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {pageTitle}
              </h1>
              <OfflineIndicatorCompact />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {actions}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hidden sm:flex"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={cn(
            'fixed top-14 left-0 right-0 bg-white border-b shadow-lg z-40 lg:hidden',
            'animate-in slide-in-from-top duration-200'
          )}>
            <nav className="py-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 transition-colors',
                      'hover:bg-gray-50 active:bg-gray-100',
                      isActive && 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    )}
                  >
                    <Icon className={cn(
                      'h-5 w-5',
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    )} />
                    <span className={cn(
                      'font-medium',
                      isActive ? 'text-blue-600' : 'text-gray-900'
                    )}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:w-64 lg:flex lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r pt-14">
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'group flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className={cn(
                    'h-5 w-5 flex-shrink-0',
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  )} />
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <div className="text-xs text-gray-500 space-y-1">
              <div>Schengen Calculator v1.0</div>
              <div>Made with ❤️ for travelers</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// Enhanced Bottom Tab Navigation for Mobile
export function BottomTabNavigation({ className = '' }: { className?: string }) {
  const pathname = usePathname()
  const [previousTab, setPreviousTab] = useState<string | null>(null)

  // Only show on mobile and for main app pages
  const shouldShow = navigationItems.some(item => pathname === item.href)
  if (!shouldShow) return null

  const currentTab = navigationItems.find(item => pathname === item.href)?.id

  useEffect(() => {
    if (currentTab && currentTab !== previousTab) {
      setPreviousTab(currentTab)
    }
  }, [currentTab, previousTab])

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-40 lg:hidden',
      'bg-white/95 backdrop-blur-lg border-t shadow-lg',
      'pb-safe', // Respect safe area on mobile
      className
    )}>
      {/* Active Tab Indicator */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        
        <div className="grid grid-cols-5 h-16 relative">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const wasActive = previousTab === item.id
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center space-y-1 relative',
                  'transition-all duration-200 active:scale-95',
                  'hover:bg-gray-50 active:bg-gray-100'
                )}
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-2 inset-y-1 bg-blue-50 rounded-xl"
                    initial={wasActive ? false : { scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 30 
                    }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center space-y-1">
                  <motion.div
                    className="relative"
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -2 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <Icon className={cn(
                      'h-5 w-5 transition-colors duration-200',
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    )} />
                    
                    {/* Active Dot Indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"
                      />
                    )}

                    {/* Notification Badge */}
                    {item.badge && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Badge 
                          variant="destructive" 
                          className="h-4 w-4 p-0 text-xs flex items-center justify-center min-w-4"
                        >
                          {item.badge > 9 ? '9+' : item.badge}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.span 
                    className={cn(
                      'text-xs font-medium transition-all duration-200',
                      isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
                    )}
                    animate={{
                      opacity: isActive ? 1 : 0.8,
                      fontSize: isActive ? '0.75rem' : '0.7rem'
                    }}
                  >
                    {item.label}
                  </motion.span>
                </div>

                {/* Ripple Effect on Tap */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0"
                  whileTap={{ 
                    opacity: 1,
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                />
              </Link>
            )
          })}
        </div>

        {/* Floating Action Button (if needed) */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Can add a floating action button here if needed */}
        </motion.div>
      </div>
    </nav>
  )
}

// Main App Layout Component
export function AppLayout({ children, ...props }: AppNavigationProps & { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavigation {...props} />
      
      {/* Main Content */}
      <main className={cn(
        'pt-14 pb-20 lg:pb-4 lg:pl-64', // Account for header and bottom nav
        'min-h-screen'
      )}>
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          {children}
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  )
}