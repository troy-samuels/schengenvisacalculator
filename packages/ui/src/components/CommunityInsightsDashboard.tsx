/**
 * Community Insights Dashboard
 * Displays aggregated, privacy-protected travel insights
 *
 * Data shown:
 * - Popular countries and routes
 * - Seasonal travel trends
 * - Average trip durations
 * - Compliance patterns
 *
 * All data is k-anonymous (k≥20) with differential privacy noise
 */

'use client'

import React, { useState, useEffect } from 'react'
import {
  TrendingUp,
  Users,
  Globe,
  Calendar,
  BarChart3,
  MapPin,
  Clock,
  Shield,
  Info,
  RefreshCw
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export interface CommunityInsightsDashboardProps {
  className?: string
}

interface PopularCountry {
  country: string
  travelers: number
  percentage: number
  rank: number
}

interface PopularRoute {
  countries: string[]
  travelers: number
  avg_duration: number
  rank: number
}

interface SeasonalTrend {
  quarter: string
  travelers: number
  avg_duration: number
  top_countries: string[]
}

/**
 * Community Insights Dashboard Component
 *
 * Shows aggregated, anonymized travel patterns from the community
 *
 * @example
 * ```tsx
 * <CommunityInsightsDashboard className="max-w-6xl mx-auto" />
 * ```
 */
export function CommunityInsightsDashboard({ className = '' }: CommunityInsightsDashboardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [popularCountries, setPopularCountries] = useState<PopularCountry[]>([])
  const [popularRoutes, setPopularRoutes] = useState<PopularRoute[]>([])
  const [seasonalTrends, setSeasonalTrends] = useState<SeasonalTrend[]>([])
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchInsights = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch popular countries
      const countriesRes = await fetch('/api/analytics/insights?type=popular_countries&limit=10')
      const routesRes = await fetch('/api/analytics/insights?type=popular_routes&limit=5')
      const trendsRes = await fetch('/api/analytics/insights?type=seasonal_trends&limit=4')

      if (!countriesRes.ok || !routesRes.ok || !trendsRes.ok) {
        throw new Error('Failed to fetch insights')
      }

      const countriesData = await countriesRes.json()
      const routesData = await routesRes.json()
      const trendsData = await trendsRes.json()

      if (countriesData.success && countriesData.data?.countries) {
        setPopularCountries(countriesData.data.countries)
      }

      if (routesData.success && routesData.data?.routes) {
        setPopularRoutes(routesData.data.routes)
      }

      if (trendsData.success && trendsData.data?.quarters) {
        setSeasonalTrends(trendsData.data.quarters)
      }

      setLastUpdated(new Date().toISOString())
    } catch (err) {
      console.error('[Insights] Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load insights')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [])

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-gray-600">Loading community insights...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <Info className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-gray-900 font-medium mb-2">Unable to load insights</p>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
              <Button onClick={fetchInsights} variant="outline" className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Community Travel Insights
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Aggregated patterns from thousands of travelers (100% anonymized)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Privacy Protected
          </Badge>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Clock className="h-3 w-3" />
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Contributing Travelers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {popularCountries.reduce((sum, c) => sum + c.travelers, 0).toLocaleString()}+
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Countries Tracked</p>
                <p className="text-2xl font-bold text-gray-900">
                  {popularCountries.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Popular Routes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {popularRoutes.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Countries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Most Popular Schengen Countries
          </CardTitle>
          <CardDescription>
            Based on {popularCountries.reduce((sum, c) => sum + c.travelers, 0).toLocaleString()} travelers in the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularCountries.map((country) => (
              <div key={country.country} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 text-center">
                  <Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full">
                    {country.rank}
                  </Badge>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900 truncate">{country.country}</p>
                    <p className="text-sm text-gray-600 ml-2">
                      {country.travelers.toLocaleString()} travelers ({country.percentage}%)
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-500"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Common Travel Routes
          </CardTitle>
          <CardDescription>
            Multi-country trips planned by the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        #{route.rank}
                      </Badge>
                      <p className="font-medium text-gray-900">
                        {route.countries.join(' → ')}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{route.travelers.toLocaleString()} travelers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>~{route.avg_duration} days avg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Trends */}
      {seasonalTrends.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Seasonal Travel Trends
            </CardTitle>
            <CardDescription>
              Quarterly patterns showing peak travel periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seasonalTrends.map((trend) => (
                <div
                  key={trend.quarter}
                  className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{trend.quarter}</h4>
                    <Badge className="bg-blue-600">
                      {trend.travelers.toLocaleString()} travelers
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">
                        Avg duration: {trend.avg_duration} days
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-600 text-xs mb-1">Top destinations:</p>
                        <div className="flex flex-wrap gap-1">
                          {trend.top_countries.map((country) => (
                            <Badge key={country} variant="outline" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                Privacy-Protected Insights
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                All data shown here is <strong>fully anonymized</strong> with k-anonymity (k≥20) and
                differential privacy protection. Individual travelers cannot be identified from these
                aggregated patterns. Statistical noise has been added to all numbers to protect privacy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contribute CTA (for users without consent) */}
      <Card className="bg-gradient-to-br from-primary/5 to-purple-100/30 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">
                Want to contribute to these insights?
              </h4>
              <p className="text-sm text-gray-700">
                Enable anonymized data sharing in your privacy settings to help improve tools
                for the entire Schengen travel community. 100% private and GDPR compliant.
              </p>
            </div>
            <Button asChild className="min-h-[44px] whitespace-nowrap">
              <a href="/settings/privacy">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Settings
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
