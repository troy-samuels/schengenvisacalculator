/**
 * Schengen Area Countries Data
 * Complete list of all 27 Schengen countries with flags and metadata
 * Updated as of 2024 - includes all current member states
 */

export interface SchengenCountry {
  code: string
  name: string
  flag: string
  joinedSchengen: string
  isEUMember: boolean
  capital: string
  timezone: string
  currency: string
}

export const SCHENGEN_COUNTRIES: SchengenCountry[] = [
  {
    code: 'AT',
    name: 'Austria',
    flag: '🇦🇹',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Vienna',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'BE',
    name: 'Belgium',
    flag: '🇧🇪',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Brussels',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    flag: '🇧🇬',
    joinedSchengen: '2024',
    isEUMember: true,
    capital: 'Sofia',
    timezone: 'EET',
    currency: 'BGN'
  },
  {
    code: 'HR',
    name: 'Croatia',
    flag: '🇭🇷',
    joinedSchengen: '2023',
    isEUMember: true,
    capital: 'Zagreb',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    flag: '🇨🇿',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Prague',
    timezone: 'CET',
    currency: 'CZK'
  },
  {
    code: 'DK',
    name: 'Denmark',
    flag: '🇩🇰',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Copenhagen',
    timezone: 'CET',
    currency: 'DKK'
  },
  {
    code: 'EE',
    name: 'Estonia',
    flag: '🇪🇪',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Tallinn',
    timezone: 'EET',
    currency: 'EUR'
  },
  {
    code: 'FI',
    name: 'Finland',
    flag: '🇫🇮',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Helsinki',
    timezone: 'EET',
    currency: 'EUR'
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Paris',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Berlin',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'GR',
    name: 'Greece',
    flag: '🇬🇷',
    joinedSchengen: '2000',
    isEUMember: true,
    capital: 'Athens',
    timezone: 'EET',
    currency: 'EUR'
  },
  {
    code: 'HU',
    name: 'Hungary',
    flag: '🇭🇺',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Budapest',
    timezone: 'CET',
    currency: 'HUF'
  },
  {
    code: 'IS',
    name: 'Iceland',
    flag: '🇮🇸',
    joinedSchengen: '1996',
    isEUMember: false,
    capital: 'Reykjavik',
    timezone: 'GMT',
    currency: 'ISK'
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Rome',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'LV',
    name: 'Latvia',
    flag: '🇱🇻',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Riga',
    timezone: 'EET',
    currency: 'EUR'
  },
  {
    code: 'LI',
    name: 'Liechtenstein',
    flag: '🇱🇮',
    joinedSchengen: '2011',
    isEUMember: false,
    capital: 'Vaduz',
    timezone: 'CET',
    currency: 'CHF'
  },
  {
    code: 'LT',
    name: 'Lithuania',
    flag: '🇱🇹',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Vilnius',
    timezone: 'EET',
    currency: 'EUR'
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    flag: '🇱🇺',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Luxembourg',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'MT',
    name: 'Malta',
    flag: '🇲🇹',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Valletta',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Amsterdam',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    joinedSchengen: '1996',
    isEUMember: false,
    capital: 'Oslo',
    timezone: 'CET',
    currency: 'NOK'
  },
  {
    code: 'PL',
    name: 'Poland',
    flag: '🇵🇱',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Warsaw',
    timezone: 'CET',
    currency: 'PLN'
  },
  {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Lisbon',
    timezone: 'WET',
    currency: 'EUR'
  },
  {
    code: 'RO',
    name: 'Romania',
    flag: '🇷🇴',
    joinedSchengen: '2024',
    isEUMember: true,
    capital: 'Bucharest',
    timezone: 'EET',
    currency: 'RON'
  },
  {
    code: 'SK',
    name: 'Slovakia',
    flag: '🇸🇰',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Bratislava',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'SI',
    name: 'Slovenia',
    flag: '🇸🇮',
    joinedSchengen: '2007',
    isEUMember: true,
    capital: 'Ljubljana',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Madrid',
    timezone: 'CET',
    currency: 'EUR'
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    joinedSchengen: '1995',
    isEUMember: true,
    capital: 'Stockholm',
    timezone: 'CET',
    currency: 'SEK'
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    joinedSchengen: '2008',
    isEUMember: false,
    capital: 'Bern',
    timezone: 'CET',
    currency: 'CHF'
  }
]

// Utility functions for working with countries
export const getCountryByCode = (code: string): SchengenCountry | undefined => {
  return SCHENGEN_COUNTRIES.find(country => country.code === code)
}

export const getCountryByName = (name: string): SchengenCountry | undefined => {
  return SCHENGEN_COUNTRIES.find(country => 
    country.name.toLowerCase() === name.toLowerCase()
  )
}

export const getCountriesForSelect = () => {
  return SCHENGEN_COUNTRIES.map(country => ({
    value: country.code,
    label: `${country.flag} ${country.name}`,
    country
  })).sort((a, b) => a.country.name.localeCompare(b.country.name))
}

export const getEUMemberCountries = (): SchengenCountry[] => {
  return SCHENGEN_COUNTRIES.filter(country => country.isEUMember)
}

export const getNonEUSchengenCountries = (): SchengenCountry[] => {
  return SCHENGEN_COUNTRIES.filter(country => !country.isEUMember)
}

// Export count for validation
export const SCHENGEN_COUNTRIES_COUNT = SCHENGEN_COUNTRIES.length