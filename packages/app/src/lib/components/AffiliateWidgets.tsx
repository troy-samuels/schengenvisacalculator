/**
 * Affiliate Partner Widgets for B2C Revenue Generation
 * Travel insurance, eSIM, and booking widgets for free account users
 * Based on research: Holafly (20%), Globelink (20%), Booking.com (4-25%)
 */

'use client'

import React, { useState } from 'react'
import { UserStatus } from '../types/user-status'
import { Shield, Smartphone, Bed, ExternalLink, Star, ArrowRight } from 'lucide-react'
import { Button } from '@schengen/ui'

interface AffiliateWidgetsProps {
  userStatus: UserStatus
  userCountries?: string[] // Countries from user's trips for contextualization
  className?: string
}

// Affiliate partner data
const AFFILIATE_PARTNERS = {
  travel_insurance: {
    globelink: {
      name: 'Globelink Travel Insurance',
      commission: 20,
      description: 'Comprehensive travel insurance for EU/Schengen trips',
      features: ['Medical coverage up to £10M', 'Brexit-compliant coverage', '24/7 emergency support'],
      rating: 4.8,
      price_from: '£2.50',
      url: 'https://www.globelink.co.uk',
      affiliate_code: 'EUBORDER_REF',
      logo: '🛡️'
    },
    worldnomads: {
      name: 'World Nomads',
      commission: 15,
      description: 'Flexible travel insurance for digital nomads',
      features: ['Cover for adventure activities', 'Extend while traveling', 'Change plans online'],
      rating: 4.6,
      price_from: '£3.20',
      url: 'https://www.worldnomads.com',
      affiliate_code: 'EUBORDER_REF',
      logo: '🌍'
    }
  },
  esim: {
    holafly: {
      name: 'Holafly eSIM',
      commission: 20,
      description: 'eSIM data plans for European travel',
      features: ['Instant activation', '27 European countries', 'Unlimited data options'],
      rating: 4.7,
      price_from: '£4.50',
      url: 'https://esim.holafly.com',
      affiliate_code: 'ETIASCALC20',
      logo: '📱'
    },
    saily: {
      name: 'Saily eSIM',
      commission: 15,
      description: 'Simple eSIM for Europe travel',
      features: ['Easy setup', 'Competitive rates', 'App-based management'],
      rating: 4.5,
      price_from: '£3.99',
      url: 'https://saily.com',
      affiliate_code: 'SAILY_ETIAS',
      logo: '📶'
    }
  },
  accommodation: {
    booking: {
      name: 'Booking.com',
      commission: 25, // TAAP program rate
      description: 'Hotels and apartments across Europe',
      features: ['Free cancellation', 'Pay at property', 'Guest reviews'],
      rating: 4.3,
      price_from: '£45',
      url: 'https://www.booking.com',
      affiliate_code: 'etias-calculator',
      logo: '🏨'
    }
  }
}

interface PartnerWidgetProps {
  partner: any
  category: string
  onClick: () => void
  className?: string
}

function PartnerWidget({ partner, category, onClick, className = '' }: PartnerWidgetProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${className}`}
         onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{partner.logo}</div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{partner.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < Math.floor(partner.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">{partner.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-green-600">from {partner.price_from}</div>
          <ExternalLink className="w-4 h-4 text-gray-400 mt-1" />
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mb-3">{partner.description}</p>
      
      <div className="space-y-1">
        {partner.features.slice(0, 2).map((feature: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-blue-600 font-medium">Special offer</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
        </div>
      </div>
    </div>
  )
}

function TravelInsuranceWidget({ userStatus, userCountries }: AffiliateWidgetsProps) {
  const handlePartnerClick = (partnerKey: string) => {
    const partner = AFFILIATE_PARTNERS.travel_insurance[partnerKey as keyof typeof AFFILIATE_PARTNERS.travel_insurance]
    
    // Track affiliate click
    console.log('Affiliate Click:', {
      partner: partner.name,
      commission: partner.commission,
      userStatus,
      countries: userCountries
    })
    
    // In production, this would redirect with affiliate tracking
    const affiliateUrl = `${partner.url}?ref=${partner.affiliate_code}&utm_source=euborder&utm_medium=widget`
    window.open(affiliateUrl, '_blank')
  }

  if (userStatus !== UserStatus.FREE) {
    return null // Premium users see AI-powered recommendations instead
  }

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-blue-900">Travel Insurance</h3>
        {userCountries && userCountries.length > 0 && (
          <span className="text-xs text-blue-700">
            for {userCountries.join(', ')} travel
          </span>
        )}
      </div>
      
      <p className="text-sm text-blue-800 mb-4">
        Protect your European trip with comprehensive travel insurance. Brexit has made this more important than ever.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(AFFILIATE_PARTNERS.travel_insurance).map(([key, partner]) => (
          <PartnerWidget
            key={key}
            partner={partner}
            category="travel_insurance"
            onClick={() => handlePartnerClick(key)}
          />
        ))}
      </div>
    </div>
  )
}

function ESIMWidget({ userStatus, userCountries }: AffiliateWidgetsProps) {
  const handlePartnerClick = (partnerKey: string) => {
    const partner = AFFILIATE_PARTNERS.esim[partnerKey as keyof typeof AFFILIATE_PARTNERS.esim]
    
    console.log('eSIM Affiliate Click:', {
      partner: partner.name,
      commission: partner.commission,
      userStatus,
      countries: userCountries
    })
    
    const affiliateUrl = `${partner.url}?ref=${partner.affiliate_code}&utm_source=euborder&utm_medium=widget`
    window.open(affiliateUrl, '_blank')
  }

  if (userStatus !== UserStatus.FREE) {
    return null
  }

  return (
    <div className="bg-green-50 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Smartphone className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-green-900">eSIM Data Plans</h3>
      </div>
      
      <p className="text-sm text-green-800 mb-4">
        Stay connected across Europe with instant eSIM activation. No physical SIM card swapping needed.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(AFFILIATE_PARTNERS.esim).map(([key, partner]) => (
          <PartnerWidget
            key={key}
            partner={partner}
            category="esim"
            onClick={() => handlePartnerClick(key)}
          />
        ))}
      </div>
    </div>
  )
}

function AccommodationWidget({ userStatus, userCountries }: AffiliateWidgetsProps) {
  const handlePartnerClick = (partnerKey: string) => {
    const partner = AFFILIATE_PARTNERS.accommodation[partnerKey as keyof typeof AFFILIATE_PARTNERS.accommodation]
    
    console.log('Accommodation Affiliate Click:', {
      partner: partner.name,
      commission: partner.commission,
      userStatus,
      countries: userCountries
    })
    
    const affiliateUrl = `${partner.url}?aid=${partner.affiliate_code}&utm_source=euborder&utm_medium=widget`
    window.open(affiliateUrl, '_blank')
  }

  if (userStatus !== UserStatus.FREE) {
    return null
  }

  return (
    <div className="bg-purple-50 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Bed className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-purple-900">Accommodation</h3>
      </div>
      
      <p className="text-sm text-purple-800 mb-4">
        Find the perfect place to stay during your European travels with exclusive deals.
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(AFFILIATE_PARTNERS.accommodation).map(([key, partner]) => (
          <PartnerWidget
            key={key}
            partner={partner}
            category="accommodation"
            onClick={() => handlePartnerClick(key)}
            className="md:col-span-1"
          />
        ))}
      </div>
    </div>
  )
}

// Main Affiliate Widgets Component
export function AffiliateWidgets({ userStatus, userCountries, className = '' }: AffiliateWidgetsProps) {
  // Only show to free account users (anonymous users see basic ads only)
  if (userStatus !== UserStatus.FREE) {
    return null
  }

  return (
    <div className={`affiliate-widgets ${className}`}>
      {/* Header for free users */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Travel Essentials for Your European Trip
        </h2>
        <p className="text-sm text-gray-600">
          Recommended services for Brexit-compliant European travel
        </p>
        <div className="text-xs text-gray-500 mt-2">
          💡 Premium users get personalized AI recommendations
        </div>
      </div>

      {/* Affiliate Widgets */}
      <TravelInsuranceWidget userStatus={userStatus} userCountries={userCountries} />
      <ESIMWidget userStatus={userStatus} userCountries={userCountries} />
      <AccommodationWidget userStatus={userStatus} userCountries={userCountries} />
      
      {/* Premium upgrade prompt */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="text-center">
          <h3 className="font-semibold text-blue-900 mb-2">Want Personalized Recommendations?</h3>
          <p className="text-sm text-blue-800 mb-3">
            Premium users get AI-powered travel recommendations based on their specific trips and preferences.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm">
            Upgrade to Premium - £9.99/year
          </Button>
        </div>
      </div>
    </div>
  )
}

// Contextual Affiliate Widget (for embedding in specific locations)
export function ContextualAffiliateWidget({ 
  type, 
  userStatus, 
  context 
}: { 
  type: 'insurance' | 'esim' | 'accommodation', 
  userStatus: UserStatus,
  context?: string 
}) {
  if (userStatus !== UserStatus.FREE) {
    return null
  }

  const getWidget = () => {
    switch (type) {
      case 'insurance':
        return <TravelInsuranceWidget userStatus={userStatus} />
      case 'esim':
        return <ESIMWidget userStatus={userStatus} />
      case 'accommodation':
        return <AccommodationWidget userStatus={userStatus} />
      default:
        return null
    }
  }

  return (
    <div className="contextual-affiliate-widget">
      {context && (
        <div className="text-xs text-gray-600 mb-2">
          💡 {context}
        </div>
      )}
      {getWidget()}
    </div>
  )
}