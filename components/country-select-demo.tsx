'use client'

import React, { useState } from 'react'
import { CountryAutocomplete } from './country-autocomplete'
import { type Country } from '@/lib/data/countries'

export function CountrySelectDemo() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [formData, setFormData] = useState({
    nationality: null as Country | null,
    destination: null as Country | null,
    residence: null as Country | null,
  })

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Country Autocomplete Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive country selector with Schengen status indicators
        </p>
      </div>

      {/* Basic Example */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Basic Country Selection
        </h2>
        <CountryAutocomplete
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Type to search countries..."
          className="mb-4"
        />
        {selectedCountry && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Selected Country:</h3>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedCountry.flag}</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {selectedCountry.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Code: {selectedCountry.code} | Status: {selectedCountry.schengenStatus}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visa Calculator Form Example */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Visa Calculator Form
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Nationality
            </label>
            <CountryAutocomplete
              value={formData.nationality}
              onChange={(country) => setFormData(prev => ({ ...prev, nationality: country }))}
              placeholder="Select your nationality..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destination Country
            </label>
            <CountryAutocomplete
              value={formData.destination}
              onChange={(country) => setFormData(prev => ({ ...prev, destination: country }))}
              placeholder="Where are you traveling to?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Country of Residence
            </label>
            <CountryAutocomplete
              value={formData.residence}
              onChange={(country) => setFormData(prev => ({ ...prev, residence: country }))}
              placeholder="Where do you currently live?"
            />
          </div>

          {(formData.nationality || formData.destination || formData.residence) && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-3">
                Current Selection:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-blue-700 dark:text-blue-300 font-medium">Nationality:</div>
                  <div className="text-blue-600 dark:text-blue-400">
                    {formData.nationality ? `${formData.nationality.flag} ${formData.nationality.name}` : 'Not selected'}
                  </div>
                </div>
                <div>
                  <div className="text-blue-700 dark:text-blue-300 font-medium">Destination:</div>
                  <div className="text-blue-600 dark:text-blue-400">
                    {formData.destination ? `${formData.destination.flag} ${formData.destination.name}` : 'Not selected'}
                  </div>
                </div>
                <div>
                  <div className="text-blue-700 dark:text-blue-300 font-medium">Residence:</div>
                  <div className="text-blue-600 dark:text-blue-400">
                    {formData.residence ? `${formData.residence.flag} ${formData.residence.name}` : 'Not selected'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Features List */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          ✨ Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Type-ahead autocomplete search</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Unicode flag emojis for all countries</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Schengen status indicators</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Alternative country names (Holland → Netherlands)</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Keyboard navigation (↑↓ Enter Esc)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Popular destinations first</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Mobile-friendly responsive design</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark mode support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Try These Searches */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          🔍 Try These Searches
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-center">
            "Holland"
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-center">
            "USA"
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-center">
            "DE"
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-center">
            "Romania"
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Notice how Romania shows "Schengen (since 2024)" and alternative names work perfectly!
        </p>
      </div>
    </div>
  )
}