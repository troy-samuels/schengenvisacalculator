'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'sidebar' | 'footer'
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
  leadMagnet?: {
    title: string
    description: string
    downloadUrl: string
  }
  className?: string
}

export function NewsletterSignup({
  variant = 'inline',
  title = 'Stay Updated on EU Border Changes',
  description = 'Get expert insights on EES, ETIAS, and Schengen compliance delivered to your inbox.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  successMessage = 'Successfully subscribed! Check your email for confirmation.',
  leadMagnet,
  className = ''
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: variant,
          leadMagnet: leadMagnet?.title
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setEmail('')

        // If lead magnet, trigger download
        if (leadMagnet?.downloadUrl) {
          setTimeout(() => {
            window.open(leadMagnet.downloadUrl, '_blank')
          }, 1000)
        }
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  // Inline variant - for embedding in blog posts
  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border border-blue-100 ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-poppins font-bold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 mb-4 font-dm-sans">
              {description}
            </p>

            {leadMagnet && (
              <div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
                <p className="text-sm font-semibold text-blue-600 mb-1">
                  📥 Free Download: {leadMagnet.title}
                </p>
                <p className="text-sm text-gray-600">
                  {leadMagnet.description}
                </p>
              </div>
            )}

            {status === 'success' ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg p-4">
                <CheckCircle className="w-5 h-5" />
                <p className="font-dm-sans">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-poppins font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      buttonText
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm font-dm-sans">{errorMessage}</p>
                  </div>
                )}

                <p className="text-xs text-gray-500 font-dm-sans">
                  Join 10,000+ travelers. Unsubscribe anytime. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Footer variant - compact for site footer
  if (variant === 'footer') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-poppins font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mb-4 font-dm-sans">
          {description}
        </p>

        {status === 'success' ? (
          <div className="flex items-center gap-2 text-green-400 bg-green-900/30 rounded-lg p-3">
            <CheckCircle className="w-4 h-4" />
            <p className="text-sm font-dm-sans">Subscribed successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 font-dm-sans text-sm"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-poppins font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-400 font-dm-sans">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    )
  }

  // Sidebar variant - for blog sidebar
  if (variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white ${className}`}>
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-lg font-poppins font-bold mb-2">
          {title}
        </h3>
        <p className="text-sm text-blue-100 mb-4 font-dm-sans">
          {description}
        </p>

        {leadMagnet && (
          <div className="bg-white/10 rounded-lg p-3 mb-4 border border-white/20">
            <p className="text-xs font-semibold mb-1">
              📥 {leadMagnet.title}
            </p>
            <p className="text-xs text-blue-100">
              {leadMagnet.description}
            </p>
          </div>
        )}

        {status === 'success' ? (
          <div className="flex items-center gap-2 bg-green-500/20 rounded-lg p-3">
            <CheckCircle className="w-4 h-4" />
            <p className="text-sm font-dm-sans">Subscribed!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 font-dm-sans text-sm"
              disabled={status === 'loading'}
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-poppins font-semibold text-sm hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                buttonText
              )}
            </button>

            {status === 'error' && (
              <p className="text-xs text-red-200 font-dm-sans">{errorMessage}</p>
            )}

            <p className="text-xs text-blue-200 font-dm-sans">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    )
  }

  // Modal variant - for popups
  return (
    <div className={`bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl ${className}`}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>

        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 font-dm-sans">
          {description}
        </p>
      </div>

      {leadMagnet && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
          <p className="font-semibold text-blue-900 mb-1">
            📥 Free Download: {leadMagnet.title}
          </p>
          <p className="text-sm text-gray-600">
            {leadMagnet.description}
          </p>
        </div>
      )}

      {status === 'success' ? (
        <div className="flex flex-col items-center gap-3 text-green-600">
          <CheckCircle className="w-12 h-12" />
          <p className="font-dm-sans text-center">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans"
            disabled={status === 'loading'}
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-poppins font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subscribing...
              </>
            ) : (
              buttonText
            )}
          </button>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-3">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm font-dm-sans">{errorMessage}</p>
            </div>
          )}

          <p className="text-xs text-center text-gray-500 font-dm-sans">
            Join 10,000+ travelers. Unsubscribe anytime. No spam, ever.
          </p>
        </form>
      )}
    </div>
  )
}
