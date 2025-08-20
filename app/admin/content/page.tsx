'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FileText, 
  Globe, 
  Users, 
  TrendingUp, 
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface GeneratedPage {
  id: string
  templateId: string
  slug: string
  title: string
  metaDescription: string
  seoScore: number
  status: 'published' | 'draft' | 'needs-review'
  createdAt: string
  updatedAt: string
  views?: number
}

interface ContentJob {
  id: string
  type: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress: number
  totalPages?: number
  completedPages?: number
  createdAt: string
  errors?: string[]
}

interface ContentMetrics {
  totalPages: number
  publishedPages: number
  draftPages: number
  avgSeoScore: number
  totalViews: number
  topPerformingPages: GeneratedPage[]
  recentlyGenerated: GeneratedPage[]
}

export default function ContentManagementPage() {
  const [pages, setPages] = useState<GeneratedPage[]>([])
  const [jobs, setJobs] = useState<ContentJob[]>([])
  const [metrics, setMetrics] = useState<ContentMetrics | null>(null)
  const [selectedJob, setSelectedJob] = useState<ContentJob | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadContentData()
  }, [])

  const loadContentData = async () => {
    // In a real app, this would fetch from your API
    setPages(mockPages)
    setJobs(mockJobs)
    setMetrics(mockMetrics)
  }

  const startContentGeneration = async (type: string) => {
    setIsGenerating(true)
    
    try {
      // Create new job
      const newJob: ContentJob = {
        id: `job-${Date.now()}`,
        type: type,
        status: 'running',
        progress: 0,
        totalPages: type === 'all' ? 500 : 50,
        completedPages: 0,
        createdAt: new Date().toISOString()
      }
      
      setJobs(prev => [newJob, ...prev])
      setSelectedJob(newJob)

      // Simulate progress
      const interval = setInterval(() => {
        setJobs(prev => prev.map(job => {
          if (job.id === newJob.id) {
            const newProgress = Math.min(job.progress + Math.random() * 10, 100)
            const newCompleted = Math.floor((newProgress / 100) * (job.totalPages || 1))
            
            return {
              ...job,
              progress: newProgress,
              completedPages: newCompleted,
              status: newProgress >= 100 ? 'completed' : 'running'
            }
          }
          return job
        }))
        
        setSelectedJob(prev => {
          if (prev && prev.id === newJob.id) {
            const newProgress = Math.min(prev.progress + Math.random() * 10, 100)
            return {
              ...prev,
              progress: newProgress,
              completedPages: Math.floor((newProgress / 100) * (prev.totalPages || 1)),
              status: newProgress >= 100 ? 'completed' : 'running'
            }
          }
          return prev
        })
      }, 1000)

      // Stop after completion
      setTimeout(() => {
        clearInterval(interval)
        setIsGenerating(false)
      }, 10000)

    } catch (error) {
      console.error('Content generation failed:', error)
      setIsGenerating(false)
    }
  }

  const filteredPages = pages.filter(page => {
    const matchesFilter = filter === 'all' || page.status === filter
    const matchesSearch = searchQuery === '' || 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'needs-review': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getJobStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'running': return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default: return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Management</h1>
        <p className="text-muted-foreground">
          Generate and manage SEO-optimized content at scale
        </p>
      </div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalPages}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.publishedPages} published
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg SEO Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.avgSeoScore}%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Pages</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.draftPages}</div>
              <p className="text-xs text-muted-foreground">
                Needs review
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">Generated Pages</TabsTrigger>
          <TabsTrigger value="generator">Content Generator</TabsTrigger>
          <TabsTrigger value="jobs">Generation Jobs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Generated Pages Tab */}
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Generated Pages</CardTitle>
                  <CardDescription>
                    Manage your automatically generated content
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Page
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Page</DialogTitle>
                        <DialogDescription>
                          Manually create a new content page
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" placeholder="Page title" />
                        </div>
                        <div>
                          <Label htmlFor="slug">URL Slug</Label>
                          <Input id="slug" placeholder="page-slug" />
                        </div>
                        <div>
                          <Label htmlFor="template">Template</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="country-to-schengen">Country to Schengen</SelectItem>
                              <SelectItem value="digital-nomad">Digital Nomad Guide</SelectItem>
                              <SelectItem value="visa-comparison">Visa Comparison</SelectItem>
                              <SelectItem value="faq">FAQ Page</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Create Page</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="needs-review">Needs Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pages List */}
              <div className="space-y-4">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{page.title}</h3>
                          <Badge className={getStatusColor(page.status)}>
                            {page.status}
                          </Badge>
                          <Badge variant="outline">
                            SEO: {page.seoScore}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          /{page.slug}
                        </p>
                        <p className="text-sm text-gray-600">
                          {page.metaDescription}
                        </p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Created: {new Date(page.createdAt).toLocaleDateString()}</span>
                          <span>Updated: {new Date(page.updatedAt).toLocaleDateString()}</span>
                          {page.views && <span>Views: {page.views.toLocaleString()}</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Generator Tab */}
        <TabsContent value="generator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Content Generation</CardTitle>
                <CardDescription>
                  Generate hundreds of SEO pages automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => startContentGeneration('country-to-schengen')}
                    disabled={isGenerating}
                    className="h-20 flex-col"
                  >
                    <Globe className="h-6 w-6 mb-2" />
                    Country to Schengen
                    <span className="text-xs opacity-75">~50 pages</span>
                  </Button>
                  
                  <Button
                    onClick={() => startContentGeneration('digital-nomad')}
                    disabled={isGenerating}
                    className="h-20 flex-col"
                    variant="outline"
                  >
                    <Users className="h-6 w-6 mb-2" />
                    Digital Nomad Guides
                    <span className="text-xs opacity-75">~30 pages</span>
                  </Button>
                  
                  <Button
                    onClick={() => startContentGeneration('visa-comparison')}
                    disabled={isGenerating}
                    className="h-20 flex-col"
                    variant="outline"
                  >
                    <BarChart3 className="h-6 w-6 mb-2" />
                    Visa Comparisons
                    <span className="text-xs opacity-75">~200 pages</span>
                  </Button>
                  
                  <Button
                    onClick={() => startContentGeneration('all')}
                    disabled={isGenerating}
                    className="h-20 flex-col"
                    variant="outline"
                  >
                    <FileText className="h-6 w-6 mb-2" />
                    Generate All
                    <span className="text-xs opacity-75">~500 pages</span>
                  </Button>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Generation Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>AI Content Variation</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Auto-publish</Label>
                      <Select defaultValue="draft">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="review">Needs Review</SelectItem>
                          <SelectItem value="publish">Auto-publish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Generation Job */}
            {selectedJob && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getJobStatusIcon(selectedJob.status)}
                    Current Generation Job
                  </CardTitle>
                  <CardDescription>
                    {selectedJob.type} - {selectedJob.status}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{selectedJob.completedPages}/{selectedJob.totalPages} pages</span>
                      </div>
                      <Progress value={selectedJob.progress} />
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Started:</span>
                        <span>{new Date(selectedJob.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="capitalize">{selectedJob.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge className={selectedJob.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                       selectedJob.status === 'running' ? 'bg-blue-100 text-blue-800' : 
                                       'bg-gray-100 text-gray-800'}>
                          {selectedJob.status}
                        </Badge>
                      </div>
                    </div>

                    {selectedJob.errors && selectedJob.errors.length > 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          {selectedJob.errors.length} errors occurred during generation
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Generation Jobs Tab */}
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Generation History</CardTitle>
              <CardDescription>
                View all content generation jobs and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getJobStatusIcon(job.status)}
                        <div>
                          <h3 className="font-medium capitalize">{job.type}</h3>
                          <p className="text-sm text-muted-foreground">
                            Started {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {job.completedPages}/{job.totalPages} pages
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round(job.progress)}% complete
                        </div>
                      </div>
                    </div>
                    {job.progress < 100 && job.status === 'running' && (
                      <Progress value={job.progress} className="mt-3" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>
                  Analytics and insights for your generated content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Detailed performance metrics and SEO insights will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock data for demonstration
const mockPages: GeneratedPage[] = [
  {
    id: '1',
    templateId: 'country-to-schengen',
    slug: 'united-states-to-schengen-visa-requirements',
    title: 'United States to Schengen Visa Requirements 2024 | Complete Travel Guide',
    metaDescription: 'Complete visa guide for US citizens traveling to Schengen Area. Visa-free travel information & expert tips.',
    seoScore: 88,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    views: 12450
  },
  {
    id: '2',
    templateId: 'digital-nomad-guide',
    slug: 'digital-nomad-guide-portugal',
    title: 'Digital Nomad Guide: Portugal - Visa, Costs & Best Cities 2024',
    metaDescription: 'Complete digital nomad guide for Portugal. D7 visa, cost of living, best cities, and practical tips.',
    seoScore: 92,
    status: 'published',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    views: 8730
  },
  {
    id: '3',
    templateId: 'visa-comparison',
    slug: 'india-vs-china-schengen-visa-comparison',
    title: 'India vs China: Schengen Visa Requirements Comparison',
    metaDescription: 'Compare Schengen visa requirements for Indian and Chinese citizens. Costs, processing times, and requirements.',
    seoScore: 75,
    status: 'needs-review',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    views: 3210
  }
]

const mockJobs: ContentJob[] = [
  {
    id: 'job-1',
    type: 'country-to-schengen',
    status: 'completed',
    progress: 100,
    totalPages: 50,
    completedPages: 50,
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'job-2',
    type: 'digital-nomad',
    status: 'running',
    progress: 65,
    totalPages: 30,
    completedPages: 19,
    createdAt: '2024-01-15T10:30:00Z'
  }
]

const mockMetrics: ContentMetrics = {
  totalPages: 127,
  publishedPages: 89,
  draftPages: 38,
  avgSeoScore: 84,
  totalViews: 45680,
  topPerformingPages: mockPages,
  recentlyGenerated: mockPages
}