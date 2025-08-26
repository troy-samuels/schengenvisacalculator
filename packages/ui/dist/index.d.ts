import { ClassValue } from 'clsx';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React from 'react';
import React__default from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { DayPickerProps } from 'react-day-picker';
import * as LabelPrimitive from '@radix-ui/react-label';
export { ConflictDetail, DateRange, OverlapPreventionConfig, Trip, ValidationResult } from '@schengen/calculator';

/**
 * Utility function to merge Tailwind CSS classes with conditional logic
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Format a date to ISO string for consistent date comparisons
 */
declare function formatDateKey(date: Date): string;
/**
 * Check if two dates are the same day (ignoring time)
 */
declare function isSameDay(date1: Date, date2: Date): boolean;
/**
 * Check if a date is within a date range (inclusive)
 */
declare function isDateInRange(date: Date, start: Date, end: Date): boolean;
/**
 * Generate array of dates between start and end (inclusive)
 */
declare function getDateRange(start: Date, end: Date): Date[];
/**
 * Check if date is today
 */
declare function isToday(date: Date): boolean;
/**
 * Check if date is in the past
 */
declare function isPastDate(date: Date): boolean;
/**
 * Check if date is in the future
 */
declare function isFutureDate(date: Date): boolean;
/**
 * Format date for display in UI components
 */
declare function formatDisplayDate(date: Date, options?: Intl.DateTimeFormatOptions): string;
/**
 * Format date range for display
 */
declare function formatDateRange(start: Date, end: Date): string;
/**
 * Calculate number of days between two dates
 */
declare function daysBetween(start: Date, end: Date): number;
/**
 * Add days to a date
 */
declare function addDays(date: Date, days: number): Date;
/**
 * Subtract days from a date
 */
declare function subtractDays(date: Date, days: number): Date;
/**
 * Get the start of day for consistent date comparisons
 */
declare function startOfDay(date: Date): Date;
/**
 * Get the end of day
 */
declare function endOfDay(date: Date): Date;
/**
 * Debounce function for performance optimization
 */
declare function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Throttle function for performance optimization
 */
declare function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Generate a unique ID for components
 */
declare function generateId(prefix?: string): string;
/**
 * Check if device is mobile based on viewport width
 */
declare function isMobile(): boolean;
/**
 * Check if device has touch capability
 */
declare function isTouchDevice(): boolean;

declare const buttonVariants: (props?: ({
    variant?: "default" | "link" | "secondary" | "destructive" | "outline" | "success" | "warning" | "ghost" | "brand" | "cream" | null | undefined;
    size?: "default" | "sm" | "lg" | "xl" | "icon" | "mobile" | "mobile-sm" | "mobile-lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type CalendarProps = DayPickerProps;
declare function Calendar({ className, classNames, showOutsideDays, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}

declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: boolean;
    helperText?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare const labelVariants: (props?: ({
    variant?: "default" | "required" | "optional" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "required" | "optional" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string> & React.RefAttributes<HTMLLabelElement>>;

declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

interface HeaderProps {
    onLoginClick?: () => void;
    onSignupClick?: () => void;
    user?: any;
    loading?: boolean;
    className?: string;
}
declare function Header({ onLoginClick, onSignupClick, user, loading, className }: HeaderProps): react_jsx_runtime.JSX.Element;

interface CircularProgressProps {
    /** Current value */
    value: number;
    /** Maximum value (default: 90 for Schengen days) */
    max?: number;
    /** Size of the circle in pixels */
    size?: number;
    /** Stroke width */
    strokeWidth?: number;
    /** Progress color */
    progressColor?: string;
    /** Background color */
    backgroundColor?: string;
    /** Text color */
    textColor?: string;
    /** Additional className */
    className?: string;
    /** Custom label */
    label?: string;
    /** Show percentage instead of value */
    showPercentage?: boolean;
    /** Animation duration in milliseconds */
    animationDuration?: number;
}
declare function CircularProgress({ value, max, size, strokeWidth, progressColor, // Green-500
backgroundColor, // Gray-200
textColor, // Gray-700
className, label, showPercentage, animationDuration }: CircularProgressProps): react_jsx_runtime.JSX.Element;

/**
 * Date Overlap Prevention System
 * CRITICAL: Prevents users from selecting dates that conflict with existing trips
 * Requirement: A person cannot be in two different locations simultaneously
 */
interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}
interface TripEntry {
    id: string;
    country: string;
    startDate: Date | null;
    endDate: Date | null;
    days: number;
}
interface ValidationResult {
    isValid: boolean;
    conflicts: TripEntry[];
    message: string;
    conflictDates: Date[];
}
interface OccupiedDateInfo {
    date: Date;
    tripId: string;
    country: string;
    tripName: string;
}
declare class DateOverlapValidator {
    /**
     * CRITICAL: Validates if new date range conflicts with existing trips
     * Must be 100% accurate for EU Schengen compliance
     */
    static validateDateRange(newRange: DateRange, existingTrips: TripEntry[], excludeTripId?: string): ValidationResult;
    /**
     * Returns array of dates that should be disabled in date picker
     * These dates MUST be visually greyed out with strikethrough
     */
    static getDisabledDates(existingTrips: TripEntry[], excludeTripId?: string): Date[];
    /**
     * Returns detailed information about occupied dates for tooltips
     */
    static getOccupiedDateInfo(existingTrips: TripEntry[], excludeTripId?: string): OccupiedDateInfo[];
    /**
     * Check if two date ranges overlap
     */
    private static rangesOverlap;
    /**
     * Get specific dates where overlap occurs
     */
    private static getOverlapDates;
    /**
     * Helper to format date for user messages
     */
    static formatDateForMessage(date: Date): string;
    /**
     * Get user-friendly error message for date conflicts
     */
    static getConflictMessage(conflicts: TripEntry[], conflictDates: Date[]): string;
}
/**
 * React hook for date overlap prevention
 * Integrates with existing state management without UI changes
 */
interface UseDateOverlapPreventionProps {
    existingTrips: TripEntry[];
    excludeTripId?: string;
}
interface UseDateOverlapPreventionReturn {
    validateDateRange: (range: DateRange) => ValidationResult;
    getDisabledDates: () => Date[];
    getOccupiedDateInfo: () => OccupiedDateInfo[];
    isDateOccupied: (date: Date) => boolean;
}
declare function useDateOverlapPrevention({ existingTrips, excludeTripId }: UseDateOverlapPreventionProps): UseDateOverlapPreventionReturn;

interface CalendarDateRange {
    startDate: Date | null;
    endDate: Date | null;
}
interface CalendarModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Callback when modal should close */
    onClose: () => void;
    /** Callback when date range is selected */
    onDateRangeSelect: (range: CalendarDateRange) => void;
    /** Initial date range */
    initialRange?: CalendarDateRange;
    /** Disabled dates */
    disabledDates?: Date[];
    /** Information about occupied dates for better UX */
    occupiedDateInfo?: OccupiedDateInfo[];
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** Additional className */
    className?: string;
}
declare function CalendarModal({ isOpen, onClose, onDateRangeSelect, initialRange, disabledDates, occupiedDateInfo, minDate, maxDate, className }: CalendarModalProps): React__default.ReactPortal | null;

export { Badge, Button, Calendar, CalendarModal, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CircularProgress, DateOverlapValidator, Header, Input, Label, addDays, badgeVariants, buttonVariants, cn, daysBetween, debounce, endOfDay, formatDateKey, formatDateRange, formatDisplayDate, generateId, getDateRange, isDateInRange, isFutureDate, isMobile, isPastDate, isSameDay, isToday, isTouchDevice, labelVariants, startOfDay, subtractDays, throttle, useDateOverlapPrevention };
export type { BadgeProps, ButtonProps, CalendarDateRange, CalendarModalProps, CalendarProps, CircularProgressProps, HeaderProps, InputProps, OccupiedDateInfo, TripEntry, UseDateOverlapPreventionProps, UseDateOverlapPreventionReturn };
