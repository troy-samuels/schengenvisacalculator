/**
 * Email Configuration
 * Central configuration for all email-related functionality
 */

export const EMAIL_CONFIG = {
  // Primary email addresses
  // NOTE: Currently only info@euborder.com is configured. All emails route to this address.
  FROM_EMAIL: process.env.FROM_EMAIL || 'info@euborder.com',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'info@euborder.com',
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'info@euborder.com',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'info@euborder.com',

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
    WELCOME: 'Welcome to EU Border Authority',
    PASSWORD_RESET: 'Reset Your EU Border Authority Password',
    SUBSCRIPTION_CONFIRMATION: 'Your EU Border Authority Subscription is Confirmed',
    COMPLIANCE_ALERT: 'EU Border Compliance Alert',
    SUPPORT_REQUEST: 'EU Border Authority Support Request'
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
      return `noreply@euborder.com`
    case 'system':
    default:
      return EMAIL_CONFIG.FROM_EMAIL
  }
}

/**
 * Format email address with display name
 */
export function formatEmailAddress(email: string, name: string = 'EU Border Authority'): string {
  return `${name} <${email}>`
}