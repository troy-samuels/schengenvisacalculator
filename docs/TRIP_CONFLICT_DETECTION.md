# Trip Conflict Detection System

## Overview

The Trip Conflict Detection system provides comprehensive validation and warning capabilities for Schengen visa trip planning. It automatically identifies potential violations, overlapping trips, and compliance risks to help users maintain visa compliance.

## Features

### Conflict Types Detected

1. **Date Order Conflicts** (`INVALID_DATE_ORDER`)
   - Detects when end date is before start date
   - Severity: ERROR
   - Prevents data corruption and calculation errors

2. **Overlapping Trips** (`OVERLAPPING_TRIPS`)
   - Identifies trips with overlapping dates
   - Severity: ERROR
   - Helps users avoid impossible travel schedules

3. **Insufficient Gap Warnings** (`INSUFFICIENT_GAP`)
   - Warns when trips have less than 3 days between them
   - Severity: WARNING
   - Helps plan for travel logistics

4. **90-Day Single Trip Violations** (`CONSECUTIVE_STAY_VIOLATION`)
   - Detects single trips exceeding 90 consecutive days
   - Severity: ERROR
   - Ensures compliance with maximum stay rules

5. **180-Day Period Violations** (`EXCEEDS_180_DAY_PERIOD`)
   - Identifies when total days exceed 90 in any 180-day period
   - Severity: ERROR
   - Core Schengen visa rule enforcement

6. **Future Violation Risks** (`FUTURE_VIOLATION_RISK`)
   - Predicts potential violations based on planned trips
   - Severity: WARNING or ERROR
   - Proactive compliance assistance

## Usage

### Basic Integration

```typescript
import { useTripConflicts } from "@/lib/hooks/useTripConflicts"
import { TripConflictWarnings } from "@/components/trip-conflict-warnings"

function MyCalculator() {
  const [trips, setTrips] = useState<Trip[]>([])
  const { conflicts, hasErrors } = useTripConflicts(trips)

  return (
    <>
      {conflicts.hasConflicts && (
        <TripConflictWarnings conflicts={conflicts} />
      )}
    </>
  )
}
```

### Real-time Validation

```typescript
const { validateTrip } = useTripConflicts(existingTrips)

const handleAddTrip = (newTrip: Trip) => {
  const validation = validateTrip(newTrip, existingTrips)
  
  if (validation.hasErrors) {
    alert("Trip conflicts detected!")
    return
  }
  
  // Add trip
}
```

### Checking Specific Trips

```typescript
const { getConflictsForTrip, hasErrorsForTrip } = useTripConflicts(trips)

const tripConflicts = getConflictsForTrip(tripId)
const hasErrors = hasErrorsForTrip(tripId)
```

## Components

### TripConflictWarnings

Main component for displaying conflicts:

```typescript
<TripConflictWarnings 
  conflicts={conflicts}
  onDismiss={(index) => handleDismiss(index)}
  onFixSuggestion={(conflict) => applyFix(conflict)}
  compact={false}
/>
```

Props:
- `conflicts`: Detection results from the hook
- `onDismiss`: Optional callback for dismissing warnings
- `onFixSuggestion`: Optional callback for applying suggested fixes
- `compact`: Show compact view (default: false)

### ConflictSummaryBadge

Compact badge showing conflict summary:

```typescript
<ConflictSummaryBadge conflicts={conflicts} />
```

## API Reference

### TripConflictDetector

Static class providing conflict detection:

```typescript
// Detect all conflicts
const result = TripConflictDetector.detectAllConflicts(trips)

// Get summary text
const summary = TripConflictDetector.getConflictSummary(result)
```

### useTripConflicts Hook

Returns:
- `conflicts`: Current conflict detection results
- `hasConflicts`: Boolean indicating any conflicts
- `hasErrors`: Boolean indicating error-level conflicts
- `hasWarnings`: Boolean indicating warning-level conflicts
- `errorCount`: Number of error-level conflicts
- `warningCount`: Number of warning-level conflicts
- `validateTrip`: Function to validate a new trip
- `validateTripUpdate`: Function to validate trip updates
- `getConflictsForTrip`: Get conflicts for specific trip
- `hasErrorsForTrip`: Check if trip has errors
- `hasWarningsForTrip`: Check if trip has warnings
- `getSummary`: Get text summary of conflicts
- `canAddTrip`: Check if trip can be added
- `getSuggestedFixes`: Get available fix suggestions

## Severity Levels

- **ERROR**: Critical issues that must be resolved
  - Visa violations
  - Overlapping trips
  - Invalid data
  
- **WARNING**: Important issues to consider
  - High usage approaching limits
  - Short gaps between trips
  - Future risk predictions
  
- **INFO**: Informational notices
  - Optimization suggestions
  - Best practices

## Testing

Run tests with:

```bash
npm test -- lib/services/__tests__/trip-conflict-detector.test.ts
```

## Examples

See `/examples/trip-conflict-integration.tsx` for a complete working example.

## Best Practices

1. **Always validate before saving**: Check for conflicts before persisting trip data
2. **Show real-time feedback**: Display conflicts as users enter trip details
3. **Provide clear actions**: Help users understand how to resolve conflicts
4. **Use compact mode**: For dashboards and summary views
5. **Handle dismissals carefully**: Only allow dismissing warnings, not errors
6. **Test edge cases**: Validate with various trip scenarios

## Performance

The conflict detection system is optimized for:
- Real-time validation (< 10ms for typical trip lists)
- Batch processing (handles 100+ trips efficiently)
- Minimal re-renders (memoized calculations)