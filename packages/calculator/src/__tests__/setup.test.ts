/**
 * Basic setup test for Jest + SWC configuration
 */
describe('Calculator Package Setup', () => {
  it('should run tests with Jest and SWC', () => {
    expect(1 + 1).toBe(2);
  });

  it('should support TypeScript', () => {
    const greeting: string = 'Hello, Jest with SWC!';
    expect(typeof greeting).toBe('string');
  });

  it('should support modern JavaScript features', () => {
    const obj = { a: 1, b: 2 };
    const spread = { ...obj, c: 3 };
    expect(spread).toEqual({ a: 1, b: 2, c: 3 });
  });
});