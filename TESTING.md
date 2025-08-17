# 🧪 Automated Testing Suite for Schengen Calculator

This document describes the comprehensive automated testing suite for the Schengen Visa Calculator, designed to ensure calculation accuracy, performance, and compliance with EU regulations.

## 📋 Test Suite Overview

The automated testing suite provides:

- **Calculation Accuracy Testing**: Verifies precise day calculations
- **EU Compliance Validation**: Tests against official EU test cases (KOM series)
- **Edge Case Handling**: Validates leap years, timezone handling, boundary conditions
- **Performance Benchmarking**: Ensures acceptable execution times
- **Regression Testing**: Detects changes that break existing functionality
- **CI/CD Integration**: GitHub Actions workflow for continuous testing

## 🚀 Quick Start

### Run All Tests
```bash
npm test                    # Fast test suite
npm run test:full          # Complete test suite with performance tests
npm run validate           # Run all validation tests
```

### Individual Test Categories
```bash
npm run test:eu            # EU compliance tests only
npm run test:edge          # Edge case tests only
npm run test:comprehensive # Full comprehensive validation
npm run benchmark          # Performance benchmarking
```

### CI/CD Testing
```bash
npm run test:ci            # CI-compatible test with JUnit output
```

## 📊 Test Categories

### 1. EU Compliance Tests (`test-eu-compliance.mjs`)

Tests against official European Commission test cases:

- **KOM 1.1**: Multiple short stays validation
- **KOM 1.2**: Exact 90-day limit testing
- **KOM 1.3**: Overstay scenario detection
- **KOM 1.4**: Unsorted passport entries handling

**Expected Result**: 100% pass rate for EU compliance

### 2. Calculation Accuracy Tests

Verifies precise mathematical calculations:

- Single-day trip precision
- Multiple trip aggregation
- Partial window overlap calculations
- Exact boundary conditions

### 3. Edge Case Tests (`test-edge-cases.mjs`)

Handles special scenarios:

- **Leap Years**: February 29th calculations
- **Timezones**: DST transitions, UTC consistency
- **Date Boundaries**: Exact 180-day window limits
- **Cross-Year**: Calculations spanning multiple years
- **Extreme Ranges**: Very old/future trips

### 4. Performance Tests

Ensures acceptable execution times:

- Large dataset performance (100+ trips)
- Complex overlapping scenarios
- Maximum execution time limits (< 50ms)

### 5. Real-World Scenarios

Tests common travel patterns:

- Digital nomad travel
- Business traveler patterns
- Tourist vacation scenarios
- Student exchange programs

## 🏗️ Test Infrastructure

### Test Runners

1. **`simple-test-runner.mjs`** - Fast, lightweight runner for development
2. **`test-suite-runner.mjs`** - Full-featured runner with CI/CD support
3. **`lib/testing/automated-test-runner.ts`** - TypeScript framework (future)

### Command Line Options

```bash
node test-suite-runner.mjs [options]

Options:
  --fast                 Run fast tests only (skip performance)
  --full                 Run complete test suite
  --output <file>        Save results to file
  --format <json|junit>  Output format (default: json)
  --verbose              Verbose output
  --fail-fast            Stop on first failure
```

### Output Formats

- **Console**: Human-readable test results
- **JSON**: Machine-readable results for CI/CD
- **JUnit XML**: Compatible with CI/CD test reporting

## 📈 Performance Benchmarks

### Expected Performance Metrics

| Test Category | Expected Time | Threshold |
|---------------|---------------|-----------|
| Single Calculation | < 1ms | 2ms |
| 100 Trips | < 20ms | 50ms |
| Complex Scenarios | < 10ms | 30ms |
| Full Test Suite | < 500ms | 1000ms |

### Performance Monitoring

The test suite automatically monitors:

- Individual test execution times
- Average execution times per category
- Performance regressions
- Memory usage patterns

## 🔄 CI/CD Integration

### GitHub Actions Workflow

The `.github/workflows/test-automation.yml` file provides:

- **Multi-Node Testing**: Tests on Node.js 18.x, 20.x, 22.x
- **Automated EU Compliance**: Runs on every push/PR
- **Performance Monitoring**: Tracks execution times
- **Test Reporting**: Publishes results as artifacts
- **PR Comments**: Automatic test status on pull requests

### Workflow Triggers

- **Push to main/develop**: Full test suite
- **Pull Requests**: Fast tests + regression detection
- **Daily Schedule**: Complete validation (2 AM UTC)
- **Manual Trigger**: On-demand testing

## 📊 Test Metrics & Reporting

### Key Metrics Tracked

1. **Pass Rate**: Percentage of tests passing
2. **EU Compliance Rate**: Specific to EU test cases
3. **Performance Score**: Based on execution times
4. **Test Coverage**: Percentage of functionality tested
5. **Regression Count**: Number of detected regressions

### Quality Gates

For production deployment:

- ✅ EU Compliance: 100% pass rate required
- ✅ Overall Pass Rate: ≥ 95% required
- ✅ Performance: All tests < threshold
- ✅ No Critical Regressions

## 🛠️ Adding New Tests

### Test Case Structure

```javascript
{
  name: 'Test case name',
  description: 'What this test validates',
  trips: [/* Trip objects */],
  referenceDate: new Date('2024-12-31'),
  expected: {
    totalDaysUsed: 90,
    isCompliant: true,
    overstayDays: 0
  }
}
```

### Helper Functions

```javascript
// Create a trip
const trip = createTrip(id, country, startDate, endDate)

// Validate results
const passed = validateResult(actual, expected)

// Get error details
const error = getErrorMessage(actual, expected)
```

## 🔍 Debugging Failed Tests

### Common Failure Patterns

1. **Calculation Errors**: Check date arithmetic and window calculations
2. **Boundary Issues**: Verify inclusive/exclusive date handling
3. **Performance Failures**: Optimize algorithms or increase thresholds
4. **EU Compliance**: Ensure exact match with official test cases

### Debugging Tools

```bash
# Verbose output for detailed information
npm run test:full -- --verbose

# Stop on first failure for quick debugging
npm run test -- --fail-fast

# Run specific test category
npm run test:eu
```

## 📝 Test Documentation Standards

### Test Case Documentation

Each test should include:

- **Purpose**: What scenario it validates
- **Expected Behavior**: What the correct result should be
- **Edge Cases**: Special conditions being tested
- **Reference**: Official source or regulation

### Naming Conventions

- EU tests: `KOM X.Y: Description`
- Edge cases: `EDGE-X: Description`
- Performance: `PERF-X: Description`
- Boundary: `BOUNDARY-X: Description`

## 🎯 Future Enhancements

### Planned Improvements

1. **Visual Test Reports**: HTML dashboard with charts
2. **Historical Tracking**: Performance trends over time
3. **Parallel Testing**: Faster execution with worker threads
4. **Fuzz Testing**: Random input generation
5. **Load Testing**: High-volume stress testing

### Integration Opportunities

- **Monitoring**: Integration with APM tools
- **Alerts**: Slack/email notifications for failures
- **Analytics**: Test execution analytics dashboard
- **Coverage**: Code coverage reporting

## 📚 References

- [EU Schengen Regulations](https://ec.europa.eu/home-affairs/what-we-do/policies/borders-and-visas/visa-policy_en)
- [Official EU Calculator Test Cases](https://ec.europa.eu/assets/home/visa-calculator/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [JUnit Test Format](https://junit.org/junit5/docs/current/user-guide/)

---

## 🏆 Current Test Status

**Last Updated**: 2025-08-17

- ✅ **EU Compliance**: 100% (4/4 tests passing)
- ✅ **Edge Cases**: 100% (15/15 tests passing)
- ✅ **Performance**: 100% (All tests < 50ms)
- ✅ **Overall**: 100% (All automated tests passing)

**Status**: 🟢 **PRODUCTION READY**

The Schengen Calculator has passed all automated tests and is validated for production use with full EU compliance.