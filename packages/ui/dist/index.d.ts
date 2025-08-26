import { ClassValue } from 'clsx';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React from 'react';
import React__default from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { DayPickerProps } from 'react-day-picker';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Trip, DateRange as DateRange$1, ValidationResult } from '@schengen/calculator';
export { ConflictDetail, DateRange, OverlapPreventionConfig, Trip, ValidationResult } from '@schengen/calculator';
import { SubscriptionTier, BillingCycle } from '@schengen/payments';

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
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "brand" | "cream" | "success" | "warning" | null | undefined;
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
    variant?: "default" | "destructive" | "outline" | "secondary" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

interface HeaderProps {
    onLoginClick?: () => void;
    onSignupClick?: () => void;
    className?: string;
}
declare function Header({ onLoginClick, onSignupClick, className }: HeaderProps): react_jsx_runtime.JSX.Element;

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectProps {
    options: SelectOption[];
    value?: string;
    placeholder?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    searchable?: boolean;
}
declare function Select({ options, value, placeholder, onValueChange, disabled, className, searchable }: SelectProps): react_jsx_runtime.JSX.Element;

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

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}
interface CalendarModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Callback when modal should close */
    onClose: () => void;
    /** Callback when date range is selected */
    onDateRangeSelect: (range: DateRange) => void;
    /** Initial date range */
    initialRange?: DateRange;
    /** Disabled dates */
    disabledDates?: Date[];
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** Additional className */
    className?: string;
}
declare function CalendarModal({ isOpen, onClose, onDateRangeSelect, initialRange, disabledDates, minDate, maxDate, className }: CalendarModalProps): React__default.ReactPortal | null;

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    className?: string;
    suffix?: string;
    prefix?: string;
}
declare function AnimatedCounter({ value, duration, className, suffix, prefix }: AnimatedCounterProps): react_jsx_runtime.JSX.Element;

interface SchengenCalendarProps {
    /** Existing trips for conflict detection */
    existingTrips?: Trip[];
    /** Selected date (single mode) */
    selected?: Date;
    /** Selected date range (range mode) */
    selectedRange?: DateRange$1;
    /** Calendar mode */
    mode?: "single" | "range";
    /** Callback for single date selection */
    onSelect?: (date: Date | undefined) => void;
    /** Callback for date range selection */
    onRangeSelect?: (range: DateRange$1 | undefined) => void;
    /** Show occupied date indicators */
    showOccupiedDates?: boolean;
    /** Show conflict warnings */
    showConflictWarnings?: boolean;
    /** Show alternative date suggestions */
    showAlternativeSuggestions?: boolean;
    /** Custom validator configuration */
    validatorConfig?: {
        allowSameDayTravel?: boolean;
        allowBorderTransitions?: boolean;
        strictMode?: boolean;
    };
    /** Additional class name */
    className?: string;
    /** Minimum date that can be selected */
    fromDate?: Date;
    /** Maximum date that can be selected */
    toDate?: Date;
    /** Disabled dates */
    disabled?: Date[] | ((date: Date) => boolean);
    /** Custom styling for different date states */
    customClassNames?: {
        occupied?: string;
        conflict?: string;
        available?: string;
        selected?: string;
    };
    /** Show validation messages */
    showValidationMessages?: boolean;
    /** Custom validation message render */
    renderValidationMessage?: (validation: ValidationResult) => React.ReactNode;
}
declare function SchengenCalendar({ existingTrips, selected, selectedRange, mode, onSelect, onRangeSelect, showOccupiedDates, showConflictWarnings, showAlternativeSuggestions, validatorConfig, className, fromDate, toDate, disabled, customClassNames, showValidationMessages, renderValidationMessage, ...props }: SchengenCalendarProps): react_jsx_runtime.JSX.Element;
declare namespace SchengenCalendar {
    var displayName: string;
}

interface TripCardProps {
    /** Trip data to display */
    trip: Trip;
    /** Show edit button */
    showEdit?: boolean;
    /** Show delete button */
    showDelete?: boolean;
    /** Callback when edit is clicked */
    onEdit?: (trip: Trip) => void;
    /** Callback when delete is clicked */
    onDelete?: (trip: Trip) => void;
    /** Additional class name */
    className?: string;
    /** Compact mode for mobile */
    compact?: boolean;
    /** Show country flag (requires country code mapping) */
    showFlag?: boolean;
    /** Custom country flag render function */
    renderFlag?: (countryName: string) => React.ReactNode;
}
declare function TripCard({ trip, showEdit, showDelete, onEdit, onDelete, className, compact, showFlag, renderFlag, }: TripCardProps): react_jsx_runtime.JSX.Element;
declare namespace TripCard {
    var displayName: string;
}

interface SubscriptionGateProps {
    feature: string;
    currentTier: SubscriptionTier;
    userUsage?: {
        calculations?: number;
        exportCount?: number;
        storageUsed?: number;
        apiRequests?: number;
    };
    mode?: 'modal' | 'inline' | 'banner';
    showComparison?: boolean;
    showTrialOffer?: boolean;
    onUpgrade?: (targetTier: SubscriptionTier) => void;
    onClose?: () => void;
    customMessage?: string;
    customTitle?: string;
    className?: string;
}
declare function SubscriptionGate({ feature, currentTier, userUsage, mode, showComparison, showTrialOffer, onUpgrade, onClose, customMessage, customTitle, className }: SubscriptionGateProps): react_jsx_runtime.JSX.Element | null;
declare function useSubscriptionGate(feature: string, currentTier: SubscriptionTier, userUsage?: any): {
    hasAccess: any;
    showGate: boolean;
    requireFeature: () => boolean;
    closeGate: () => void;
    accessResult: any;
};

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTier: SubscriptionTier;
    billingCycle?: BillingCycle;
    userId?: string;
    userEmail?: string;
    currentTier?: SubscriptionTier;
    title?: string;
    subtitle?: string;
    showFeatureComparison?: boolean;
    showSecurityBadges?: boolean;
    onSuccess?: (subscriptionId: string) => void;
    onError?: (error: Error) => void;
    onCancel?: () => void;
    stripePublishableKey?: string;
    priceId?: string;
    className?: string;
}
declare function PaymentModal({ isOpen, onClose, selectedTier, billingCycle, userId, userEmail, currentTier, title, subtitle, showFeatureComparison, showSecurityBadges, onSuccess, onError, onCancel, stripePublishableKey, priceId, className }: PaymentModalProps): react_jsx_runtime.JSX.Element | null;
declare function usePaymentModal(): {
    isOpen: boolean;
    selectedTier: SubscriptionTier;
    billingCycle: BillingCycle;
    openModal: (tier: SubscriptionTier, cycle?: BillingCycle) => void;
    closeModal: () => void;
    setSelectedTier: React__default.Dispatch<any>;
    setBillingCycle: React__default.Dispatch<any>;
};

interface PricingCardsProps {
    currentTier?: SubscriptionTier;
    currentUsage?: {
        calculations?: number;
        exportCount?: number;
        storageUsed?: number;
    };
    showComparison?: boolean;
    showPopularBadge?: boolean;
    showAnnualToggle?: boolean;
    highlightTier?: SubscriptionTier;
    compact?: boolean;
    onSelectPlan?: (tier: SubscriptionTier, billingCycle: BillingCycle) => void;
    onStartTrial?: (tier: SubscriptionTier) => void;
    title?: string;
    subtitle?: string;
    className?: string;
}
declare function PricingCards({ currentTier, currentUsage, showComparison, showPopularBadge, showAnnualToggle, highlightTier, compact, onSelectPlan, onStartTrial, title, subtitle, className }: PricingCardsProps): react_jsx_runtime.JSX.Element;

export { AnimatedCounter, Badge, Button, Calendar, CalendarModal, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CircularProgress, Header, Input, Label, PaymentModal, PricingCards, SchengenCalendar, Select, SubscriptionGate, TripCard, addDays, badgeVariants, buttonVariants, cn, daysBetween, debounce, endOfDay, formatDateKey, formatDateRange, formatDisplayDate, generateId, getDateRange, isDateInRange, isFutureDate, isMobile, isPastDate, isSameDay, isToday, isTouchDevice, labelVariants, startOfDay, subtractDays, throttle, usePaymentModal, useSubscriptionGate };
export type { BadgeProps, ButtonProps, CalendarModalProps, CalendarProps, CircularProgressProps, HeaderProps, InputProps, PaymentModalProps, PricingCardsProps, SchengenCalendarProps, SelectOption, SelectProps, SubscriptionGateProps, TripCardProps };
