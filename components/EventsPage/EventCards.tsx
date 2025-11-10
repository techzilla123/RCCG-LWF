"use client"

import * as React from "react"
import EventCard from "./EventCard"

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
}

function EventCards() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isMobile, setIsMobile] = React.useState(false)

  // Detect screen size (mobile vs desktop)
  React.useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 768)
    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  // Fetch events from API
  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://lujbfuhvarmbylcccuub.supabase.co/functions/v1/make-server-c28f50fa"
        const response = await fetch(`${apiBaseUrl}/public/events`)
        const data = await response.json()
        const fetchedEvents = data.events || []

        if (fetchedEvents.length < 3) {
          const originalEvents = fetchedEvents
          while (fetchedEvents.length < 3) {
            for (const event of originalEvents) {
              if (fetchedEvents.length < 3) {
                fetchedEvents.push({
                  ...event,
                  id: `${event.id}-${fetchedEvents.length}`,
                })
              }
            }
          }
        }

        setEvents(fetchedEvents)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Rotate every 5 seconds
  React.useEffect(() => {
    if (events.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [events.length])

  if (loading) {
    return (
      <section className="flex w-full h-[400px] z-0 items-center justify-center mt-16">
        <p className="text-muted-foreground">Loading events...</p>
      </section>
    )
  }

  if (events.length === 0) {
    return (
      <section className="flex w-full h-[400px] z-0 items-center justify-center mt-16">
        <p className="text-muted-foreground">No events available</p>
      </section>
    )
  }

  return (
    <section
      className={`flex w-full h-[400px] z-0 items-start justify-center mt-16 transition-all duration-700 overflow-hidden 
        ${isMobile ? "gap-0 px-0" : "gap-8 px-8"}
      `}
    >
      {events.map((event, index) => {
        // On mobile → only show the active one
        if (isMobile && index !== activeIndex) return null

        const isActive = index === activeIndex
        return <EventCard key={event.id} event={event} isActive={isActive} />
      })}
    </section>
  )
}

export default EventCards
