import { Calendar, Clock, MapPin, Calculator } from "lucide-react"

// 90/180 Rule Explanation
export function Rule90180Help() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Calendar className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-blue-200 mb-2">The 90/180-day rule explained:</p>
          <p className="mb-3">
            You can stay <strong>90 days</strong> within any <strong>rolling 180-day period</strong>. 
            It's NOT "90 days in, 90 days out."
          </p>
        </div>
      </div>

      {/* Visual Example */}
      <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
        <p className="text-xs font-medium text-gray-300 mb-2">Example Timeline:</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Jan 1-90: Stay 90 days (✅ OK)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Apr 1: Can't enter yet (❌ Would exceed 90/180)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Jul 1: Can enter again (✅ Rolling window reset)</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-300 bg-gray-800 rounded p-2 border-l-2 border-blue-400">
        💡 <strong>Key insight:</strong> The 180-day window "rolls" with each day. 
        Our calculator checks this automatically for every date!
      </div>
    </div>
  )
}

// Day Counting Explanation  
export function DayCountingHelp() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Clock className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-orange-200 mb-2">How days are counted:</p>
          <p className="mb-3">
            <strong>Both arrival and departure days count</strong> toward your 90-day limit.
          </p>
        </div>
      </div>

      {/* Visual Example */}
      <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
        <p className="text-xs font-medium text-gray-300 mb-2">Example Trip:</p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span>✈️ Arrive: March 15</span>
            <span className="text-orange-400">Counts as Day 1</span>
          </div>
          <div className="flex justify-between items-center">
            <span>🏨 Stay: March 16-20</span>
            <span className="text-gray-400">Days 2-6</span>
          </div>
          <div className="flex justify-between items-center">
            <span>🛫 Depart: March 21</span>
            <span className="text-orange-400">Counts as Day 7</span>
          </div>
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="flex justify-between items-center font-medium">
              <span>Total days used:</span>
              <span className="text-orange-400">7 days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-300 bg-gray-800 rounded p-2 border-l-2 border-orange-400">
        ⚠️ <strong>Common mistake:</strong> Many travelers forget that departure day counts. 
        A "5-day trip" from Mon-Fri is actually 5 days, not 4!
      </div>
    </div>
  )
}

// Schengen Countries Explanation
export function SchengenCountriesHelp() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <MapPin className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-purple-200 mb-2">Schengen Area Countries:</p>
          <p className="mb-3">
            All Schengen countries <strong>share the same 90-day limit</strong>. 
            Moving between them doesn't reset your counter.
          </p>
        </div>
      </div>

      {/* Countries List */}
      <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
        <p className="text-xs font-medium text-gray-300 mb-2">27 Schengen Countries:</p>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="space-y-1">
            <div>🇦🇹 Austria</div>
            <div>🇧🇪 Belgium</div>
            <div>🇨🇿 Czech Rep.</div>
            <div>🇩🇰 Denmark</div>
            <div>🇪🇪 Estonia</div>
            <div>🇫🇮 Finland</div>
            <div>🇫🇷 France</div>
            <div>🇩🇪 Germany</div>
            <div>🇬🇷 Greece</div>
            <div>🇭🇺 Hungary</div>
            <div>🇮🇸 Iceland</div>
            <div>🇮🇹 Italy</div>
            <div>🇱🇻 Latvia</div>
            <div>🇱🇮 Liechtenstein</div>
          </div>
          <div className="space-y-1">
            <div>🇱🇹 Lithuania</div>
            <div>🇱🇺 Luxembourg</div>
            <div>🇲🇹 Malta</div>
            <div>🇳🇱 Netherlands</div>
            <div>🇳🇴 Norway</div>
            <div>🇵🇱 Poland</div>
            <div>🇵🇹 Portugal</div>
            <div>🇸🇰 Slovakia</div>
            <div>🇸🇮 Slovenia</div>
            <div>🇪🇸 Spain</div>
            <div>🇸🇪 Sweden</div>
            <div>🇨🇭 Switzerland</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-300 bg-gray-800 rounded p-2 border-l-2 border-purple-400">
        📍 <strong>Important:</strong> Croatia joined Schengen in 2023. 
        Ireland, UK, Romania, Bulgaria, and Cyprus are NOT in Schengen.
      </div>
    </div>
  )
}

// Calculation Results Explanation
export function CalculationResultsHelp({ 
  daysUsed = 45, 
  daysRemaining = 45, 
  referenceDate = "today" 
}: { 
  daysUsed?: number
  daysRemaining?: number
  referenceDate?: string 
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Calculator className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-green-200 mb-2">How we calculated this:</p>
          <p className="mb-3">
            We analyzed all your trips within the 180-day rolling window from {referenceDate}.
          </p>
        </div>
      </div>

      {/* Calculation Breakdown */}
      <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 space-y-3">
        <div className="text-xs font-medium text-gray-300">Calculation Steps:</div>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span>1. 180-day window:</span>
            <span className="text-blue-400">Rolling period analyzed</span>
          </div>
          <div className="flex justify-between items-center">
            <span>2. Trips in window:</span>
            <span className="text-gray-400">Filtered relevant stays</span>
          </div>
          <div className="flex justify-between items-center">
            <span>3. Days per trip:</span>
            <span className="text-gray-400">Arrival + departure count</span>
          </div>
          <div className="flex justify-between items-center">
            <span>4. Total days used:</span>
            <span className="text-orange-400">{daysUsed} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span>5. Days remaining:</span>
            <span className="text-green-400">{daysRemaining} days</span>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <div className="flex justify-between items-center font-medium text-xs">
            <span>Schengen limit:</span>
            <span className="text-white">90 days max</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-300 bg-gray-800 rounded p-2 border-l-2 border-green-400">
        ✅ <strong>Accuracy note:</strong> Our calculator uses the official EU algorithm 
        and matches the European Commission's reference implementation.
      </div>
    </div>
  )
}

// Future Planning Help
export function PlanningHelp() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Calendar className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-indigo-200 mb-2">Planning future trips:</p>
          <p className="mb-3">
            Add planned trips to see how they'll affect your remaining days and compliance.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
        <p className="text-xs font-medium text-gray-300 mb-2">Pro Tips:</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-start space-x-2">
            <span className="text-indigo-400">•</span>
            <span>Plan trips to reset when old days "fall off" the 180-day window</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-indigo-400">•</span>
            <span>Consider buffer days for unexpected delays or changes</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-indigo-400">•</span>
            <span>Check compliance before booking flights</span>
          </div>
        </div>
      </div>
    </div>
  )
}