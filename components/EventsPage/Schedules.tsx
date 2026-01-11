"use client"
import * as React from "react"
import { CalendarHeader } from "./CalendarHeader"
import { ScheduleItem } from "./ScheduleItem"
import { SeeMoreButton } from "./SeeMoreButton"
import { DecorativeElements } from "./DecorativeElements"
import { ScheduleModal } from "./ScheduleModal"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  attendees: number
  recurring: boolean
  banner: string
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  updatedBy?: string
}

export const Schedules: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [mobileIndex, setMobileIndex] = React.useState(0)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)

  const getBackgroundColor = (index: number): string => {
    const colors = ["bg-orange-100", "bg-purple-100", "bg-blue-100", "bg-pink-100", "bg-green-100"]
    return colors[index % colors.length]
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    } catch {
      return dateString
    }
  }

  const formatTime = (timeString: string): string => {
    try {
      // If time is in "HH:MM - HH:MM" format, extract just the start time
      if (timeString.includes("-")) {
        return timeString.split("-")[0].trim()
      }
      // Otherwise format the time string
      const [hours, minutes] = timeString.split(":").map(Number)
      const date = new Date()
      date.setHours(hours, minutes)
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    } catch {
      return timeString
    }
  }

React.useEffect(() => {
  const fetchEvents = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const response = await fetch(`${baseUrl}/public/events`)
      const data = await response.json()

      let eventsArray: Event[] = []
      if (Array.isArray(data)) {
        eventsArray = data
      } else if (data?.data && Array.isArray(data.data)) {
        eventsArray = data.data
      } else if (data?.events && Array.isArray(data.events)) {
        eventsArray = data.events
      }

      // Sort events by date ascending (closest to today first)
      const now = new Date()
      now.setHours(0, 0, 0, 0)

      eventsArray.sort((a, b) => {
        const [ay, am, ad] = a.date.split("-").map(Number)
        const [by, bm, bd] = b.date.split("-").map(Number)
        const dateA = new Date(ay, am - 1, ad)
        const dateB = new Date(by, bm - 1, bd)

        // Put future events before past events
        const diffA = dateA.getTime() - now.getTime()
        const diffB = dateB.getTime() - now.getTime()

        return diffA - diffB
      })

      setEvents(eventsArray)
    } catch (error) {
      console.error("Failed to fetch events:", error)
      setEvents([]) // Ensure events is always an array
    } finally {
      setLoading(false)
    }
  }

  fetchEvents()
}, [])


  const prevItem = () => {
    setMobileIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1))
  }

  const nextItem = () => {
    setMobileIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1))
  }

  if (loading) {
    return (
      <section className="flex relative flex-col gap-16 items-center px-32 py-32 mx-auto my-0 w-full bg-white max-w-[1440px] max-md:gap-12 max-md:px-10 max-md:py-20 max-sm:gap-8 max-sm:px-5 max-sm:py-16">
        <div className="text-center">Loading events...</div>
      </section>
    )
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ADLaM+Display:wght@400&family=Manrope:wght@400;500;600;700&family=Actor:wght@400&display=swap"
      />
      <section id="schedules-section" className="flex relative flex-col gap-16 items-center px-32 py-32 mx-auto my-0 w-full bg-white max-w-[1440px] max-md:gap-12 max-md:px-10 max-md:py-20 max-sm:gap-8 max-sm:px-5 max-sm:py-16">
        <header className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl tracking-wider text-center leading-[50.6px] text-stone-950 max-md:text-4xl max-sm:text-3xl max-sm:tracking-wide">
  All Upcoming Events This {new Date().getFullYear()}
</h1>

          <p className="text-base leading-6 text-center text-neutral-700 w-[507px] max-md:w-full max-md:max-w-[507px] max-sm:text-sm">
            Explore the complete event schedule to find sessions, speakers, and activities that match your interests and
            needs.
          </p>
        </header>

        {/* --- Mobile Carousel --- */}
        <div className="flex w-full md:hidden relative items-center">
          <button
            onClick={prevItem}
            className="absolute left-0 z-10 px-3 py-2 text-2xl font-bold text-stone-950 bg-white rounded-full shadow-md"
          >
            ‹
          </button>
          <div className="w-full flex justify-center">
            <div onClick={() => setSelectedEvent(events[mobileIndex])} className="cursor-pointer">
              <ScheduleItem
                {...events[mobileIndex]}
                date={formatDate(events[mobileIndex].date)}
                time={formatTime(events[mobileIndex].time)}
                backgroundColor={getBackgroundColor(mobileIndex)}
              />
            </div>
          </div>
          <button
            onClick={nextItem}
            className="absolute right-0 z-10 px-3 py-2 text-2xl font-bold text-stone-950 bg-white rounded-full shadow-md"
          >
            ›
          </button>
        </div>

        {/* --- Desktop & Tablet --- */}
        <div className="hidden md:flex flex-col gap-12 items-center w-full">
          <CalendarHeader />
          {events.map((event, index) => (
            <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer w-full">
              <ScheduleItem
                {...event}
                date={formatDate(event.date)}
                time={formatTime(event.time)}
                backgroundColor={getBackgroundColor(index)}
              />
            </div>
          ))}
          <SeeMoreButton />
        </div>

     <DecorativeElements className="hidden md:block" />

      </section>

      {selectedEvent && <ScheduleModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </>
  )
}

export default Schedules
