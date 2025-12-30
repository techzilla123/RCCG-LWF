"use client"

import React from "react"
import type { ReactElement } from "react"
import { SectionHeader } from "./SectionHeader"
import { ContentPanel } from "./ContentPanel"
import { motion, AnimatePresence } from "framer-motion"

export const MinistryTabs: React.FC = () => {
  // CHILDREN
  const renderChildren = () => {
    return (
      <ContentPanel
        imageSrc="/77.JPG"
        title={
          <span className="flex flex-wrap items-center gap-2">
            <span>Children’s Ministry</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-semibold">
              God’s Heritage
            </span>
          </span>
        }
        subtitle="Ages 1 - 12"
        description="A joyful and nurturing place where children discover God’s love through engaging teachings and fun activities."
        fullDetails={`The Children’s Ministry is a joyful, dynamic, and nurturing place where children ages 1–12 discover God’s love and grow in faith.

Our mission is to build a strong spiritual foundation through engaging Bible lessons, memory verses, quizzes, music, interactive activities, and age-appropriate teachings that inspire children to know Jesus personally.

We believe every child is uniquely created with purpose, and we are committed to providing a safe, fun, and welcoming environment where they can learn, play, and thrive.

Through passionate teachers and caregivers, we help children develop godly character, confidence, and a heart for others.

Join us as we raise a generation of confident, compassionate, and Christ-centered children who shine brightly in their world.`}
        buttonText="Learn More"
        buttonColor="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500"
        showSchedule
        scheduleDay="Sundays"
        scheduleTime="9 AM & 10:30 AM"
      />
    )
  }

  // YOUTH
  const renderYouth = () => {
    return (
      <ContentPanel
        imageSrc="/82.JPG"
        title={
          <span className="flex flex-wrap items-center gap-2">
            <span>Youth Ministry</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold">
              Christ Ambassadors
            </span>
          </span>
        }
        subtitle="Ages 13 - 17"
        description="Empowering teenagers to grow spiritually, discover their identity, and walk boldly in God’s purpose."
        fullDetails={`Our Youth Ministry is dedicated to raising Christ Ambassadors—guiding young people into a deeper relationship with Christ and helping them discover their identity, purpose, and God-given potential.

Designed for ages 13–17, this ministry offers a vibrant, safe, and engaging environment where teenagers receive spiritual and mental transformation through The Holy Spirit.

Through interactive Bible teachings, mentorship, worship, and practical life lessons, we equip youths to stand strong in their faith, make godly choices, and develop leadership skills.

Here, every youth is valued, encouraged, and empowered to shine as a light in their world. Join us as we raise a generation passionate for Christ, grounded in truth, and bold in purpose.`}
        buttonText="Join Us"
        buttonColor="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600"
        showSchedule
        scheduleDay="Sundays & Wednesdays"
        scheduleTime="10:30 AM & 7 PM"
      />
    )
  }

  // YOUNG ADULTS & SINGLES
  const renderYoungAdults = () => {
    return (
      <ContentPanel
        imageSrc="/yasm.jpg"
        title={
          <span className="flex flex-wrap items-center gap-2">
            <span>Young Adults & Singles Ministry</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-700 font-semibold">
              YASM
            </span>
          </span>
        }
        subtitle="Empowered for Purpose"
        description="A vibrant community helping young adults build relationships, grow spiritually, and walk confidently in God’s purpose."
        fullDetails={`The Young Adults & Singles Ministry empowers men and women to grow spiritually, build meaningful relationships, and walk confidently in God’s purpose.

We provide a supportive environment for fellowship, mentorship, and personal development through purposeful gatherings, Bible studies, skill-building sessions, and outreach.

Whether you’re a student, young professional, or exploring your path, this ministry helps you pursue Christ passionately while shining in your home, career, and community.

This is a place to belong, grow, and thrive. Join us as we rise boldly in faith and impact our world for Christ.`}
        buttonText="Get Connected"
        buttonColor="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-violet-700 hover:to-purple-600"
        showSchedule={false}
      />
    )
  }

  // WOMEN
  const renderWomen = () => {
    return (
      <ContentPanel
        imageSrc="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
        title={
          <span className="flex flex-wrap items-center gap-2">
            <span>Women’s Ministry</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 font-semibold">
              Women of Zion
            </span>
          </span>
        }
        subtitle="Nurturing, Empowering, Uplifting"
        description="A community where women grow spiritually, find support, and embrace their God-given purpose."
        fullDetails={`The Women of Zion Ministry is dedicated to nurturing, empowering, and uplifting women in every stage of life.

Through prayer, teachings, workshops, and outreach, we help women deepen their relationship with God while positively impacting their families and communities.

Our ministry fosters a supportive environment where every woman can connect, grow, and thrive in faith.

Whether through discipleship, service, or fellowship events, we equip women to reflect Christ’s love, strength, and wisdom in every area of life.

Join us as we celebrate womanhood, build each other up, and make a lasting Kingdom impact.`}
        buttonText="Join Us"
        buttonColor="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-600"
        showSchedule
        scheduleDay="Every Friday"
        scheduleTime="6pm - 6:30pm (ONLINE)"
      />
    )
  }

  // MEN
  const renderMen = () => {
    return (
      <ContentPanel
        imageSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
        title={
          <span className="flex flex-wrap items-center gap-2">
            <span>Men’s Ministry</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-900 to-blue-900 font-semibold">
              Men of Valor
            </span>
          </span>
        }
        subtitle="Strength • Integrity • Purpose"
        description="Raising strong, spiritually grounded men who lead with courage, compassion, and Christlike character."
        fullDetails={`The Men of Valor Ministry is dedicated to raising strong, spiritually grounded men who lead with integrity, courage, and compassion.

We believe every man is called to be a pillar in his home, a servant in his church, and a light in his community.

Through fellowship, prayer, mentorship, and practical empowerment, we help men grow in faith, character, and purpose.

The ministry provides a supportive space where men are strengthened, encouraged, and equipped to face life’s challenges with God-given boldness.

If you desire growth, connection, and meaningful impact, Men of Valor is your home. Join us as we rise to be the men God created us to be.`}
        buttonText="Join Fellowship"
        buttonColor="bg-gradient-to-r from-cyan-900 to-blue-900 hover:from-blue-900 hover:to-cyan-900"
        showSchedule
        scheduleDay="Every 2nd Sundays"
        scheduleTime="12pm"
      />
    )
  }


  // WISE ONES (SENIORS)
  const renderWiseone = () => {
    return (
      <ContentPanel
        imageSrc="https://img.freepik.com/premium-photo/beautiful-people-concept-30s-mid-age-handsome-elderly-senior-model-man-with-grey-hair_585255-4362.jpg"
        title={
          <span className="flex flex-wrap items-center gap-2">
            <span>Wise Ones Ministry</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-700 font-semibold">
              Seniors & Elders
            </span>
          </span>
        }
        subtitle="A Community of Wisdom & Grace"
        description="A warm community of mature believers growing in faith, sharing wisdom, and supporting the church family."
        fullDetails={`The Wise Ones Ministry is a vibrant community of mature men and women committed to growing in faith, sharing wisdom, and strengthening the church through their God-given gifts.

We celebrate the beauty of spiritual maturity and the strength that comes from a life rooted in Christ.

Through fellowship, discipleship, prayer, and service, the Wise Ones inspire younger generations and model steadfast devotion to God.

Whether through teaching, mentoring, outreach, or prayer support, the Wise Ones Ministry stands as a pillar of wisdom, grace, and strength.

Join us as we grow together, encourage one another, and shine with the enduring light of Christ.`}
        buttonText="Join Fellowship"
        buttonColor="bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-cyan-700 hover:to-teal-700"
        showSchedule
        scheduleDay="Wednesdays"
        scheduleTime="10:00 AM"
      />
    )
  }

  // Section wrapper
  const Section = React.memo(
  ({
    title,
    accent,
    id,
    children,
  }: {
    title: string
    accent: string
    id: string
    children: ReactElement
  }) => (
    <motion.section
      id={id}   // ✅ attach id to the DOM element
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="w-full bg-gradient-to-br from-white to-gray-50 py-12 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
    >
      <SectionHeader title={title} accent={accent} />
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
)


  Section.displayName = "Section"

  return (
    <main className="flex flex-col gap-16 py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <Section title="Children's Ministry" accent="bg-gradient-to-r from-amber-500 to-orange-500"
      id="children">
        {renderChildren()}
      </Section>

      <Section title="Youth Ministry" accent="bg-gradient-to-r from-blue-600 to-indigo-600"
      id="youth">
        {renderYouth()}
      </Section>

      <Section title="Young Adults & Singles" accent="bg-gradient-to-r from-purple-600 to-violet-700"
      id="yasm">
        {renderYoungAdults()}
      </Section>

      <Section title="Women’s Ministry" accent="bg-gradient-to-r from-pink-600 to-rose-600"
      id="women">
        {renderWomen()}
      </Section>

      <Section title="Men’s Ministry" accent="bg-gradient-to-r from-cyan-900 to-blue-900"
      id="men">
        {renderMen()}
      </Section>

      <Section title="Wise Ones Ministry" accent="bg-gradient-to-r from-teal-700 to-cyan-700"
      id="wise">
        {renderWiseone()}
      </Section>
    </main>
  )
}

export default MinistryTabs
