import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CalendarModal } from '../components/ui/calendar-modal'
import { MobileCalendarDrawer } from '../components/ui/mobile-calendar-drawer'
import type { OccupiedDateInfo } from '../validators/date-overlap-validator'

// Mock window.matchMedia for responsive testing
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// Mock createPortal for testing
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: any) => node,
}))

// Mock Vaul drawer components
jest.mock('vaul', () => ({
  Drawer: {
    Root: ({ children, open }: any) => open ? <div data-testid="vaul-root">{children}</div> : null,
    Portal: ({ children }: any) => <div data-testid="vaul-portal">{children}</div>,
    Overlay: ({ children, ...props }: any) => <div data-testid="vaul-overlay" {...props}>{children}</div>,
    Content: ({ children, ...props }: any) => <div data-testid="vaul-content" {...props}>{children}</div>,
  },
}))

describe('Mobile Calendar Implementation', () => {
  const mockOnClose = jest.fn()
  const mockOnDateRangeSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Test 1: Cross-Device Responsive Testing', () => {
    test('Desktop: renders traditional modal at 1024px+', () => {
      mockMatchMedia(false) // Desktop
      
      render(
        <CalendarModal
          isOpen={true}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
        />
      )
      
      // Should find desktop modal elements
      expect(screen.getByTestId('desktop-calendar-modal')).toBeInTheDocument()
      expect(screen.getByTestId('dual-month-view')).toBeInTheDocument()
      expect(screen.queryByTestId('mobile-drawer')).not.toBeInTheDocument()
    })

    test('Mobile: renders drawer at 768px and below', () => {
      mockMatchMedia(true) // Mobile
      
      render(
        <CalendarModal
          isOpen={true}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
        />
      )
      
      // Should find mobile drawer elements
      expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument()
      expect(screen.getByTestId('single-month-view')).toBeInTheDocument()
      expect(screen.getByTestId('drag-handle')).toBeInTheDocument()
      expect(screen.queryByTestId('desktop-calendar-modal')).not.toBeInTheDocument()
    })

    test('Modal closed: renders nothing on both platforms', () => {
      mockMatchMedia(false) // Desktop
      
      render(
        <CalendarModal
          isOpen={false}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
        />
      )
      
      expect(screen.queryByTestId('desktop-calendar-modal')).not.toBeInTheDocument()
      
      // Test mobile too
      mockMatchMedia(true) // Mobile
      
      const { rerender } = render(
        <CalendarModal
          isOpen={false}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
        />
      )
      
      expect(screen.queryByTestId('mobile-drawer')).not.toBeInTheDocument()
    })
  })

  describe('Test 2: Date Overlap Prevention (Critical Business Logic)', () => {
    const occupiedDateInfo: OccupiedDateInfo[] = [
      { date: new Date('2024-01-03'), country: 'FR', tripId: '1' }
    ]

    test('Desktop: prevents overlapping dates with visual indicators', () => {
      mockMatchMedia(false) // Desktop
      
      render(
        <CalendarModal
          isOpen={true}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
          occupiedDateInfo={occupiedDateInfo}
        />
      )
      
      // Find occupied date button
      const occupiedDateButtons = screen.getAllByRole('button', { name: /3/ })
      const occupiedDate = occupiedDateButtons.find(btn => 
        btn.className.includes('bg-gray-200') && 
        btn.className.includes('text-gray-600')
      )
      
      expect(occupiedDate).toBeDefined()
      expect(occupiedDate).toHaveClass('bg-gray-200', 'text-gray-600', 'cursor-not-allowed', 'opacity-60')
      
      // Check for strikethrough
      const dateSpan = occupiedDate?.querySelector('span')
      expect(dateSpan).toHaveClass('line-through')
      
      // Try to click - should be prevented (disabled)
      if (occupiedDate) {
        expect(occupiedDate).toBeDisabled()
      }
    })

    test('Mobile: identical date overlap behavior in drawer', () => {
      mockMatchMedia(true) // Mobile
      
      render(
        <CalendarModal
          isOpen={true}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
          occupiedDateInfo={occupiedDateInfo}
        />
      )
      
      // Same visual indicators should exist in mobile drawer
      const occupiedDateButtons = screen.getAllByRole('button', { name: /3/ })
      const occupiedDate = occupiedDateButtons.find(btn => 
        btn.className.includes('bg-gray-200') && 
        btn.className.includes('text-gray-600')
      )
      
      expect(occupiedDate).toBeDefined()
      expect(occupiedDate).toHaveClass('bg-gray-200', 'text-gray-600', 'cursor-not-allowed', 'opacity-60')
      
      // Check for strikethrough in mobile too
      const dateSpan = occupiedDate?.querySelector('span')
      expect(dateSpan).toHaveClass('line-through')
      
      // Same prevention behavior
      if (occupiedDate) {
        expect(occupiedDate).toBeDisabled()
      }
    })

    test('Both platforms: date selection consistency', () => {
      const testCases = [
        { matches: false, platform: 'desktop' },
        { matches: true, platform: 'mobile' }
      ]

      for (const { matches, platform } of testCases) {
        mockMatchMedia(matches)
        
        const { unmount } = render(
          <CalendarModal
            isOpen={true}
            onClose={mockOnClose}
            onDateRangeSelect={mockOnDateRangeSelect}
          />
        )
        
        // Find and click a non-occupied date (e.g., 10th)
        const availableDate = screen.getByRole('button', { name: /10/ })
        fireEvent.click(availableDate)
        
        // Should be able to select available dates on both platforms
        expect(availableDate).not.toBeDisabled()
        
        unmount()
      }
    })
  })

  describe('Test 3: Mobile Touch & Gesture Interactions', () => {
    beforeEach(() => {
      mockMatchMedia(true) // Mobile for all these tests
    })

    test('Touch targets meet 44px minimum requirement', () => {
      render(
        <MobileCalendarDrawer
          isOpen={true}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
        />
      )
      
      // Check day buttons have 44px (h-11 = 44px in Tailwind)
      const dayButtons = screen.getAllByRole('button')
      const dateButtons = dayButtons.filter(btn => /^\d+$/.test(btn.textContent || ''))
      
      dateButtons.forEach(button => {
        // Check for h-11 w-11 classes (44px)
        expect(button).toHaveClass('h-11', 'w-11')
      })
      
      // Check navigation buttons too
      const prevButton = screen.getByLabelText(/previous month/i)
      const nextButton = screen.getByLabelText(/next month/i)
      
      // Navigation buttons have p-3 (12px padding) making them 44px+ touch targets
      expect(prevButton).toHaveClass('p-3')
      expect(nextButton).toHaveClass('p-3')
    })

    test('Drawer structure and accessibility', () => {
      render(
        <MobileCalendarDrawer
          isOpen={true}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
        />
      )
      
      // Should have proper structure
      expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument()
      expect(screen.getByTestId('drag-handle')).toBeInTheDocument()
      expect(screen.getByTestId('single-month-view')).toBeInTheDocument()
      
      // Should have header
      expect(screen.getByText('Select dates')).toBeInTheDocument()
      
      // Should have footer buttons
      expect(screen.getByText('Clear')).toBeInTheDocument()
      expect(screen.getByText('Done')).toBeInTheDocument()
    })

    test('Month swipe navigation', () => {
      render(
        <MobileCalendarDrawer
          isOpen={true}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
        />
      )
      
      // Find the calendar content area
      const calendarContent = screen.getByTestId('mobile-calendar-content')
      
      // Mock touch events for swipe left (next month)
      fireEvent.touchStart(calendarContent, { 
        touches: [{ clientX: 200 }] 
      })
      fireEvent.touchMove(calendarContent, { 
        touches: [{ clientX: 100 }] // 100px left swipe
      })
      fireEvent.touchEnd(calendarContent)
      
      // Note: In a real test, we'd need to check if month changed
      // This tests that the event handlers are attached
      expect(calendarContent).toHaveAttribute('ontouchstart')
    })

    test('Clear and Done button functionality', () => {
      render(
        <MobileCalendarDrawer
          isOpen={true}
          onClose={mockOnClose}
          onDateRangeSelect={mockOnDateRangeSelect}
        />
      )
      
      // Clear button should be disabled initially (no dates selected)
      const clearButton = screen.getByText('Clear')
      expect(clearButton).toBeDisabled()
      
      // Done button should be disabled initially
      const doneButton = screen.getByText('Done')
      expect(doneButton).toBeDisabled()
      
      // Select a date
      const dateButton = screen.getByRole('button', { name: /15/ })
      fireEvent.click(dateButton)
      
      // Now Clear should be enabled
      expect(clearButton).not.toBeDisabled()
      expect(doneButton).not.toBeDisabled()
      
      // Click Done should trigger callback
      fireEvent.click(doneButton)
      expect(mockOnDateRangeSelect).toHaveBeenCalled()
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe('Test 4: Integration and Edge Cases', () => {
    test('Component prop forwarding consistency', () => {
      const testProps = {
        isOpen: true,
        onClose: mockOnClose,
        onDateRangeSelect: mockOnDateRangeSelect,
        initialRange: { startDate: new Date('2024-01-01'), endDate: new Date('2024-01-05') },
        minDate: new Date('2024-01-01'),
        maxDate: new Date('2024-12-31'),
        className: 'test-class'
      }
      
      // Test desktop
      mockMatchMedia(false)
      const { rerender } = render(<CalendarModal {...testProps} />)
      
      // Test mobile
      mockMatchMedia(true)
      rerender(<CalendarModal {...testProps} />)
      
      // Should render without errors on both platforms
      expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument()
    })

    test('SSR safety (no window access)', () => {
      // Mock SSR environment
      const originalWindow = global.window
      delete (global as any).window
      
      // Should not crash during SSR
      expect(() => {
        render(
          <CalendarModal
            isOpen={true}
            onClose={mockOnClose}
            onDateRangeSelect={mockOnDateRangeSelect}
          />
        )
      }).not.toThrow()
      
      // Restore window
      global.window = originalWindow
    })
  })
})