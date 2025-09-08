"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './button'
import { User, ChevronDown, LogOut, Settings, BarChart3, Menu, X, BookOpen, Calculator, Home } from 'lucide-react'

export interface HeaderProps {
  onLoginClick?: () => void
  onSignupClick?: () => void
  onLogoutClick?: () => void
  onDashboardClick?: () => void
  user?: any
  loading?: boolean
  className?: string
}

export function Header({ 
  onLoginClick, 
  onSignupClick, 
  onLogoutClick,
  onDashboardClick,
  user, 
  loading, 
  className = "" 
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Navigation links
  const navigationLinks = [
    { href: '/', label: 'Calculator', icon: Calculator },
    { href: '/blog', label: 'Travel Guide', icon: BookOpen }
  ]

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={`w-full ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-none">
                  Schengen Calculator
                </span>
              </div>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right side - Auth Buttons & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showMobileMenu ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                  <div className="hidden sm:block h-4 w-20 bg-gray-200 animate-pulse rounded" />
                </div>
              ) : user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium text-gray-900 max-w-32 truncate">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      {onDashboardClick && (
                        <button
                          onClick={() => {
                            onDashboardClick()
                            setShowUserMenu(false)
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <BarChart3 className="h-4 w-4 mr-3" />
                          Dashboard
                        </button>
                      )}
                      
                      <button
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </button>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      {onLogoutClick && (
                        <button
                          onClick={() => {
                            onLogoutClick()
                            setShowUserMenu(false)
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={onLoginClick}
                    className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors px-3 py-2"
                  >
                    Log In
                  </button>
                  
                  <button
                    onClick={onSignupClick}
                    className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    Start Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div 
            ref={mobileMenuRef} 
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-50 ${
                      isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-base font-medium">{link.label}</span>
                  </Link>
                )
              })}
              
              {/* Mobile auth actions */}
              {!user && (
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <button
                    onClick={() => {
                      onLoginClick?.()
                      setShowMobileMenu(false)
                    }}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span className="text-base font-medium">Log In</span>
                  </button>
                  <button
                    onClick={() => {
                      onSignupClick?.()
                      setShowMobileMenu(false)
                    }}
                    className="flex items-center w-full px-4 py-3 bg-green-700 text-white hover:bg-green-800 rounded-lg transition-colors"
                  >
                    <span className="text-base font-medium">Start Now</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header