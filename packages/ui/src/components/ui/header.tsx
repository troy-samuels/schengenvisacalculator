"use client"

import React from 'react'
import { Button } from './button'
import { User } from 'lucide-react'

export interface HeaderProps {
  onLoginClick?: () => void
  onSignupClick?: () => void
  user?: any
  loading?: boolean
  className?: string
}

export function Header({ onLoginClick, onSignupClick, user, loading, className = "" }: HeaderProps) {
  return (
    <header className={`w-full ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Empty left side */}
          <div></div>

          {/* Right side - Logo and Auth Buttons */}
          <div className="flex items-center space-x-6">
            {/* Logo Section - moved to right */}
            <div className="flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-none">
                  Schengen Calculator
                </span>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                  <div className="hidden sm:block h-4 w-20 bg-gray-200 animate-pulse rounded" />
                </div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium text-foreground">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
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
      </div>
    </header>
  )
}

export default Header