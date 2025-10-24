"use client"

import * as React from "react"
import { EventImage } from "./EventImage"
import { EventModal } from "./EventModal"

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
}

export const EventsGrid: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        const response = await fetch(`${baseUrl}/public/events`)
        const data = await response.json()
        setEvents(data.events || [])
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="px-2.5 mt-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse aspect-[1.78] rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="px-2.5 mt-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-2">
          {events.slice(0, 6).map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <EventImage src={event.banner} alt={event.title} isRounded={event.recurring} />
            </button>
          ))}
        </div>
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </>
  )
}
