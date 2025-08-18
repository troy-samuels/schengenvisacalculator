import { NextRequest, NextResponse } from 'next/server'

export interface UserSettings {
  id?: string
  preferences: {
    theme?: 'light' | 'dark' | 'system'
    language?: string
    dateFormat?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD'
    timezone?: string
    currency?: string
  }
  privacy: {
    analytics?: boolean
    crashReporting?: boolean
    dataSharing?: boolean
  }
  display: {
    compactMode?: boolean
    showTips?: boolean
    highlightWarnings?: boolean
  }
  calculations: {
    defaultWindow?: number // days
    showDebugInfo?: boolean
    autoSave?: boolean
  }
  lastModified?: string
}

export async function POST(request: NextRequest) {
  try {
    const userSettings: UserSettings = await request.json()
    
    // Validate settings structure
    if (!userSettings || typeof userSettings !== 'object') {
      return NextResponse.json(
        { error: 'Invalid settings format' },
        { status: 400 }
      )
    }

    // Validate specific fields if provided
    if (userSettings.preferences) {
      const { theme, dateFormat, language } = userSettings.preferences
      
      if (theme && !['light', 'dark', 'system'].includes(theme)) {
        return NextResponse.json(
          { error: 'Invalid theme value' },
          { status: 400 }
        )
      }

      if (dateFormat && !['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].includes(dateFormat)) {
        return NextResponse.json(
          { error: 'Invalid date format' },
          { status: 400 }
        )
      }

      if (language && !/^[a-z]{2}(-[A-Z]{2})?$/.test(language)) {
        return NextResponse.json(
          { error: 'Invalid language format (expected: en, en-US, etc.)' },
          { status: 400 }
        )
      }
    }

    // In a real application, you would:
    // 1. Authenticate the user
    // 2. Validate user permissions
    // 3. Store in database with proper user association
    // 4. Update user session/cache
    // 5. Log settings changes for audit
    
    const syncedSettings = {
      ...userSettings,
      id: userSettings.id || `settings-${Date.now()}`,
      lastModified: new Date().toISOString(),
      syncedAt: new Date().toISOString(),
      version: '1.0'
    }

    console.log('User settings sync successful:', {
      id: syncedSettings.id,
      hasPreferences: !!userSettings.preferences,
      hasPrivacy: !!userSettings.privacy,
      hasDisplay: !!userSettings.display,
      hasCalculations: !!userSettings.calculations,
      theme: userSettings.preferences?.theme,
      language: userSettings.preferences?.language,
      userAgent: request.headers.get('user-agent')?.substring(0, 50)
    })

    return NextResponse.json({ 
      success: true, 
      message: 'User settings synchronized successfully',
      settings: syncedSettings
    })

  } catch (error) {
    console.error('Error syncing user settings:', error)
    return NextResponse.json(
      { error: 'Failed to sync user settings' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, return user's settings from database
    // For now, return default settings
    
    const defaultSettings: UserSettings = {
      preferences: {
        theme: 'system',
        language: 'en',
        dateFormat: 'DD/MM/YYYY',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        currency: 'EUR'
      },
      privacy: {
        analytics: false,
        crashReporting: true,
        dataSharing: false
      },
      display: {
        compactMode: false,
        showTips: true,
        highlightWarnings: true
      },
      calculations: {
        defaultWindow: 180,
        showDebugInfo: false,
        autoSave: true
      }
    }
    
    console.log('User settings requested:', {
      userAgent: request.headers.get('user-agent')?.substring(0, 50)
    })
    
    return NextResponse.json({
      success: true,
      settings: defaultSettings,
      message: 'Default settings returned (database not configured)'
    })
  } catch (error) {
    console.error('Error fetching user settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user settings' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const partialSettings = await request.json()
    
    // In a real app, this would merge with existing settings
    console.log('Partial user settings update:', {
      fields: Object.keys(partialSettings),
      userAgent: request.headers.get('user-agent')?.substring(0, 50)
    })
    
    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      updatedFields: Object.keys(partialSettings)
    })
  } catch (error) {
    console.error('Error updating user settings:', error)
    return NextResponse.json(
      { error: 'Failed to update user settings' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Reset to default settings
    console.log('User settings reset requested:', {
      userAgent: request.headers.get('user-agent')?.substring(0, 50)
    })
    
    return NextResponse.json({
      success: true,
      message: 'Settings reset to defaults'
    })
  } catch (error) {
    console.error('Error resetting user settings:', error)
    return NextResponse.json(
      { error: 'Failed to reset user settings' },
      { status: 500 }
    )
  }
}