"use client"

import * as React from "react"
import { TitleSection } from "./ForAdults/TitleSection"
import { ProductCard } from "./ForAdults/ProductCard"

interface Occasion {
  id: string
  title: string
  imageSrc: string
  getDate: (year: number) => Date
  showDaysBefore: number
}

const occasions: Occasion[] = [
  {
    id: "newyear",
    title: "New Year",
    imageSrc: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 0, 1), // January 1
    showDaysBefore: 30,
  },
  {
    id: "mlk",
    title: "MLK Day",
    imageSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    getDate: (year) => {
      // Third Monday in January
      const january = new Date(year, 0, 1)
      const firstMonday = new Date(january)
      firstMonday.setDate(1 + ((8 - january.getDay()) % 7))
      return new Date(firstMonday.getTime() + 14 * 24 * 60 * 60 * 1000)
    },
    showDaysBefore: 20,
  },
  {
    id: "valentines",
    title: "Valentine's Day",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0592b126763a61d7fdb2a326c676d6767149c37c?placeholderIfAbsent=true",
    getDate: (year) => new Date(year, 1, 14), // February 14
    showDaysBefore: 45,
  },
  {
    id: "presidents",
    title: "Presidents' Day",
    imageSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    getDate: (year) => {
      // Third Monday in February
      const february = new Date(year, 1, 1)
      const firstMonday = new Date(february)
      firstMonday.setDate(1 + ((8 - february.getDay()) % 7))
      return new Date(firstMonday.getTime() + 14 * 24 * 60 * 60 * 1000)
    },
    showDaysBefore: 20,
  },
  {
    id: "stpatricks",
    title: "St. Patrick's Day",
    imageSrc: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 2, 17), // March 17
    showDaysBefore: 30,
  },
  {
    id: "easter",
    title: "Easter",
    imageSrc: "https://images.unsplash.com/photo-1554072675-66db59dba46f?w=400&h=300&fit=crop",
    getDate: (year) => {
      // Easter calculation (Western Christianity)
      const a = year % 19
      const b = Math.floor(year / 100)
      const c = year % 100
      const d = Math.floor(b / 4)
      const e = b % 4
      const f = Math.floor((b + 8) / 25)
      const g = Math.floor((b - f + 1) / 3)
      const h = (19 * a + b - d - g + 15) % 30
      const i = Math.floor(c / 4)
      const k = c % 4
      const l = (32 + 2 * e + 2 * i - h - k) % 7
      const m = Math.floor((a + 11 * h + 22 * l) / 451)
      const month = Math.floor((h + l - 7 * m + 114) / 31)
      const day = ((h + l - 7 * m + 114) % 31) + 1
      return new Date(year, month - 1, day)
    },
    showDaysBefore: 30,
  },
  {
    id: "spring-break",
    title: "Spring Break",
    imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 2, 15), // Mid March
    showDaysBefore: 30,
  },
  {
    id: "prom",
    title: "Prom Season",
    imageSrc: "https://images.unsplash.com/photo-1511795409834-b723cf961d3e?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 3, 15), // Mid April
    showDaysBefore: 45,
  },
  {
    id: "mothers",
    title: "Mother's Day",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/3005fdd58172243a6976a17460f1a3032583c9fc?placeholderIfAbsent=true",
    getDate: (year) => {
      // Second Sunday in May
      const may = new Date(year, 4, 1)
      const firstSunday = new Date(may)
      firstSunday.setDate(1 + ((7 - may.getDay()) % 7))
      return new Date(firstSunday.getTime() + 7 * 24 * 60 * 60 * 1000)
    },
    showDaysBefore: 30,
  },
  {
    id: "memorial",
    title: "Memorial Day",
    imageSrc: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    getDate: (year) => {
      // Last Monday in May
      const may31 = new Date(year, 4, 31)
      const lastMonday = new Date(may31)
      lastMonday.setDate(31 - ((may31.getDay() + 6) % 7))
      return lastMonday
    },
    showDaysBefore: 20,
  },
  {
    id: "graduation",
    title: "Graduation",
    imageSrc: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 4, 20), // Late May
    showDaysBefore: 45,
  },
  {
    id: "fathers",
    title: "Father's Day",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/11a4e9741ebb66c7a4ef460a3a31daac9ceb7585?placeholderIfAbsent=true",
    getDate: (year) => {
      // Third Sunday in June
      const june = new Date(year, 5, 1)
      const firstSunday = new Date(june)
      firstSunday.setDate(1 + ((7 - june.getDay()) % 7))
      return new Date(firstSunday.getTime() + 14 * 24 * 60 * 60 * 1000)
    },
    showDaysBefore: 30,
  },
  {
    id: "independence",
    title: "Independence Day",
    imageSrc: "https://images.unsplash.com/photo-1530841344095-b2893194affe?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 6, 4), // July 4
    showDaysBefore: 30,
  },
  {
    id: "back-to-school",
    title: "Back to School",
    imageSrc: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 7, 15), // Mid August
    showDaysBefore: 30,
  },
  {
    id: "labor",
    title: "Labor Day",
    imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
    getDate: (year) => {
      // First Monday in September
      const september = new Date(year, 8, 1)
      const firstMonday = new Date(september)
      firstMonday.setDate(1 + ((8 - september.getDay()) % 7))
      return firstMonday
    },
    showDaysBefore: 20,
  },
  {
    id: "columbus",
    title: "Columbus Day",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    getDate: (year) => {
      // Second Monday in October
      const october = new Date(year, 9, 1)
      const firstMonday = new Date(october)
      firstMonday.setDate(1 + ((8 - october.getDay()) % 7))
      return new Date(firstMonday.getTime() + 7 * 24 * 60 * 60 * 1000)
    },
    showDaysBefore: 20,
  },
  {
    id: "halloween",
    title: "Halloween",
    imageSrc: "https://images.unsplash.com/photo-1509557965043-6b9f3d1d4b8b?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 9, 31), // October 31
    showDaysBefore: 45,
  },
  {
    id: "veterans",
    title: "Veterans Day",
    imageSrc: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 10, 11), // November 11
    showDaysBefore: 20,
  },
  {
    id: "thanksgiving",
    title: "Thanksgiving",
    imageSrc: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&h=300&fit=crop",
    getDate: (year) => {
      // Fourth Thursday in November
      const november = new Date(year, 10, 1)
      const firstThursday = new Date(november)
      firstThursday.setDate(1 + ((4 - november.getDay() + 7) % 7))
      return new Date(firstThursday.getTime() + 21 * 24 * 60 * 60 * 1000)
    },
    showDaysBefore: 30,
  },
  {
    id: "black-friday",
    title: "Black Friday",
    imageSrc: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop",
    getDate: (year) => {
      // Day after Thanksgiving
      const november = new Date(year, 10, 1)
      const firstThursday = new Date(november)
      firstThursday.setDate(1 + ((4 - november.getDay() + 7) % 7))
      const thanksgiving = new Date(firstThursday.getTime() + 21 * 24 * 60 * 60 * 1000)
      return new Date(thanksgiving.getTime() + 24 * 60 * 60 * 1000)
    },
    showDaysBefore: 20,
  },
  {
    id: "christmas",
    title: "Christmas",
    imageSrc: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 11, 25), // December 25
    showDaysBefore: 60,
  },
  {
    id: "new-years-eve",
    title: "New Year's Eve",
    imageSrc: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    getDate: (year) => new Date(year, 11, 31), // December 31
    showDaysBefore: 30,
  },
]

// Always show these three occasions
const alwaysShowOccasions = [
  {
    id: "anniversaries",
    title: "Anniversaries",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/81c6d95d2bcbd39bc5304011b824540992ebb6e7?placeholderIfAbsent=true",
  },
  {
    id: "weddings",
    title: "Weddings",
    imageSrc: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
  },
  {
    id: "retirement",
    title: "Retirement",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/37dc43cc3efd1617c6d0e0f9f42cf3da226f9073?placeholderIfAbsent=true",
  },
]

// Other year-round occasions that can rotate
const otherPermanentOccasions = [
  // {
  //   id: "birthdays",
  //   title: "Birthdays",
  //   imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  // },
  {
    id: "baby-shower",
    title: "Baby Shower",
    imageSrc: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop",
  },
  // {
  //   id: "housewarming",
  //   title: "Housewarming",
  //   imageSrc: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
  // },
  // {
  //   id: "congratulations",
  //   title: "Congratulations",
  //   imageSrc: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
  // },
]

// Seasonal occasions that show during specific seasons
const seasonalOccasions = [
  {
    id: "spring-occasions",
    title: "Spring Celebrations",
    imageSrc: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
    season: "spring", // March 20 - June 20
  },
  {
    id: "summer-occasions",
    title: "Summer Parties",
    imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    season: "summer", // June 21 - September 22
  },
  {
    id: "fall-occasions",
    title: "Fall Gatherings",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    season: "fall", // September 23 - December 20
  },
  {
    id: "winter-occasions",
    title: "Winter Celebrations",
    imageSrc: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    season: "winter", // December 21 - March 19
  },
]

function getCurrentSeason(): string {
  const now = new Date()
  const month = now.getMonth()
  const day = now.getDate()

  if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day < 21)) {
    return "spring"
  } else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day < 23)) {
    return "summer"
  } else if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day < 21)) {
    return "fall"
  } else {
    return "winter"
  }
}

function getActiveOccasions(): Array<{ id: string; title: string; imageSrc: string }> {
  const now = new Date()
  const currentYear = now.getFullYear()
  const nextYear = currentYear + 1
  const activeOccasions: Array<{ id: string; title: string; imageSrc: string }> = []

  // Always add the three required occasions first
  activeOccasions.push(...alwaysShowOccasions)

  // Check each seasonal occasion for current and next year
  occasions.forEach((occasion) => {
    const currentYearDate = occasion.getDate(currentYear)
    const nextYearDate = occasion.getDate(nextYear)
    const showFromCurrent = new Date(currentYearDate.getTime() - occasion.showDaysBefore * 24 * 60 * 60 * 1000)
    const showFromNext = new Date(nextYearDate.getTime() - occasion.showDaysBefore * 24 * 60 * 60 * 1000)

    // Check if we should show this occasion
    if ((now >= showFromCurrent && now <= currentYearDate) || (now >= showFromNext && now <= nextYearDate)) {
      activeOccasions.push({
        id: occasion.id,
        title: occasion.title,
        imageSrc: occasion.imageSrc,
      })
    }
  })

  // Add current season occasion
  const currentSeason = getCurrentSeason()
  const seasonalOccasion = seasonalOccasions.find((occ) => occ.season === currentSeason)
  if (seasonalOccasion) {
    activeOccasions.push({
      id: seasonalOccasion.id,
      title: seasonalOccasion.title,
      imageSrc: seasonalOccasion.imageSrc,
    })
  }

  // If we need more occasions to reach 6, add from other permanent occasions
  if (activeOccasions.length < 8) {
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    const remainingSlots = 8 - activeOccasions.length

    for (let i = 0; i < remainingSlots && i < otherPermanentOccasions.length; i++) {
      const index = (dayOfYear + i) % otherPermanentOccasions.length
      activeOccasions.push(otherPermanentOccasions[index])
    }
  }

  // If we still don't have enough, add next upcoming occasions
  if (activeOccasions.length < 8) {
    const nextOccasions = getNextUpcomingOccasions(8 - activeOccasions.length)
    activeOccasions.push(...nextOccasions)
  }

  // Remove duplicates and limit to 6
  const uniqueOccasions = activeOccasions.filter(
    (occasion, index, self) => index === self.findIndex((o) => o.id === occasion.id),
  )

  return uniqueOccasions.slice(0, 8)
}

function getNextUpcomingOccasions(count: number): Array<{ id: string; title: string; imageSrc: string }> {
  const now = new Date()
  const currentYear = now.getFullYear()
  const nextYear = currentYear + 1
  const upcomingOccasions: Array<{
    occasion: Occasion
    date: Date
    year: number
  }> = []

  occasions.forEach((occasion) => {
    const currentYearDate = occasion.getDate(currentYear)
    const nextYearDate = occasion.getDate(nextYear)

    if (currentYearDate > now) {
      upcomingOccasions.push({
        occasion,
        date: currentYearDate,
        year: currentYear,
      })
    } else {
      upcomingOccasions.push({
        occasion,
        date: nextYearDate,
        year: nextYear,
      })
    }
  })

  // Sort by date
  upcomingOccasions.sort((a, b) => a.date.getTime() - b.date.getTime())

  return upcomingOccasions.slice(0, count).map((item) => ({
    id: item.occasion.id,
    title: item.occasion.title,
    imageSrc: item.occasion.imageSrc,
  }))
}

const ForAdults: React.FC = () => {
  const [activeOccasions, setActiveOccasions] = React.useState<Array<{ id: string; title: string; imageSrc: string }>>(
    [],
  )

  React.useEffect(() => {
    setActiveOccasions(getActiveOccasions())
    // Update every hour to catch any changes
    const interval = setInterval(
      () => {
        setActiveOccasions(getActiveOccasions())
      },
      60 * 60 * 1000,
    ) // 1 hour

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="flex flex-col gap-6 px-6 py-10 bg-sky-50 md:px-20">
      <div className="flex flex-col md:flex-row flex-wrap gap-6 items-start xxl:flex-nowrap">
        {/* Left Title + Cards */}
        <div className="flex flex-wrap gap-4 flex-1 min-w-[280px]">
          <TitleSection />
          {activeOccasions.map((occasion) => (
            <ProductCard key={occasion.id} imageSrc={occasion.imageSrc} title={occasion.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ForAdults
