/**
 * Schengen Visa Calculator - Main Entry Point
 */

import { SchengenCalculator } from './schengen-calculator.js'
import { format } from 'date-fns'

console.log('🇪🇺 Schengen Visa Calculator')
console.log('===========================')

// Example usage
const exampleTrips = [
  SchengenCalculator.createTrip('trip1', 'FR', '2024-06-01', '2024-06-15'), // 15 days
  SchengenCalculator.createTrip('trip2', 'DE', '2024-08-10', '2024-08-25'), // 16 days
  SchengenCalculator.createTrip('trip3', 'IT', '2024-10-05', '2024-10-20')  // 16 days
]

console.log('\n📅 Example Trips:')
exampleTrips.forEach(trip => {
  console.log(`${trip.id}: ${trip.country} from ${format(trip.startDate, 'yyyy-MM-dd')} to ${format(trip.endDate, 'yyyy-MM-dd')} (${trip.days} days)`)
})

const result = SchengenCalculator.calculateCompliance(exampleTrips)
const formatted = SchengenCalculator.formatResult(result)

console.log('\n📊 Calculation Result:')
console.log(`Status: ${formatted.status}`)
console.log(`Days Used: ${result.totalDaysUsed}/${SchengenCalculator.MAX_DAYS_IN_PERIOD}`)
console.log(`Days Remaining: ${result.daysRemaining}`)
console.log(`Window Period: ${formatted.windowPeriod}`)

if (!result.isCompliant) {
  console.log(`⚠️  Overstay: ${result.overstayDays} days`)
}

console.log('\n✅ Calculator ready for use!')

export { SchengenCalculator }