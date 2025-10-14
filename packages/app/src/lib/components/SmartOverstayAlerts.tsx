"use client"

import { addDays, format } from 'date-fns'
import { AlertTriangle, AlertOctagon, Shield, Plane, CheckCircle2 } from 'lucide-react'
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
  className?: string
}

const severityStyles: Record<
  AlertSeverity,
  {
    container: string
    badge: string
    icon: JSX.Element
    accent: string
  }
> = {
  critical: {
    container: 'border-red-300 bg-gradient-to-br from-red-50 via-white to-white',
    badge: 'bg-red-600 text-white',
    icon: <AlertOctagon className="w-5 h-5 text-red-600" />,
    accent: 'text-red-700'
  },
  warning: {
    container: 'border-orange-300 bg-gradient-to-br from-orange-50 via-white to-white',
    badge: 'bg-orange-500 text-white',
    icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    accent: 'text-orange-700'
  },
  caution: {
    container: 'border-amber-200 bg-gradient-to-br from-amber-50 via-white to-white',
    badge: 'bg-amber-500 text-white',
    icon: <Shield className="w-5 h-5 text-amber-600" />,
    accent: 'text-amber-700'
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
  className
}: OverstayAlertProps) {
  const styles = severityStyles[severity]

  const highlightCards = [
    {
      label: 'Days Used',
      value: `${totalDaysUsed}/90`,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    },
    {
      label: 'Days Remaining',
      value: `${Math.max(daysRemaining, 0)}`,
      icon: styles.icon
    },
    nextResetDate && {
      label: 'Full Reset',
      value: format(nextResetDate, 'MMM d, yyyy'),
      icon: <Shield className="w-4 h-4 text-blue-600" />
    },
    latestSafeDeparture && {
      label: 'Latest Safe Departure',
      value: format(latestSafeDeparture, 'MMM d, yyyy'),
      icon: <Plane className="w-4 h-4 text-rose-600" />
    }
  ].filter(Boolean) as { label: string; value: string; icon: JSX.Element }[]

  return (
    <div
      className={cn(
        'rounded-2xl border shadow-sm p-5 md:p-6 transition-all duration-200',
        styles.container,
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-white/60 p-2 shadow-inner">{styles.icon}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={cn('text-xs font-semibold uppercase tracking-wide', styles.badge, 'px-2 py-1 rounded-full')}>
                {severity === 'critical'
                  ? 'Overstay Risk'
                  : severity === 'warning'
                  ? 'Plan Exit Now'
                  : 'Monitor Usage'}
              </span>
              <span className={cn('text-xs font-semibold uppercase tracking-wide', styles.accent)}>
                {Math.max(daysRemaining, 0)} days left in window
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">{message}</p>

            {maxStayIfEnterToday !== undefined && (
              <p className="mt-3 text-xs text-gray-600">
                If you enter today you can stay for up to{' '}
                <span className="font-semibold text-gray-800">{maxStayIfEnterToday} days</span> without violating the 90/180 rule.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[180px]">
          {latestSafeDeparture && (
            <Button
              onClick={onPlanTrip}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              Plan Departure
            </Button>
          )}
          {onViewCalendar && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewCalendar}
            >
              View Calendar
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {highlightCards.map(card => (
          <div
            key={card.label}
            className="flex items-center justify-between rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-gray-700 shadow-sm"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">{card.label}</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div>{card.icon}</div>
          </div>
        ))}
      </div>

      {optimalReturnDate && (
        <div className="mt-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800">
          <p className="font-medium">Best re-entry window</p>
          <p className="text-xs mt-1">
            Re-enter after{' '}
            <span className="font-semibold">{format(optimalReturnDate, 'MMM d, yyyy')}</span> for access to your
            full allowance. Pair this with the re-entry planner to schedule your next trip safely.
          </p>
        </div>
      )}
    </div>
  )
}
