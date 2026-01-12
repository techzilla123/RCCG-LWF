"use client"

import type * as React from "react"
import { X } from "lucide-react"

interface Event {
  id: string
  date: string
  time: string
  type: string
  title: string
  banner: string
  location: string
  attendees: number
  description: string
  recurring: boolean
  recurringDay?: string

}

interface EventModalProps {
  event: Event
  onClose: () => void
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">{event.title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Event Image */}
          <div className="w-full">
            <img
              src={event.banner || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-4">
           <div>
  <p className="text-sm text-gray-600 font-medium">
    {event.recurring ? "Occurs On" : "Date"}
  </p>

  <p className="text-lg font-semibold text-slate-900">
    {event.recurring
      ? event.recurringDay || "Recurring schedule"
      : new Date(event.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
  </p>
</div>


            <div>
              <p className="text-sm text-gray-600 font-medium">Time</p>
              <p className="text-lg font-semibold text-slate-900">{event.time}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">Location</p>
              <p className="text-lg font-semibold text-slate-900">{event.location}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">Type</p>
              <p className="text-lg font-semibold text-slate-900 capitalize">{event.type}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">Attendees</p>
              <p className="text-lg font-semibold text-slate-900">{event.attendees}</p>
            </div>

          <div>
  <p className="text-sm text-gray-600 font-medium">Recurring</p>
  <p className="text-lg font-semibold text-slate-900">{event.recurring ? "Yes" : "No"}</p>
</div>

{event.recurring && event.recurringDay && (
  <div>
    <p className="text-sm text-gray-600 font-medium">Recurring Day</p>
    <p className="text-lg font-semibold text-slate-900">{event.recurringDay}</p>
  </div>
)}

          </div>

          {/* Description */}
          {event.description && (
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">Description</p>
              <p className="text-base text-slate-700 leading-relaxed">{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
