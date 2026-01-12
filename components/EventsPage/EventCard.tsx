"use client"
import Portal from "./Portal"

import * as React from "react"
import { Calendar, MapPin, Users, Clock, X } from "lucide-react"

// ✅ Type-safe reusable Button component
function Button({
  children,
  className = "",
  size = "md",
  ...props
}: {
  children: React.ReactNode
  className?: string
  size?: "md" | "lg"
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizeClasses = {
    lg: "px-6 py-3 text-base",
    md: "px-4 py-2 text-sm",
  }

  return (
    <button
      className={`rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
  }
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default}`}
    >
      {children}
    </span>
  )
}

function EventModal({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean
  onClose: () => void
  event: Event
}) {
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ✅ Close Button (uses reusable Button) */}
          <Button
            onClick={onClose}
            size="md"
            className="absolute top-4 right-4 z-10 p-2 bg-black-700 hover:bg-black-600 text-foreground rounded-md"
          >
            <X className="w-5 h-5 bg-black" />
          </Button>

          {/* Content */}
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold pr-8">{event.title}</h2>

            {/* Event banner */}
            <img
              src={event.banner || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg"
            />

            {/* Event metadata grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
               <div>
  <p className="text-sm text-muted-foreground">
    {event.recurring ? "Occurs On" : "Date"}
  </p>

  <p className="font-semibold whitespace-normal break-words leading-snug">
    {event.recurring
      ? event.recurringDay || "Recurring schedule"
      : formatDate(event.date)}
  </p>
</div>

              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Attendees</p>
                  <p className="font-semibold">{event.attendees}</p>
                </div>
              </div>
            </div>

            {/* Event type badge */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Type</p>
              <Badge variant="default">{event.type}</Badge>
            </div>

{/* Recurring info */}
{event.recurring && event.recurringDay && (
  <div>
    <p className="text-sm text-muted-foreground mb-2">Recurring</p>
    <p className="font-semibold">{`Every ${event.recurringDay}`}</p>
  </div>
)}

            {/* Description */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-foreground leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

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
   recurring?: boolean
  recurringDay?: string
  
}

interface EventCardProps {
  event: Event
  isActive: boolean
}

function EventCard({ event, isActive }: EventCardProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <>
      <article
        className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-700 ease-in-out 
          ${isActive ? "flex-[0.5]" : "flex-[0.25]"} 
          h-[400px] max-md:flex-[1] cursor-pointer
        `}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={event.banner || "/placeholder.svg"}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {isActive && (
          <div className="relative px-5 pt-72 pb-5 bg-gradient-to-t from-black/70 via-transparent h-full w-full">
            <header>
              <p className="text-xs font-semibold uppercase text-zinc-100">{formatDate(event.date)}</p>
              <h3 className="mt-1 text-2xl tracking-tight leading-tight text-white">{event.title}</h3>
            </header>
          </div>
        )}
      </article>

     <Portal>
  <EventModal isOpen={isOpen} onClose={() => setIsOpen(false)} event={event} />
</Portal>

    </>
  )
}

export default EventCard
