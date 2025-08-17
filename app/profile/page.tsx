"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Settings, 
  Download, 
  Trash2,
  Shield,
  Bell,
  Globe,
  ArrowLeft
} from 'lucide-react'

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    travelReminders: true,
    complianceAlerts: true
  })

  // Mock user data - in real app, this would come from Supabase
  const user = {
    email: 'user@example.com',
    name: 'John Doe',
    createdAt: '2024-01-15',
    totalTrips: 12,
    countriesVisited: 8,
    daysRemaining: 45
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleExportData = async () => {
    setIsLoading(true)
    // TODO: Implement data export functionality
    setTimeout(() => {
      setIsLoading(false)
      // Create mock download
      const data = { user, trips: [], preferences: notifications }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'schengen-calculator-data.json'
      a.click()
      URL.revokeObjectURL(url)
    }, 1000)
  }

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoading(true)
      // TODO: Implement account deletion
      setTimeout(() => {
        setIsLoading(false)
        alert('Account deletion would be processed here')
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Travel Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">{user.totalTrips}</div>
                        <div className="text-sm text-blue-700">Total Trips</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Globe className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">{user.countriesVisited}</div>
                        <div className="text-sm text-green-700">Countries Visited</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">{user.daysRemaining}</div>
                        <div className="text-sm text-purple-700">Days Remaining</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Updates</h3>
                        <p className="text-sm text-gray-600">Receive updates about new features and service announcements</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('emailUpdates', !notifications.emailUpdates)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.emailUpdates ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Travel Reminders</h3>
                        <p className="text-sm text-gray-600">Get reminders about upcoming trips and important dates</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('travelReminders', !notifications.travelReminders)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.travelReminders ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.travelReminders ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Compliance Alerts</h3>
                        <p className="text-sm text-gray-600">Receive alerts when approaching visa limits</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('complianceAlerts', !notifications.complianceAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.complianceAlerts ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.complianceAlerts ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Password</h3>
                      <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure</p>
                      <Link href="/forgot-password">
                        <Button variant="outline">Change Password</Button>
                      </Link>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-gray-900 mb-2">Privacy Policy</h3>
                      <p className="text-sm text-gray-600 mb-4">Review how we handle your personal information</p>
                      <Link href="/privacy-policy">
                        <Button variant="outline">View Privacy Policy</Button>
                      </Link>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-gray-900 mb-2">Terms of Service</h3>
                      <p className="text-sm text-gray-600 mb-4">Review our terms and conditions</p>
                      <Link href="/terms-and-conditions">
                        <Button variant="outline">View Terms</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="w-5 h-5 mr-2" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Export Your Data</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a copy of your travel data, including all trips and calculations
                    </p>
                    <Button 
                      onClick={handleExportData}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isLoading ? 'Preparing Download...' : 'Export Data'}
                    </Button>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="font-medium text-red-600 mb-2">Delete Account</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button 
                      onClick={handleDeleteAccount}
                      disabled={isLoading}
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}