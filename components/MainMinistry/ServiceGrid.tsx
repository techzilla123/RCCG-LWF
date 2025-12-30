"use client"

import type React from "react"
import { ServiceCard } from "./ServiceCard"

//
// MAIN AND ONLY Service INTERFACE (exported for use everywhere else)
//
export interface Service {
  title: string
  imageSrc: string
  description: string
  fullDescription: string
}

//
// Services Data (unchanged, corrected formatting)
//
export const services: Service[] = [
  {
    title: "Media Ministry",
    imageSrc:
      "/media.jpeg",
    description:
      "Handles cameras, livestream, sound, lighting, graphics and digital content.",
    fullDescription: `
Our Media Ministry is responsible for ensuring that every message, worship session, and church event is clearly communicated through sound, screens, livestream, photography, and video.

We operate cameras, audio systems, lighting, projection, livestream, editing, graphic design, and digital communication tools to extend the reach of God's Word beyond the church walls.

The team welcomes both skilled and beginner volunteers, providing training in media operation, equipment handling, content creation, and broadcast production.

If you love creativity, technology, storytelling, or digital ministry, this is your home to serve.
`
  },

  {
    title: "Choir Ministry",
    imageSrc:
      "/choir.jpeg",
    description:
      "Leads the congregation in worship, praise, musical excellence and spiritual atmosphere.",
    fullDescription: `
The Choir Ministry leads the church into an atmosphere of worship through Spirit-filled songs, vocal excellence, and heartfelt praise. They prepare the hearts of the congregation for the Word by creating a divine atmosphere that welcomes God's presence.

The choir includes vocalists, instrumentalists, worship leaders, sound technicians, and songwriters. The ministry emphasizes spiritual growth, discipline, teamwork, and excellence in worship.

Anyone with a passion for singing, music, or worship can join and grow.
`
  },

  {
    title: "Ushering Ministry",
    imageSrc:
      "/usher.jpeg",
    description:
      "Maintains order, welcomes members, manages seating, and assists during services.",
    fullDescription: `
The Ushering Ministry ensures orderliness and smooth coordination during all services. They welcome members and guests, assist with seating, manage movement, distribute materials, support offerings, and help maintain a peaceful worship environment.

Ushers are the first point of contact for many, so they represent the love, warmth, and excellence of the church. This ministry is built on discipline, courtesy, alertness, and service.

If you enjoy serving people with a smile, this ministry is for you.
`
  },

  {
    title: "Sanitation Ministry",
    imageSrc:
      "/san.jpeg",
    description:
      "Keeps the church clean, neat, hygienic, and welcoming for all members.",
    fullDescription: `
The Sanitation Ministry maintains the beauty, cleanliness, and hygiene of the church environment. They ensure that the sanctuary, restrooms, children's rooms, offices, and surroundings are always spotless and ready for worship.

The ministry plays an essential role in creating a welcoming space where people can worship freely without distractions. They work with diligence, dedication, and love for God's house.

If you enjoy hands-on service and stewardship, this ministry welcomes you.
`
  },

  {
    title: "Drama Ministry",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/a1f6d5e3c763fcf38c0118d332db114f9972244f?placeholderIfAbsent=true",
    description:
      "Presents gospel-centered dramas, skits, stage plays, and visual storytelling.",
    fullDescription: `
The Drama Ministry communicates the Gospel through creative storytelling—using skits, dramas, plays, and stage presentations that educate, inspire, and bring biblical lessons to life.

They perform during special services, events, outreaches, conventions, and youth programs. With acting, writing, set design, costume, choreography, and directing, the ministry uses art as a tool for transformation.

If you enjoy acting, creativity, or stage performance, this team is perfect for you.
`
  },

  {
    title: "Evangelism Ministry",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/4a4a1be1d2ebebafb2b7fd47504757bf3a508020?placeholderIfAbsent=true",
    description:
      "Preaches the Gospel through outreach, follow-up, missions, and soul-winning.",
    fullDescription: `
The Evangelism Ministry is focused on soul-winning, discipleship, outreach, missions, and spreading the message of salvation to communities near and far.

They organize street evangelism, crusades, market outreach, home visits, tracts distribution, digital evangelism, and follow-up for new believers.

Their passion is to see lives saved and added to the Kingdom, fulfilling the Great Commission of Christ.

If you have a burning passion to share the Gospel, this ministry is for you.
`
  },

  {
    title: "Welfare Ministry",
    imageSrc:
      "/wal.jpeg",
    description:
      "Provides care, support, community aid, and help for members in need.",
    fullDescription: `
The Welfare Ministry demonstrates Christlike love through practical acts of compassion, support, and kindness. They assist members who are experiencing difficulties, organize community donations, provide relief materials, and help during celebrations, births, bereavements, and emergencies.

The ministry ensures that no member feels alone or unsupported. They serve with empathy, confidentiality, and genuine care.

If you love helping people and offering emotional or practical support, this team is for you.
`
  }
]

//
// Props for ServiceGrid
//
interface ServiceGridProps {
  onLearnMore?: (service: Service) => void
}

//
// The Component
//
export const ServiceGrid: React.FC<ServiceGridProps> = ({ onLearnMore }) => {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-24 bg-white">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-2 xl:gap-16 max-w-6xl mx-auto">
        {services.map((service, idx) => (
          <ServiceCard
            key={idx}
            title={service.title}
            imageSrc={service.imageSrc}
            description={service.description}
            fullDescription={service.fullDescription}
            onLearnMore={() => onLearnMore?.(service)}
          />
        ))}
      </div>
    </section>
  )
}
