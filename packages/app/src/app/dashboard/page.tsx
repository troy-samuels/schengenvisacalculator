"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@schengen/ui'
import { Input } from '@schengen/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@schengen/ui'
import { Badge } from '@schengen/ui'
import { 
  Plus,
  Edit3,
  Trash2,
  Download,
  Share2,
  TrendingUp, 
  Globe, 
  AlertCircle, 
  Calendar,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Gauge,
  CheckCircle,
  Settings,
  LogOut,
  Bell,
  ExternalLink
} from 'lucide-react'

// SEO metadata for the dashboard

interface Trip {
  id: string;
  country: string;
  countryFlag: string;
  startDate: string;
  endDate: string;
  days: number;
  purpose: 'business' | 'leisure';
}

interface TimelineData {
  date: string;
  daysUsed: number;
  daysRemaining: number;
  riskLevel: 'safe' | 'monitor' | 'warning' | 'critical';
  country: string;
}

interface CountryUsage {
  country: string;
  daysSpent: number;
  percentage: number;
  flag: string;
  color: string;
}

interface RiskAssessment {
  currentRisk: number;
  daysUntilRisk: number;
  recommendations: string[];
  nextResetDate: string;
}

// Mock user data - in real app this would come from API/database
const mockTrips: Trip[] = [
  { 
    id: '1', 
    country: 'Germany', 
    countryFlag: '🇩🇪', 
    startDate: '2024-01-15', 
    endDate: '2024-01-22', 
    days: 8, 
    purpose: 'business' 
  },
  { 
    id: '2', 
    country: 'France', 
    countryFlag: '🇫🇷', 
    startDate: '2024-02-10', 
    endDate: '2024-02-25', 
    days: 16, 
    purpose: 'leisure' 
  },
  { 
    id: '3', 
    country: 'Spain', 
    countryFlag: '🇪🇸', 
    startDate: '2024-03-05', 
    endDate: '2024-03-18', 
    days: 14, 
    purpose: 'leisure' 
  },
  { 
    id: '4', 
    country: 'Italy', 
    countryFlag: '🇮🇹', 
    startDate: '2024-04-01', 
    endDate: '2024-04-12', 
    days: 12, 
    purpose: 'business' 
  },
]

export default function DashboardPage() {
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [editingTrip, setEditingTrip] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [user] = useState({ name: 'Travel User', email: 'user@example.com' }) // Mock user

  // Calculate real-time analytics based on trips data
  const analytics = React.useMemo(() => {
    const totalDays = trips.reduce((sum, trip) => sum + trip.days, 0)
    const remainingDays = Math.max(0, 90 - totalDays)
    const riskPercentage = Math.min(100, (totalDays / 90) * 100)
    
    // Calculate country usage
    const countryUsage = trips.reduce((acc, trip) => {
      const existing = acc.find(c => c.country === trip.country)
      if (existing) {
        existing.daysSpent += trip.days
      } else {
        acc.push({
          country: trip.country,
          daysSpent: trip.days,
          percentage: 0,
          flag: trip.countryFlag,
          color: getCountryColor(trip.country)
        })
      }
      return acc
    }, [] as CountryUsage[])

    // Calculate percentages
    countryUsage.forEach(country => {
      country.percentage = totalDays > 0 ? Math.round((country.daysSpent / totalDays) * 100) : 0
    })

    // Sort by days spent
    countryUsage.sort((a, b) => b.daysSpent - a.daysSpent)

    // Generate timeline data
    const timelineData: TimelineData[] = []
    let cumulativeDays = 0
    
    trips.forEach(trip => {
      cumulativeDays += trip.days
      const remaining = 90 - cumulativeDays
      const riskLevel = 
        cumulativeDays >= 85 ? 'critical' :
        cumulativeDays >= 70 ? 'warning' :
        cumulativeDays >= 45 ? 'monitor' : 'safe'
        
      timelineData.push({
        date: trip.endDate,
        daysUsed: cumulativeDays,
        daysRemaining: Math.max(0, remaining),
        riskLevel,
        country: trip.country
      })
    })

    const riskAssessment: RiskAssessment = {
      currentRisk: Math.round(riskPercentage),
      daysUntilRisk: remainingDays,
      recommendations: generateRecommendations(totalDays, remainingDays),
      nextResetDate: calculateNextResetDate()
    }

    return {
      totalDays,
      remainingDays,
      countryUsage,
      timelineData,
      riskAssessment
    }
  }, [trips])

  const handleEditTrip = (tripId: string, field: string, value: string | number) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId ? { ...trip, [field]: value } : trip
    ))
  }

  const handleDeleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId))
  }

  const handleAddTrip = (newTrip: Omit<Trip, 'id'>) => {
    const trip: Trip = {
      ...newTrip,
      id: Date.now().toString()
    }
    setTrips(prev => [...prev, trip])
    setShowAddForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Schengen Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-700">
                  {user.name}
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Trip Management */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Trips</h2>
              <Button 
                onClick={() => setShowAddForm(true)} 
                className="flex items-center"
                data-testid="add-trip-button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Trip
              </Button>
            </div>

            {/* Trip List */}
            <div className="space-y-3" data-testid="trip-list">
              {trips.map((trip) => (
                <Card key={trip.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{trip.countryFlag}</span>
                      <div>
                        {editingTrip === trip.id ? (
                          <Input
                            value={trip.country}
                            onChange={(e) => handleEditTrip(trip.id, 'country', e.target.value)}
                            className="text-lg font-semibold"
                            onBlur={() => setEditingTrip(null)}
                            autoFocus
                          />
                        ) : (
                          <h3 
                            className="text-lg font-semibold cursor-pointer hover:text-blue-600"
                            onClick={() => setEditingTrip(trip.id)}
                            data-testid={`edit-trip-${trip.country.toLowerCase()}`}
                          >
                            {trip.country}
                          </h3>
                        )}
                        <Badge 
                          variant={trip.purpose === 'business' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {trip.purpose}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Start:</span>
                      {editingTrip === trip.id ? (
                        <Input
                          type="date"
                          value={trip.startDate}
                          onChange={(e) => handleEditTrip(trip.id, 'startDate', e.target.value)}
                          className="mt-1"
                          data-testid="edit-start-date"
                        />
                      ) : (
                        <div className="font-medium" onClick={() => setEditingTrip(trip.id)}>
                          {new Date(trip.startDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-500">End:</span>
                      {editingTrip === trip.id ? (
                        <Input
                          type="date"
                          value={trip.endDate}
                          onChange={(e) => handleEditTrip(trip.id, 'endDate', e.target.value)}
                          className="mt-1"
                          data-testid="edit-end-date"
                        />
                      ) : (
                        <div className="font-medium" onClick={() => setEditingTrip(trip.id)}>
                          {new Date(trip.endDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 text-sm">Days:</span>
                      {editingTrip === trip.id ? (
                        <Input
                          type="number"
                          value={trip.days}
                          onChange={(e) => handleEditTrip(trip.id, 'days', parseInt(e.target.value))}
                          className="w-20"
                          data-testid="trip-days-edit"
                        />
                      ) : (
                        <span 
                          className="font-medium text-lg cursor-pointer hover:text-blue-600"
                          onClick={() => setEditingTrip(trip.id)}
                          data-testid="trip-days-display"
                        >
                          {trip.days}
                        </span>
                      )}
                    </div>
                    {editingTrip === trip.id && (
                      <Button size="sm" onClick={() => setEditingTrip(null)} data-testid="save-changes">
                        Save
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gray-900" data-testid="total-days">
                  {analytics.totalDays}/90
                </div>
                <div className="text-sm text-gray-600">Days used in current 180-day period</div>
                <div className="text-lg font-semibold">
                  <span className="text-green-600">{analytics.remainingDays}</span> days remaining
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Analytics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Travel Analytics</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="analytics-charts">
              {/* 90/180 Timeline */}
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    90/180 Timeline
                  </CardTitle>
                  <CardDescription>Your rolling compliance periods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.timelineData.map((data, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {new Date(data.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                data.riskLevel === 'safe' ? 'bg-green-500' : 
                                data.riskLevel === 'monitor' ? 'bg-yellow-500' : 
                                data.riskLevel === 'warning' ? 'bg-orange-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${(data.daysUsed / 90) * 100}%` }}
                            />
                          </div>
                          <Badge 
                            variant={data.riskLevel === 'safe' ? 'default' : 
                                   data.riskLevel === 'monitor' ? 'secondary' : 'destructive'} 
                            className="text-xs"
                          >
                            {data.daysUsed}d
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Country Usage */}
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-green-600" />
                    Country Breakdown
                  </CardTitle>
                  <CardDescription>Where you spend your Schengen days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.countryUsage.map((country, index) => (
                      <motion.div 
                        key={country.country}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-sm font-medium">{country.country}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-700"
                              style={{ 
                                width: `${Math.max(10, country.percentage)}%`,
                                backgroundColor: country.color 
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8 text-right">
                            {country.daysSpent}d
                          </span>
                          <span className="text-xs text-gray-500 w-8 text-right">
                            {country.percentage}%
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Gauge className="h-5 w-5 mr-2 text-orange-600" />
                    Risk Assessment
                  </CardTitle>
                  <CardDescription>Current compliance risk level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={
                            analytics.riskAssessment.currentRisk > 80 ? '#ef4444' : 
                            analytics.riskAssessment.currentRisk > 60 ? '#f59e0b' : '#10b981'
                          }
                          strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - analytics.riskAssessment.currentRisk / 100)}`}
                          initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
                          animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - analytics.riskAssessment.currentRisk / 100)}` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {analytics.riskAssessment.currentRisk}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{analytics.riskAssessment.daysUntilRisk} days</span> remaining
                      </p>
                      <p className="text-xs text-gray-500">
                        Next reset: {analytics.riskAssessment.nextResetDate}
                      </p>
                      {analytics.riskAssessment.recommendations.length > 0 && (
                        <div className="mt-3 text-left">
                          <p className="text-xs font-medium text-gray-700 mb-1">Recommendations:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {analytics.riskAssessment.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Travel Heatmap */}
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                    Travel Heatmap
                  </CardTitle>
                  <CardDescription>Your travel activity patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-1 text-center">
                      {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, index) => (
                        <div key={index} className="text-xs text-gray-400 py-1">{month}</div>
                      ))}
                      {Array.from({ length: 12 }, (_, monthIndex) => {
                        const hasTrip = trips.some(trip => 
                          new Date(trip.startDate).getMonth() === monthIndex
                        )
                        const intensity = hasTrip ? 0.8 : Math.random() * 0.3
                        return (
                          <motion.div
                            key={monthIndex}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: monthIndex * 0.05 }}
                            className={`h-8 w-8 rounded-sm cursor-pointer transition-all hover:scale-110 ${
                              intensity > 0.6 ? 'bg-green-500' :
                              intensity > 0.3 ? 'bg-green-300' :
                              intensity > 0.1 ? 'bg-green-100' :
                              'bg-gray-100'
                            }`}
                            title={`${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex]}: ${hasTrip ? 'Has travel' : 'No travel'}`}
                          />
                        )
                      })}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Less activity</span>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-100 rounded-sm"></div>
                        <div className="h-2 w-2 bg-green-100 rounded-sm"></div>
                        <div className="h-2 w-2 bg-green-300 rounded-sm"></div>
                        <div className="h-2 w-2 bg-green-500 rounded-sm"></div>
                      </div>
                      <span>More activity</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Download className="h-6 w-6 mb-2 text-blue-600" />
                  <span className="text-sm">Export PDF</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Share2 className="h-6 w-6 mb-2 text-green-600" />
                  <span className="text-sm">Share Report</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Bell className="h-6 w-6 mb-2 text-orange-600" />
                  <span className="text-sm">Set Alerts</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <ExternalLink className="h-6 w-6 mb-2 text-purple-600" />
                  <span className="text-sm">Get Help</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Trip Modal - Simplified for demo */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Country" />
                <Input type="date" placeholder="Start Date" />
                <Input type="date" placeholder="End Date" />
                <Input type="number" placeholder="Days" />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddForm(false)}>
                    Add Trip
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Helper functions
function getCountryColor(country: string): string {
  const colors = {
    'Germany': '#3B82F6',
    'France': '#10B981', 
    'Spain': '#F59E0B',
    'Italy': '#EF4444',
    'Netherlands': '#8B5CF6',
    'Austria': '#06B6D4',
    'Switzerland': '#F97316',
    'Portugal': '#84CC16'
  }
  return colors[country as keyof typeof colors] || '#6B7280'
}

function generateRecommendations(totalDays: number, remainingDays: number): string[] {
  const recommendations = []
  
  if (remainingDays < 15) {
    recommendations.push('Consider planning your next reset period')
  }
  if (totalDays > 60) {
    recommendations.push('Monitor upcoming trips carefully')
  }
  if (remainingDays > 30) {
    recommendations.push('You have flexibility for additional travel')
  }
  
  return recommendations
}

function calculateNextResetDate(): string {
  // Simplified - in real app this would be calculated based on first entry date
  const nextReset = new Date()
  nextReset.setDate(nextReset.getDate() + 90)
  return nextReset.toLocaleDateString()
}