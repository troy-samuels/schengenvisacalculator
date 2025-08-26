/**
 * Basic setup test for Jest + SWC + React configuration
 */
import { render } from '@testing-library/react';

// Simple test component
const TestComponent = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="test-component">{children}</div>
);

describe('UI Package Setup', () => {
  it('should run tests with Jest and SWC', () => {
    expect(1 + 1).toBe(2);
  });

  it('should support React components', () => {
    const { getByTestId } = render(
      <TestComponent>Hello, React Testing!</TestComponent>
    );
    expect(getByTestId('test-component')).toBeInTheDocument();
  });

  it('should support TypeScript with React', () => {
    const props: { title: string; count: number } = { title: 'Test', count: 5 };
    expect(props.title).toBe('Test');
    expect(props.count).toBe(5);
  });
});