import { type Country } from './countries'

export interface TripTemplate {
  id: string
  name: string
  category: 'digital-nomad' | 'business' | 'family' | 'student' | 'backpacker' | 'summer'
  icon: string
  description: string
  totalDays: number
  pattern: string
  optimal: boolean
  trips: TripTemplateTrip[]
  seasonality?: {
    preferredMonths: number[]
    reason: string
  }
  compliance: {
    status: 'compliant' | 'warning' | 'violation'
    message: string
    recommendations?: string[]
  }
  targetAudience: string[]
  pros: string[]
  cons: string[]
}

export interface TripTemplateTrip {
  countryCode: string
  countryName: string
  duration: number
  purpose: string
  spacing?: number // Days between this trip and the next
  notes?: string
}

export const tripTemplates: TripTemplate[] = [
  {
    id: 'digital-nomad-balanced',
    name: 'Digital Nomad Explorer',
    category: 'digital-nomad',
    icon: '💻',
    description: 'Perfect for remote workers wanting to experience diverse European cultures while staying visa compliant',
    totalDays: 84,
    pattern: '3-4 countries, 25-30 days each with optimal spacing',
    optimal: true,
    trips: [
      { countryCode: 'PT', countryName: 'Portugal', duration: 28, purpose: 'Remote work hub', spacing: 7 },
      { countryCode: 'DE', countryName: 'Germany', duration: 26, purpose: 'Tech conferences', spacing: 5 },
      { countryCode: 'NL', countryName: 'Netherlands', duration: 30, purpose: 'Coworking spaces' }
    ],
    seasonality: {
      preferredMonths: [3, 4, 5, 9, 10, 11],
      reason: 'Avoid peak summer crowds and winter weather'
    },
    compliance: {
      status: 'compliant',
      message: 'Optimally uses 84/90 days with proper spacing',
      recommendations: [
        'Leave 6-day buffer for flexibility',
        'Space trips to allow for travel time',
        'Consider co-working visa programs'
      ]
    },
    targetAudience: ['Remote workers', 'Freelancers', 'Digital entrepreneurs'],
    pros: [
      'Maximum time in Schengen area',
      'Diverse cultural experiences',
      'Strong digital nomad communities',
      'Optimal visa compliance'
    ],
    cons: [
      'Requires careful planning',
      'Limited flexibility for extensions',
      'Higher accommodation costs in major cities'
    ]
  },

  {
    id: 'business-frequent',
    name: 'Business Power Traveler',
    category: 'business',
    icon: '✈️',
    description: 'Optimized for frequent business trips to key European commercial centers',
    totalDays: 72,
    pattern: 'Short frequent trips to the same business hubs',
    optimal: true,
    trips: [
      { countryCode: 'DE', countryName: 'Germany', duration: 5, purpose: 'Q1 business meetings', spacing: 14 },
      { countryCode: 'FR', countryName: 'France', duration: 4, purpose: 'Paris conference', spacing: 10 },
      { countryCode: 'DE', countryName: 'Germany', duration: 6, purpose: 'Trade fair', spacing: 12 },
      { countryCode: 'NL', countryName: 'Netherlands', duration: 3, purpose: 'Amsterdam meetings', spacing: 15 },
      { countryCode: 'CH', countryName: 'Switzerland', duration: 7, purpose: 'Client presentations', spacing: 8 },
      { countryCode: 'DE', countryName: 'Germany', duration: 4, purpose: 'Q2 review', spacing: 20 },
      { countryCode: 'FR', countryName: 'France', duration: 5, purpose: 'Summer summit', spacing: 18 },
      { countryCode: 'IT', countryName: 'Italy', duration: 6, purpose: 'Milan trade show', spacing: 12 },
      { countryCode: 'ES', countryName: 'Spain', duration: 4, purpose: 'Barcelona conference', spacing: 16 },
      { countryCode: 'DE', countryName: 'Germany', duration: 3, purpose: 'Year-end meetings', spacing: 25 },
      { countryCode: 'CH', countryName: 'Switzerland', duration: 5, purpose: 'Final quarter review', spacing: 20 },
      { countryCode: 'AT', countryName: 'Austria', duration: 4, purpose: 'Vienna partnership', spacing: 18 },
      { countryCode: 'NL', countryName: 'Netherlands', duration: 3, purpose: 'Q4 planning', spacing: 14 },
      { countryCode: 'FR', countryName: 'France', duration: 4, purpose: 'End of year gala', spacing: 12 },
      { countryCode: 'DE', countryName: 'Germany', duration: 5, purpose: 'Annual review', spacing: 8 },
      { countryCode: 'IT', countryName: 'Italy', duration: 4, purpose: 'New year planning' }
    ],
    compliance: {
      status: 'compliant',
      message: 'Uses 72/90 days with strategic spacing',
      recommendations: [
        'Maintain detailed business documentation',
        'Book flexible tickets for schedule changes',
        'Consider business visa for frequent travel'
      ]
    },
    targetAudience: ['Business executives', 'Sales professionals', 'Consultants'],
    pros: [
      'Maximizes business opportunities',
      'Builds strong European networks',
      'Regular schedule predictability',
      '18-day buffer for emergencies'
    ],
    cons: [
      'Intensive travel schedule',
      'Limited leisure time',
      'Requires careful date tracking',
      'High travel costs'
    ]
  },

  {
    id: 'family-school-holidays',
    name: 'Family Holiday Explorer',
    category: 'family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Perfect family vacations timed with school holidays, featuring kid-friendly destinations',
    totalDays: 63,
    pattern: 'School holiday timing, 7-21 day family-friendly trips',
    optimal: true,
    trips: [
      { countryCode: 'ES', countryName: 'Spain', duration: 14, purpose: 'Easter beach holiday', spacing: 60 },
      { countryCode: 'FR', countryName: 'France', duration: 21, purpose: 'Summer Disneyland & Loire Valley', spacing: 30 },
      { countryCode: 'IT', countryName: 'Italy', duration: 12, purpose: 'Roman history adventure', spacing: 45 },
      { countryCode: 'AT', countryName: 'Austria', duration: 10, purpose: 'Christmas markets', spacing: 25 },
      { countryCode: 'DE', countryName: 'Germany', duration: 6, purpose: 'New Year Berlin' }
    ],
    seasonality: {
      preferredMonths: [4, 7, 8, 10, 12],
      reason: 'Aligned with school holidays and family-friendly weather'
    },
    compliance: {
      status: 'compliant',
      message: 'Uses 63/90 days with excellent spacing for families',
      recommendations: [
        'Book family-friendly accommodations early',
        'Consider travel insurance for children',
        '27-day buffer allows for flexibility'
      ]
    },
    targetAudience: ['Families with school-age children', 'Multi-generational travelers'],
    pros: [
      'Aligns with school calendars',
      'Kid-friendly destinations',
      'Generous buffer for changes',
      'Educational experiences'
    ],
    cons: [
      'Higher costs during school holidays',
      'Crowded attractions',
      'Limited to holiday periods',
      'Requires advance planning'
    ]
  },

  {
    id: 'student-semester',
    name: 'Study Abroad Explorer',
    category: 'student',
    icon: '🎓',
    description: 'Combines semester study with strategic travel breaks and cultural exploration',
    totalDays: 89,
    pattern: 'Study abroad + travel periods during breaks',
    optimal: false,
    trips: [
      { countryCode: 'DE', countryName: 'Germany', duration: 30, purpose: 'Semester exchange program', spacing: 0 },
      { countryCode: 'CZ', countryName: 'Czech Republic', duration: 4, purpose: 'Mid-semester break', spacing: 3 },
      { countryCode: 'AT', countryName: 'Austria', duration: 6, purpose: 'Study tour', spacing: 7 },
      { countryCode: 'HU', countryName: 'Hungary', duration: 5, purpose: 'Cultural immersion', spacing: 2 },
      { countryCode: 'PL', countryName: 'Poland', duration: 7, purpose: 'History research', spacing: 4 },
      { countryCode: 'DE', countryName: 'Germany', duration: 28, purpose: 'Semester continuation', spacing: 0 },
      { countryCode: 'NL', countryName: 'Netherlands', duration: 5, purpose: 'Final project research', spacing: 2 },
      { countryCode: 'BE', countryName: 'Belgium', duration: 4, purpose: 'EU institutions visit' }
    ],
    seasonality: {
      preferredMonths: [2, 3, 4, 5, 9, 10, 11, 12],
      reason: 'Academic calendar alignment'
    },
    compliance: {
      status: 'warning',
      message: 'Uses 89/90 days - very tight on limits',
      recommendations: [
        'Monitor dates extremely carefully',
        'Consider student visa for longer programs',
        'Plan buffer days for emergencies',
        'Keep detailed academic documentation'
      ]
    },
    targetAudience: ['Exchange students', 'Graduate researchers', 'Academic visitors'],
    pros: [
      'Maximizes study abroad experience',
      'Cultural immersion opportunities',
      'Academic credit possibilities',
      'Builds international networks'
    ],
    cons: [
      'Extremely tight visa limits',
      'Limited flexibility',
      'Requires precise planning',
      'Academic schedule constraints'
    ]
  },

  {
    id: 'budget-backpacker',
    name: 'Budget Backpacker Route',
    category: 'backpacker',
    icon: '🎒',
    description: 'Cost-effective Eastern European adventure with longer stays and budget accommodations',
    totalDays: 78,
    pattern: 'Eastern Europe focus, longer stays, budget-friendly',
    optimal: true,
    trips: [
      { countryCode: 'PL', countryName: 'Poland', duration: 18, purpose: 'Krakow & Warsaw exploration', spacing: 3 },
      { countryCode: 'CZ', countryName: 'Czech Republic', duration: 16, purpose: 'Prague & countryside', spacing: 2 },
      { countryCode: 'SK', countryName: 'Slovakia', duration: 12, purpose: 'Bratislava & High Tatras', spacing: 4 },
      { countryCode: 'HU', countryName: 'Hungary', duration: 15, purpose: 'Budapest & thermal baths', spacing: 3 },
      { countryCode: 'SI', countryName: 'Slovenia', duration: 10, purpose: 'Lake Bled & Ljubljana', spacing: 2 },
      { countryCode: 'HR', countryName: 'Croatia', duration: 7, purpose: 'Dubrovnik coastal finale' }
    ],
    seasonality: {
      preferredMonths: [5, 6, 7, 8, 9],
      reason: 'Best weather for outdoor activities and camping'
    },
    compliance: {
      status: 'compliant',
      message: 'Uses 78/90 days with good regional flow',
      recommendations: [
        'Book hostels in advance during summer',
        'Consider regional transportation passes',
        '12-day buffer for spontaneous detours'
      ]
    },
    targetAudience: ['Budget travelers', 'Young backpackers', 'Cultural enthusiasts'],
    pros: [
      'Very cost-effective',
      'Rich cultural experiences',
      'Excellent value for money',
      'Strong backpacker infrastructure'
    ],
    cons: [
      'Limited to budget accommodations',
      'Less luxury experiences',
      'Language barriers possible',
      'Crowded during peak season'
    ]
  },

  {
    id: 'summer-explorer',
    name: 'Summer Grand Tour',
    category: 'summer',
    icon: '☀️',
    description: 'Classic European summer experience hitting the most popular destinations',
    totalDays: 85,
    pattern: 'June-August focused travel across major European destinations',
    optimal: true,
    trips: [
      { countryCode: 'ES', countryName: 'Spain', duration: 16, purpose: 'Barcelona & Madrid summer', spacing: 2 },
      { countryCode: 'FR', countryName: 'France', duration: 18, purpose: 'Paris & Provence lavender season', spacing: 1 },
      { countryCode: 'IT', countryName: 'Italy', duration: 20, purpose: 'Rome, Florence & Amalfi Coast', spacing: 3 },
      { countryCode: 'GR', countryName: 'Greece', duration: 14, purpose: 'Athens & Greek islands', spacing: 4 },
      { countryCode: 'HR', countryName: 'Croatia', duration: 12, purpose: 'Dalmatian Coast summer', spacing: 2 },
      { countryCode: 'AT', countryName: 'Austria', duration: 5, purpose: 'Salzburg music festivals' }
    ],
    seasonality: {
      preferredMonths: [6, 7, 8],
      reason: 'Peak summer weather for outdoor activities and festivals'
    },
    compliance: {
      status: 'compliant',
      message: 'Uses 85/90 days with minimal spacing',
      recommendations: [
        'Book accommodations well in advance',
        'Expect higher summer prices',
        'Stay hydrated in southern Europe',
        '5-day buffer for weather delays'
      ]
    },
    targetAudience: ['Summer vacation travelers', 'Festival enthusiasts', 'Beach lovers'],
    pros: [
      'Perfect summer weather',
      'All major festivals and events',
      'Great beach and outdoor activities',
      'Peak cultural season'
    ],
    cons: [
      'Highest prices of the year',
      'Extremely crowded',
      'Hot weather in southern regions',
      'Limited flexibility'
    ]
  }
]

export function getTemplatesByCategory(category: TripTemplate['category']): TripTemplate[] {
  return tripTemplates.filter(template => template.category === category)
}

export function getOptimalTemplates(): TripTemplate[] {
  return tripTemplates.filter(template => template.optimal)
}

export function getTemplateById(id: string): TripTemplate | undefined {
  return tripTemplates.find(template => template.id === id)
}

export const templateCategories = [
  {
    id: 'digital-nomad',
    name: 'Digital Nomad',
    icon: '💻',
    description: 'Remote work focused travel'
  },
  {
    id: 'business',
    name: 'Business Travel',
    icon: '✈️',
    description: 'Professional travel patterns'
  },
  {
    id: 'family',
    name: 'Family Vacation',
    icon: '👨‍👩‍👧‍👦',
    description: 'School holiday aligned trips'
  },
  {
    id: 'student',
    name: 'Student Travel',
    icon: '🎓',
    description: 'Study abroad patterns'
  },
  {
    id: 'backpacker',
    name: 'Budget Backpacker',
    icon: '🎒',
    description: 'Cost-effective adventures'
  },
  {
    id: 'summer',
    name: 'Summer Explorer',
    icon: '☀️',
    description: 'Peak season travel'
  }
] as const