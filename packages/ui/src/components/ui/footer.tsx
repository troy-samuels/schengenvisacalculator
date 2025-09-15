"use client"

import React from 'react'
import Link from 'next/link'
import { FooterSocialLinks } from './social-media-links'
import { Mail, MapPin, Shield, FileText, Star } from 'lucide-react'

export interface FooterProps {
  className?: string
  onPremiumClick?: () => void
}

export function Footer({ className = '', onPremiumClick }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={`bg-gray-900 text-gray-300 ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">ETIAS Calculator</h3>
            <p className="text-gray-400 text-sm mb-4">
              Professional ETIAS and Schengen visa calculator trusted by 50,000+ travelers worldwide. 
              Stay compliant with EU regulations.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
              <Mail className="w-4 h-4" />
              <a 
                href="mailto:info@etiascalculator.com" 
                className="hover:text-gray-200 transition-colors"
              >
                info@etiascalculator.com
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>European Union</span>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog/90-180-day-rule-calculator" 
                  className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  90/180 Day Rule Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog/schengen-area-countries-2025" 
                  className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  Schengen Countries
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog/digital-nomad-visa-guide-2025" 
                  className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  Digital Nomad Visas
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tools</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  ETIAS Calculator
                </Link>
              </li>
              <li>
                <Link 
                  href="/save-progress" 
                  className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  Save Progress
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  Travel Dashboard
                </Link>
              </li>
              {onPremiumClick && (
                <li>
                  <button
                    onClick={onPremiumClick}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    <Star className="w-3 h-3" />
                    <span>Premium Features</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-3">Follow us for daily ETIAS updates:</p>
              <FooterSocialLinks />
            </div>
            <ul className="space-y-3">
              {onPremiumClick && (
                <li>
                  <button
                    onClick={onPremiumClick}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    <Star className="w-3 h-3" />
                    <span>Premium</span>
                  </button>
                </li>
              )}
              <li>
                <a 
                  href="/privacy-policy" 
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  <Shield className="w-3 h-3" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a 
                  href="/terms-of-service" 
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors text-sm"
                >
                  <FileText className="w-3 h-3" />
                  <span>Terms of Service</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} ETIAS Calculator. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>🇪🇺 EU Regulation Compliant</span>
              <span>•</span>
              <span>✅ 100% Accurate Calculations</span>
              <span>•</span>
              <span>🔒 Secure & Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ETIAS Calculator",
            "url": "https://etiascalculator.com",
            "logo": "https://etiascalculator.com/logo.png",
            "sameAs": [
              "https://instagram.com/etiascalculator",
              "https://tiktok.com/@etiascalculator"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "info@etiascalculator.com",
              "areaServed": "Worldwide",
              "availableLanguage": "English"
            },
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "European Union"
            }
          })
        }}
      />
    </footer>
  )
}

export default Footer