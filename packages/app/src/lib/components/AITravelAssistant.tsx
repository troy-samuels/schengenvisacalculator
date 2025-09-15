/**
 * AI Travel Assistant Component
 * Premium feature providing intelligent chat interface and personalized recommendations
 * Integrates with OpenAI for real-time travel guidance and compliance monitoring
 */

'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button, Badge } from '@schengen/ui'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  Loader2,
  Sparkles,
  Crown,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Trash2,
  ExternalLink
} from 'lucide-react'
import { AITravelAssistant as AITravelAssistantService, AIConversationMessage, AIRecommendation, TravelAssistantContext, Trip } from '../services/ai-travel-assistant'
import { UserStatus } from '../types/user-status'

export interface AITravelAssistantProps {
  userStatus: UserStatus
  trips: Trip[]
  upcomingTrips: Trip[]
  userEmail?: string
  className?: string
}

const RECOMMENDATION_ICONS = {
  compliance: AlertTriangle,
  optimization: Lightbulb,
  destination: MapPin,
  planning: Calendar,
  warning: AlertTriangle
} as const

const PRIORITY_COLORS = {
  critical: 'bg-red-100 border-red-200 text-red-900',
  high: 'bg-orange-100 border-orange-200 text-orange-900',
  medium: 'bg-blue-100 border-blue-200 text-blue-900',
  low: 'bg-gray-100 border-gray-200 text-gray-900'
} as const

export function AITravelAssistant({ userStatus, trips, upcomingTrips, userEmail, className = '' }: AITravelAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<AIConversationMessage[]>([])
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize AI assistant and load conversation history
  useEffect(() => {
    if (userStatus !== UserStatus.FREE) {
      // Initialize AI assistant (API key handled server-side)
      AITravelAssistantService.initialize()
      
      // Load conversation history
      const history = AITravelAssistantService.loadConversationHistory()
      setMessages(history)
      
      // Generate initial recommendations
      loadRecommendations()
    }
  }, [userStatus])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-save conversation history
  useEffect(() => {
    if (messages.length > 0) {
      AITravelAssistantService.saveConversationHistory(messages)
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const buildContext = useCallback((): TravelAssistantContext => {
    return {
      userStatus,
      currentTrips: trips,
      upcomingTrips,
      currentLocation: 'Unknown'
    }
  }, [userStatus, trips, upcomingTrips])

  const loadRecommendations = async () => {
    if (userStatus === UserStatus.FREE) return

    setIsLoadingRecommendations(true)
    try {
      const context = buildContext()
      const newRecommendations = await AITravelAssistantService.generateRecommendations(context)
      setRecommendations(newRecommendations)
    } catch (error) {
      console.error('[AITravelAssistant] Failed to load recommendations:', error)
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: AIConversationMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setError(null)

    try {
      const context = buildContext()
      const response = await AITravelAssistantService.chatWithAssistant(
        userMessage.content,
        context,
        messages
      )

      const assistantMessage: AIConversationMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        recommendations: response.recommendations
      }

      setMessages(prev => [...prev, assistantMessage])

      if (response.recommendations.length > 0) {
        setRecommendations(prev => [
          ...response.recommendations,
          ...prev.filter(rec => !response.recommendations.some(newRec => newRec.id === rec.id))
        ])
      }

    } catch (error) {
      console.error('[AITravelAssistant] Chat error:', error)
      setError('Failed to get response from AI assistant. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    AITravelAssistantService.clearConversationHistory()
  }

  const dismissRecommendation = (recommendationId: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== recommendationId))
  }

  // Non-premium users see upgrade prompt
  if (userStatus === UserStatus.FREE) {
    return (
      <div className={`bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border border-purple-200 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <Bot className="w-12 h-12 text-purple-600" />
              <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-purple-900 flex items-center justify-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-purple-600" />
            AI Travel Assistant
          </h3>
          <p className="text-purple-800 mb-6">
            Get personalized travel guidance, compliance monitoring, and intelligent trip planning powered by AI
          </p>
          
          <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
              <MessageSquare className="w-5 h-5 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-900">Smart Chat</p>
              <p className="text-purple-700 text-xs">Ask questions about visa rules</p>
            </div>
            <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
              <Lightbulb className="w-5 h-5 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-900">AI Recommendations</p>
              <p className="text-purple-700 text-xs">Personalized travel advice</p>
            </div>
            <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
              <AlertTriangle className="w-5 h-5 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-900">Compliance Alerts</p>
              <p className="text-purple-700 text-xs">Prevent visa violations</p>
            </div>
            <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
              <MapPin className="w-5 h-5 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-900">Trip Optimization</p>
              <p className="text-purple-700 text-xs">Maximize your travel time</p>
            </div>
          </div>
          
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium £9.99/year
          </Button>
          
          <p className="text-xs text-purple-600 mt-3">
            Join thousands of travelers using AI for smarter European travel
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border border-blue-200 rounded-lg ${className}`}>
      <div 
        className="cursor-pointer transition-colors hover:bg-blue-50/50 rounded-t-lg p-4" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                AI Travel Assistant
                <Badge className="bg-purple-100 text-purple-800 text-xs">
                  Premium
                </Badge>
              </h3>
              <p className="text-blue-700 text-sm">
                Your intelligent European travel companion
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {recommendations.length > 0 && (
              <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                {recommendations.length} alerts
              </Badge>
            )}
            {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0">
          {/* AI Recommendations Section */}
          {recommendations.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  AI Recommendations
                </h4>
                <Button 
                  onClick={loadRecommendations}
                  disabled={isLoadingRecommendations}
                  className="text-sm"
                >
                  {isLoadingRecommendations ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
                </Button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recommendations.map((recommendation) => {
                  const Icon = RECOMMENDATION_ICONS[recommendation.type]
                  return (
                    <div 
                      key={recommendation.id}
                      className={`p-4 rounded-lg border ${PRIORITY_COLORS[recommendation.priority]} relative`}
                    >
                      <button
                        onClick={() => dismissRecommendation(recommendation.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
                      >
                        ×
                      </button>
                      
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 pr-6">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-sm">{recommendation.title}</h5>
                            <Badge className="text-xs">
                              {recommendation.priority}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{recommendation.message}</p>
                          
                          {recommendation.metadata?.links && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                              {recommendation.metadata.links.map((link, index) => (
                                <Button 
                                  key={index}
                                  className="text-xs h-7 px-2"
                                  asChild
                                >
                                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </a>
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          {recommendation.metadata?.estimatedSavings && (
                            <p className="text-xs mt-2 text-green-700 font-medium">
                              💰 Potential savings: €{recommendation.metadata.estimatedSavings}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 my-4"></div>

          {/* Chat Interface */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat with AI Assistant
              </h4>
              {messages.length > 0 && (
                <Button onClick={clearChat} className="text-sm">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Chat Messages */}
            <div className="h-80 w-full border rounded-lg bg-white/50 overflow-y-auto">
              <div className="p-4 space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div className="text-center text-gray-500 py-8">
                    <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm mb-2">👋 Hi! I'm your AI Travel Assistant</p>
                    <p className="text-xs">Ask me about Schengen visa compliance, travel planning, or destination recommendations!</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        AI is thinking...
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about visa rules, travel plans, or get destination recommendations..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                maxLength={500}
              />
              <Button 
                type="submit" 
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center">
              🔒 Powered by OpenAI GPT-4 • Your conversations are private and secure
            </p>
          </div>
        </div>
      )}
    </div>
  )
}