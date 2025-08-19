export interface Country {
  code: string
  name: string
  flag: string
  schengenStatus: 'schengen' | 'schengen-2024' | 'schengen-2025' | 'non-schengen' | 'eu-non-schengen'
  alternativeNames?: string[]
  popular?: boolean
}

export const countries: Country[] = [
  // Schengen Area Countries (Original)
  { code: 'AT', name: 'Austria', flag: '🇦🇹', schengenStatus: 'schengen', popular: true },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', schengenStatus: 'schengen' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', schengenStatus: 'schengen', alternativeNames: ['Czechia'] },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', schengenStatus: 'schengen' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', schengenStatus: 'schengen' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', schengenStatus: 'schengen' },
  { code: 'FR', name: 'France', flag: '🇫🇷', schengenStatus: 'schengen', popular: true },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', schengenStatus: 'schengen', popular: true },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', schengenStatus: 'schengen', popular: true },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', schengenStatus: 'schengen' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', schengenStatus: 'schengen' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', schengenStatus: 'schengen', popular: true },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', schengenStatus: 'schengen' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', schengenStatus: 'schengen' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', schengenStatus: 'schengen' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', schengenStatus: 'schengen' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', schengenStatus: 'schengen' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', schengenStatus: 'schengen', alternativeNames: ['Holland'], popular: true },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', schengenStatus: 'schengen', popular: true },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', schengenStatus: 'schengen' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', schengenStatus: 'schengen', popular: true },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', schengenStatus: 'schengen' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', schengenStatus: 'schengen' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', schengenStatus: 'schengen', popular: true },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', schengenStatus: 'schengen' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', schengenStatus: 'schengen', popular: true },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', schengenStatus: 'schengen' },
  
  // Recent Schengen Additions
  { code: 'RO', name: 'Romania', flag: '🇷🇴', schengenStatus: 'schengen-2024' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', schengenStatus: 'schengen-2024' },
  
  // EU Non-Schengen Countries
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', schengenStatus: 'eu-non-schengen', popular: true },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', schengenStatus: 'eu-non-schengen' },
  
  // Non-EU Popular Countries
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', schengenStatus: 'non-schengen', alternativeNames: ['UK', 'Britain', 'England'], popular: true },
  { code: 'US', name: 'United States', flag: '🇺🇸', schengenStatus: 'non-schengen', alternativeNames: ['USA', 'America'], popular: true },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', schengenStatus: 'non-schengen', popular: true },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', schengenStatus: 'non-schengen', popular: true },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', schengenStatus: 'non-schengen', popular: true },
  { code: 'CN', name: 'China', flag: '🇨🇳', schengenStatus: 'non-schengen', popular: true },
  { code: 'IN', name: 'India', flag: '🇮🇳', schengenStatus: 'non-schengen', popular: true },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', schengenStatus: 'non-schengen', popular: true },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', schengenStatus: 'non-schengen' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', schengenStatus: 'non-schengen', popular: true },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', schengenStatus: 'non-schengen' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', schengenStatus: 'non-schengen' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', schengenStatus: 'non-schengen' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', schengenStatus: 'non-schengen' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', schengenStatus: 'non-schengen' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', schengenStatus: 'non-schengen', alternativeNames: ['Macedonia'] },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', schengenStatus: 'non-schengen', alternativeNames: ['Bosnia'] },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', schengenStatus: 'non-schengen' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', schengenStatus: 'non-schengen' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', schengenStatus: 'non-schengen' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', schengenStatus: 'non-schengen' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', schengenStatus: 'non-schengen' },
  
  // Other Countries
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', schengenStatus: 'non-schengen' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', schengenStatus: 'non-schengen' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', schengenStatus: 'non-schengen' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', schengenStatus: 'non-schengen' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', schengenStatus: 'non-schengen' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', schengenStatus: 'non-schengen' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', schengenStatus: 'non-schengen', alternativeNames: ['UAE', 'Dubai'] },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', schengenStatus: 'non-schengen' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', schengenStatus: 'non-schengen', alternativeNames: ['Korea'] },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', schengenStatus: 'non-schengen' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', schengenStatus: 'non-schengen' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', schengenStatus: 'non-schengen' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', schengenStatus: 'non-schengen' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', schengenStatus: 'non-schengen' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', schengenStatus: 'non-schengen' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', schengenStatus: 'non-schengen' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', schengenStatus: 'non-schengen' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', schengenStatus: 'non-schengen' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', schengenStatus: 'non-schengen' },
]

export function getSchengenStatusLabel(status: Country['schengenStatus']): string {
  switch (status) {
    case 'schengen':
      return 'Schengen'
    case 'schengen-2024':
      return 'Schengen (since 2024)'
    case 'schengen-2025':
      return 'Schengen (since 2025)'
    case 'eu-non-schengen':
      return 'EU (Non-Schengen)'
    case 'non-schengen':
      return 'Non-Schengen'
    default:
      return ''
  }
}

export function searchCountries(query: string): Country[] {
  if (!query) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  
  const matches = countries.filter(country => {
    const nameMatch = country.name.toLowerCase().includes(normalizedQuery)
    const codeMatch = country.code.toLowerCase() === normalizedQuery
    const altNameMatch = country.alternativeNames?.some(
      alt => alt.toLowerCase().includes(normalizedQuery)
    )
    
    return nameMatch || codeMatch || altNameMatch
  })
  
  // Sort by relevance: exact matches first, then popular countries, then alphabetical
  return matches.sort((a, b) => {
    const aExact = a.name.toLowerCase() === normalizedQuery || 
                   a.alternativeNames?.some(alt => alt.toLowerCase() === normalizedQuery)
    const bExact = b.name.toLowerCase() === normalizedQuery || 
                   b.alternativeNames?.some(alt => alt.toLowerCase() === normalizedQuery)
    
    if (aExact && !bExact) return -1
    if (!aExact && bExact) return 1
    
    if (a.popular && !b.popular) return -1
    if (!a.popular && b.popular) return 1
    
    return a.name.localeCompare(b.name)
  })
}

export function getPopularCountries(): Country[] {
  return countries.filter(c => c.popular).sort((a, b) => {
    // Prioritize Schengen countries
    if (a.schengenStatus.includes('schengen') && !b.schengenStatus.includes('schengen')) return -1
    if (!a.schengenStatus.includes('schengen') && b.schengenStatus.includes('schengen')) return 1
    return a.name.localeCompare(b.name)
  })
}