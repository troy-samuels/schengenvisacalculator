/**
 * Core types for the Schengen Calculator package
 * These types are used throughout the calculator and validation systems
 */
interface Trip {
    id: string;
    country: string;
    startDate: Date;
    endDate: Date;
    days: number;
}
interface ComplianceResult {
    totalDaysUsed: number;
    daysRemaining: number;
    isCompliant: boolean;
    overstayDays: number;
    referenceDate: Date;
    periodStart: Date;
    periodEnd: Date;
    detailedBreakdown: DayBreakdown[];
}
interface DayBreakdown {
    date: Date;
    daysUsedOnDate: number;
    cumulativeDaysInWindow: number;
    isViolation: boolean;
    contributingTrips: string[];
}
interface ValidationError {
    field: string;
    message: string;
    severity: 'ERROR' | 'WARNING';
    tripId?: string;
}
interface RollingWindowCheck {
    date: Date;
    windowStart: Date;
    windowEnd: Date;
    daysInWindow: number;
    isCompliant: boolean;
    overstayDays: number;
}
interface PlannedTripValidation {
    isValid: boolean;
    violationDays: number;
    violationDate: Date | null;
}
interface TripValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationError[];
}
/**
 * Enhanced trip interface for future features
 */
interface EnhancedTrip extends Trip {
    purpose?: 'business' | 'tourism' | 'family' | 'other';
    notes?: string;
    documents?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Robust Schengen Calculator implementing exact 180-day rolling window rules
 *
 * Key Schengen Rules:
 * 1. Maximum 90 days in any 180-day period
 * 2. The 180-day period is ROLLING - calculated from any given date backward
 * 3. Entry and exit days both count as stay days
 * 4. Days must be calculated for EVERY day, not just trip endpoints
 */
declare class RobustSchengenCalculator {
    private static readonly MAX_DAYS_IN_PERIOD;
    private static readonly ROLLING_PERIOD_DAYS;
    /**
     * Calculate compliance using exact rolling window algorithm
     * This checks compliance for EVERY day in the period, not just trip endpoints
     * Enhanced with edge case handling for leap years, timezones, and boundary conditions
     */
    static calculateExactCompliance(trips: Trip[], referenceDate?: Date): ComplianceResult;
    /**
     * Calculate the exact number of days used in any 180-day window ending on a specific date
     */
    static calculateDaysInWindow(trips: Trip[], endDate: Date): number;
    /**
     * Check if a planned trip would violate the 90/180 rule
     */
    static validatePlannedTrip(existingTrips: Trip[], plannedTrip: Trip): PlannedTripValidation;
    /**
     * Find the latest date when a trip of specified length could start without violation
     */
    static findLatestValidStartDate(existingTrips: Trip[], tripLength: number, earliestStart: Date, latestStart: Date): Date | null;
    /**
     * Calculate maximum consecutive days available from a start date
     */
    static calculateMaxConsecutiveDays(existingTrips: Trip[], startDate: Date): number;
    /**
     * Comprehensive trip validation
     */
    static validateTrips(trips: Trip[]): TripValidationResult;
    /**
     * Get next date when days will "roll off" the window
     */
    static getNextResetDate(trips: Trip[], referenceDate?: Date): Date | null;
    /**
     * Debug function to visualize rolling window calculations
     */
    static debugRollingWindow(trips: Trip[], referenceDate: Date): any;
    /**
     * Validate and normalize trip data with error handling
     */
    private static validateAndNormalizeTrips;
    /**
     * Create a map of daily stays for efficient lookup
     */
    private static createDailyStayMap;
    /**
     * Calculate rolling compliance check for every day in the period
     */
    private static calculateRollingComplianceForAllDays;
    /**
     * Generate detailed day-by-day breakdown
     */
    private static generateDetailedBreakdown;
    /**
     * Enhanced date normalization with timezone-agnostic handling
     */
    private static normalizeToStartOfDay;
    /**
     * Calculate period start with leap year awareness
     */
    private static calculatePeriodStart;
    /**
     * Check if a trip crosses February 29th in a leap year
     */
    private static tripCrossesLeapDay;
}

interface DateRange {
    start: Date;
    end: Date;
}
interface ValidationResult {
    isValid: boolean;
    conflicts: ConflictDetail[];
    message: string;
    occupiedDates: Date[];
}
interface ConflictDetail {
    tripId: string;
    tripCountry: string;
    conflictStart: Date;
    conflictEnd: Date;
    overlapDays: number;
}
interface OverlapPreventionConfig {
    allowSameDayTravel: boolean;
    allowBorderTransitions: boolean;
    strictMode: boolean;
}
/**
 * Date Overlap Validator - Prevents selection of already occupied dates
 *
 * Core Features:
 * 1. Detects date conflicts between new and existing trips
 * 2. Provides visual indicators for occupied dates (grey + strikethrough)
 * 3. Returns specific conflict details for user feedback
 * 4. Handles edge cases: same-day travel, border transitions
 * 5. Mobile-optimized with larger touch targets
 */
declare class DateOverlapValidator {
    private config;
    constructor(config?: Partial<OverlapPreventionConfig>);
    /**
     * Validate if a date range conflicts with existing trips
     */
    validateDateRange(newRange: DateRange, existingTrips: Trip[]): ValidationResult;
    /**
     * Get all occupied dates from existing trips for calendar display
     */
    getAllOccupiedDates(trips: Trip[]): Date[];
    /**
     * Check if a specific date is occupied by existing trips
     */
    isDateOccupied(date: Date, existingTrips: Trip[]): boolean;
    /**
     * Get trips that occupy a specific date
     */
    getTripsOnDate(date: Date, existingTrips: Trip[]): Trip[];
    /**
     * Find next available date range of specified length
     */
    findNextAvailableDateRange(preferredStart: Date, lengthInDays: number, existingTrips: Trip[], searchLimit?: number): DateRange | null;
    /**
     * Suggest alternative dates when conflicts exist
     */
    suggestAlternativeDates(conflictedRange: DateRange, lengthInDays: number, existingTrips: Trip[]): DateRange[];
    /**
     * Batch validation for multiple date ranges
     */
    validateMultipleDateRanges(newRanges: DateRange[], existingTrips: Trip[]): {
        [index: number]: ValidationResult;
    };
    /**
     * Private: Check if two date ranges overlap
     */
    private rangesOverlap;
    /**
     * Private: Calculate detailed conflict information
     */
    private calculateConflictDetail;
    /**
     * Private: Determine if conflict should be reported based on configuration
     */
    private shouldReportConflict;
    /**
     * Private: Add occupied dates from a trip to the occupied dates array
     */
    private addOccupiedDatesFromTrip;
    /**
     * Private: Generate human-readable validation message
     */
    private generateValidationMessage;
    /**
     * Private: Validate date range input
     */
    private isValidDateRange;
    /**
     * Private: Validate trip data
     */
    private isValidTrip;
    /**
     * Update configuration
     */
    updateConfig(newConfig: Partial<OverlapPreventionConfig>): void;
    /**
     * Get current configuration
     */
    getConfig(): OverlapPreventionConfig;
}

/**
 * Schengen Area Countries Data
 * Complete list of all 27 Schengen countries with flags and metadata
 * Updated as of 2024 - includes all current member states
 */
interface SchengenCountry {
    code: string;
    name: string;
    flag: string;
    joinedSchengen: string;
    isEUMember: boolean;
    capital: string;
    timezone: string;
    currency: string;
}
declare const SCHENGEN_COUNTRIES: SchengenCountry[];
declare const getCountryByCode: (code: string) => SchengenCountry | undefined;
declare const getCountryByName: (name: string) => SchengenCountry | undefined;
declare const getCountriesForSelect: () => {
    value: string;
    label: string;
    country: SchengenCountry;
}[];
declare const getEUMemberCountries: () => SchengenCountry[];
declare const getNonEUSchengenCountries: () => SchengenCountry[];
declare const SCHENGEN_COUNTRIES_COUNT: number;

export { DateOverlapValidator, RobustSchengenCalculator, SCHENGEN_COUNTRIES, SCHENGEN_COUNTRIES_COUNT, getCountriesForSelect, getCountryByCode, getCountryByName, getEUMemberCountries, getNonEUSchengenCountries };
export type { ComplianceResult, ConflictDetail, DateRange, DayBreakdown, EnhancedTrip, OverlapPreventionConfig, PlannedTripValidation, RollingWindowCheck, SchengenCountry, Trip, TripValidationResult, ValidationError, ValidationResult };
