"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './button'
import { User, ChevronDown, LogOut, Settings, BarChart3, Menu, X, BookOpen, Calculator, Home, Star } from 'lucide-react'
import { HeaderSocialLinks } from './social-media-links'
import { PhaseGate } from '../PhaseGate'
import { UserTier } from '../../../../app/src/lib/phase-control'

export interface HeaderProps {
  onLoginClick?: () => void
  onSignupClick?: () => void
  onLogoutClick?: () => void
  onDashboardClick?: () => void
  onPremiumClick?: () => void
  user?: any
  loading?: boolean
  signupLoading?: boolean
  className?: string
}

export function Header({
  onLoginClick,
  onSignupClick,
  onLogoutClick,
  onDashboardClick,
  onPremiumClick,
  user,
  loading,
  signupLoading = false,
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
    { href: '/blog', label: 'Travel Guide', icon: BookOpen },
    { href: '/pricing', label: 'Pricing', icon: Star }
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
                <span className="text-lg font-bold text-blue-600 leading-none">
                  EU Border
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

            {/* Phase-gated Business (Preview) */}
            <PhaseGate
              feature="enterprise_dashboard"
              userTier={UserTier.FREE}
              fallback={
                <span className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                  <BarChart3 className="h-4 w-4" />
                  <span>Business</span>
                  <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">Preview</span>
                </span>
              }
            >
              <Link
                href="/business"
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/business' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Business</span>
              </Link>
            </PhaseGate>
            
            {/* Premium Button */}
            {onPremiumClick && (
              <button
                onClick={onPremiumClick}
                className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
              >
                <Star className="h-4 w-4" />
                <span>Premium</span>
              </button>
            )}
          </nav>

          {/* Right side - Auth Buttons & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Auth Buttons - Desktop */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* TODO: Social Media Links - Temporarily Hidden */}
              {/* <HeaderSocialLinks className="mr-2" /> */}
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
                    disabled={signupLoading}
                    className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm flex items-center space-x-2"
                  >
                    {signupLoading && (
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{signupLoading ? 'Starting...' : 'Start Now'}</span>
                  </button>
                </>
              )}
            </div>
            
            {/* Mobile-only auth buttons - compact version */}
            <div className="flex sm:hidden items-center space-x-2">
              {!loading && !user && (
                <>
                  <button
                    onClick={onLoginClick}
                    className="text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors px-2 py-1"
                  >
                    Log In
                  </button>
                  <button
                    onClick={onSignupClick}
                    disabled={signupLoading}
                    className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs font-medium px-3 py-1.5 rounded transition-colors flex items-center space-x-1"
                  >
                    {signupLoading && (
                      <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{signupLoading ? '...' : 'Start'}</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button - always on far right */}
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

              {/* Phase-gated Business (Preview) - Mobile */}
              <PhaseGate
                feature="enterprise_dashboard"
                userTier={UserTier.FREE}
                fallback={
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400">
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-base font-medium">Business</span>
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">Preview</span>
                  </div>
                }
              >
                <Link
                  href="/business"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-50 ${
                    pathname === '/business' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-base font-medium">Business</span>
                </Link>
              </PhaseGate>
              
              {/* Mobile Social Links */}
              <div className="pt-4 border-t border-gray-100">
                <div className="px-4 py-2">
                  <HeaderSocialLinks />
                </div>
              </div>
              
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