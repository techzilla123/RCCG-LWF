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
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        const response = await fetch(`${baseUrl}/public/events`)
        const data = await response.json()
        const eventsArray: Event[] = data.events || []

        // Sort events by closest upcoming date
        const now = new Date()
        now.setHours(0, 0, 0, 0)

        const sortedEvents = eventsArray.sort((a, b) => {
          const [ay, am, ad] = a.date.split("-").map(Number)
          const [by, bm, bd] = b.date.split("-").map(Number)
          const dateA = new Date(ay, am - 1, ad)
          const dateB = new Date(by, bm - 1, bd)

          // Put future events before past events
          return dateA.getTime() - dateB.getTime()
        })

        setEvents(sortedEvents)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  React.useEffect(() => {
    if (events.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % events.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [events.length])

  if (loading) {
    return (
      <div className="w-full max-w-5xl px-4 md:px-6 lg:px-8">
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
      {/* Desktop: Show all cards in grid */}
      <div className="w-full max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="hidden md:grid grid-cols-2 gap-5">
          {events.slice(0, 6).map((event, index) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                animation: `slideUp 0.8s ease-out ${index * 0.15}s both`,
                opacity: 0,
              }}
            >
              <style>{`
                @keyframes slideUp {
                  from { opacity: 0; transform: translateY(40px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <EventImage src={event.banner} alt={event.title} isRounded={event.recurring} />
            </button>
          ))}
        </div>

        {/* Mobile: Show 2 cards with carousel */}
        <div className="md:hidden">
          <div className="flex gap-4 transition-all duration-500 ease-in-out overflow-hidden">
            {[currentIndex, (currentIndex + 1) % events.length].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedEvent(events[index])}
                className="flex-shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity"
              >
                <EventImage src={events[index].banner} alt={events[index].title} isRounded={events[index].recurring} />
              </button>
            ))}
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(events.length / 2) }).map((_, i) => {
              const startIndex = i * 2
              return (
                <button
                  key={startIndex}
                  onClick={() => setCurrentIndex(startIndex)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === startIndex ? "bg-gray-700 w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              )
            })}
          </div>
        </div>
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </>
  )
}
