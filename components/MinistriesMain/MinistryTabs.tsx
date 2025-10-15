"use client"

import React from "react"
import type { ReactElement } from "react"
import { SectionHeader } from "./SectionHeader"
import { ContentPanel } from "./ContentPanel"
import { motion, AnimatePresence } from "framer-motion"

export const MinistryTabs: React.FC = () => {
  const renderChildren = () => {
    return (
      <ContentPanel
        imageSrc="https://childrensministry.com/wp-content/upload/children/media/2014/04/How-to-Build-a-Childrens-Ministry-From-the-Ground-Up-1265x500.jpg"
        title="Children's Ministry"
        subtitle="Here for Moms, Dads & Kids"
        description="We provide a fun, safe space for children to experience God's love through creative activities, storytelling, and worship."
        fullDetails="Our Children's Ministry is designed to create a nurturing environment where children can grow in their faith. We offer age-appropriate lessons, engaging activities, and caring volunteers who are passionate about helping children discover God's love.\n\nWhat to expect:\n• Safe, clean, and welcoming environment\n• Trained and background-checked volunteers\n• Age-appropriate Bible lessons and activities\n• Fun worship songs and games\n• Snacks and refreshments\n\nWe believe that every child deserves to know they are loved by God, and our team is committed to making that happen!"
        buttonText="Learn More"
        buttonColor="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500"
        showSchedule
        scheduleDay="Sundays"
        scheduleTime="9 & 10:30 AM"
      />
    )
  }

  const renderYouth = () => {
    return (
      <ContentPanel
        imageSrc="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
        title="Youth Ministry"
        subtitle="Growing in Faith Together"
        description="Our youth ministry provides a safe and fun environment where students can explore their faith, ask tough questions, and build meaningful friendships."
        fullDetails="Our Youth Ministry engages middle and high school students in exciting lessons, small groups, and events that help them deepen their faith journey.\n\nWhat we offer:\n• Relevant Bible teaching\n• Small group discussions\n• Fun games and activities\n• Service projects\n• Special events and retreats\n• Leadership development\n\nWe meet every Sunday morning and Wednesday evening for youth group. Join us as we navigate faith, friendships, and the future together!"
        buttonText="Join Us"
        buttonColor="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600"
        showSchedule
        scheduleDay="Sundays & Wednesdays"
        scheduleTime="10:30 AM & 7 PM"
      />
    )
  }

  const renderMen = () => {
    return (
      <ContentPanel
        imageSrc="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80"
        title="Men's Ministry"
        description="Learn to follow Jesus deeply through mentorship, study, and spiritual discipline. Build meaningful relationships as you grow together in faith."
        fullDetails="Our Men's Ministry is designed to help men grow in their relationship with Christ and become the spiritual leaders God has called them to be.\n\nWhat we focus on:\n• Biblical manhood and leadership\n• Accountability and brotherhood\n• Prayer and spiritual disciplines\n• Marriage and family guidance\n• Serving the church and community\n• Hands-on service opportunities\n\nJoin us as we challenge each other to live out our faith with courage and conviction. No matter where you are in your faith journey, there's a place for you here."
        buttonText="Join Us"
        buttonColor="bg-gradient-to-r from-cyan-900 to-blue-900 hover:from-blue-900 hover:to-cyan-900"
        showSchedule
        scheduleDay="Saturdays"
        scheduleTime="7:00 AM"
      />
    )
  }

  const renderWomen = () => {
    return (
      <ContentPanel
        imageSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
        title="Women's Ministry"
        description="Dive deep into God's Word with other women seeking to grow in faith and understanding. Connect through Bible study, prayer, and fellowship."
        fullDetails="Our Women's Ministry provides a welcoming space for women to study Scripture together, share insights, and support one another in their spiritual journeys.\n\nWhat to expect:\n• In-depth Bible study\n• Small group discussions\n• Prayer and worship\n• Fellowship events and activities\n• Childcare available\n• Refreshments and community\n\nWhether you're new to Bible study or have been studying for years, you'll find encouragement and authentic Christian community here. Come as you are and discover the joy of growing together!"
        buttonText="Join Us"
        buttonColor="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-600"
        showSchedule
        scheduleDay="Thursdays"
        scheduleTime="10:00 AM"
      />
    )
  }

  const renderWiseone = () => {
    return (
      <ContentPanel
        imageSrc="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
        title="Wiseone Ministry"
        subtitle="Living with Purpose"
        description="Connect with other seniors through regular fellowship gatherings, Bible studies, and meaningful conversations. Enjoy group trips, outings, and special events."
        fullDetails="The Wiseone Ministry is a vibrant community of seniors who continue to grow in faith, serve others, and enjoy life together.\n\nWhat we offer:\n• Weekly Bible study and devotions\n• Fellowship meals and coffee times\n• Guest speakers and teaching\n• Prayer support and encouragement\n• Day trips and special outings\n• Support and care network\n• Intergenerational connections\n\nYour wisdom and experience are valued here. Come share your story, hear others, and join us for the next adventure - there's always room for one more!"
        buttonText="Join Fellowship"
        buttonColor="bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-cyan-700 hover:to-teal-700"
        showSchedule
        scheduleDay="Wednesdays"
        scheduleTime="10:00 AM"
      />
    )
  }

  const Section = React.memo(
    ({ title, accent, children }: { title: string; accent: string; children: ReactElement }) => (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="w-full bg-gradient-to-br from-white to-gray-50 py-12 rounded-3xl shadow-2xl 
      border border-gray-100 overflow-hidden"
      >
        <SectionHeader title={title} accent={accent} />
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    ),
  )

  Section.displayName = "Section"

  return (
    <main className="flex flex-col gap-16 py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <Section title="Children" accent="bg-gradient-to-r from-amber-500 to-orange-500">
        {renderChildren()}
      </Section>

      <Section title="Youth" accent="bg-gradient-to-r from-blue-600 to-indigo-600">
        {renderYouth()}
      </Section>

      <Section title="Men" accent="bg-gradient-to-r from-cyan-900 to-blue-900">
        {renderMen()}
      </Section>

      <Section title="Women" accent="bg-gradient-to-r from-pink-600 to-rose-600">
        {renderWomen()}
      </Section>

      <Section title="Wiseone" accent="bg-gradient-to-r from-teal-700 to-cyan-700">
        {renderWiseone()}
      </Section>
    </main>
  )
}

export default MinistryTabs
