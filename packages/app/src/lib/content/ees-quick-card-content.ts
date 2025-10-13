/**
 * EES Quick Card PDF Content
 * Compact 4-page guide for purchasers to print and carry at border
 * Part of £7.99 EES Readiness Guide product
 */

export interface QuickCardSection {
  title: string
  icon: string
  items: string[]
}

export interface CountryTip {
  country: string
  flag: string
  airport: string
  tip?: string
  tips?: string[]
}

export const EES_QUICK_CARD_CONTENT = {
  // Page 1: Essential Border Checklist
  borderChecklist: {
    title: 'EES Border Checklist',
    subtitle: 'Essential items for smooth biometric registration',
    sections: [
      {
        title: 'Documents Required',
        icon: '📄',
        items: [
          'Valid passport (6+ months validity)',
          'Return/onward travel tickets',
          'Accommodation proof (hotel booking, invitation letter)',
          'Travel insurance (€30,000+ medical coverage)',
          'Proof of funds (€100/day recommended)',
        ],
      },
      {
        title: 'Timing',
        icon: '⏰',
        items: [
          'Arrive 3+ hours early (first-time EES users)',
          'Peak season (Jun-Sep): add 30-60 minutes',
          'Subsequent visits: 2+ hours sufficient',
          'Check airline EES updates before departure',
        ],
      },
      {
        title: 'What to Expect',
        icon: '🛂',
        items: [
          'Biometric kiosk or officer station',
          'Fingerprint scanning (all 10 fingers)',
          'Facial photograph capture',
          'Digital signature collection',
          'No more passport stamps',
        ],
      },
    ],
  },

  // Page 2: Biometrics Registration Process
  biometricsProcess: {
    title: 'Biometric Registration Process',
    subtitle: 'Step-by-step first-time enrollment',
    steps: [
      {
        number: 1,
        title: 'Approach EES Station',
        description: 'Look for "EES" or "Third Country Nationals" signs',
        tips: ['Have passport ready', 'Remove gloves', 'Queue in non-EU lane'],
      },
      {
        number: 2,
        title: 'Fingerprint Scan',
        description: 'All 10 fingers scanned individually or 4-finger slaps',
        tips: [
          'Clean, dry hands',
          'Press firmly but gently',
          'Follow officer instructions',
          'May require 2-3 attempts per finger',
        ],
      },
      {
        number: 3,
        title: 'Facial Photograph',
        description: 'High-resolution image captured for biometric verification',
        tips: ['Remove glasses', 'Look directly at camera', 'Neutral expression', 'No headwear (unless religious)'],
      },
      {
        number: 4,
        title: 'Data Verification',
        description: 'Review your information on screen and confirm accuracy',
        tips: ['Check name spelling', 'Verify travel dates', 'Confirm contact details', 'Sign digitally if required'],
      },
      {
        number: 5,
        title: 'Entry Authorization',
        description: 'System processes and grants entry - digital record created',
        tips: [
          'Typically 2-5 minutes total',
          'Biometrics stored for 3 years',
          'Future entries much faster (10-15 seconds)',
          'Automatic 90/180 tracking',
        ],
      },
    ],
  },

  // Page 3: Country-Specific Quick Tips
  countryTips: {
    title: 'Country Quick Tips',
    subtitle: 'Major entry points and procedures',
    countries: [
      {
        country: 'France',
        flag: '🇫🇷',
        airport: 'Paris CDG',
        tips: [
          'Terminal 1 & 2: EES kiosks in arrivals hall',
          'English-speaking staff available',
          'Peak times: 8-10am, 2-4pm daily',
          'Backup: Traditional officer lanes available',
        ],
      },
      {
        country: 'Germany',
        flag: '🇩🇪',
        airport: 'Frankfurt FRA',
        tips: [
          'Terminal 1: EES gates near passport control',
          'Efficient processing (1-3 min average)',
          'Clear signage in multiple languages',
          'Fast-track for pre-registered travelers',
        ],
      },
      {
        country: 'Spain',
        flag: '🇪🇸',
        airport: 'Barcelona BCN / Madrid MAD',
        tips: [
          'T1 Barcelona: Automated gates operational',
          'Madrid: EES stations in all terminals',
          'May experience longer queues in summer',
          'Officer assistance readily available',
        ],
      },
      {
        country: 'Italy',
        flag: '🇮🇹',
        airport: 'Rome FCO',
        tips: [
          'Terminal 3: EES processing for non-EU',
          'Italian/English instructions',
          'Can be slower during cruise season',
          'Keep accommodation proof handy',
        ],
      },
      {
        country: 'Netherlands',
        flag: '🇳🇱',
        airport: 'Amsterdam AMS',
        tips: [
          'Schiphol: Modern EES infrastructure',
          'Self-service kiosks widely available',
          'One of the fastest processing airports',
          'Multilingual support (20+ languages)',
        ],
      },
    ] as CountryTip[],
  },

  // Page 4: Resources & Emergency Contacts
  resources: {
    title: 'Resources & Support',
    subtitle: 'Additional help and information',
    links: [
      {
        title: 'Complete EES Guide',
        url: 'https://euborder.com/ees/complete-guide',
        qrCode: true,
        description: 'Full 20-page preparation guide',
      },
      {
        title: 'Country-Specific Pages',
        url: 'https://euborder.com/ees/countries',
        qrCode: true,
        description: '27 EU country implementation details',
      },
      {
        title: 'Schengen Calculator',
        url: 'https://euborder.com/schengen-calculator',
        qrCode: true,
        description: 'Track your 90/180-day compliance',
      },
    ],
    emergencyContacts: [
      {
        title: 'EU Border Support',
        contact: 'support@euborder.com',
        hours: '24/7 email support',
      },
      {
        title: 'EU Commission Travel',
        contact: 'https://travel-europe.europa.eu',
        hours: 'Official EU travel information',
      },
      {
        title: 'Your Embassy',
        contact: 'Contact your country\'s EU embassy',
        hours: 'Emergency consular assistance',
      },
    ],
    legalDisclaimer:
      'This guide is for informational purposes. EES regulations may change. Always verify current requirements with official EU sources. © 2025 EU Border Authority. All rights reserved.',
  },

  // Metadata
  metadata: {
    title: 'EES Readiness Quick Card',
    version: '1.0',
    updated: 'January 2025',
    launchDate: 'October 12, 2025',
    productId: 'ees_guide',
    price: '£7.99',
  },
}

export type EESQuickCardContent = typeof EES_QUICK_CARD_CONTENT
