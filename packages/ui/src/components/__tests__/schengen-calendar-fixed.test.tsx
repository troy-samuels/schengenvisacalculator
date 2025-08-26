// Jest globals and jest.fn are available automatically
import { render, screen, waitFor } from '@testing-library/react'
import { SchengenCalendar } from '../schengen-calendar'
import type { Trip } from '@schengen/calculator'

// Mock alert function to test error messages
const mockAlert = jest.fn()
global.alert = mockAlert

const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    country: 'France',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-06-20'),
    days: 6
  }
]

describe('SchengenCalendar - Infinite Loop Fix', () => {
  beforeEach(() => {
    mockAlert.mockClear()
  })

  it('should render without infinite loop', async () => {
    const renderSpy = jest.fn()
    
    // Mock console.error to catch infinite loop warnings
    const originalError = console.error
    console.error = jest.fn()
    
    try {
      render(
        <SchengenCalendar 
          mode="single"
          existingTrips={mockTrips}
          showOccupiedDates={true}
        />
      )

      // Wait a bit to ensure no infinite loops occur
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument()
      }, { timeout: 1000 })

      // Should not have any React warning errors about infinite loops
      expect(console.error).not.toHaveBeenCalledWith(
        expect.stringContaining('Maximum update depth exceeded')
      )

    } finally {
      console.error = originalError
    }
  })

  it('should handle trips array updates without infinite loops', async () => {
    const { rerender } = render(
      <SchengenCalendar 
        mode="single"
        existingTrips={mockTrips}
        showOccupiedDates={true}
      />
    )

    // Update with new trips array (different reference but same content)
    const newTrips = [...mockTrips]
    
    rerender(
      <SchengenCalendar 
        mode="single"
        existingTrips={newTrips}
        showOccupiedDates={true}
      />
    )

    // Should render successfully without infinite updates
    await waitFor(() => {
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })
  })

  it('should handle empty trips array', () => {
    const { container } = render(
      <SchengenCalendar 
        mode="single"
        existingTrips={[]}
        showOccupiedDates={true}
      />
    )

    // Should render successfully
    expect(container.querySelector('[role="grid"]')).toBeInTheDocument()
  })

  it('should handle changing validator config', () => {
    const { rerender } = render(
      <SchengenCalendar 
        mode="single"
        existingTrips={mockTrips}
        validatorConfig={{ strictMode: false }}
      />
    )

    rerender(
      <SchengenCalendar 
        mode="single"
        existingTrips={mockTrips}
        validatorConfig={{ strictMode: true }}
      />
    )

    // Should handle config changes without infinite loops
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })
})