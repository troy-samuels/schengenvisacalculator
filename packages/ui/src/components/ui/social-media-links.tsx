"use client"

import React from 'react'
import { Instagram } from 'lucide-react'
import { cn } from '../../lib/utils'

// Custom TikTok icon matching Lucide aesthetic
export function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={cn("w-4 h-4", className)} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-label="TikTok"
    >
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

export interface SocialMediaLinksProps {
  variant?: 'header' | 'hero' | 'footer' | 'blog' | 'modal'
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
  className?: string
  instagramHandle?: string
  tiktokHandle?: string
}

export function SocialMediaLinks({
  variant = 'footer',
  size = 'md',
  showLabels = false,
  className = '',
  instagramHandle = 'etiascalculator',
  tiktokHandle = 'etiascalculator'
}: SocialMediaLinksProps) {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  // Touch target classes for mobile (44px minimum per CLAUDE.md)
  const touchTargetClasses = {
    sm: 'min-w-[44px] min-h-[44px] p-3',
    md: 'min-w-[44px] min-h-[44px] p-2.5',
    lg: 'min-w-[44px] min-h-[44px] p-2'
  }

  // Variant-specific styling
  const variantClasses = {
    header: 'text-gray-500 hover:text-gray-700 transition-colors duration-200',
    hero: 'text-gray-600 hover:text-gray-800 transition-colors duration-200',
    footer: 'text-gray-400 hover:text-gray-600 transition-colors duration-200',
    blog: 'text-gray-500 hover:text-gray-700 transition-colors duration-200',
    modal: 'text-gray-400 hover:text-gray-600 transition-colors duration-200'
  }

  // Label classes
  const labelClasses = {
    header: 'text-sm font-medium',
    hero: 'text-sm font-medium',
    footer: 'text-sm',
    blog: 'text-sm font-medium',
    modal: 'text-xs'
  }

  const iconSize = sizeClasses[size]
  const touchTarget = touchTargetClasses[size]
  const baseClasses = variantClasses[variant]
  const labelClass = labelClasses[variant]

  const links = [
    {
      platform: 'Instagram',
      handle: instagramHandle,
      url: `https://instagram.com/${instagramHandle}`,
      icon: Instagram,
      hoverColor: 'hover:text-pink-500'
    },
    {
      platform: 'TikTok', 
      handle: tiktokHandle,
      url: `https://tiktok.com/@${tiktokHandle}`,
      icon: TikTokIcon,
      hoverColor: 'hover:text-black'
    }
  ]

  return (
    <div className={cn('flex items-center', className)}>
      {showLabels && variant !== 'header' && (
        <span className={cn('mr-3 text-gray-600', labelClass)}>
          Follow us:
        </span>
      )}
      
      <div className="flex items-center space-x-2">
        {links.map((link) => {
          const IconComponent = link.icon
          
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                baseClasses,
                link.hoverColor,
                touchTarget
              )}
              aria-label={`Follow ETIAS Calculator on ${link.platform}`}
              title={`Follow us on ${link.platform}`}
            >
              <IconComponent className={iconSize} />
              {showLabels && variant !== 'modal' && (
                <span className={cn('ml-2', labelClass)}>
                  {link.platform}
                </span>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}

// Specific variant components for easy usage
export function HeaderSocialLinks({ className }: { className?: string }) {
  return (
    <SocialMediaLinks 
      variant="header" 
      size="sm" 
      className={className}
    />
  )
}

export function HeroSocialLinks({ className }: { className?: string }) {
  return (
    <SocialMediaLinks 
      variant="hero" 
      size="md" 
      showLabels 
      className={className}
    />
  )
}

export function FooterSocialLinks({ className }: { className?: string }) {
  return (
    <SocialMediaLinks 
      variant="footer" 
      size="sm" 
      className={className}
    />
  )
}

export function BlogSocialLinks({ className }: { className?: string }) {
  return (
    <SocialMediaLinks 
      variant="blog" 
      size="sm" 
      showLabels 
      className={className}
    />
  )
}

export function ModalSocialLinks({ className }: { className?: string }) {
  return (
    <SocialMediaLinks 
      variant="modal" 
      size="sm" 
      className={className}
    />
  )
}