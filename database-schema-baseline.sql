-- SCHENGEN VISA CALCULATOR - DATABASE SCHEMA BASELINE
-- Generated: August 25, 2025
-- Branch: fix/regenerate-lockfile
-- Phase: 0 - Pre-refactor baseline

-- ===========================================
-- CORE DATABASE SCHEMA
-- ===========================================

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  flag VARCHAR(10) NOT NULL,
  is_schengen BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Schengen countries
INSERT INTO countries (code, name, flag, is_schengen) VALUES
('AT', 'Austria', '🇦🇹', true),
('BE', 'Belgium', '🇧🇪', true),
('BG', 'Bulgaria', '🇧🇬', true),
('HR', 'Croatia', '🇭🇷', true),
('CY', 'Cyprus', '🇨🇾', true),
('CZ', 'Czech Republic', '🇨🇿', true),
('DK', 'Denmark', '🇩🇰', true),
('EE', 'Estonia', '🇪🇪', true),
('FI', 'Finland', '🇫🇮', true),
('FR', 'France', '🇫🇷', true),
('DE', 'Germany', '🇩🇪', true),
('GR', 'Greece', '🇬🇷', true),
('HU', 'Hungary', '🇭🇺', true),
('IS', 'Iceland', '🇮🇸', true),
('IT', 'Italy', '🇮🇹', true),
('LV', 'Latvia', '🇱🇻', true),
('LI', 'Liechtenstein', '🇱🇮', true),
('LT', 'Lithuania', '🇱🇹', true),
('LU', 'Luxembourg', '🇱🇺', true),
('MT', 'Malta', '🇲🇹', true),
('NL', 'Netherlands', '🇳🇱', true),
('NO', 'Norway', '🇳🇴', true),
('PL', 'Poland', '🇵🇱', true),
('PT', 'Portugal', '🇵🇹', true),
('RO', 'Romania', '🇷🇴', true),
('SK', 'Slovakia', '🇸🇰', true),
('SI', 'Slovenia', '🇸🇮', true),
('ES', 'Spain', '🇪🇸', true),
('SE', 'Sweden', '🇸🇪', true),
('CH', 'Switzerland', '🇨🇭', true)
ON CONFLICT (code) DO NOTHING;

-- Create user profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  country_code VARCHAR(5) DEFAULT '+1',
  home_country VARCHAR(2),
  travel_reason TEXT,
  profile_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create visa entries table
CREATE TABLE IF NOT EXISTS visa_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  country_code VARCHAR(2) REFERENCES countries(code) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days INTEGER GENERATED ALWAYS AS (end_date - start_date + 1) STORED,
  notes TEXT,
  trip_collection_id UUID REFERENCES trip_collections(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip collections table (for grouping related trips)
CREATE TABLE IF NOT EXISTS trip_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(200) NOT NULL DEFAULT 'My Trip',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- ROW LEVEL SECURITY POLICIES
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for visa_entries
CREATE POLICY "Users can view own visa entries" ON visa_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own visa entries" ON visa_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own visa entries" ON visa_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own visa entries" ON visa_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for trip_collections
CREATE POLICY "Users can view own trip collections" ON trip_collections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trip collections" ON trip_collections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trip collections" ON trip_collections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trip collections" ON trip_collections
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policy for countries (public read)
CREATE POLICY "Anyone can view countries" ON countries
  FOR SELECT USING (true);

-- ===========================================
-- TRIGGERS AND FUNCTIONS
-- ===========================================

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visa_entries_updated_at
  BEFORE UPDATE ON visa_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trip_collections_updated_at
  BEFORE UPDATE ON trip_collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- TYPESCRIPT TYPE DEFINITIONS SNAPSHOT
-- ===========================================
/*
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          country_code: string | null
          home_country: string | null
          travel_reason: string | null
          profile_completed: boolean | null
          created_at: string
          updated_at: string
        }
      }
      countries: {
        Row: {
          code: string
          name: string
          flag: string
          is_schengen: boolean | null
          created_at: string
        }
      }
      visa_entries: {
        Row: {
          id: string
          user_id: string
          country_code: string
          start_date: string
          end_date: string
          days: number | null
          notes: string | null
          trip_collection_id: string | null
          created_at: string
          updated_at: string
        }
      }
      trip_collections: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
*/