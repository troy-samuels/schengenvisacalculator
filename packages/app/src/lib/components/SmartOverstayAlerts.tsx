"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { AlertCircle, AlertTriangle, Shield, Plane, ChevronDown, ChevronUp } from 'lucide-react'
import { Button, cn } from '@schengen/ui'

type AlertSeverity = 'critical' | 'warning' | 'caution'

export interface OverstayAlertProps {
  severity: AlertSeverity
  heading: string
  message: string
  daysRemaining: number
  totalDaysUsed: number
  latestSafeDeparture?: Date
  nextResetDate?: Date
  optimalReturnDate?: Date
  maxStayIfEnterToday?: number
  onPlanTrip?: () => void
  onViewCalendar?: () => void
  onViewActionPlan?: () => void
  className?: string
}

const severityStyles: Record<
  AlertSeverity,
  {
    container: string
    indicator: string
    text: string
    icon: JSX.Element
  }
> = {
  critical: {
    container: 'border-red-300 bg-red-50/60',
    indicator: 'bg-red-500',
    text: 'text-red-700',
    icon: <AlertTriangle className="w-4 h-4 text-red-600" />
  },
  warning: {
    container: 'border-orange-200 bg-orange-50/70',
    indicator: 'bg-orange-400',
    text: 'text-orange-700',
    icon: <AlertTriangle className="w-4 h-4 text-orange-500" />
  },
  caution: {
    container: 'border-amber-200 bg-amber-50/70',
    indicator: 'bg-amber-400',
    text: 'text-amber-700',
    icon: <Shield className="w-4 h-4 text-amber-600" />
  }
}

export function SmartOverstayAlerts({
  severity,
  heading,
  message,
  daysRemaining,
  totalDaysUsed,
  latestSafeDeparture,
  nextResetDate,
  optimalReturnDate,
  maxStayIfEnterToday,
  onPlanTrip,
  onViewCalendar,
  onViewActionPlan,
  className
}: OverstayAlertProps) {
  const [expanded, setExpanded] = useState(false)
  const styles = severityStyles[severity]

  const detailItems = [
    latestSafeDeparture && {
      label: 'Latest safe departure',
      value: format(latestSafeDeparture, 'MMM d, yyyy'),
      icon: <Plane className="w-4 h-4 text-rose-500" />
    },
    nextResetDate && {
      label: 'Full reset date',
      value: format(nextResetDate, 'MMM d, yyyy'),
      icon: <Shield className="w-4 h-4 text-blue-500" />
    },
    optimalReturnDate && {
      label: 'Best re-entry window',
      value: format(optimalReturnDate, 'MMM d, yyyy'),
      icon: <AlertCircle className="w-4 h-4 text-emerald-500" />
    },
    maxStayIfEnterToday !== undefined && {
      label: 'Max stay if you enter today',
      value: `${maxStayIfEnterToday} day${maxStayIfEnterToday === 1 ? '' : 's'}`,
      icon: <Shield className="w-4 h-4 text-gray-500" />
    }
  ].filter(Boolean) as { label: string; value: string; icon: JSX.Element }[]

  return (
    <div
      className={cn(
        'rounded-xl border shadow-sm transition-all duration-200',
        styles.container,
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={cn('mt-1 h-8 w-1 rounded-full', styles.indicator)} />
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
                {styles.icon}
                <span className={styles.text}>
                  {severity === 'critical'
                    ? 'Critical'
                    : severity === 'warning'
                    ? 'Action needed'
                    : 'Monitor usage'}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {Math.max(daysRemaining, 0)} day{Math.max(daysRemaining, 0) === 1 ? '' : 's'} left in window
              </span>
            </div>
            <h3 className="mt-1 text-sm font-semibold text-gray-900">{heading}</h3>
            <p className="mt-1 text-sm text-gray-700">{message}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onViewActionPlan && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewActionPlan}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              View action plan
            </Button>
          )}
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-white"
          >
            {expanded ? (
              <>
                Hide details
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                View details
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 rounded-lg border border-dashed border-white/70 bg-white/60 p-4 text-sm text-gray-700">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-white/90 p-3 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-400">Usage snapshot</p>
              <p className="mt-1 text-sm text-gray-700">
                You've used <span className="font-semibold text-gray-900">{totalDaysUsed}</span> of the 90-day allowance with{' '}
                <span className="font-semibold text-gray-900">{Math.max(daysRemaining, 0)}</span> days remaining in the rolling 180-day window.
              </p>
            </div>
            {latestSafeDeparture && (
              <div className="rounded-md bg-white/90 p-3 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-400">Departure guidance</p>
                <p className="mt-1 text-sm text-gray-700">
                  Exit before <span className="font-semibold text-gray-900">{format(latestSafeDeparture, 'MMM d, yyyy')}</span> to stay compliant.
                </p>
                {onPlanTrip && (
                  <Button
                    size="sm"
                    className="mt-2 h-8 bg-rose-600 text-xs text-white hover:bg-rose-700"
                    onClick={onPlanTrip}
                  >
                    Schedule departure
                  </Button>
                )}
              </div>
            )}
          </div>

          {detailItems.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {detailItems.map(item => (
                <div key={item.label} className="flex items-center gap-3 rounded-md border border-gray-200/70 bg-white/90 px-3 py-2 text-xs text-gray-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">{item.icon}</span>
                  <div>
                    <p className="uppercase tracking-wide text-[10px] text-gray-400">{item.label}</p>
                    <p className="font-medium text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {onViewCalendar && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={onViewCalendar}
            >
              Open re-entry planner
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
