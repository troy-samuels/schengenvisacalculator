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
          // Visa tracking fields (for visa-required travelers)
          visa_type: 'tourist' | 'business' | 'student' | 'work' | 'transit' | 'none' | null
          visa_number: string | null
          visa_validity_start: string | null
          visa_validity_end: string | null
          visa_entries_allowed: 'single' | 'double' | 'multiple' | 'unlimited' | 'none' | null
          visa_entries_used: number | null
          visa_status: 'active' | 'expired' | 'pending' | 'rejected' | 'none' | null
          embassy_location: string | null
          insurance_expiry: string | null
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
          visa_type?: 'tourist' | 'business' | 'student' | 'work' | 'transit' | 'none' | null
          visa_number?: string | null
          visa_validity_start?: string | null
          visa_validity_end?: string | null
          visa_entries_allowed?: 'single' | 'double' | 'multiple' | 'unlimited' | 'none' | null
          visa_entries_used?: number | null
          visa_status?: 'active' | 'expired' | 'pending' | 'rejected' | 'none' | null
          embassy_location?: string | null
          insurance_expiry?: string | null
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
          visa_type?: 'tourist' | 'business' | 'student' | 'work' | 'transit' | 'none' | null
          visa_number?: string | null
          visa_validity_start?: string | null
          visa_validity_end?: string | null
          visa_entries_allowed?: 'single' | 'double' | 'multiple' | 'unlimited' | 'none' | null
          visa_entries_used?: number | null
          visa_status?: 'active' | 'expired' | 'pending' | 'rejected' | 'none' | null
          embassy_location?: string | null
          insurance_expiry?: string | null
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
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          status: 'active' | 'unsubscribed' | 'bounced'
          source: string | null
          lead_magnet: string | null
          subscribed_at: string
          unsubscribed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          status?: 'active' | 'unsubscribed' | 'bounced'
          source?: string | null
          lead_magnet?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          status?: 'active' | 'unsubscribed' | 'bounced'
          source?: string | null
          lead_magnet?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      user_analytics_consent: {
        Row: {
          user_id: string
          consent_given: boolean
          consent_version: string
          incentive_shown: string | null
          consented_at: string | null
          withdrawn_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          consent_given?: boolean
          consent_version?: string
          incentive_shown?: string | null
          consented_at?: string | null
          withdrawn_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          consent_given?: boolean
          consent_version?: string
          incentive_shown?: string | null
          consented_at?: string | null
          withdrawn_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_analytics_consent_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      analytics_travel_patterns: {
        Row: {
          id: string
          anonymous_user_hash: string
          time_period: string
          country: string
          duration_bucket: '1-7' | '8-14' | '15-30' | '31-60' | '61-90' | '90+'
          entry_type: 'schengen' | 'non_schengen'
          subscription_tier: 'free' | 'lifetime' | 'annual'
          user_cohort: string | null
          region: string | null
          device_category: 'mobile' | 'tablet' | 'desktop' | 'unknown' | null
          days_remaining_bucket: 'safe' | 'caution' | 'critical' | 'unknown' | null
          created_at: string
        }
        Insert: {
          id?: string
          anonymous_user_hash: string
          time_period: string
          country: string
          duration_bucket: '1-7' | '8-14' | '15-30' | '31-60' | '61-90' | '90+'
          entry_type: 'schengen' | 'non_schengen'
          subscription_tier: 'free' | 'lifetime' | 'annual'
          user_cohort?: string | null
          region?: string | null
          device_category?: 'mobile' | 'tablet' | 'desktop' | 'unknown' | null
          days_remaining_bucket?: 'safe' | 'caution' | 'critical' | 'unknown' | null
          created_at?: string
        }
        Update: {
          id?: string
          anonymous_user_hash?: string
          time_period?: string
          country?: string
          duration_bucket?: '1-7' | '8-14' | '15-30' | '31-60' | '61-90' | '90+'
          entry_type?: 'schengen' | 'non_schengen'
          subscription_tier?: 'free' | 'lifetime' | 'annual'
          user_cohort?: string | null
          region?: string | null
          device_category?: 'mobile' | 'tablet' | 'desktop' | 'unknown' | null
          days_remaining_bucket?: 'safe' | 'caution' | 'critical' | 'unknown' | null
          created_at?: string
        }
        Relationships: []
      }
      analytics_aggregated_insights: {
        Row: {
          id: string
          insight_type: string
          time_period: string
          country: string | null
          data: Json
          sample_size: number
          confidence_interval: number | null
          privacy_budget_epsilon: number
          published: boolean
          api_accessible: boolean
          calculated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          insight_type: string
          time_period: string
          country?: string | null
          data: Json
          sample_size: number
          confidence_interval?: number | null
          privacy_budget_epsilon?: number
          published?: boolean
          api_accessible?: boolean
          calculated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          insight_type?: string
          time_period?: string
          country?: string | null
          data?: Json
          sample_size?: number
          confidence_interval?: number | null
          privacy_budget_epsilon?: number
          published?: boolean
          api_accessible?: boolean
          calculated_at?: string
          published_at?: string | null
        }
        Relationships: []
      }
      api_partners: {
        Row: {
          id: string
          organization_name: string
          contact_email: string
          api_key_hash: string
          tier: 'free' | 'basic' | 'premium' | 'enterprise'
          rate_limit_per_hour: number
          monthly_fee_gbp: number
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          status: 'active' | 'inactive' | 'suspended' | 'trial'
          trial_ends_at: string | null
          created_at: string
          updated_at: string
          last_accessed_at: string | null
        }
        Insert: {
          id?: string
          organization_name: string
          contact_email: string
          api_key_hash: string
          tier?: 'free' | 'basic' | 'premium' | 'enterprise'
          rate_limit_per_hour?: number
          monthly_fee_gbp?: number
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: 'active' | 'inactive' | 'suspended' | 'trial'
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
          last_accessed_at?: string | null
        }
        Update: {
          id?: string
          organization_name?: string
          contact_email?: string
          api_key_hash?: string
          tier?: 'free' | 'basic' | 'premium' | 'enterprise'
          rate_limit_per_hour?: number
          monthly_fee_gbp?: number
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: 'active' | 'inactive' | 'suspended' | 'trial'
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
          last_accessed_at?: string | null
        }
        Relationships: []
      }
      api_access_log: {
        Row: {
          id: string
          partner_id: string | null
          endpoint: string
          method: 'GET' | 'POST' | 'PUT' | 'DELETE'
          query_params: Json | null
          status_code: number
          response_size_bytes: number | null
          response_time_ms: number | null
          accessed_at: string
        }
        Insert: {
          id?: string
          partner_id?: string | null
          endpoint: string
          method: 'GET' | 'POST' | 'PUT' | 'DELETE'
          query_params?: Json | null
          status_code: number
          response_size_bytes?: number | null
          response_time_ms?: number | null
          accessed_at?: string
        }
        Update: {
          id?: string
          partner_id?: string | null
          endpoint?: string
          method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
          query_params?: Json | null
          status_code?: number
          response_size_bytes?: number | null
          response_time_ms?: number | null
          accessed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_access_log_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "api_partners"
            referencedColumns: ["id"]
          }
        ]
      }
      user_nationalities: {
        Row: {
          user_id: string
          nationality_code: string
          nationality_name: string
          visa_required: boolean
          detected_at: string
          detection_method: string
          updated_at: string
        }
        Insert: {
          user_id: string
          nationality_code: string
          nationality_name: string
          visa_required?: boolean
          detected_at?: string
          detection_method?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          nationality_code?: string
          nationality_name?: string
          visa_required?: boolean
          detected_at?: string
          detection_method?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_nationalities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      visa_documents: {
        Row: {
          id: string
          user_id: string
          visa_type: string
          visa_number: string | null
          issue_date: string
          expiry_date: string
          entries_allowed: string
          entries_used: number
          schengen_countries: string[] | null
          document_url: string | null
          insurance_reference: string | null
          insurance_expiry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          visa_type: string
          visa_number?: string | null
          issue_date: string
          expiry_date: string
          entries_allowed: string
          entries_used?: number
          schengen_countries?: string[] | null
          document_url?: string | null
          insurance_reference?: string | null
          insurance_expiry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          visa_type?: string
          visa_number?: string | null
          issue_date?: string
          expiry_date?: string
          entries_allowed?: string
          entries_used?: number
          schengen_countries?: string[] | null
          document_url?: string | null
          insurance_reference?: string | null
          insurance_expiry?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "visa_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      visa_countries: {
        Row: {
          country_code: string
          country_name: string
          flag_emoji: string
          region: string | null
          visa_required: boolean
          visa_type_available: string[] | null
          population: number | null
          search_priority: number
        }
        Insert: {
          country_code: string
          country_name: string
          flag_emoji: string
          region?: string | null
          visa_required?: boolean
          visa_type_available?: string[] | null
          population?: number | null
          search_priority?: number
        }
        Update: {
          country_code?: string
          country_name?: string
          flag_emoji?: string
          region?: string | null
          visa_required?: boolean
          visa_type_available?: string[] | null
          population?: number | null
          search_priority?: number
        }
        Relationships: []
      }
      visa_partner_referrals: {
        Row: {
          id: string
          user_id: string
          partner_name: string
          referral_url: string
          country_code: string
          visa_type: string
          clicked_at: string
          conversion_at: string | null
          commission_earned: number | null
          commission_status: 'pending' | 'paid' | 'rejected'
        }
        Insert: {
          id?: string
          user_id: string
          partner_name: string
          referral_url: string
          country_code: string
          visa_type: string
          clicked_at?: string
          conversion_at?: string | null
          commission_earned?: number | null
          commission_status?: 'pending' | 'paid' | 'rejected'
        }
        Update: {
          id?: string
          user_id?: string
          partner_name?: string
          referral_url?: string
          country_code?: string
          visa_type?: string
          clicked_at?: string
          conversion_at?: string | null
          commission_earned?: number | null
          commission_status?: 'pending' | 'paid' | 'rejected'
        }
        Relationships: [
          {
            foreignKeyName: "visa_partner_referrals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      visa_alerts: {
        Row: {
          id: string
          user_id: string
          visa_document_id: string
          alert_type: 'expiry_90_days' | 'expiry_60_days' | 'expiry_30_days' | 'expiry_7_days' | 'expired'
          alert_date: string
          sent: boolean
          sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          visa_document_id: string
          alert_type: 'expiry_90_days' | 'expiry_60_days' | 'expiry_30_days' | 'expiry_7_days' | 'expired'
          alert_date: string
          sent?: boolean
          sent_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          visa_document_id?: string
          alert_type?: 'expiry_90_days' | 'expiry_60_days' | 'expiry_30_days' | 'expiry_7_days' | 'expired'
          alert_date?: string
          sent?: boolean
          sent_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "visa_alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visa_alerts_visa_document_id_fkey"
            columns: ["visa_document_id"]
            isOneToOne: false
            referencedRelation: "visa_documents"
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