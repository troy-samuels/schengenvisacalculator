"use client"

import React from 'react'
import { Button } from './button'
import { MapPin, User, UserPlus } from 'lucide-react'

export interface HeaderProps {
  onLoginClick?: () => void
  onSignupClick?: () => void
  className?: string
}

export function Header({ onLoginClick, onSignupClick, className = "" }: HeaderProps) {
  return (
    <header className={`w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-none">
                Schengen Calculator
              </span>
              <span className="text-xs text-muted-foreground leading-none">
                90/180 Day Rule Checker
              </span>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#calculator" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Calculator
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About 90/180 Rule
            </a>
            <a 
              href="#help" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Help
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoginClick}
              className="hidden sm:inline-flex"
            >
              <User className="h-4 w-4 mr-2" />
              Log In
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={onSignupClick}
              className="schengen-brand-gradient"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>

            {/* Mobile menu button - for future implementation */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header