// Content Generation System Types

export interface ContentTemplate {
  id: string
  name: string
  type: ContentType
  slug: string
  template: string
  variables: TemplateVariable[]
  seoConfig: SEOConfig
  schemaMarkup?: SchemaMarkupConfig
  createdAt: Date
  updatedAt: Date
  status: 'active' | 'draft' | 'archived'
}

export interface GeneratedPage {
  id: string
  templateId: string
  slug: string
  title: string
  content: string
  metaDescription: string
  variables: Record<string, any>
  internalLinks: InternalLink[]
  schemaMarkup?: any
  seoScore?: number
  status: 'published' | 'draft' | 'needs-review'
  createdAt: Date
  updatedAt: Date
  lastRegenerated?: Date
}

export interface VisaRequirement {
  id: string
  fromCountryCode: string
  toCountryCode: string
  visaRequired: boolean
  visaType?: 'tourist' | 'business' | 'student' | 'work' | 'transit'
  maxStayDays?: number
  processingTime?: string
  cost?: number
  requirements: string[]
  notes?: string
  digitalNomadInfo?: DigitalNomadInfo
  lastUpdated: Date
}

export interface DigitalNomadInfo {
  availableVisas: DigitalNomadVisa[]
  taxImplications: string[]
  minIncomeReq?: number
  popularCities: string[]
  internetSpeed: string
  costOfLiving: 'low' | 'medium' | 'high' | 'very-high'
  timeZoneOffset: number
}

export interface DigitalNomadVisa {
  name: string
  duration: string
  cost: number
  requirements: string[]
  applicationUrl?: string
}

export interface SEOConfig {
  titleTemplate: string
  descriptionTemplate: string
  keywords: string[]
  canonicalUrlTemplate?: string
  robots?: string
  ogTitle?: string
  ogDescription?: string
  structuredData?: boolean
}

export interface SchemaMarkupConfig {
  type: 'FAQPage' | 'TravelAction' | 'GovernmentService' | 'WebPage'
  properties: Record<string, any>
}

export interface TemplateVariable {
  name: string
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  required: boolean
  description: string
  defaultValue?: any
  validation?: VariableValidation
}

export interface VariableValidation {
  minLength?: number
  maxLength?: number
  pattern?: string
  enum?: string[]
}

export interface InternalLink {
  text: string
  url: string
  contextRelevance: number
}

export interface ContentGenerationJob {
  id: string
  type: 'single-page' | 'bulk-generation' | 'update-existing'
  templateId: string
  parameters: Record<string, any>
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress: number
  results?: GeneratedPage[]
  errors?: string[]
  createdAt: Date
  completedAt?: Date
}

export interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export type ContentType = 
  | 'country-to-schengen' 
  | 'digital-nomad-guide' 
  | 'visa-comparison' 
  | 'faq-page' 
  | 'visa-requirements'
  | 'travel-guide'

export interface ContentMetrics {
  pageId: string
  views: number
  bounceRate: number
  avgTimeOnPage: number
  conversions: number
  seoRanking?: number
  lastUpdated: Date
}

export interface AIContentConfig {
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3'
  temperature: number
  maxTokens: number
  variationPrompts: string[]
  qualityChecks: QualityCheck[]
}

export interface QualityCheck {
  type: 'uniqueness' | 'readability' | 'keyword-density' | 'length'
  threshold: number
  required: boolean
}

export interface ContentAnalytics {
  totalPages: number
  publishedPages: number
  draftPages: number
  avgSeoScore: number
  topPerformingPages: GeneratedPage[]
  recentlyGenerated: GeneratedPage[]
  needsUpdate: GeneratedPage[]
}