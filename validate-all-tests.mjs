#!/usr/bin/env node

/**
 * Comprehensive Test Validation Script
 * Validates all Schengen calculator tests and ensures proper exit codes
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

console.log('🔍 COMPREHENSIVE TEST VALIDATION')
console.log('=================================')
console.log('Validating all Schengen calculator test suites...\n')

const testCommands = [
  { name: 'Main Test Suite', command: 'pnpm run test', expectSuccess: true },
  { name: 'EU Compliance', command: 'pnpm run test:eu', expectSuccess: true },
  { name: 'Edge Cases', command: 'pnpm run test:edge', expectSuccess: true },
  { name: 'Performance Benchmark', command: 'pnpm run benchmark', expectSuccess: true },
  { name: 'Comprehensive Validation', command: 'pnpm run test:comprehensive', expectSuccess: true }
]

async function runTest(testConfig) {
  const { name, command, expectSuccess } = testConfig
  
  console.log(`📋 Running: ${name}`)
  console.log(`   Command: ${command}`)
  
  try {
    const startTime = Date.now()
    const { stdout, stderr } = await execAsync(command)
    const endTime = Date.now()
    const duration = endTime - startTime
    
    // Check for success indicators in output
    const hasSuccessIndicator = stdout.includes('✅') && 
                               (stdout.includes('All tests passed') || 
                                stdout.includes('ALL EDGE CASES HANDLED CORRECTLY') ||
                                stdout.includes('All EU official test cases passed') ||
                                stdout.includes('COMPLETE SUCCESS'))
    
    if (expectSuccess) {
      console.log(`   ✅ PASSED (${duration}ms)`)
      console.log(`   📊 Success indicators found: ${hasSuccessIndicator}`)
      return { success: true, name, duration, output: stdout }
    } else {
      console.log(`   ❌ Expected failure but test passed`)
      return { success: false, name, duration, error: 'Expected failure' }
    }
    
  } catch (error) {
    if (!expectSuccess) {
      console.log(`   ✅ FAILED AS EXPECTED`)
      return { success: true, name, error: error.message }
    } else {
      console.log(`   ❌ FAILED UNEXPECTEDLY`)
      console.log(`   Error: ${error.message}`)
      return { success: false, name, error: error.message }
    }
  }
}

async function validateAllTests() {
  const results = []
  
  for (const testConfig of testCommands) {
    const result = await runTest(testConfig)
    results.push(result)
    console.log('') // Add spacing
  }
  
  // Summary
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log('🏆 VALIDATION SUMMARY')
  console.log('====================')
  console.log(`Total Tests: ${results.length}`)
  console.log(`Successful: ${successful}`)
  console.log(`Failed: ${failed}`)
  console.log(`Success Rate: ${((successful / results.length) * 100).toFixed(1)}%`)
  
  if (failed === 0) {
    console.log('\n🎉 ALL TESTS VALIDATED SUCCESSFULLY!')
    console.log('✅ All test suites pass with correct exit codes')
    console.log('✅ Schengen calculator implementation is robust')
    console.log('✅ Ready for GitHub Actions deployment')
    process.exit(0)
  } else {
    console.log('\n❌ VALIDATION FAILED')
    console.log('Some test suites are not working correctly:')
    results.filter(r => !r.success).forEach(result => {
      console.log(`   - ${result.name}: ${result.error}`)
    })
    process.exit(1)
  }
}

// Run validation
validateAllTests().catch(error => {
  console.error('❌ Validation script failed:', error.message)
  process.exit(2)
})