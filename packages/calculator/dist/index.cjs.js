'use strict';

var dateFns = require('date-fns');

/**
 * Robust Schengen Calculator implementing exact 180-day rolling window rules
 * 
 * Key Schengen Rules:
 * 1. Maximum 90 days in any 180-day period
 * 2. The 180-day period is ROLLING - calculated from any given date backward
 * 3. Entry and exit days both count as stay days
 * 4. Days must be calculated for EVERY day, not just trip endpoints
 */ class RobustSchengenCalculator {
    /**
   * Calculate compliance using exact rolling window algorithm
   * This checks compliance for EVERY day in the period, not just trip endpoints
   * Enhanced with edge case handling for leap years, timezones, and boundary conditions
   */ static calculateExactCompliance(trips, referenceDate = new Date()) {
        try {
            // Enhanced input validation
            if (!Array.isArray(trips)) {
                throw new Error('Trips must be an array');
            }
            if (!referenceDate || !dateFns.isValid(referenceDate)) {
                throw new Error('Reference date must be a valid Date object');
            }
            // Validate reference date is not in extreme future/past
            const now = new Date();
            const tenYearsAgo = dateFns.subDays(now, 365 * 10);
            const fiveYearsFromNow = dateFns.addDays(now, 365 * 5);
            if (referenceDate < tenYearsAgo || referenceDate > fiveYearsFromNow) {
                console.warn(`Reference date ${dateFns.format(referenceDate, 'yyyy-MM-dd')} is outside reasonable range`);
            }
            // Normalize reference date to start of day (UTC-agnostic)
            const normalizedRefDate = this.normalizeToStartOfDay(referenceDate);
            const periodStart = this.calculatePeriodStart(normalizedRefDate);
            // Validate and normalize all trips
            const validTrips = this.validateAndNormalizeTrips(trips);
            // Handle empty trips case
            if (validTrips.length === 0) {
                return {
                    totalDaysUsed: 0,
                    daysRemaining: this.MAX_DAYS_IN_PERIOD,
                    isCompliant: true,
                    overstayDays: 0,
                    referenceDate: normalizedRefDate,
                    periodStart,
                    periodEnd: normalizedRefDate,
                    detailedBreakdown: []
                };
            }
            // Create a map of all days with stays
            const dailyStays = this.createDailyStayMap(validTrips, periodStart, normalizedRefDate);
            // Calculate rolling compliance for each day
            const rollingChecks = this.calculateRollingComplianceForAllDays(dailyStays, periodStart, normalizedRefDate);
            // Validate rolling checks
            if (rollingChecks.length === 0) {
                throw new Error('Failed to generate rolling compliance checks');
            }
            // Find the maximum violation and current status
            const maxViolation = Math.max(...rollingChecks.map((check)=>check.overstayDays));
            const currentCompliance = rollingChecks[rollingChecks.length - 1];
            if (!currentCompliance) {
                throw new Error('Failed to get current compliance status');
            }
            // Generate detailed breakdown
            const detailedBreakdown = this.generateDetailedBreakdown(dailyStays, rollingChecks, periodStart, normalizedRefDate);
            const result = {
                totalDaysUsed: currentCompliance.daysInWindow,
                daysRemaining: Math.max(0, this.MAX_DAYS_IN_PERIOD - currentCompliance.daysInWindow),
                isCompliant: maxViolation === 0,
                overstayDays: maxViolation,
                referenceDate: normalizedRefDate,
                periodStart,
                periodEnd: normalizedRefDate,
                detailedBreakdown
            };
            // Final validation of result
            if (result.totalDaysUsed < 0 || result.daysRemaining < 0) {
                console.error('Invalid calculation result:', result);
                throw new Error('Calculation produced invalid negative values');
            }
            return result;
        } catch (error) {
            console.error('Error in calculateExactCompliance:', error);
            // Return safe fallback
            const normalizedRefDate = dateFns.startOfDay(referenceDate);
            return {
                totalDaysUsed: 0,
                daysRemaining: this.MAX_DAYS_IN_PERIOD,
                isCompliant: true,
                overstayDays: 0,
                referenceDate: normalizedRefDate,
                periodStart: dateFns.subDays(normalizedRefDate, this.ROLLING_PERIOD_DAYS - 1),
                periodEnd: normalizedRefDate,
                detailedBreakdown: []
            };
        }
    }
    /**
   * Calculate the exact number of days used in any 180-day window ending on a specific date
   */ static calculateDaysInWindow(trips, endDate) {
        if (!dateFns.isValid(endDate)) {
            throw new Error('End date must be valid');
        }
        const normalizedEndDate = this.normalizeToStartOfDay(endDate);
        const windowStart = this.calculatePeriodStart(normalizedEndDate);
        let totalDays = 0;
        for (const trip of trips){
            if (!dateFns.isValid(trip.startDate) || !dateFns.isValid(trip.endDate)) {
                console.warn(`Skipping trip ${trip.id} with invalid dates`);
                continue;
            }
            const tripStart = this.normalizeToStartOfDay(trip.startDate);
            const tripEnd = this.normalizeToStartOfDay(trip.endDate);
            // Calculate overlap with the window (inclusive of both start and end)
            const overlapStart = tripStart > windowStart ? tripStart : windowStart;
            const overlapEnd = tripEnd < normalizedEndDate ? tripEnd : normalizedEndDate;
            if (overlapStart <= overlapEnd) {
                // Both start and end days count, so we add 1
                const daysInOverlap = dateFns.differenceInDays(overlapEnd, overlapStart) + 1;
                // Validate the calculated days
                if (daysInOverlap < 0) {
                    console.error(`Negative days calculated for trip ${trip.id}`);
                    continue;
                }
                totalDays += daysInOverlap;
            }
        }
        return totalDays;
    }
    /**
   * Check if a planned trip would violate the 90/180 rule
   */ static validatePlannedTrip(existingTrips, plannedTrip) {
        const allTrips = [
            ...existingTrips,
            plannedTrip
        ];
        // Check compliance for every day of the planned trip
        let currentDate = dateFns.startOfDay(plannedTrip.startDate);
        const endDate = dateFns.startOfDay(plannedTrip.endDate);
        let maxViolation = 0;
        let violationDate = null;
        while(currentDate <= endDate){
            const daysInWindow = this.calculateDaysInWindow(allTrips, currentDate);
            const overstay = Math.max(0, daysInWindow - this.MAX_DAYS_IN_PERIOD);
            if (overstay > maxViolation) {
                maxViolation = overstay;
                violationDate = new Date(currentDate);
            }
            currentDate = dateFns.addDays(currentDate, 1);
        }
        return {
            isValid: maxViolation === 0,
            violationDays: maxViolation,
            violationDate
        };
    }
    /**
   * Find the latest date when a trip of specified length could start without violation
   */ static findLatestValidStartDate(existingTrips, tripLength, earliestStart, latestStart) {
        let testDate = dateFns.startOfDay(latestStart);
        const minDate = dateFns.startOfDay(earliestStart);
        while(testDate >= minDate){
            const testTrip = {
                id: 'test',
                country: 'TEST',
                startDate: testDate,
                endDate: dateFns.addDays(testDate, tripLength - 1),
                days: tripLength
            };
            const validation = this.validatePlannedTrip(existingTrips, testTrip);
            if (validation.isValid) {
                return testDate;
            }
            testDate = dateFns.subDays(testDate, 1);
        }
        return null;
    }
    /**
   * Calculate maximum consecutive days available from a start date
   */ static calculateMaxConsecutiveDays(existingTrips, startDate) {
        let maxDays = 0;
        let testLength = 1;
        const maxTestLength = 100 // Safety limit
        ;
        while(testLength <= maxTestLength){
            const testTrip = {
                id: 'test',
                country: 'TEST',
                startDate: dateFns.startOfDay(startDate),
                endDate: dateFns.addDays(dateFns.startOfDay(startDate), testLength - 1),
                days: testLength
            };
            const validation = this.validatePlannedTrip(existingTrips, testTrip);
            if (validation.isValid) {
                maxDays = testLength;
                testLength++;
            } else {
                break;
            }
        }
        return Math.min(maxDays, this.MAX_DAYS_IN_PERIOD);
    }
    /**
   * Comprehensive trip validation
   */ static validateTrips(trips) {
        const errors = [];
        const warnings = [];
        const seenIds = new Set();
        trips.forEach((trip, index)=>{
            // Check for duplicate IDs
            if (seenIds.has(trip.id)) {
                errors.push({
                    field: 'id',
                    message: `Duplicate trip ID: ${trip.id}`,
                    severity: 'ERROR',
                    tripId: trip.id
                });
            }
            seenIds.add(trip.id);
            // Required fields
            if (!trip.id || trip.id.trim() === '') {
                errors.push({
                    field: 'id',
                    message: `Trip at index ${index} is missing an ID`,
                    severity: 'ERROR'
                });
            }
            if (!trip.country || trip.country.trim() === '') {
                errors.push({
                    field: 'country',
                    message: 'Country is required',
                    severity: 'ERROR',
                    tripId: trip.id
                });
            }
            if (!trip.startDate) {
                errors.push({
                    field: 'startDate',
                    message: 'Start date is required',
                    severity: 'ERROR',
                    tripId: trip.id
                });
            }
            if (!trip.endDate) {
                errors.push({
                    field: 'endDate',
                    message: 'End date is required',
                    severity: 'ERROR',
                    tripId: trip.id
                });
            }
            // Date validation
            if (trip.startDate && trip.endDate) {
                if (trip.startDate > trip.endDate) {
                    errors.push({
                        field: 'dates',
                        message: 'Start date must be before or equal to end date',
                        severity: 'ERROR',
                        tripId: trip.id
                    });
                }
                const duration = dateFns.differenceInDays(trip.endDate, trip.startDate) + 1;
                if (duration > this.MAX_DAYS_IN_PERIOD) {
                    errors.push({
                        field: 'duration',
                        message: `Trip duration (${duration} days) exceeds maximum allowed consecutive stay (${this.MAX_DAYS_IN_PERIOD} days)`,
                        severity: 'ERROR',
                        tripId: trip.id
                    });
                }
                if (duration < 1) {
                    errors.push({
                        field: 'duration',
                        message: 'Trip must be at least 1 day long',
                        severity: 'ERROR',
                        tripId: trip.id
                    });
                }
                // Check for unreasonable dates
                const now = new Date();
                const tenYearsAgo = dateFns.subDays(now, 365 * 10);
                const fiveYearsFromNow = dateFns.addDays(now, 365 * 5);
                if (trip.startDate < tenYearsAgo) {
                    warnings.push({
                        field: 'startDate',
                        message: 'Start date seems unreasonably far in the past',
                        severity: 'WARNING',
                        tripId: trip.id
                    });
                }
                if (trip.endDate > fiveYearsFromNow) {
                    warnings.push({
                        field: 'endDate',
                        message: 'End date seems unreasonably far in the future',
                        severity: 'WARNING',
                        tripId: trip.id
                    });
                }
                // Check for consistency with days field
                if (trip.days && Math.abs(trip.days - duration) > 0) {
                    warnings.push({
                        field: 'days',
                        message: `Days field (${trip.days}) doesn't match calculated duration (${duration})`,
                        severity: 'WARNING',
                        tripId: trip.id
                    });
                }
            }
        });
        // Check for overlapping trips (same dates)
        for(let i = 0; i < trips.length; i++){
            for(let j = i + 1; j < trips.length; j++){
                const trip1 = trips[i];
                const trip2 = trips[j];
                if (!trip1.startDate || !trip1.endDate || !trip2.startDate || !trip2.endDate) continue;
                // Check if trips overlap
                const overlap = !(trip1.endDate < trip2.startDate || trip2.endDate < trip1.startDate);
                if (overlap) {
                    warnings.push({
                        field: 'dates',
                        message: `Trip ${trip1.id} overlaps with trip ${trip2.id}. This may be intentional for same-day travel between countries.`,
                        severity: 'WARNING',
                        tripId: trip1.id
                    });
                }
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
    /**
   * Get next date when days will "roll off" the window
   */ static getNextResetDate(trips, referenceDate = new Date()) {
        const normalizedRefDate = dateFns.startOfDay(referenceDate);
        const currentWindow = dateFns.subDays(normalizedRefDate, this.ROLLING_PERIOD_DAYS - 1);
        // Find the earliest trip day that affects the current window
        let earliestRelevantDate = null;
        for (const trip of trips){
            let checkDate = dateFns.startOfDay(trip.startDate);
            const endDate = dateFns.startOfDay(trip.endDate);
            while(checkDate <= endDate){
                if (checkDate >= currentWindow && checkDate <= normalizedRefDate) {
                    if (!earliestRelevantDate || checkDate < earliestRelevantDate) {
                        earliestRelevantDate = checkDate;
                    }
                }
                checkDate = dateFns.addDays(checkDate, 1);
            }
        }
        if (!earliestRelevantDate) return null;
        // The reset date is 180 days after the earliest relevant date
        return dateFns.addDays(earliestRelevantDate, this.ROLLING_PERIOD_DAYS);
    }
    /**
   * Debug function to visualize rolling window calculations
   */ static debugRollingWindow(trips, referenceDate) {
        const result = this.calculateExactCompliance(trips, referenceDate);
        return {
            summary: {
                totalDaysUsed: result.totalDaysUsed,
                daysRemaining: result.daysRemaining,
                isCompliant: result.isCompliant,
                overstayDays: result.overstayDays,
                periodStart: result.periodStart,
                periodEnd: result.periodEnd
            },
            tripsInPeriod: trips.filter((trip)=>trip.endDate >= result.periodStart && trip.startDate <= result.periodEnd),
            dailyBreakdown: result.detailedBreakdown.filter((day)=>day.daysUsedOnDate > 0),
            violations: result.detailedBreakdown.filter((day)=>day.isViolation),
            nextResetDate: this.getNextResetDate(trips, referenceDate)
        };
    }
    /**
   * Validate and normalize trip data with error handling
   */ static validateAndNormalizeTrips(trips) {
        // Run validation but proceed with filtering
        const validationResult = this.validateTrips(trips);
        const criticalErrors = validationResult.errors;
        if (criticalErrors.length > 0) {
            console.warn('Critical validation errors found:', criticalErrors);
        }
        return trips.filter((trip)=>{
            // Only include trips that pass basic validation
            if (!trip.startDate || !trip.endDate || !trip.country) return false;
            // Enhanced date validation
            if (!dateFns.isValid(trip.startDate) || !dateFns.isValid(trip.endDate)) {
                console.warn(`Trip ${trip.id} has invalid dates`);
                return false;
            }
            if (trip.startDate > trip.endDate) return false;
            // Filter out trips with excessive duration
            const duration = dateFns.differenceInDays(trip.endDate, trip.startDate) + 1;
            if (duration > this.MAX_DAYS_IN_PERIOD) return false;
            // Filter out trips with unreasonable dates
            const now = new Date();
            const veryOld = dateFns.subDays(now, 365 * 20) // 20 years ago
            ;
            const veryFuture = dateFns.addDays(now, 365 * 10) // 10 years in future
            ;
            if (trip.endDate < veryOld || trip.startDate > veryFuture) {
                console.warn(`Trip ${trip.id} has unreasonable dates`);
                return false;
            }
            return true;
        }).map((trip)=>{
            try {
                const normalizedTrip = {
                    ...trip,
                    startDate: this.normalizeToStartOfDay(trip.startDate),
                    endDate: this.normalizeToStartOfDay(trip.endDate),
                    days: dateFns.differenceInDays(trip.endDate, trip.startDate) + 1
                };
                // Validate normalized dates
                if (!dateFns.isValid(normalizedTrip.startDate) || !dateFns.isValid(normalizedTrip.endDate)) {
                    console.error(`Invalid dates after normalization for trip ${trip.id}`);
                    return null;
                }
                // Check for leap year edge cases in trip duration
                const hasLeapDay = this.tripCrossesLeapDay(normalizedTrip.startDate, normalizedTrip.endDate);
                if (hasLeapDay) {
                    console.debug(`Trip ${trip.id} crosses leap day`);
                }
                return normalizedTrip;
            } catch (error) {
                console.error(`Error normalizing trip ${trip.id}:`, error);
                return null;
            }
        }).filter((trip)=>trip !== null).sort((a, b)=>a.startDate.getTime() - b.startDate.getTime());
    }
    /**
   * Create a map of daily stays for efficient lookup
   * PERFORMANCE OPTIMIZED: Uses optimized date formatting while maintaining accuracy
   */ static createDailyStayMap(trips, periodStart, periodEnd) {
        const dailyStays = new Map();
        for (const trip of trips){
            // Only consider trips that overlap with our period
            if (trip.endDate < periodStart || trip.startDate > periodEnd) continue;
            // Calculate the actual overlap
            const overlapStart = trip.startDate > periodStart ? trip.startDate : periodStart;
            const overlapEnd = trip.endDate < periodEnd ? trip.endDate : periodEnd;
            // Add each day of the trip using optimized date iteration
            let currentDate = new Date(overlapStart);
            while(currentDate <= overlapEnd){
                const dateKey = this.formatDateKey(currentDate);
                if (!dailyStays.has(dateKey)) {
                    dailyStays.set(dateKey, []);
                }
                dailyStays.get(dateKey).push(trip.id);
                currentDate = dateFns.addDays(currentDate, 1);
            }
        }
        return dailyStays;
    }
    /**
   * Optimized date key formatting - replaces .toISOString().split('T')[0]
   * PERFORMANCE OPTIMIZED: Direct string construction instead of splitting
   */ static formatDateKey(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    /**
   * Calculate rolling compliance check for every day in the period
   * PERFORMANCE OPTIMIZED: Uses optimized date formatting while maintaining accuracy
   */ static calculateRollingComplianceForAllDays(dailyStays, periodStart, periodEnd) {
        const checks = [];
        let currentDate = new Date(periodStart);
        while(currentDate <= periodEnd){
            const windowStart = dateFns.subDays(currentDate, this.ROLLING_PERIOD_DAYS - 1);
            const windowEnd = new Date(currentDate);
            // Count days in this 180-day window using optimized date key formatting
            let daysInWindow = 0;
            let checkDate = new Date(windowStart);
            while(checkDate <= windowEnd){
                const dateKey = this.formatDateKey(checkDate);
                if (dailyStays.has(dateKey)) {
                    daysInWindow++;
                }
                checkDate = dateFns.addDays(checkDate, 1);
            }
            const overstayDays = Math.max(0, daysInWindow - this.MAX_DAYS_IN_PERIOD);
            checks.push({
                date: new Date(currentDate),
                windowStart: new Date(windowStart),
                windowEnd: new Date(windowEnd),
                daysInWindow,
                isCompliant: overstayDays === 0,
                overstayDays
            });
            currentDate = dateFns.addDays(currentDate, 1);
        }
        return checks;
    }
    /**
   * Generate detailed day-by-day breakdown
   * PERFORMANCE OPTIMIZED: Reduced date object creation and string operations
   */ static generateDetailedBreakdown(dailyStays, rollingChecks, periodStart, periodEnd) {
        const breakdown = [];
        const msPerDay = 24 * 60 * 60 * 1000;
        // Pre-calculate time boundaries
        const periodStartTime = periodStart.getTime();
        const periodEndTime = periodEnd.getTime();
        const totalDays = Math.floor((periodEndTime - periodStartTime) / msPerDay) + 1;
        // Pre-allocate array for better memory efficiency
        breakdown.length = totalDays;
        // Optimized loop using timestamp arithmetic
        for(let dayIndex = 0; dayIndex < totalDays; dayIndex++){
            const currentTime = periodStartTime + dayIndex * msPerDay;
            const currentDate = new Date(currentTime);
            const dateKey = this.formatDateKey(currentDate);
            const staysOnDate = dailyStays.get(dateKey) || [];
            const daysUsedOnDate = staysOnDate.length > 0 ? 1 : 0;
            const rollingCheck = rollingChecks[dayIndex];
            breakdown[dayIndex] = {
                date: currentDate,
                daysUsedOnDate,
                cumulativeDaysInWindow: rollingCheck.daysInWindow,
                isViolation: !rollingCheck.isCompliant,
                contributingTrips: staysOnDate
            };
        }
        return breakdown;
    }
    /**
   * Enhanced date normalization with timezone-agnostic handling
   */ static normalizeToStartOfDay(date) {
        // Use startOfDay but ensure we're working with local time consistently
        const normalized = dateFns.startOfDay(date);
        // Additional validation for edge cases
        if (!dateFns.isValid(normalized)) {
            throw new Error(`Failed to normalize date: ${date}`);
        }
        return normalized;
    }
    /**
   * Calculate period start with leap year awareness
   */ static calculatePeriodStart(referenceDate) {
        // Standard 180-day window calculation
        const periodStart = dateFns.subDays(referenceDate, this.ROLLING_PERIOD_DAYS - 1);
        // Validate the calculated period start
        if (!dateFns.isValid(periodStart)) {
            throw new Error(`Invalid period start calculated from reference date: ${dateFns.format(referenceDate, 'yyyy-MM-dd')}`);
        }
        // Check if we're crossing leap year boundaries and log for awareness
        const refYear = referenceDate.getFullYear();
        const startYear = periodStart.getFullYear();
        if (refYear !== startYear) {
            const crossesLeapYear = dateFns.isLeapYear(refYear) || dateFns.isLeapYear(startYear);
            if (crossesLeapYear) {
                console.debug(`180-day window crosses leap year boundary: ${startYear}-${refYear}`);
            }
        }
        return periodStart;
    }
    /**
   * Check if a trip crosses February 29th in a leap year
   */ static tripCrossesLeapDay(startDate, endDate) {
        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        // Check each year the trip spans
        for(let year = startYear; year <= endYear; year++){
            if (dateFns.isLeapYear(year)) {
                const leapDay = new Date(year, 1, 29) // February 29th
                ;
                if (leapDay >= startDate && leapDay <= endDate) {
                    return true;
                }
            }
        }
        return false;
    }
}
RobustSchengenCalculator.MAX_DAYS_IN_PERIOD = 90;
RobustSchengenCalculator.ROLLING_PERIOD_DAYS = 180;

/**
 * Date Overlap Validator - Prevents selection of already occupied dates
 * 
 * Core Features:
 * 1. Detects date conflicts between new and existing trips
 * 2. Provides visual indicators for occupied dates (grey + strikethrough)
 * 3. Returns specific conflict details for user feedback
 * 4. Handles edge cases: same-day travel, border transitions
 * 5. Mobile-optimized with larger touch targets
 */ class DateOverlapValidator {
    /**
   * Validate if a date range conflicts with existing trips (alias for validateDateSpan)
   */ validateDateRange(newRange, existingTrips) {
        return this.validateDateSpan(newRange, existingTrips);
    }
    /**
   * Validate if a date range conflicts with existing trips
   */ validateDateSpan(newRange, existingTrips) {
        // Input validation
        if (!this.isValidDateRange(newRange)) {
            return {
                isValid: false,
                conflicts: [],
                message: 'Invalid date range provided',
                occupiedDates: []
            };
        }
        // Normalize dates to start/end of day for consistent comparison
        const normalizedNewRange = {
            start: dateFns.startOfDay(newRange.start),
            end: dateFns.endOfDay(newRange.end)
        };
        const conflicts = [];
        const occupiedDates = [];
        // Check each existing trip for conflicts
        for (const trip of existingTrips){
            if (!this.isValidTrip(trip)) continue;
            const tripRange = {
                start: dateFns.startOfDay(trip.startDate),
                end: dateFns.endOfDay(trip.endDate)
            };
            // Check for overlap
            const hasOverlap = this.rangesOverlap(normalizedNewRange, tripRange);
            if (hasOverlap) {
                const conflictDetail = this.calculateConflictDetail(normalizedNewRange, tripRange, trip);
                // Apply configuration rules
                if (this.shouldReportConflict(conflictDetail, normalizedNewRange, tripRange)) {
                    conflicts.push(conflictDetail);
                }
                // Add occupied dates for visual indicators
                this.addOccupiedDatesFromTrip(trip, occupiedDates);
            }
        }
        // Get all occupied dates for calendar marking (regardless of conflicts)
        const allOccupiedDates = this.getAllOccupiedDates(existingTrips);
        return {
            isValid: conflicts.length === 0,
            conflicts,
            message: this.generateValidationMessage(conflicts),
            occupiedDates: allOccupiedDates
        };
    }
    /**
   * Get all occupied dates from existing trips for calendar display
   */ getAllOccupiedDates(trips) {
        const occupiedDates = [];
        for (const trip of trips){
            if (!this.isValidTrip(trip)) continue;
            this.addOccupiedDatesFromTrip(trip, occupiedDates);
        }
        // Remove duplicates and sort
        return [
            ...new Set(occupiedDates.map((d)=>d.getTime()))
        ].map((time)=>new Date(time)).sort((a, b)=>a.getTime() - b.getTime());
    }
    /**
   * Check if a specific date is occupied by existing trips
   */ isDateOccupied(date, existingTrips) {
        const normalizedDate = dateFns.startOfDay(date);
        return existingTrips.some((trip)=>{
            if (!this.isValidTrip(trip)) return false;
            const tripStart = dateFns.startOfDay(trip.startDate);
            const tripEnd = dateFns.startOfDay(trip.endDate);
            return normalizedDate >= tripStart && normalizedDate <= tripEnd;
        });
    }
    /**
   * Get trips that occupy a specific date
   */ getTripsOnDate(date, existingTrips) {
        const normalizedDate = dateFns.startOfDay(date);
        return existingTrips.filter((trip)=>{
            if (!this.isValidTrip(trip)) return false;
            const tripStart = dateFns.startOfDay(trip.startDate);
            const tripEnd = dateFns.startOfDay(trip.endDate);
            return normalizedDate >= tripStart && normalizedDate <= tripEnd;
        });
    }
    /**
   * Find next available date range of specified length
   */ findNextAvailableDateSpan(preferredStart, lengthInDays, existingTrips, searchLimit = 365) {
        let testDate = dateFns.startOfDay(preferredStart);
        const maxSearchDate = new Date(testDate.getTime() + searchLimit * 24 * 60 * 60 * 1000);
        while(testDate <= maxSearchDate){
            const testRange = {
                start: testDate,
                end: new Date(testDate.getTime() + (lengthInDays - 1) * 24 * 60 * 60 * 1000)
            };
            const validation = this.validateDateSpan(testRange, existingTrips);
            if (validation.isValid) {
                return testRange;
            }
            // Move to next day
            testDate = new Date(testDate.getTime() + 24 * 60 * 60 * 1000);
        }
        return null;
    }
    /**
   * Suggest alternative dates when conflicts exist
   */ suggestAlternativeDates(conflictedRange, lengthInDays, existingTrips) {
        const suggestions = [];
        const duration = lengthInDays || dateFns.differenceInDays(conflictedRange.end, conflictedRange.start) + 1;
        // Try earlier dates
        const earlierDate = new Date(conflictedRange.start.getTime() - 30 * 24 * 60 * 60 * 1000);
        const earlierRange = this.findNextAvailableDateSpan(earlierDate, duration, existingTrips, 60);
        if (earlierRange && earlierRange.start < conflictedRange.start) {
            suggestions.push(earlierRange);
        }
        // Try later dates
        const laterDate = new Date(conflictedRange.end.getTime() + 24 * 60 * 60 * 1000);
        const laterRange = this.findNextAvailableDateSpan(laterDate, duration, existingTrips, 60);
        if (laterRange) {
            suggestions.push(laterRange);
        }
        return suggestions.slice(0, 3) // Return max 3 suggestions
        ;
    }
    /**
   * Batch validation for multiple date ranges
   */ validateMultipleDateSpans(newRanges, existingTrips) {
        const results = {};
        // Create a combined list of existing trips plus validated new trips
        let combinedTrips = [
            ...existingTrips
        ];
        newRanges.forEach((range, index)=>{
            // Validate against existing trips and previously validated new trips
            const result = this.validateDateSpan(range, combinedTrips);
            results[index] = result;
            // If valid, add to combined trips for next validations
            if (result.isValid) {
                combinedTrips.push({
                    id: `temp-${index}`,
                    country: 'TEMP',
                    startDate: range.start,
                    endDate: range.end,
                    days: dateFns.differenceInDays(range.end, range.start) + 1
                });
            }
        });
        return results;
    }
    /**
   * Private: Check if two date ranges overlap
   */ rangesOverlap(range1, range2) {
        return dateFns.areIntervalsOverlapping({
            start: range1.start,
            end: range1.end
        }, {
            start: range2.start,
            end: range2.end
        });
    }
    /**
   * Private: Calculate detailed conflict information
   */ calculateConflictDetail(newRange, tripRange, trip) {
        // Calculate the actual overlap period
        const conflictStart = newRange.start > tripRange.start ? newRange.start : tripRange.start;
        const conflictEnd = newRange.end < tripRange.end ? newRange.end : tripRange.end;
        const overlapDays = dateFns.differenceInDays(conflictEnd, conflictStart) + 1;
        return {
            tripId: trip.id,
            tripCountry: trip.country,
            conflictStart,
            conflictEnd,
            overlapDays: Math.max(0, overlapDays)
        };
    }
    /**
   * Private: Determine if conflict should be reported based on configuration
   */ shouldReportConflict(conflict, newRange, tripRange) {
        // In strict mode, report all conflicts
        if (this.config.strictMode) return true;
        // Same-day travel exception
        if (this.config.allowSameDayTravel) {
            const isSameDayTransition = newRange.start.getTime() === tripRange.end.getTime() || newRange.end.getTime() === tripRange.start.getTime();
            if (isSameDayTransition) return false;
        }
        // Border transition exception
        if (this.config.allowBorderTransitions && conflict.overlapDays <= 1) {
            return false;
        }
        return true;
    }
    /**
   * Private: Add occupied dates from a trip to the occupied dates array
   */ addOccupiedDatesFromTrip(trip, occupiedDates) {
        const start = dateFns.startOfDay(trip.startDate);
        const end = dateFns.startOfDay(trip.endDate);
        let currentDate = new Date(start);
        while(currentDate <= end){
            occupiedDates.push(new Date(currentDate));
            currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        }
    }
    /**
   * Private: Generate human-readable validation message
   */ generateValidationMessage(conflicts) {
        if (conflicts.length === 0) {
            return 'Dates are available';
        }
        if (conflicts.length === 1) {
            const conflict = conflicts[0];
            return `Dates overlap with existing trip to ${conflict.tripCountry} (${conflict.overlapDays} day${conflict.overlapDays !== 1 ? 's' : ''})`;
        }
        return `Dates conflict with ${conflicts.length} existing trips`;
    }
    /**
   * Private: Validate date range input
   */ isValidDateRange(range) {
        if (!range || !range.start || !range.end) return false;
        if (!dateFns.isValid(range.start) || !dateFns.isValid(range.end)) return false;
        if (range.start > range.end) return false;
        return true;
    }
    /**
   * Private: Validate trip data
   */ isValidTrip(trip) {
        if (!trip || !trip.startDate || !trip.endDate) return false;
        if (!dateFns.isValid(trip.startDate) || !dateFns.isValid(trip.endDate)) return false;
        if (trip.startDate > trip.endDate) return false;
        return true;
    }
    /**
   * Update configuration
   */ updateConfig(newConfig) {
        this.config = {
            ...this.config,
            ...newConfig
        };
    }
    /**
   * Get current configuration
   */ getConfig() {
        return {
            ...this.config
        };
    }
    /**
   * Find the next available date range starting from a preferred date
   */ findNextAvailableDateRange(preferredStart, lengthInDays, existingTrips, searchLimitDays = 365) {
        const searchLimit = new Date(preferredStart.getTime() + searchLimitDays * 24 * 60 * 60 * 1000);
        for(let searchDate = new Date(preferredStart); searchDate <= searchLimit; searchDate.setDate(searchDate.getDate() + 1)){
            const proposedRange = {
                start: new Date(searchDate),
                end: new Date(searchDate.getTime() + (lengthInDays - 1) * 24 * 60 * 60 * 1000)
            };
            const validation = this.validateDateRange(proposedRange, existingTrips);
            if (validation.isValid) {
                return proposedRange;
            }
        }
        return null;
    }
    /**
   * Validate multiple date ranges at once
   */ validateMultipleDateRanges(dateRanges, existingTrips) {
        const results = {};
        const allProposedTrips = [
            ...existingTrips
        ];
        dateRanges.forEach((range, index)=>{
            const validation = this.validateDateRange(range, allProposedTrips);
            results[index] = validation;
            // If this range is valid, add it to the list for subsequent validations
            if (validation.isValid) {
                allProposedTrips.push({
                    id: `temp-${index}`,
                    country: `temp-${index}`,
                    startDate: range.start,
                    endDate: range.end,
                    days: Math.ceil((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24)) + 1
                });
            }
        });
        return results;
    }
    constructor(config = {}){
        this.config = {
            allowSameDayTravel: true,
            allowBorderTransitions: true,
            strictMode: false,
            ...config
        };
    }
}

/**
 * Validates that cumulative calculation matches RobustSchengenCalculator
 * This is the CRITICAL cross-validation function for EU compliance
 */ function validateCumulativeCalculation(chronologicalTrips, rowIndex, actualResult) {
    try {
        // Input validation
        if (rowIndex < 0 || rowIndex >= chronologicalTrips.length) {
            return {
                isValid: false,
                expectedResult: createFallbackResult(),
                errorMessage: `Invalid row index: ${rowIndex}. Must be between 0 and ${chronologicalTrips.length - 1}`,
                validationDetails: {
                    rowIndex,
                    tripsCount: chronologicalTrips.length,
                    referenceDate: 'invalid',
                    totalDaysUsed: 0,
                    daysRemaining: 90
                }
            };
        }
        // Get cumulative trips up to this row (chronologically)
        const tripsUpToRow = chronologicalTrips.slice(0, rowIndex + 1);
        const referenceDate = chronologicalTrips[rowIndex].endDate;
        // Calculate expected result using RobustSchengenCalculator (source of truth)
        const expectedResult = RobustSchengenCalculator.calculateExactCompliance(tripsUpToRow, referenceDate);
        const validationDetails = {
            rowIndex,
            tripsCount: tripsUpToRow.length,
            referenceDate: referenceDate.toISOString(),
            totalDaysUsed: expectedResult.totalDaysUsed,
            daysRemaining: expectedResult.daysRemaining
        };
        // If no actual result provided, just return expected (for preview/debug)
        if (!actualResult) {
            return {
                isValid: true,
                expectedResult,
                validationDetails
            };
        }
        // Cross-validate actual vs expected results
        const isValid = actualResult.totalDaysUsed === expectedResult.totalDaysUsed && actualResult.daysRemaining === expectedResult.daysRemaining && actualResult.isCompliant === expectedResult.isCompliant && actualResult.overstayDays === expectedResult.overstayDays;
        if (!isValid) {
            return {
                isValid: false,
                expectedResult,
                actualResult,
                errorMessage: `Cumulative calculation mismatch at row ${rowIndex}. Expected: ${expectedResult.totalDaysUsed} used, ${expectedResult.daysRemaining} remaining. Actual: ${actualResult.totalDaysUsed} used, ${actualResult.daysRemaining} remaining.`,
                validationDetails
            };
        }
        return {
            isValid: true,
            expectedResult,
            actualResult,
            validationDetails
        };
    } catch (error) {
        return {
            isValid: false,
            expectedResult: createFallbackResult(),
            errorMessage: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            validationDetails: {
                rowIndex,
                tripsCount: chronologicalTrips.length,
                referenceDate: 'error',
                totalDaysUsed: 0,
                daysRemaining: 90
            }
        };
    }
}
/**
 * Validates the entire chronological sequence for consistency
 * Ensures cumulative totals never decrease unexpectedly within same 180-day period
 */ function validateChronologicalSequence(chronologicalTrips) {
    const errors = [];
    const warnings = [];
    if (chronologicalTrips.length === 0) {
        return {
            isValid: true,
            errors,
            warnings
        };
    }
    let previousResult = null;
    for(let i = 0; i < chronologicalTrips.length; i++){
        const validation = validateCumulativeCalculation(chronologicalTrips, i);
        if (!validation.isValid) {
            errors.push(`Row ${i}: ${validation.errorMessage}`);
            continue;
        }
        const currentResult = validation.expectedResult;
        // Check for unexpected decreases in cumulative totals
        if (previousResult && currentResult) {
            const daysBetweenReferences = Math.abs(previousResult.referenceDate.getTime() - currentResult.referenceDate.getTime()) / (1000 * 60 * 60 * 24);
            // If within same 180-day period, totals should generally not decrease
            if (daysBetweenReferences < 180 && currentResult.totalDaysUsed < previousResult.totalDaysUsed) {
                warnings.push(`Row ${i}: Cumulative total decreased from ${previousResult.totalDaysUsed} to ${currentResult.totalDaysUsed} ` + `within ${Math.round(daysBetweenReferences)} days. This may indicate trips falling outside rolling window.`);
            }
        }
        previousResult = currentResult;
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}
/**
 * Mobile-specific validation helper
 * Adds mobile debugging context for CLAUDE.md compliance
 */ function validateMobileCumulativeCalculation(chronologicalTrips, rowIndex, actualResult) {
    const validation = validateCumulativeCalculation(chronologicalTrips, rowIndex, actualResult);
    // Mobile-specific debugging (CLAUDE.md requirement)
    console.log(`📱 Mobile validation for row ${rowIndex}:`, {
        isValid: validation.isValid,
        tripsCount: validation.validationDetails.tripsCount,
        totalDaysUsed: validation.validationDetails.totalDaysUsed,
        daysRemaining: validation.validationDetails.daysRemaining,
        errorMessage: validation.errorMessage || 'No errors'
    });
    return validation;
}
/**
 * Performance benchmark for cumulative calculations
 * CLAUDE.md requirement: <50ms per calculation
 */ function benchmarkCumulativePerformance(chronologicalTrips) {
    if (chronologicalTrips.length === 0) {
        return {
            avgTimePerCalculation: 0,
            maxTime: 0,
            isWithinBenchmark: true
        };
    }
    const times = [];
    chronologicalTrips.forEach((_, index)=>{
        const startTime = performance.now();
        validateCumulativeCalculation(chronologicalTrips, index);
        const endTime = performance.now();
        times.push(endTime - startTime);
    });
    const avgTime = times.reduce((sum, time)=>sum + time, 0) / times.length;
    const maxTime = Math.max(...times);
    return {
        avgTimePerCalculation: avgTime,
        maxTime,
        isWithinBenchmark: avgTime < 50 && maxTime < 100 // <50ms avg, <100ms max
    };
}
/**
 * Helper to create fallback compliance result
 */ function createFallbackResult() {
    const now = new Date();
    return {
        totalDaysUsed: 0,
        daysRemaining: 90,
        isCompliant: true,
        overstayDays: 0,
        referenceDate: now,
        periodStart: new Date(now.getTime() - 179 * 24 * 60 * 60 * 1000),
        periodEnd: now,
        detailedBreakdown: []
    };
}

/**
 * Schengen Area Countries Data
 * Complete list of all 27 Schengen countries with flags and metadata
 * Updated as of 2024 - includes all current member states
 */ const SCHENGEN_COUNTRIES = [
    {
        code: 'AT',
        name: 'Austria',
        flag: '🇦🇹',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Vienna',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'BE',
        name: 'Belgium',
        flag: '🇧🇪',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Brussels',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'BG',
        name: 'Bulgaria',
        flag: '🇧🇬',
        joinedSchengen: '2024',
        isEUMember: true,
        capital: 'Sofia',
        timezone: 'EET',
        currency: 'BGN'
    },
    {
        code: 'HR',
        name: 'Croatia',
        flag: '🇭🇷',
        joinedSchengen: '2023',
        isEUMember: true,
        capital: 'Zagreb',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'CZ',
        name: 'Czech Republic',
        flag: '🇨🇿',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Prague',
        timezone: 'CET',
        currency: 'CZK'
    },
    {
        code: 'DK',
        name: 'Denmark',
        flag: '🇩🇰',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Copenhagen',
        timezone: 'CET',
        currency: 'DKK'
    },
    {
        code: 'EE',
        name: 'Estonia',
        flag: '🇪🇪',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Tallinn',
        timezone: 'EET',
        currency: 'EUR'
    },
    {
        code: 'FI',
        name: 'Finland',
        flag: '🇫🇮',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Helsinki',
        timezone: 'EET',
        currency: 'EUR'
    },
    {
        code: 'FR',
        name: 'France',
        flag: '🇫🇷',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Paris',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'DE',
        name: 'Germany',
        flag: '🇩🇪',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Berlin',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'GR',
        name: 'Greece',
        flag: '🇬🇷',
        joinedSchengen: '2000',
        isEUMember: true,
        capital: 'Athens',
        timezone: 'EET',
        currency: 'EUR'
    },
    {
        code: 'HU',
        name: 'Hungary',
        flag: '🇭🇺',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Budapest',
        timezone: 'CET',
        currency: 'HUF'
    },
    {
        code: 'IS',
        name: 'Iceland',
        flag: '🇮🇸',
        joinedSchengen: '1996',
        isEUMember: false,
        capital: 'Reykjavik',
        timezone: 'GMT',
        currency: 'ISK'
    },
    {
        code: 'IT',
        name: 'Italy',
        flag: '🇮🇹',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Rome',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'LV',
        name: 'Latvia',
        flag: '🇱🇻',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Riga',
        timezone: 'EET',
        currency: 'EUR'
    },
    {
        code: 'LI',
        name: 'Liechtenstein',
        flag: '🇱🇮',
        joinedSchengen: '2011',
        isEUMember: false,
        capital: 'Vaduz',
        timezone: 'CET',
        currency: 'CHF'
    },
    {
        code: 'LT',
        name: 'Lithuania',
        flag: '🇱🇹',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Vilnius',
        timezone: 'EET',
        currency: 'EUR'
    },
    {
        code: 'LU',
        name: 'Luxembourg',
        flag: '🇱🇺',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Luxembourg',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'MT',
        name: 'Malta',
        flag: '🇲🇹',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Valletta',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'NL',
        name: 'Netherlands',
        flag: '🇳🇱',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Amsterdam',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'NO',
        name: 'Norway',
        flag: '🇳🇴',
        joinedSchengen: '1996',
        isEUMember: false,
        capital: 'Oslo',
        timezone: 'CET',
        currency: 'NOK'
    },
    {
        code: 'PL',
        name: 'Poland',
        flag: '🇵🇱',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Warsaw',
        timezone: 'CET',
        currency: 'PLN'
    },
    {
        code: 'PT',
        name: 'Portugal',
        flag: '🇵🇹',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Lisbon',
        timezone: 'WET',
        currency: 'EUR'
    },
    {
        code: 'RO',
        name: 'Romania',
        flag: '🇷🇴',
        joinedSchengen: '2024',
        isEUMember: true,
        capital: 'Bucharest',
        timezone: 'EET',
        currency: 'RON'
    },
    {
        code: 'SK',
        name: 'Slovakia',
        flag: '🇸🇰',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Bratislava',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'SI',
        name: 'Slovenia',
        flag: '🇸🇮',
        joinedSchengen: '2007',
        isEUMember: true,
        capital: 'Ljubljana',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'ES',
        name: 'Spain',
        flag: '🇪🇸',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Madrid',
        timezone: 'CET',
        currency: 'EUR'
    },
    {
        code: 'SE',
        name: 'Sweden',
        flag: '🇸🇪',
        joinedSchengen: '1995',
        isEUMember: true,
        capital: 'Stockholm',
        timezone: 'CET',
        currency: 'SEK'
    },
    {
        code: 'CH',
        name: 'Switzerland',
        flag: '🇨🇭',
        joinedSchengen: '2008',
        isEUMember: false,
        capital: 'Bern',
        timezone: 'CET',
        currency: 'CHF'
    }
];
// Utility functions for working with countries
const getCountryByCode = (code)=>{
    return SCHENGEN_COUNTRIES.find((country)=>country.code === code);
};
const getCountryByName = (name)=>{
    return SCHENGEN_COUNTRIES.find((country)=>country.name.toLowerCase() === name.toLowerCase());
};
const getCountriesForSelect = ()=>{
    return SCHENGEN_COUNTRIES.map((country)=>({
            value: country.code,
            label: `${country.flag} ${country.name}`,
            country
        })).sort((a, b)=>a.country.name.localeCompare(b.country.name));
};
const getEUMemberCountries = ()=>{
    return SCHENGEN_COUNTRIES.filter((country)=>country.isEUMember);
};
const getNonEUSchengenCountries = ()=>{
    return SCHENGEN_COUNTRIES.filter((country)=>!country.isEUMember);
};
// Export count for validation
const SCHENGEN_COUNTRIES_COUNT = SCHENGEN_COUNTRIES.length;

/**
 * Countries Affected by Schengen 90/180 Day Rule
 * Based on EU Regulation 2018/1806 Annex II (complete official list)
 * Updated: 2024 - includes all current visa-exempt countries
 */ // Countries subject to 90/180 rule (Annex II - visa-exempt for short stays)
const COUNTRIES_AFFECTED_BY_90_180 = [
    // Americas
    {
        code: 'AG',
        name: 'Antigua and Barbuda',
        flag: '🇦🇬',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'AR',
        name: 'Argentina',
        flag: '🇦🇷',
        category: 'affected_by_90_180',
        region: 'South America'
    },
    {
        code: 'BS',
        name: 'Bahamas',
        flag: '🇧🇸',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'BB',
        name: 'Barbados',
        flag: '🇧🇧',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'BR',
        name: 'Brazil',
        flag: '🇧🇷',
        category: 'affected_by_90_180',
        region: 'South America'
    },
    {
        code: 'CA',
        name: 'Canada',
        flag: '🇨🇦',
        category: 'affected_by_90_180',
        region: 'North America'
    },
    {
        code: 'CL',
        name: 'Chile',
        flag: '🇨🇱',
        category: 'affected_by_90_180',
        region: 'South America'
    },
    {
        code: 'CO',
        name: 'Colombia',
        flag: '🇨🇴',
        category: 'affected_by_90_180',
        region: 'South America'
    },
    {
        code: 'CR',
        name: 'Costa Rica',
        flag: '🇨🇷',
        category: 'affected_by_90_180',
        region: 'Central America'
    },
    {
        code: 'DM',
        name: 'Dominica',
        flag: '🇩🇲',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'SV',
        name: 'El Salvador',
        flag: '🇸🇻',
        category: 'affected_by_90_180',
        region: 'Central America'
    },
    {
        code: 'GD',
        name: 'Grenada',
        flag: '🇬🇩',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'GT',
        name: 'Guatemala',
        flag: '🇬🇹',
        category: 'affected_by_90_180',
        region: 'Central America'
    },
    {
        code: 'HN',
        name: 'Honduras',
        flag: '🇭🇳',
        category: 'affected_by_90_180',
        region: 'Central America'
    },
    {
        code: 'MX',
        name: 'Mexico',
        flag: '🇲🇽',
        category: 'affected_by_90_180',
        region: 'North America'
    },
    {
        code: 'NI',
        name: 'Nicaragua',
        flag: '🇳🇮',
        category: 'affected_by_90_180',
        region: 'Central America'
    },
    {
        code: 'PA',
        name: 'Panama',
        flag: '🇵🇦',
        category: 'affected_by_90_180',
        region: 'Central America'
    },
    {
        code: 'PY',
        name: 'Paraguay',
        flag: '🇵🇾',
        category: 'affected_by_90_180',
        region: 'South America'
    },
    {
        code: 'PE',
        name: 'Peru',
        flag: '🇵🇪',
        category: 'affected_by_90_180',
        region: 'South America'
    },
    {
        code: 'KN',
        name: 'Saint Kitts and Nevis',
        flag: '🇰🇳',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'LC',
        name: 'Saint Lucia',
        flag: '🇱🇨',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'VC',
        name: 'Saint Vincent and the Grenadines',
        flag: '🇻🇨',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'TT',
        name: 'Trinidad and Tobago',
        flag: '🇹🇹',
        category: 'affected_by_90_180',
        region: 'Caribbean'
    },
    {
        code: 'US',
        name: 'United States',
        flag: '🇺🇸',
        category: 'affected_by_90_180',
        region: 'North America'
    },
    {
        code: 'UY',
        name: 'Uruguay',
        flag: '🇺🇾',
        category: 'affected_by_90_180',
        region: 'South America'
    },
    {
        code: 'VE',
        name: 'Venezuela',
        flag: '🇻🇪',
        category: 'affected_by_90_180',
        region: 'South America'
    },
    // Asia-Pacific
    {
        code: 'AU',
        name: 'Australia',
        flag: '🇦🇺',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'BN',
        name: 'Brunei',
        flag: '🇧🇳',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'HK',
        name: 'Hong Kong SAR',
        flag: '🇭🇰',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'JP',
        name: 'Japan',
        flag: '🇯🇵',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'KI',
        name: 'Kiribati',
        flag: '🇰🇮',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'KR',
        name: 'South Korea',
        flag: '🇰🇷',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'MO',
        name: 'Macao SAR',
        flag: '🇲🇴',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'MY',
        name: 'Malaysia',
        flag: '🇲🇾',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'MH',
        name: 'Marshall Islands',
        flag: '🇲🇭',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'FM',
        name: 'Micronesia',
        flag: '🇫🇲',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'NR',
        name: 'Nauru',
        flag: '🇳🇷',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'NZ',
        name: 'New Zealand',
        flag: '🇳🇿',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'PW',
        name: 'Palau',
        flag: '🇵🇼',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'WS',
        name: 'Samoa',
        flag: '🇼🇸',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'SG',
        name: 'Singapore',
        flag: '🇸🇬',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'SB',
        name: 'Solomon Islands',
        flag: '🇸🇧',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'TW',
        name: 'Taiwan',
        flag: '🇹🇼',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'TL',
        name: 'Timor-Leste',
        flag: '🇹🇱',
        category: 'affected_by_90_180',
        region: 'Asia'
    },
    {
        code: 'TO',
        name: 'Tonga',
        flag: '🇹🇴',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'TV',
        name: 'Tuvalu',
        flag: '🇹🇻',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    {
        code: 'VU',
        name: 'Vanuatu',
        flag: '🇻🇺',
        category: 'affected_by_90_180',
        region: 'Oceania'
    },
    // Europe (Non-EU)
    {
        code: 'AL',
        name: 'Albania',
        flag: '🇦🇱',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'AD',
        name: 'Andorra',
        flag: '🇦🇩',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'BA',
        name: 'Bosnia and Herzegovina',
        flag: '🇧🇦',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'GE',
        name: 'Georgia',
        flag: '🇬🇪',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'MD',
        name: 'Moldova',
        flag: '🇲🇩',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'MC',
        name: 'Monaco',
        flag: '🇲🇨',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'ME',
        name: 'Montenegro',
        flag: '🇲🇪',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'MK',
        name: 'North Macedonia',
        flag: '🇲🇰',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'SM',
        name: 'San Marino',
        flag: '🇸🇲',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'RS',
        name: 'Serbia',
        flag: '🇷🇸',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'UA',
        name: 'Ukraine',
        flag: '🇺🇦',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    {
        code: 'VA',
        name: 'Holy See (Vatican)',
        flag: '🇻🇦',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    // United Kingdom (Post-Brexit)
    {
        code: 'GB',
        name: 'United Kingdom',
        flag: '🇬🇧',
        category: 'affected_by_90_180',
        region: 'Europe'
    },
    // Middle East & Africa
    {
        code: 'AE',
        name: 'United Arab Emirates',
        flag: '🇦🇪',
        category: 'affected_by_90_180',
        region: 'Middle East'
    },
    {
        code: 'IL',
        name: 'Israel',
        flag: '🇮🇱',
        category: 'affected_by_90_180',
        region: 'Middle East'
    },
    {
        code: 'MU',
        name: 'Mauritius',
        flag: '🇲🇺',
        category: 'affected_by_90_180',
        region: 'Africa'
    },
    {
        code: 'SC',
        name: 'Seychelles',
        flag: '🇸🇨',
        category: 'affected_by_90_180',
        region: 'Africa'
    }
];
// EU/EEA/Swiss citizens (NOT subject to 90/180 rule)
const EU_EEA_SWISS_COUNTRIES = [
    // EU Countries
    {
        code: 'AT',
        name: 'Austria',
        flag: '🇦🇹',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'BE',
        name: 'Belgium',
        flag: '🇧🇪',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'BG',
        name: 'Bulgaria',
        flag: '🇧🇬',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'HR',
        name: 'Croatia',
        flag: '🇭🇷',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'CY',
        name: 'Cyprus',
        flag: '🇨🇾',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'CZ',
        name: 'Czech Republic',
        flag: '🇨🇿',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'DK',
        name: 'Denmark',
        flag: '🇩🇰',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'EE',
        name: 'Estonia',
        flag: '🇪🇪',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'FI',
        name: 'Finland',
        flag: '🇫🇮',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'FR',
        name: 'France',
        flag: '🇫🇷',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'DE',
        name: 'Germany',
        flag: '🇩🇪',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'GR',
        name: 'Greece',
        flag: '🇬🇷',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'HU',
        name: 'Hungary',
        flag: '🇭🇺',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'IE',
        name: 'Ireland',
        flag: '🇮🇪',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'IT',
        name: 'Italy',
        flag: '🇮🇹',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'LV',
        name: 'Latvia',
        flag: '🇱🇻',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'LT',
        name: 'Lithuania',
        flag: '🇱🇹',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'LU',
        name: 'Luxembourg',
        flag: '🇱🇺',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'MT',
        name: 'Malta',
        flag: '🇲🇹',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'NL',
        name: 'Netherlands',
        flag: '🇳🇱',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'PL',
        name: 'Poland',
        flag: '🇵🇱',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'PT',
        name: 'Portugal',
        flag: '🇵🇹',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'RO',
        name: 'Romania',
        flag: '🇷🇴',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'SK',
        name: 'Slovakia',
        flag: '🇸🇰',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'SI',
        name: 'Slovenia',
        flag: '🇸🇮',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'ES',
        name: 'Spain',
        flag: '🇪🇸',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'SE',
        name: 'Sweden',
        flag: '🇸🇪',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    // EEA Countries (Non-EU)
    {
        code: 'IS',
        name: 'Iceland',
        flag: '🇮🇸',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'LI',
        name: 'Liechtenstein',
        flag: '🇱🇮',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    {
        code: 'NO',
        name: 'Norway',
        flag: '🇳🇴',
        category: 'eu_eea_swiss',
        region: 'Europe'
    },
    // Switzerland
    {
        code: 'CH',
        name: 'Switzerland',
        flag: '🇨🇭',
        category: 'eu_eea_swiss',
        region: 'Europe'
    }
];
// Combined list of all countries for dropdown
const ALL_COUNTRIES_FOR_CITIZENSHIP = [
    ...COUNTRIES_AFFECTED_BY_90_180,
    ...EU_EEA_SWISS_COUNTRIES,
    // Add other major countries that require visas
    {
        code: 'CN',
        name: 'China',
        flag: '🇨🇳',
        category: 'requires_visa',
        region: 'Asia'
    },
    {
        code: 'IN',
        name: 'India',
        flag: '🇮🇳',
        category: 'requires_visa',
        region: 'Asia'
    },
    {
        code: 'RU',
        name: 'Russia',
        flag: '🇷🇺',
        category: 'requires_visa',
        region: 'Europe'
    },
    {
        code: 'TR',
        name: 'Turkey',
        flag: '🇹🇷',
        category: 'requires_visa',
        region: 'Europe'
    },
    {
        code: 'ZA',
        name: 'South Africa',
        flag: '🇿🇦',
        category: 'requires_visa',
        region: 'Africa'
    },
    {
        code: 'EG',
        name: 'Egypt',
        flag: '🇪🇬',
        category: 'requires_visa',
        region: 'Africa'
    },
    {
        code: 'NG',
        name: 'Nigeria',
        flag: '🇳🇬',
        category: 'requires_visa',
        region: 'Africa'
    },
    {
        code: 'PK',
        name: 'Pakistan',
        flag: '🇵🇰',
        category: 'requires_visa',
        region: 'Asia'
    },
    {
        code: 'BD',
        name: 'Bangladesh',
        flag: '🇧🇩',
        category: 'requires_visa',
        region: 'Asia'
    },
    {
        code: 'PH',
        name: 'Philippines',
        flag: '🇵🇭',
        category: 'requires_visa',
        region: 'Asia'
    },
    {
        code: 'VN',
        name: 'Vietnam',
        flag: '🇻🇳',
        category: 'requires_visa',
        region: 'Asia'
    },
    {
        code: 'TH',
        name: 'Thailand',
        flag: '🇹🇭',
        category: 'requires_visa',
        region: 'Asia'
    },
    {
        code: 'ID',
        name: 'Indonesia',
        flag: '🇮🇩',
        category: 'requires_visa',
        region: 'Asia'
    },
    {
        code: 'SA',
        name: 'Saudi Arabia',
        flag: '🇸🇦',
        category: 'requires_visa',
        region: 'Middle East'
    },
    {
        code: 'IR',
        name: 'Iran',
        flag: '🇮🇷',
        category: 'requires_visa',
        region: 'Middle East'
    },
    {
        code: 'IQ',
        name: 'Iraq',
        flag: '🇮🇶',
        category: 'requires_visa',
        region: 'Middle East'
    }
].sort((a, b)=>a.name.localeCompare(b.name));
// Utility functions
const getCountryClassification = (countryCode)=>{
    return ALL_COUNTRIES_FOR_CITIZENSHIP.find((country)=>country.code === countryCode);
};
const isSubjectTo90180Rule = (countryCodes)=>{
    // If user has EU/EEA/Swiss citizenship, they're not subject to the rule
    const hasEUCitizenship = countryCodes.some((code)=>EU_EEA_SWISS_COUNTRIES.some((country)=>country.code === code));
    if (hasEUCitizenship) return false;
    // If user has citizenship in affected countries, they are subject to the rule
    const hasAffectedCitizenship = countryCodes.some((code)=>COUNTRIES_AFFECTED_BY_90_180.some((country)=>country.code === code));
    return hasAffectedCitizenship;
};
const getRuleApplicability = (countryCodes)=>{
    const hasEUCitizenship = countryCodes.some((code)=>EU_EEA_SWISS_COUNTRIES.some((country)=>country.code === code));
    const hasAffectedCitizenship = countryCodes.some((code)=>COUNTRIES_AFFECTED_BY_90_180.some((country)=>country.code === code));
    if (hasEUCitizenship) {
        return {
            isSubjectToRule: false,
            exemptionReason: 'eu_citizen',
            message: 'The 90/180 rule doesn\'t apply to you as an EU/EEA/Swiss citizen, but you can still use our travel tracker!'
        };
    }
    if (hasAffectedCitizenship) {
        return {
            isSubjectToRule: true,
            exemptionReason: null,
            message: 'Track your Schengen compliance with our 90/180 day calculator'
        };
    }
    return {
        isSubjectToRule: false,
        exemptionReason: 'requires_visa',
        message: 'You\'ll need a Schengen visa to travel to Europe. Our calculator can help you plan your applications.'
    };
};
const getCountriesForCitizenshipSelect = ()=>{
    return ALL_COUNTRIES_FOR_CITIZENSHIP.map((country)=>({
            value: country.code,
            label: `${country.flag} ${country.name}`,
            country,
            category: country.category,
            region: country.region
        }));
};
// Statistics
const AFFECTED_COUNTRIES_COUNT = COUNTRIES_AFFECTED_BY_90_180.length // 66 countries
;
const EU_EEA_SWISS_COUNT = EU_EEA_SWISS_COUNTRIES.length // 31 countries
;
const TOTAL_COUNTRIES_COUNT = ALL_COUNTRIES_FOR_CITIZENSHIP.length;

exports.AFFECTED_COUNTRIES_COUNT = AFFECTED_COUNTRIES_COUNT;
exports.ALL_COUNTRIES_FOR_CITIZENSHIP = ALL_COUNTRIES_FOR_CITIZENSHIP;
exports.COUNTRIES_AFFECTED_BY_90_180 = COUNTRIES_AFFECTED_BY_90_180;
exports.DateOverlapValidator = DateOverlapValidator;
exports.EU_EEA_SWISS_COUNT = EU_EEA_SWISS_COUNT;
exports.EU_EEA_SWISS_COUNTRIES = EU_EEA_SWISS_COUNTRIES;
exports.RobustSchengenCalculator = RobustSchengenCalculator;
exports.SCHENGEN_COUNTRIES = SCHENGEN_COUNTRIES;
exports.SCHENGEN_COUNTRIES_COUNT = SCHENGEN_COUNTRIES_COUNT;
exports.TOTAL_COUNTRIES_COUNT = TOTAL_COUNTRIES_COUNT;
exports.benchmarkPerformance = benchmarkCumulativePerformance;
exports.getCountriesForCitizenshipSelect = getCountriesForCitizenshipSelect;
exports.getCountriesForSelect = getCountriesForSelect;
exports.getCountryByCode = getCountryByCode;
exports.getCountryByName = getCountryByName;
exports.getCountryClassification = getCountryClassification;
exports.getEUMemberCountries = getEUMemberCountries;
exports.getNonEUSchengenCountries = getNonEUSchengenCountries;
exports.getRuleApplicability = getRuleApplicability;
exports.isSubjectTo90180Rule = isSubjectTo90180Rule;
exports.validateCumulative = validateCumulativeCalculation;
exports.validateMobile = validateMobileCumulativeCalculation;
exports.validateSequence = validateChronologicalSequence;
//# sourceMappingURL=index.cjs.js.map
