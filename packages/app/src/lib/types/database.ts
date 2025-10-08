export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          subscription_tier: 'free' | 'lifetime' | 'annual'
          subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled'
          trial_ends_at: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          subscription_tier?: 'free' | 'lifetime' | 'annual'
          subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled'
          trial_ends_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          subscription_tier?: 'free' | 'lifetime' | 'annual'
          subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled'
          trial_ends_at?: string | null
        }
        Relationships: []
      }
      visa_entries: {
        Row: {
          id: string
          user_id: string
          country: string
          start_date: string
          end_date: string
          entry_type: 'schengen' | 'non_schengen'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          country: string
          start_date: string
          end_date: string
          entry_type: 'schengen' | 'non_schengen'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          country?: string
          start_date?: string
          end_date?: string
          entry_type?: 'schengen' | 'non_schengen'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "visa_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      trip_collections: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_collections_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      },
      purchases: {
        Row: {
          id: string
          user_id: string
          product: 'ees_guide'
          status: 'paid' | 'refunded' | 'cancelled'
          amount: number | null
          currency: string | null
          stripe_session_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product: 'ees_guide'
          status: 'paid' | 'refunded' | 'cancelled'
          amount?: number | null
          currency?: string | null
          stripe_session_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product?: 'ees_guide'
          status?: 'paid' | 'refunded' | 'cancelled'
          amount?: number | null
          currency?: string | null
          stripe_session_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: 'free' | 'lifetime' | 'annual'
      subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled'
      entry_type: 'schengen' | 'non_schengen'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}