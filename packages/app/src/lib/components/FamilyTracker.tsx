/**
 * Family Tracking System for Premium Users - Phase 2 Feature
 * Key differentiator for £4.99 Lifetime tier
 * Allows tracking up to 4 family members' Schengen compliance
 * TROJAN HORSE: Hidden until Month 4 (Phase 2 reveal)
 */

'use client'

import React, { useState, useEffect } from 'react'
import { UserStatus } from '../types/user-status'
import { Button } from '@schengen/ui'
// import { PhaseGate } from '@schengen/ui'  // Commented out for EES launch
import { usePhaseControl } from '../../providers/PhaseControlProvider'
import { UserTier } from '../phase-control'
import { User, Plus, Calendar, AlertTriangle, CheckCircle, Settings, Trash2, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Family member interface
interface FamilyMember {
  id: string
  name: string
  relationship: string
  nationality: string
  trips: FamilyTrip[]
  daysUsed: number
  daysRemaining: number
  isCompliant: boolean
  lastCalculated: Date
}

interface FamilyTrip {
  id: string
  country: string
  startDate: Date
  endDate: Date
  days: number
}

interface FamilyTrackerProps {
  userStatus: UserStatus
  userId?: string
  onUpgradeRequired?: () => void
  className?: string
}

// Convert UserStatus to UserTier for phase control
function userStatusToTier(userStatus: UserStatus): UserTier {
  switch (userStatus) {
    case UserStatus.LIFETIME:
      return UserTier.LIFETIME
    case UserStatus.ANNUAL:
      return UserTier.ANNUAL
    default:
      return UserTier.FREE
  }
}

const RELATIONSHIP_OPTIONS = [
  'Spouse/Partner',
  'Child',
  'Parent',
  'Sibling',
  'Other Family'
]

const SCHENGEN_COUNTRIES = [
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  // ... add more as needed
]

// Mock family member data for demo
const DEMO_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'demo-1',
    name: 'Sarah Johnson',
    relationship: 'Spouse/Partner',
    nationality: 'UK',
    trips: [
      {
        id: 'trip-1',
        country: 'France',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-14'),
        days: 14
      },
      {
        id: 'trip-2',
        country: 'Spain',
        startDate: new Date('2024-08-10'),
        endDate: new Date('2024-08-24'),
        days: 15
      }
    ],
    daysUsed: 29,
    daysRemaining: 61,
    isCompliant: true,
    lastCalculated: new Date()
  },
  {
    id: 'demo-2',
    name: 'Emma Johnson',
    relationship: 'Child',
    nationality: 'UK',
    trips: [
      {
        id: 'trip-3',
        country: 'Germany',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-07-21'),
        days: 21
      }
    ],
    daysUsed: 21,
    daysRemaining: 69,
    isCompliant: true,
    lastCalculated: new Date()
  }
]

function FamilyMemberCard({ 
  member, 
  onEdit, 
  onDelete, 
  onAddTrip 
}: {
  member: FamilyMember
  onEdit: (member: FamilyMember) => void
  onDelete: (memberId: string) => void
  onAddTrip: (memberId: string) => void
}) {
  const getComplianceColor = (isCompliant: boolean, daysRemaining: number) => {
    if (!isCompliant) return 'text-red-600 bg-red-50 border-red-200'
    if (daysRemaining < 30) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getStatusIcon = (isCompliant: boolean, daysRemaining: number) => {
    if (!isCompliant) return <AlertTriangle className="w-4 h-4" />
    if (daysRemaining < 30) return <AlertTriangle className="w-4 h-4" />
    return <CheckCircle className="w-4 h-4" />
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.relationship} • {member.nationality}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onEdit(member)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={() => onDelete(member.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Compliance Status */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border mb-3 ${getComplianceColor(member.isCompliant, member.daysRemaining)}`}>
        {getStatusIcon(member.isCompliant, member.daysRemaining)}
        <span>
          {member.daysRemaining} days remaining
          {!member.isCompliant && ' - Over Limit!'}
        </span>
      </div>

      {/* Trip Summary */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{member.daysUsed}</div>
          <div className="text-xs text-gray-500">Days Used</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{member.trips.length}</div>
          <div className="text-xs text-gray-500">Total Trips</div>
        </div>
      </div>

      {/* Recent Trips */}
      {member.trips.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Trips</h4>
          <div className="space-y-1">
            {member.trips.slice(0, 2).map((trip) => (
              <div key={trip.id} className="flex justify-between text-xs text-gray-600">
                <span>{trip.country}</span>
                <span>{trip.days} days</span>
              </div>
            ))}
            {member.trips.length > 2 && (
              <div className="text-xs text-gray-500">
                +{member.trips.length - 2} more trips
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Trip Button */}
      <Button
        onClick={() => onAddTrip(member.id)}
        variant="outline"
        size="sm"
        className="w-full"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Add Trip
      </Button>
    </div>
  )
}

function AddFamilyMemberModal({ 
  isOpen, 
  onClose, 
  onAdd 
}: {
  isOpen: boolean
  onClose: () => void
  onAdd: (member: Omit<FamilyMember, 'id' | 'trips' | 'daysUsed' | 'daysRemaining' | 'isCompliant' | 'lastCalculated'>) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    nationality: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.relationship && formData.nationality) {
      onAdd(formData)
      setFormData({ name: '', relationship: '', nationality: '' })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Family Member</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter family member's name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select relationship</option>
              {RELATIONSHIP_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., UK, US, Canadian"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Member
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

function FamilyTrackerCore({
  userStatus,
  userId,
  onUpgradeRequired,
  className = ''
}: FamilyTrackerProps) {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(DEMO_FAMILY_MEMBERS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Only show to premium users
  if (userStatus === UserStatus.FREE) {
    return (
      <div className={`family-tracker-upgrade ${className}`}>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            Family Travel Tracking
          </h3>
          <p className="text-blue-800 mb-4">
            Keep your whole family Schengen-compliant. Track up to 4 family members' trips, 
            get coordinated alerts, and never worry about anyone overstaying.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Track 4 family members</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Coordinated trip planning</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Family compliance alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Shared trip calendar</span>
            </div>
          </div>
          <Button
            onClick={onUpgradeRequired}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Upgrade to Premium - £9.99/year
          </Button>
        </div>
      </div>
    )
  }

  const handleAddMember = (memberData: Omit<FamilyMember, 'id' | 'trips' | 'daysUsed' | 'daysRemaining' | 'isCompliant' | 'lastCalculated'>) => {
    const newMember: FamilyMember = {
      ...memberData,
      id: Date.now().toString(),
      trips: [],
      daysUsed: 0,
      daysRemaining: 90,
      isCompliant: true,
      lastCalculated: new Date()
    }
    setFamilyMembers(prev => [...prev, newMember])
  }

  const handleDeleteMember = (memberId: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== memberId))
  }

  const handleEditMember = (member: FamilyMember) => {
    // TODO: Implement edit modal
    console.log('Edit member:', member)
  }

  const handleAddTrip = (memberId: string) => {
    // TODO: Implement add trip modal for specific member
    console.log('Add trip for member:', memberId)
  }

  const canAddMoreMembers = familyMembers.length < 4

  return (
    <div className={`family-tracker ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Family Travel Tracking</h2>
            <p className="text-sm text-gray-600">
              {familyMembers.length}/4 family members • Premium feature
            </p>
          </div>
        </div>

        {canAddMoreMembers && (
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        )}
      </div>

      {/* Family Members Grid */}
      {familyMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {familyMembers.map((member) => (
            <FamilyMemberCard
              key={member.id}
              member={member}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
              onAddTrip={handleAddTrip}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No family members added yet</h3>
          <p className="text-gray-600 mb-4">
            Add up to 4 family members to track their Schengen compliance together.
          </p>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add First Member
          </Button>
        </div>
      )}

      {/* Family Overview */}
      {familyMembers.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Family Overview</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{familyMembers.length}</div>
              <div className="text-xs text-gray-500">Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {familyMembers.filter(m => m.isCompliant).length}
              </div>
              <div className="text-xs text-gray-500">Compliant</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {familyMembers.filter(m => m.daysRemaining < 30).length}
              </div>
              <div className="text-xs text-gray-500">Needs Attention</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      <AddFamilyMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddMember}
      />
    </div>
  )
}

/**
 * Phase-Controlled Family Tracker Export
 * This is the main export that wraps the core component with Trojan Horse phase control
 */
export function FamilyTracker({
  userStatus,
  userId,
  onUpgradeRequired,
  className = ''
}: FamilyTrackerProps) {
  // Direct rendering for EES launch
  return (
    <FamilyTrackerCore
      userStatus={userStatus}
      userId={userId}
      onUpgradeRequired={onUpgradeRequired}
      className={className}
    />
  )
}