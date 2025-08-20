'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const countries = [
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
]

export default function TestSelect() {
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [nativeSelect, setNativeSelect] = useState<string>("")
  const [log, setLog] = useState<string[]>([])

  const addLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toISOString()}: ${message}`])
  }

  const handleSelectChange = (value: string) => {
    addLog(`Select onChange triggered with value: ${value}`)
    setSelectedCountry(value)
  }

  const handleNativeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    addLog(`Native select onChange triggered with value: ${e.target.value}`)
    setNativeSelect(e.target.value)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Select Component Test</h1>
      
      {/* Test 1: Radix UI Select */}
      <div className="p-4 border rounded-lg space-y-4">
        <h2 className="font-semibold">Radix UI Select Component</h2>
        <Select value={selectedCountry} onValueChange={handleSelectChange}>
          <SelectTrigger 
            className="w-full"
            onClick={() => addLog('SelectTrigger clicked')}
          >
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem 
                key={country.code} 
                value={country.code}
                onClick={() => addLog(`SelectItem ${country.code} clicked`)}
              >
                <div className="flex items-center space-x-2">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p>Selected value: {selectedCountry || 'None'}</p>
      </div>

      {/* Test 2: Native HTML Select */}
      <div className="p-4 border rounded-lg space-y-4">
        <h2 className="font-semibold">Native HTML Select</h2>
        <select 
          value={nativeSelect} 
          onChange={handleNativeSelectChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
        <p>Selected value: {nativeSelect || 'None'}</p>
      </div>

      {/* Test 3: Direct Button Test */}
      <div className="p-4 border rounded-lg space-y-4">
        <h2 className="font-semibold">Direct Button Selection</h2>
        <div className="flex gap-2 flex-wrap">
          {countries.map((country) => (
            <Button
              key={country.code}
              onClick={() => {
                addLog(`Button ${country.code} clicked`)
                setSelectedCountry(country.code)
              }}
              variant={selectedCountry === country.code ? "default" : "outline"}
            >
              {country.flag} {country.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Event Log */}
      <div className="p-4 border rounded-lg space-y-2">
        <h2 className="font-semibold">Event Log</h2>
        <Button onClick={() => setLog([])}>Clear Log</Button>
        <div className="h-48 overflow-y-auto bg-gray-100 p-2 rounded text-xs font-mono">
          {log.length === 0 ? (
            <p className="text-gray-500">No events yet...</p>
          ) : (
            log.map((entry, i) => (
              <div key={i} className="mb-1">{entry}</div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}