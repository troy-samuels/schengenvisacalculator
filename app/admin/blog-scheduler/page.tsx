'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar,
  Clock,
  Play,
  Pause,
  Settings,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  RefreshCw,
  TrendingUp,
  Users,
  Globe,
  BookOpen,
  MessageSquare,
  Activity,
  Timer
} from 'lucide-react'

interface SchedulingStats {
  totalScheduled: number
  published: number
  pending: number
  failed: number
  successRate: number
  nextPublishDate: Date | null
  recentActivity: any[]
}

interface BlogSchedule {
  id: string
  status: 'active' | 'paused' | 'completed'
  targetCount: number
  currentCount: number
  postsPerWeek: number
  estimatedEndDate: Date
}

export default function BlogSchedulerPage() {
  const [schedule, setSchedule] = useState<BlogSchedule | null>(null)
  const [stats, setStats] = useState<SchedulingStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadScheduleData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadScheduleData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadScheduleData = async () => {
    try {
      // In a real app, get the schedule ID from context/storage
      const scheduleId = 'default-schedule-id'
      const response = await fetch(`/api/blog-scheduler/schedule?id=${scheduleId}`)
      const data = await response.json()
      
      if (data.success) {
        setStats(data.stats)
        // You'd also fetch schedule details here
        setSchedule(mockSchedule)
      }
    } catch (error) {
      console.error('Failed to load schedule data:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewSchedule = async (targetCount: number, postsPerWeek: number) => {
    setActionLoading(true)
    try {
      const response = await fetch('/api/blog-scheduler/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetCount, postsPerWeek, weeksToSchedule: 4 })
      })
      
      const data = await response.json()
      if (data.success) {
        await loadScheduleData()
        return data
      } else {
        throw new Error(data.message || 'Failed to create schedule')
      }
    } catch (error) {
      console.error('Failed to create schedule:', error)
      throw error
    } finally {
      setActionLoading(false)
    }
  }

  const toggleSchedule = async (action: 'pause' | 'resume') => {
    if (!schedule) return
    
    setActionLoading(true)
    try {
      const response = await fetch('/api/blog-scheduler/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduleId: schedule.id, action })
      })
      
      const data = await response.json()
      if (data.success) {
        setSchedule(prev => prev ? { ...prev, status: action === 'pause' ? 'paused' : 'active' } : null)
      }
    } catch (error) {
      console.error(`Failed to ${action} schedule:`, error)
    } finally {
      setActionLoading(false)
    }
  }

  const scheduleMoreWeeks = async (weeks: number) => {
    if (!schedule) return
    
    setActionLoading(true)
    try {
      const response = await fetch('/api/blog-scheduler/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          scheduleId: schedule.id, 
          action: 'schedule-more',
          weeks 
        })
      })
      
      const data = await response.json()
      if (data.success) {
        await loadScheduleData()
      }
    } catch (error) {
      console.error('Failed to schedule more weeks:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const runCronJob = async () => {
    setActionLoading(true)
    try {
      const response = await fetch('/api/blog-scheduler/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manual: true })
      })
      
      const data = await response.json()
      if (data.success) {
        await loadScheduleData()
      }
    } catch (error) {
      console.error('Failed to run manual publishing:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressPercentage = () => {
    if (!schedule) return 0
    return Math.round((schedule.currentCount / schedule.targetCount) * 100)
  }

  const getEstimatedWeeksRemaining = () => {
    if (!schedule) return 0
    const remaining = schedule.targetCount - schedule.currentCount
    return Math.ceil(remaining / schedule.postsPerWeek)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog Scheduler</h1>
        <p className="text-muted-foreground">
          Automated blog publishing system - 3 posts per week on random days/times
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schedule?.currentCount || 0} / {schedule?.targetCount || 1000}
            </div>
            <Progress value={getProgressPercentage()} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {getProgressPercentage()}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedule Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className={schedule ? getStatusColor(schedule.status) : 'bg-gray-100 text-gray-800'}>
                {schedule?.status || 'No Schedule'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {schedule?.postsPerWeek || 3} posts per week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Post</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.nextPublishDate 
                ? new Date(stats.nextPublishDate).toLocaleDateString()
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.nextPublishDate 
                ? new Date(stats.nextPublishDate).toLocaleTimeString()
                : 'No posts scheduled'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.successRate?.toFixed(1) || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.published || 0} published, {stats?.failed || 0} failed
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Management</TabsTrigger>
          <TabsTrigger value="queue">Publishing Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Schedule</CardTitle>
                <CardDescription>
                  Active blog publishing schedule details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span>Target Posts:</span>
                      <span className="font-semibold">{schedule.targetCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Posts Published:</span>
                      <span className="font-semibold">{schedule.currentCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Posts Per Week:</span>
                      <span className="font-semibold">{schedule.postsPerWeek}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Estimated Completion:</span>
                      <span className="font-semibold">
                        {new Date(schedule.estimatedEndDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Weeks Remaining:</span>
                      <span className="font-semibold">{getEstimatedWeeksRemaining()}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex gap-2">
                      {schedule.status === 'active' ? (
                        <Button 
                          variant="outline"
                          onClick={() => toggleSchedule('pause')}
                          disabled={actionLoading}
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Pause Schedule
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => toggleSchedule('resume')}
                          disabled={actionLoading}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Resume Schedule
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline"
                        onClick={runCronJob}
                        disabled={actionLoading}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Process Now
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Active Schedule</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a new blog publishing schedule to get started.
                    </p>
                    <CreateScheduleDialog onScheduleCreated={loadScheduleData} />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing Statistics</CardTitle>
                <CardDescription>
                  Recent publishing activity and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {stats.published}
                        </div>
                        <div className="text-sm text-green-700">Published</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {stats.pending}
                        </div>
                        <div className="text-sm text-blue-700">Pending</div>
                      </div>
                    </div>
                    
                    {stats.failed > 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          {stats.failed} posts failed to publish. Check the queue for details.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Recent Activity</h4>
                      <div className="space-y-2">
                        {stats.recentActivity?.slice(0, 5).map((activity, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>Post published</span>
                            <span className="text-muted-foreground">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No statistics available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Schedule Management Tab */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Management</CardTitle>
              <CardDescription>
                Configure and manage your automated blog publishing schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => scheduleMoreWeeks(2)}
                      disabled={actionLoading}
                      className="w-full justify-start"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Next 2 Weeks
                    </Button>
                    <Button 
                      onClick={() => scheduleMoreWeeks(4)}
                      disabled={actionLoading}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Next 4 Weeks
                    </Button>
                    <Button 
                      onClick={() => scheduleMoreWeeks(8)}
                      disabled={actionLoading}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Next 8 Weeks
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Content Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Country Guides</span>
                      <Badge variant="outline">40%</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Digital Nomad</span>
                      <Badge variant="outline">30%</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Comparisons</span>
                      <Badge variant="outline">20%</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">FAQ Pages</span>
                      <Badge variant="outline">10%</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Publishing Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Publishing Hours</Label>
                    <p className="text-sm text-muted-foreground">9 AM - 5 PM UTC</p>
                  </div>
                  <div>
                    <Label>Min Spacing</Label>
                    <p className="text-sm text-muted-foreground">24 hours</p>
                  </div>
                  <div>
                    <Label>Random Times</Label>
                    <p className="text-sm text-muted-foreground">Enabled</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publishing Queue Tab */}
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Queue</CardTitle>
              <CardDescription>
                Upcoming scheduled posts and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Timer className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Queue View Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed queue management interface will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Analytics</CardTitle>
              <CardDescription>
                Performance metrics and publishing trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and performance tracking will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Create Schedule Dialog Component
function CreateScheduleDialog({ onScheduleCreated }: { onScheduleCreated: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [targetCount, setTargetCount] = useState(1000)
  const [postsPerWeek, setPostsPerWeek] = useState(3)
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/blog-scheduler/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetCount, postsPerWeek, weeksToSchedule: 4 })
      })
      
      const data = await response.json()
      if (data.success) {
        setIsOpen(false)
        onScheduleCreated()
      }
    } catch (error) {
      console.error('Failed to create schedule:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Schedule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Blog Schedule</DialogTitle>
          <DialogDescription>
            Set up automated blog publishing with random scheduling
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="target">Target Number of Posts</Label>
            <Input
              id="target"
              type="number"
              value={targetCount}
              onChange={(e) => setTargetCount(parseInt(e.target.value))}
              min={1}
              max={10000}
            />
          </div>
          <div>
            <Label htmlFor="frequency">Posts Per Week</Label>
            <Select value={postsPerWeek.toString()} onValueChange={(value) => setPostsPerWeek(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 post per week</SelectItem>
                <SelectItem value="2">2 posts per week</SelectItem>
                <SelectItem value="3">3 posts per week</SelectItem>
                <SelectItem value="4">4 posts per week</SelectItem>
                <SelectItem value="5">5 posts per week</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Estimated Timeline</h4>
            <p className="text-sm text-muted-foreground">
              {Math.ceil(targetCount / postsPerWeek)} weeks to complete {targetCount} posts
              at {postsPerWeek} posts per week
            </p>
          </div>
          <Button onClick={handleCreate} disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Schedule'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Mock data for demonstration
const mockSchedule: BlogSchedule = {
  id: 'schedule-1',
  status: 'active',
  targetCount: 1000,
  currentCount: 47,
  postsPerWeek: 3,
  estimatedEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
}