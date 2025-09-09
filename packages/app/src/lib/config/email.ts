/**
 * Email Configuration
 * Central configuration for all email-related functionality
 */

export const EMAIL_CONFIG = {
  // Primary email addresses
  FROM_EMAIL: process.env.FROM_EMAIL || 'info@etiascalculator.com',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'info@etiascalculator.com', 
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'info@etiascalculator.com',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'info@etiascalculator.com',
  
  // Email service configuration
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  
  // Email templates
  TEMPLATES: {
    WELCOME: 'welcome',
    PASSWORD_RESET: 'password-reset', 
    SUBSCRIPTION_CONFIRMATION: 'subscription-confirmation',
    COMPLIANCE_ALERT: 'compliance-alert',
    SUPPORT_REQUEST: 'support-request'
  },

  // Email subjects
  SUBJECTS: {
    WELCOME: 'Welcome to ETIAS Calculator',
    PASSWORD_RESET: 'Reset Your ETIAS Calculator Password',
    SUBSCRIPTION_CONFIRMATION: 'Your ETIAS Calculator Subscription is Confirmed',
    COMPLIANCE_ALERT: 'Schengen Visa Compliance Alert',
    SUPPORT_REQUEST: 'ETIAS Calculator Support Request'
  }
} as const

/**
 * Utility function to get the appropriate sender email based on email type
 */
export function getSenderEmail(type: 'contact' | 'support' | 'system' | 'noreply' = 'system'): string {
  switch (type) {
    case 'contact':
      return EMAIL_CONFIG.CONTACT_EMAIL
    case 'support': 
      return EMAIL_CONFIG.SUPPORT_EMAIL
    case 'noreply':
      return `noreply@etiascalculator.com`
    case 'system':
    default:
      return EMAIL_CONFIG.FROM_EMAIL
  }
}

/**
 * Format email address with display name
 */
export function formatEmailAddress(email: string, name: string = 'ETIAS Calculator'): string {
  return `${name} <${email}>`
}