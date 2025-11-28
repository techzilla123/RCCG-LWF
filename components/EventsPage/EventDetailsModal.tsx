"use client"
import type React from "react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  attendees: number
  banner: string
  recurring?: boolean
  recurringDay?: string
  recurringType?: string
}

interface ScheduleModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

export const EventDetailsModal: React.FC<ScheduleModalProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null

  const formatDate = (dateString: string): string => {
    try {
      const [rawYear, rawMonth, rawDay] = dateString.split("-")

      let year = rawYear

      // Fix 5-digit years like "20025" → "2025"
      if (rawYear.length === 5 && rawYear.startsWith("20")) {
        year = rawYear.slice(0, 2) + rawYear.slice(3)
      }

      const monthIndex = Number(rawMonth) - 1
      const day = Number(rawDay)
      const date = new Date(Number(year), monthIndex, day)
      const month = date.toLocaleDateString("en-US", { month: "short" })

      return `${month} ${day}, ${year}`
    } catch {
      return dateString
    }
  }

  const formatTime = (timeString: string): string => {
    try {
      if (timeString.includes("-")) {
        return timeString.split("-")[0].trim()
      }
      const [hours, minutes] = timeString.split(":").map(Number)
      const date = new Date()
      date.setHours(hours, minutes)
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    } catch {
      return timeString
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b">
          <button onClick={onClose} className="text-2xl font-bold text-stone-950 hover:text-stone-700">
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden mb-6">
            <img src={event.banner || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          </div>

          {/* Event Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-stone-950 mb-4">{event.title}</h2>

          {/* Recurring Info --- Straight Line */}
          {(event.recurring || event.recurringDay) && (
            <div className="flex items-center gap-3 mb-6">
              {event.recurring && (
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-green-800">Recurring Event</span>
                </div>
              )}

              {event.recurringDay && (
                <div className="text-sm font-medium text-gray-700 flex items-center">
                  Recurring Day:
                  <span className="ml-1 text-slate-900 font-semibold">{event.recurringDay}</span>
                </div>
              )}
            </div>
          )}

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-neutral-600 mb-1">Date</p>
              <p className="text-lg font-semibold text-stone-950">{formatDate(event.date)}</p>
            </div>
            <div className="bg-violet-50 p-4 rounded-lg">
              <p className="text-sm text-neutral-600 mb-1">Time</p>
              <p className="text-lg font-semibold text-stone-950">{formatTime(event.time)}</p>
            </div>
            <div className="bg-sky-50 p-4 rounded-lg">
              <p className="text-sm text-neutral-600 mb-1">Location</p>
              <p className="text-lg font-semibold text-stone-950">{event.location}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg">
              <p className="text-sm text-neutral-600 mb-1">Event Type</p>
              <p className="text-lg font-semibold text-stone-950 capitalize">{event.type}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-stone-950">Attendees:</span>
              <span className="text-sm text-neutral-700">{event.attendees}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-stone-950 mb-3">About This Event</h3>
            <p className="text-base text-neutral-700 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
