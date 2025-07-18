"use client"

import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

interface EnhancedCalendarPopoverProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  disabled?: boolean
  placeholder?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function EnhancedCalendarPopover({
  dateRange,
  onDateRangeChange,
  disabled = false,
  placeholder = "Select dates",
  isOpen,
  onOpenChange,
}: EnhancedCalendarPopoverProps) {
  const formatDateRange = () => {
    if (!dateRange?.from) return placeholder
    if (!dateRange.to) return `${format(dateRange.from, "MMM dd")} - End date`
    return `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-center text-center font-normal bg-white h-12 text-sm px-4 border-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">{formatDateRange()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white rounded-2xl shadow-xl border-0" align="start">
        <div className="p-6">
          <CalendarComponent
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            className="rounded-none border-0"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-lg font-semibold text-gray-900",
              nav: "space-x-1 flex items-center",
              nav_button:
                "h-8 w-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors",
              nav_button_previous: "absolute left-0",
              nav_button_next: "absolute right-0",
              table: "w-full border-collapse space-y-1",
              head_row: "flex mb-2",
              head_cell: "text-gray-600 rounded-md w-10 font-medium text-sm text-center",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-lg transition-colors",
              day_range_start:
                "day-range-start bg-slate-800 text-white hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white rounded-lg",
              day_range_end:
                "day-range-end bg-slate-800 text-white hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white rounded-lg",
              day_selected:
                "bg-slate-800 text-white hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white rounded-lg",
              day_today: "bg-gray-100 text-gray-900 font-semibold",
              day_outside: "text-gray-400 opacity-50",
              day_disabled: "text-gray-400 opacity-50",
              day_range_middle:
                "aria-selected:bg-slate-100 aria-selected:text-slate-900 hover:bg-slate-100 rounded-none",
              day_hidden: "invisible",
            }}
          />
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1 border-slate-300 text-slate-700 hover:bg-gray-50 bg-transparent"
              onClick={() => onDateRangeChange(undefined)}
            >
              Clear
            </Button>
            <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
