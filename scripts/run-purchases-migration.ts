#!/usr/bin/env ts-node
/**
 * Run the purchases table migration
 * This script safely creates the purchases table in Supabase
 *
 * Usage: npx ts-node scripts/run-purchases-migration.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigration() {
  console.log('🚀 Running purchases table migration...')

  try {
    // Read the migration SQL
    const migrationPath = join(__dirname, '../packages/app/src/lib/database/migrations/002_purchases.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    console.log('📝 Migration SQL loaded from:', migrationPath)
    console.log('📏 SQL length:', migrationSQL.length, 'characters')

    // Execute the migration using raw SQL
    // Note: Supabase client doesn't have direct SQL execution, so we'll use the REST API
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: migrationSQL })

    if (error) {
      // If exec_sql doesn't exist, we need to run the SQL another way
      console.warn('⚠️ Direct SQL execution not available via RPC')
      console.log('📋 Please run this SQL manually in your Supabase dashboard:')
      console.log('\n' + '='.repeat(80))
      console.log(migrationSQL)
      console.log('='.repeat(80) + '\n')
      console.log('✅ Copy the SQL above and run it in:')
      console.log('   Supabase Dashboard → SQL Editor → New Query')
      return
    }

    console.log('✅ Migration completed successfully!')
    console.log('📊 Result:', data)

  } catch (error) {
    console.error('❌ Migration failed:', error)
    console.error('\n📋 Please run the SQL manually in your Supabase dashboard')
    console.error('   Migration file: packages/app/src/lib/database/migrations/002_purchases.sql')
    throw error
  }
}

// Run the migration
runMigration()
  .then(() => {
    console.log('\n✨ Migration script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Migration script failed:', error)
    process.exit(1)
  })
