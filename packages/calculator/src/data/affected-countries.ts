/**
 * Countries Affected by Schengen 90/180 Day Rule
 * Based on EU Regulation 2018/1806 Annex II (complete official list)
 * Updated: 2024 - includes all current visa-exempt countries
 */

export interface CountryClassification {
  code: string
  name: string
  flag: string
  category: 'affected_by_90_180' | 'eu_eea_swiss' | 'requires_visa'
  region?: string
}

// Countries subject to 90/180 rule (Annex II - visa-exempt for short stays)
export const COUNTRIES_AFFECTED_BY_90_180: CountryClassification[] = [
  // Americas
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', category: 'affected_by_90_180', region: 'South America' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', category: 'affected_by_90_180', region: 'South America' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', category: 'affected_by_90_180', region: 'North America' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', category: 'affected_by_90_180', region: 'South America' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', category: 'affected_by_90_180', region: 'South America' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', category: 'affected_by_90_180', region: 'Central America' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', category: 'affected_by_90_180', region: 'Central America' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', category: 'affected_by_90_180', region: 'Central America' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', category: 'affected_by_90_180', region: 'Central America' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', category: 'affected_by_90_180', region: 'North America' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', category: 'affected_by_90_180', region: 'Central America' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', category: 'affected_by_90_180', region: 'Central America' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', category: 'affected_by_90_180', region: 'South America' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', category: 'affected_by_90_180', region: 'South America' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', category: 'affected_by_90_180', region: 'Caribbean' },
  { code: 'US', name: 'United States', flag: '🇺🇸', category: 'affected_by_90_180', region: 'North America' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', category: 'affected_by_90_180', region: 'South America' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', category: 'affected_by_90_180', region: 'South America' },

  // Asia-Pacific
  { code: 'AU', name: 'Australia', flag: '🇦🇺', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'HK', name: 'Hong Kong SAR', flag: '🇭🇰', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'MO', name: 'Macao SAR', flag: '🇲🇴', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', category: 'affected_by_90_180', region: 'Asia' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', category: 'affected_by_90_180', region: 'Oceania' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', category: 'affected_by_90_180', region: 'Oceania' },

  // Europe (Non-EU)
  { code: 'AL', name: 'Albania', flag: '🇦🇱', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', category: 'affected_by_90_180', region: 'Europe' },
  { code: 'VA', name: 'Holy See (Vatican)', flag: '🇻🇦', category: 'affected_by_90_180', region: 'Europe' },

  // United Kingdom (Post-Brexit)
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', category: 'affected_by_90_180', region: 'Europe' },

  // Middle East & Africa
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', category: 'affected_by_90_180', region: 'Middle East' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', category: 'affected_by_90_180', region: 'Middle East' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', category: 'affected_by_90_180', region: 'Africa' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', category: 'affected_by_90_180', region: 'Africa' }
]

// EU/EEA/Swiss citizens (NOT subject to 90/180 rule)
export const EU_EEA_SWISS_COUNTRIES: CountryClassification[] = [
  // EU Countries
  { code: 'AT', name: 'Austria', flag: '🇦🇹', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', category: 'eu_eea_swiss', region: 'Europe' },

  // EEA Countries (Non-EU)
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', category: 'eu_eea_swiss', region: 'Europe' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', category: 'eu_eea_swiss', region: 'Europe' },

  // Switzerland
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', category: 'eu_eea_swiss', region: 'Europe' }
]

// Combined list of all countries for dropdown
export const ALL_COUNTRIES_FOR_CITIZENSHIP: CountryClassification[] = [
  ...COUNTRIES_AFFECTED_BY_90_180,
  ...EU_EEA_SWISS_COUNTRIES,
  // Add other major countries that require visas
  { code: 'CN', name: 'China', flag: '🇨🇳', category: 'requires_visa', region: 'Asia' },
  { code: 'IN', name: 'India', flag: '🇮🇳', category: 'requires_visa', region: 'Asia' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', category: 'requires_visa', region: 'Europe' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', category: 'requires_visa', region: 'Europe' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', category: 'requires_visa', region: 'Africa' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', category: 'requires_visa', region: 'Africa' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', category: 'requires_visa', region: 'Africa' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', category: 'requires_visa', region: 'Asia' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', category: 'requires_visa', region: 'Asia' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', category: 'requires_visa', region: 'Asia' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', category: 'requires_visa', region: 'Asia' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', category: 'requires_visa', region: 'Asia' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', category: 'requires_visa', region: 'Asia' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', category: 'requires_visa', region: 'Middle East' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', category: 'requires_visa', region: 'Middle East' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', category: 'requires_visa', region: 'Middle East' }
].sort((a, b) => a.name.localeCompare(b.name))

// Utility functions
export const getCountryClassification = (countryCode: string): CountryClassification | undefined => {
  return ALL_COUNTRIES_FOR_CITIZENSHIP.find(country => country.code === countryCode)
}

export const isSubjectTo90180Rule = (countryCodes: string[]): boolean => {
  // If user has EU/EEA/Swiss citizenship, they're not subject to the rule
  const hasEUCitizenship = countryCodes.some(code => 
    EU_EEA_SWISS_COUNTRIES.some(country => country.code === code)
  )
  if (hasEUCitizenship) return false

  // If user has citizenship in affected countries, they are subject to the rule
  const hasAffectedCitizenship = countryCodes.some(code => 
    COUNTRIES_AFFECTED_BY_90_180.some(country => country.code === code)
  )
  
  return hasAffectedCitizenship
}

export const getRuleApplicability = (countryCodes: string[]) => {
  const hasEUCitizenship = countryCodes.some(code => 
    EU_EEA_SWISS_COUNTRIES.some(country => country.code === code)
  )
  const hasAffectedCitizenship = countryCodes.some(code => 
    COUNTRIES_AFFECTED_BY_90_180.some(country => country.code === code)
  )
  
  if (hasEUCitizenship) {
    return {
      isSubjectToRule: false,
      exemptionReason: 'eu_citizen',
      message: 'The 90/180 rule doesn\'t apply to you as an EU/EEA/Swiss citizen, but you can still use our travel tracker!'
    }
  }
  
  if (hasAffectedCitizenship) {
    return {
      isSubjectToRule: true,
      exemptionReason: null,
      message: 'Track your Schengen compliance with our 90/180 day calculator'
    }
  }
  
  return {
    isSubjectToRule: false,
    exemptionReason: 'requires_visa',
    message: 'You\'ll need a Schengen visa to travel to Europe. Our calculator can help you plan your applications.'
  }
}

export const getCountriesForCitizenshipSelect = () => {
  return ALL_COUNTRIES_FOR_CITIZENSHIP.map(country => ({
    value: country.code,
    label: `${country.flag} ${country.name}`,
    country,
    category: country.category,
    region: country.region
  }))
}

// Statistics
export const AFFECTED_COUNTRIES_COUNT = COUNTRIES_AFFECTED_BY_90_180.length // 66 countries
export const EU_EEA_SWISS_COUNT = EU_EEA_SWISS_COUNTRIES.length // 31 countries
export const TOTAL_COUNTRIES_COUNT = ALL_COUNTRIES_FOR_CITIZENSHIP.length