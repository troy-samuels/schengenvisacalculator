// Jest globals and jest.fn are available automatically
import { render, screen, fireEvent } from '@testing-library/react'
import { TripCard } from '../trip-card'
import type { Trip } from '@schengen/calculator'

const mockTrip: Trip = {
  id: 'test-trip-1',
  country: 'France',
  startDate: new Date('2024-06-01'),
  endDate: new Date('2024-06-10'),
  days: 10
}

describe('TripCard', () => {
  it('renders trip information correctly', () => {
    render(<TripCard trip={mockTrip} />)
    
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('10 days')).toBeInTheDocument()
    // The ID might not be displayed in the UI, check date instead
    expect(screen.getByText(/June/)).toBeInTheDocument()
  })

  it('shows French flag emoji', () => {
    render(<TripCard trip={mockTrip} showFlag />)
    
    const flag = screen.getByLabelText('France flag')
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveTextContent('🇫🇷')
  })

  it('renders in compact mode', () => {
    render(<TripCard trip={mockTrip} compact />)
    
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('10d')).toBeInTheDocument()
  })

  it('renders edit and delete buttons when enabled', () => {
    const onEdit = jest.fn()
    const onDelete = jest.fn()
    
    render(
      <TripCard 
        trip={mockTrip} 
        showEdit 
        showDelete 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
    )
    
    const editButton = screen.getByLabelText('Edit trip to France')
    const deleteButton = screen.getByLabelText('Delete trip to France')
    
    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
    
    fireEvent.click(editButton)
    expect(onEdit).toHaveBeenCalledWith(mockTrip)
    
    fireEvent.click(deleteButton)
    expect(onDelete).toHaveBeenCalledWith(mockTrip)
  })

  it('handles single day trips correctly', () => {
    const singleDayTrip: Trip = {
      id: 'single-day',
      country: 'Germany',
      startDate: new Date('2024-07-15'),
      endDate: new Date('2024-07-15'),
      days: 1
    }
    
    render(<TripCard trip={singleDayTrip} />)
    
    expect(screen.getByText(/July/)).toBeInTheDocument() // Check July is present
    expect(screen.getByText('1 day')).toBeInTheDocument() // Singular "day"
  })

  it('uses fallback EU flag for unknown countries', () => {
    const unknownCountryTrip: Trip = {
      id: 'unknown',
      country: 'Unknown Country',
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-08-05'),
      days: 5
    }
    
    render(<TripCard trip={unknownCountryTrip} showFlag />)
    
    const flag = screen.getByLabelText('Unknown Country flag')
    expect(flag).toHaveTextContent('🇪🇺')
  })

  it('allows custom flag rendering', () => {
    const customRenderFlag = (countryName: string) => (
      <span data-testid="custom-flag">🏁 {countryName}</span>
    )
    
    render(<TripCard trip={mockTrip} renderFlag={customRenderFlag} />)
    
    const customFlag = screen.getByTestId('custom-flag')
    expect(customFlag).toBeInTheDocument()
    expect(customFlag).toHaveTextContent('🏁 France')
  })

  it('applies custom className', () => {
    const { container } = render(<TripCard trip={mockTrip} className="custom-class" />)
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('custom-class')
  })

  it('handles various country name variations', () => {
    const netherlandsTrip: Trip = {
      id: 'nl',
      country: 'The Netherlands',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-09-07'),
      days: 7
    }
    
    render(<TripCard trip={netherlandsTrip} showFlag />)
    
    const flag = screen.getByLabelText('The Netherlands flag')
    expect(flag).toHaveTextContent('🇳🇱')
  })

  it('displays correct duration calculation', () => {
    // Test various trip lengths
    const longTrip: Trip = {
      id: 'long',
      country: 'Spain', 
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'), // 31 days
      days: 31
    }
    
    render(<TripCard trip={longTrip} />)
    
    expect(screen.getByText('31 days')).toBeInTheDocument()
  })
})