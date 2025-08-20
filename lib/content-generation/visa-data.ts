import { countries, Country } from '../data/countries'
import { VisaRequirement, DigitalNomadInfo } from './types'

// Extended visa requirements database
export const visaRequirements: VisaRequirement[] = [
  // US Citizens
  {
    id: 'us-schengen-tourist',
    fromCountryCode: 'US',
    toCountryCode: 'SCHENGEN',
    visaRequired: false,
    visaType: 'tourist',
    maxStayDays: 90,
    requirements: [
      'Valid US passport (minimum 3 months beyond stay)',
      'Proof of accommodation bookings',
      'Travel insurance (recommended)',
      'Proof of sufficient funds (€100+ per day)',
      'Return/onward flight tickets'
    ],
    notes: 'Visa-free travel under VWP for tourism, business, and transit',
    lastUpdated: new Date('2024-01-01')
  },
  
  // UK Citizens (Post-Brexit)
  {
    id: 'uk-schengen-tourist',
    fromCountryCode: 'GB',
    toCountryCode: 'SCHENGEN',
    visaRequired: false,
    visaType: 'tourist',
    maxStayDays: 90,
    requirements: [
      'Valid UK passport (minimum 6 months validity)',
      'Travel insurance covering medical expenses up to €30,000',
      'Proof of accommodation',
      'Proof of sufficient funds',
      'Return/onward travel tickets'
    ],
    notes: 'Post-Brexit visa-free travel for short stays',
    lastUpdated: new Date('2024-01-01')
  },

  // Indian Citizens
  {
    id: 'in-schengen-tourist',
    fromCountryCode: 'IN',
    toCountryCode: 'SCHENGEN',
    visaRequired: true,
    visaType: 'tourist',
    maxStayDays: 90,
    processingTime: '15-20 business days',
    cost: 80,
    requirements: [
      'Valid Indian passport (minimum 3 months beyond stay)',
      'Completed Schengen visa application form',
      'Two recent passport photos',
      'Travel insurance covering minimum €30,000',
      'Flight reservations (round trip)',
      'Proof of accommodation (hotel bookings/invitation letter)',
      'Bank statements (last 3 months)',
      'Employment letter or business registration',
      'Income tax returns (ITR)',
      'Visa fee payment receipt'
    ],
    notes: 'Most applications processed through VFS Global centers',
    digitalNomadInfo: {
      availableVisas: [{
        name: 'Tourist Visa (Extended)',
        duration: '90 days',
        cost: 80,
        requirements: ['Proof of remote work', 'Travel insurance', 'Accommodation proof']
      }],
      taxImplications: ['No tax liability for stays under 183 days'],
      minIncomeReq: 2000,
      popularCities: ['Berlin', 'Amsterdam', 'Prague', 'Barcelona'],
      internetSpeed: '50+ Mbps in major cities',
      costOfLiving: 'medium',
      timeZoneOffset: +5.5
    },
    lastUpdated: new Date('2024-01-01')
  },

  // Chinese Citizens
  {
    id: 'cn-schengen-tourist',
    fromCountryCode: 'CN',
    toCountryCode: 'SCHENGEN',
    visaRequired: true,
    visaType: 'tourist',
    maxStayDays: 90,
    processingTime: '15-25 business days',
    cost: 80,
    requirements: [
      'Valid Chinese passport',
      'Completed visa application form',
      'Recent passport photographs',
      'Travel insurance (minimum €30,000 coverage)',
      'Flight itinerary',
      'Hotel reservations or invitation letter',
      'Bank statements (last 3-6 months)',
      'Employment certificate',
      'Household registration booklet (Hukou)',
      'Marriage certificate (if applicable)'
    ],
    notes: 'Applications through official consulates or authorized visa centers',
    lastUpdated: new Date('2024-01-01')
  },

  // Brazilian Citizens
  {
    id: 'br-schengen-tourist',
    fromCountryCode: 'BR',
    toCountryCode: 'SCHENGEN',
    visaRequired: false,
    visaType: 'tourist',
    maxStayDays: 90,
    requirements: [
      'Valid Brazilian passport (minimum 3 months validity)',
      'Proof of accommodation',
      'Travel insurance recommended',
      'Proof of sufficient funds',
      'Return flight tickets'
    ],
    notes: 'Visa-free travel for tourism and business',
    digitalNomadInfo: {
      availableVisas: [{
        name: 'Tourist Stay',
        duration: '90 days',
        cost: 0,
        requirements: ['Valid passport', 'Proof of funds']
      }],
      taxImplications: ['No Brazilian tax on foreign income for stays under 183 days'],
      popularCities: ['Lisbon', 'Barcelona', 'Berlin', 'Amsterdam'],
      internetSpeed: '30+ Mbps average',
      costOfLiving: 'medium',
      timeZoneOffset: -3
    },
    lastUpdated: new Date('2024-01-01')
  },

  // Canadian Citizens
  {
    id: 'ca-schengen-tourist',
    fromCountryCode: 'CA',
    toCountryCode: 'SCHENGEN',
    visaRequired: false,
    visaType: 'tourist',
    maxStayDays: 90,
    requirements: [
      'Valid Canadian passport',
      'Travel insurance (recommended)',
      'Proof of accommodation',
      'Proof of sufficient funds',
      'Return/onward travel tickets'
    ],
    notes: 'Visa-free travel for Canadian citizens',
    lastUpdated: new Date('2024-01-01')
  },

  // Australian Citizens
  {
    id: 'au-schengen-tourist',
    fromCountryCode: 'AU',
    toCountryCode: 'SCHENGEN',
    visaRequired: false,
    visaType: 'tourist',
    maxStayDays: 90,
    requirements: [
      'Valid Australian passport (minimum 3 months validity)',
      'Travel insurance (recommended)',
      'Proof of accommodation',
      'Sufficient funds for stay',
      'Return flight tickets'
    ],
    notes: 'Visa-free travel under bilateral agreements',
    lastUpdated: new Date('2024-01-01')
  },

  // Russian Citizens
  {
    id: 'ru-schengen-tourist',
    fromCountryCode: 'RU',
    toCountryCode: 'SCHENGEN',
    visaRequired: true,
    visaType: 'tourist',
    maxStayDays: 90,
    processingTime: '10-15 business days',
    cost: 80,
    requirements: [
      'Valid Russian passport',
      'Completed visa application',
      'Passport photographs',
      'Travel insurance (€30,000+ coverage)',
      'Flight reservations',
      'Hotel bookings or invitation',
      'Bank statements',
      'Employment certificate',
      'Visa application fee'
    ],
    notes: 'Currently limited processing due to political situation',
    lastUpdated: new Date('2024-01-01')
  },

  // Turkish Citizens
  {
    id: 'tr-schengen-tourist',
    fromCountryCode: 'TR',
    toCountryCode: 'SCHENGEN',
    visaRequired: true,
    visaType: 'tourist',
    maxStayDays: 90,
    processingTime: '15-20 business days',
    cost: 80,
    requirements: [
      'Valid Turkish passport',
      'Visa application form',
      'Recent photographs',
      'Travel insurance',
      'Flight itinerary',
      'Accommodation proof',
      'Financial documents',
      'Employment letter',
      'Civil status documents'
    ],
    notes: 'Apply at consulates or visa application centers',
    lastUpdated: new Date('2024-01-01')
  },

  // Mexican Citizens
  {
    id: 'mx-schengen-tourist',
    fromCountryCode: 'MX',
    toCountryCode: 'SCHENGEN',
    visaRequired: false,
    visaType: 'tourist',
    maxStayDays: 90,
    requirements: [
      'Valid Mexican passport',
      'Travel insurance (recommended)',
      'Proof of accommodation',
      'Sufficient financial means',
      'Return flight tickets'
    ],
    notes: 'Visa-free travel for Mexican passport holders',
    lastUpdated: new Date('2024-01-01')
  },

  // Japanese Citizens
  {
    id: 'jp-schengen-tourist',
    fromCountryCode: 'JP',
    toCountryCode: 'SCHENGEN',
    visaRequired: false,
    visaType: 'tourist',
    maxStayDays: 90,
    requirements: [
      'Valid Japanese passport',
      'Proof of accommodation',
      'Sufficient funds for stay',
      'Return/onward tickets',
      'Travel insurance (recommended)'
    ],
    notes: 'Visa-free travel for Japanese citizens',
    lastUpdated: new Date('2024-01-01')
  }
]

// Digital nomad visa information by country
export const digitalNomadVisaData: Record<string, DigitalNomadInfo> = {
  PT: {
    availableVisas: [
      {
        name: 'D7 Visa (Passive Income)',
        duration: '2 years (renewable)',
        cost: 83,
        requirements: [
          'Proof of passive income (€760+/month)',
          'Clean criminal record',
          'Health insurance',
          'Accommodation proof'
        ],
        applicationUrl: 'https://www.vistosd7.pt/'
      },
      {
        name: 'Tech Visa',
        duration: '2 years',
        cost: 83,
        requirements: [
          'Job offer from Portuguese tech company',
          'University degree',
          'Clean criminal record'
        ]
      }
    ],
    taxImplications: [
      'NHR program offers 20% flat tax rate for 10 years',
      'Foreign income may be tax-free',
      'Tax residency triggered after 183+ days'
    ],
    minIncomeReq: 760,
    popularCities: ['Lisbon', 'Porto', 'Braga', 'Coimbra'],
    internetSpeed: '100+ Mbps',
    costOfLiving: 'medium',
    timeZoneOffset: 0
  },

  ES: {
    availableVisas: [
      {
        name: 'Digital Nomad Visa',
        duration: '12 months (renewable up to 5 years)',
        cost: 80,
        requirements: [
          'Proof of remote work/freelancing',
          'Minimum €2,334/month income',
          'Clean criminal record',
          'Health insurance',
          'University degree or 3+ years experience'
        ],
        applicationUrl: 'https://www.lamoncloa.gob.es/'
      }
    ],
    taxImplications: [
      'Beckham Law: 24% flat tax for 6 years (if eligible)',
      'Regular tax rates: 19-47%',
      'Tax residency after 183+ days'
    ],
    minIncomeReq: 2334,
    popularCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
    internetSpeed: '100+ Mbps',
    costOfLiving: 'medium',
    timeZoneOffset: +1
  },

  EE: {
    availableVisas: [
      {
        name: 'Digital Nomad Visa',
        duration: '12 months',
        cost: 80,
        requirements: [
          'Minimum €3,500/month income',
          'Remote work contract',
          'Clean criminal record',
          'Health insurance'
        ],
        applicationUrl: 'https://www.politsei.ee/'
      }
    ],
    taxImplications: [
      '20% flat income tax',
      'No tax on retained corporate profits',
      'Tax residency after 183+ days'
    ],
    minIncomeReq: 3500,
    popularCities: ['Tallinn', 'Tartu', 'Parnu'],
    internetSpeed: '120+ Mbps',
    costOfLiving: 'low',
    timeZoneOffset: +2
  },

  HR: {
    availableVisas: [
      {
        name: 'Digital Nomad Visa',
        duration: '12 months',
        cost: 67,
        requirements: [
          'Proof of remote work',
          'Minimum €2,870/month income',
          'Health insurance',
          'Clean criminal record'
        ]
      }
    ],
    taxImplications: [
      'Income tax rates: 20-30%',
      'Tax residency after 183+ days',
      'Social security may apply'
    ],
    minIncomeReq: 2870,
    popularCities: ['Zagreb', 'Split', 'Dubrovnik', 'Rijeka'],
    internetSpeed: '80+ Mbps',
    costOfLiving: 'low',
    timeZoneOffset: +1
  }
}

// FAQ data for different country combinations
export const visaFAQs: Record<string, Array<{question: string, answer: string}>> = {
  'US-SCHENGEN': [
    {
      question: 'Do US citizens need a visa for Europe?',
      answer: 'No, US citizens can travel to the Schengen Area visa-free for up to 90 days within a 180-day period for tourism, business, or transit purposes.'
    },
    {
      question: 'How long can Americans stay in Europe without a visa?',
      answer: 'US citizens can stay in the Schengen Area for up to 90 days within any 180-day period without a visa.'
    },
    {
      question: 'What documents do US citizens need for Europe?',
      answer: 'US citizens need a valid passport (with at least 3 months validity beyond stay), proof of accommodation, travel insurance (recommended), and proof of sufficient funds.'
    },
    {
      question: 'Can US citizens work in Europe without a visa?',
      answer: 'No, the visa-free travel only allows tourism, business meetings, and conferences. Any form of employment requires a proper work visa.'
    },
    {
      question: 'What is the 90/180 rule for Americans in Europe?',
      answer: 'Americans can stay 90 days within any rolling 180-day period. After 90 days, you must leave the Schengen Area for at least 90 days before returning.'
    }
  ],

  'IN-SCHENGEN': [
    {
      question: 'Do Indian citizens need a visa for Europe?',
      answer: 'Yes, Indian citizens require a Schengen visa to visit Europe. The visa allows stays up to 90 days within a 180-day period.'
    },
    {
      question: 'How much does a Schengen visa cost for Indians?',
      answer: 'The Schengen visa fee is €80 for adults, €40 for children 6-12 years, and free for children under 6.'
    },
    {
      question: 'How long does Schengen visa processing take for Indians?',
      answer: 'Processing typically takes 15-20 business days, but can take up to 45 days in some cases. Apply at least 3 weeks before travel.'
    },
    {
      question: 'What documents do Indians need for Schengen visa?',
      answer: 'Key documents include valid passport, application form, photos, travel insurance, flight bookings, accommodation proof, bank statements, and employment letter.'
    },
    {
      question: 'Can I apply for Schengen visa online from India?',
      answer: 'No, you must apply in person at a consulate or VFS Global center. However, you can fill the application form online and book appointments.'
    }
  ],

  'GB-SCHENGEN': [
    {
      question: 'Do UK citizens need a visa for Europe after Brexit?',
      answer: 'No, UK citizens can still travel visa-free to the Schengen Area for up to 90 days within a 180-day period for tourism or business.'
    },
    {
      question: 'What changed for UK citizens traveling to Europe after Brexit?',
      answer: 'UK citizens now need 6 months passport validity (instead of 3), may face longer queues at borders, and need travel insurance. The 90-day limit is now strictly enforced.'
    },
    {
      question: 'How long can British citizens stay in Europe?',
      answer: 'UK citizens can stay up to 90 days within any 180-day period across all Schengen countries combined.'
    },
    {
      question: 'Do UK citizens need travel insurance for Europe?',
      answer: 'While not legally required, travel insurance covering at least €30,000 for medical expenses is strongly recommended and may be requested at border control.'
    }
  ]
}

// Popular destinations by country
export const popularDestinations: Record<string, Array<{
  name: string,
  flag: string,
  description: string,
  highlights: string,
  bestTime: string
}>> = {
  'default': [
    {
      name: 'Germany',
      flag: '🇩🇪',
      description: 'Rich history, vibrant cities, and excellent infrastructure make Germany a top destination.',
      highlights: 'Berlin\'s culture, Munich\'s beer gardens, Rhine Valley castles',
      bestTime: 'May-September'
    },
    {
      name: 'France',
      flag: '🇫🇷',
      description: 'From Paris elegance to Provence charm, France offers diverse experiences.',
      highlights: 'Eiffel Tower, Louvre Museum, French Riviera, wine regions',
      bestTime: 'April-October'
    },
    {
      name: 'Italy',
      flag: '🇮🇹',
      description: 'Art, history, cuisine, and stunning landscapes throughout the boot.',
      highlights: 'Rome\'s history, Tuscany wines, Amalfi Coast, Venice canals',
      bestTime: 'April-June, September-October'
    },
    {
      name: 'Spain',
      flag: '🇪🇸',
      description: 'Passionate culture, beautiful beaches, and architectural wonders.',
      highlights: 'Barcelona\'s Gaudi, Madrid museums, Andalusian culture, Balearic Islands',
      bestTime: 'March-May, September-November'
    },
    {
      name: 'Netherlands',
      flag: '🇳🇱',
      description: 'Charming canals, tulip fields, and progressive cities.',
      highlights: 'Amsterdam canals, Keukenhof gardens, Dutch cycling culture',
      bestTime: 'April-September'
    }
  ]
}

export function getVisaRequirement(fromCountry: string, toCountry: string = 'SCHENGEN'): VisaRequirement | undefined {
  return visaRequirements.find(req => 
    req.fromCountryCode === fromCountry && req.toCountryCode === toCountry
  )
}

export function getAllVisaRequirements(): VisaRequirement[] {
  return visaRequirements
}

export function getDigitalNomadInfo(countryCode: string): DigitalNomadInfo | undefined {
  return digitalNomadVisaData[countryCode]
}

export function getFAQs(fromCountry: string, toCountry: string = 'SCHENGEN'): Array<{question: string, answer: string}> {
  const key = `${fromCountry}-${toCountry}`
  return visaFAQs[key] || []
}

export function getPopularDestinations(fromCountry?: string): Array<{name: string, flag: string, description: string, highlights: string, bestTime: string}> {
  return popularDestinations[fromCountry || 'default'] || popularDestinations['default']
}