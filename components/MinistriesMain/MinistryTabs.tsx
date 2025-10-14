"use client"

import React from "react"

import type { ReactElement } from "react"
import { useState } from "react"
import { SectionHeader } from "./SectionHeader"
import { TabSection } from "./TabSection"
import { ContentPanel } from "./ContentPanel"
import { motion, AnimatePresence } from "framer-motion"

type ContentItem = {
  image: string
  title: string
  subtitle?: string
  desc: string
}

export const MinistryTabs: React.FC = () => {
  const [activeChildrenTab, setActiveChildrenTab] = useState<string>("kids-nursery")
  const [activeAdultTab, setActiveAdultTab] = useState<string>("discipleship")
  const [activeMusicTab, setActiveMusicTab] = useState<string>("worship")
  const [activeMissionTab, setActiveMissionTab] = useState<string>("local")
  const [activePrayerTab, setActivePrayerTab] = useState<string>("intercession")
  const [activeSeniorTab, setActiveSeniorTab] = useState<string>("fellowship")

  const childrenTabs = [
    { id: "kids-nursery", label: "Kids & Nursery" },
    { id: "middle-school", label: "Middle School" },
    { id: "high-school", label: "High School" },
    { id: "awana", label: "Awana" },
  ]

  const adultTabs = [
    { id: "discipleship", label: "Discipleship" },
    { id: "life-groups", label: "Life Groups" },
    { id: "classes", label: "Classes" },
    { id: "builders", label: "Builders" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
  ]

  const musicTabs = [
    { id: "worship", label: "Worship Team" },
    { id: "choir", label: "Choir" },
    { id: "tech", label: "Tech & Media" },
  ]

  const missionTabs = [
    { id: "local", label: "Local Outreach" },
    { id: "global", label: "Global Missions" },
    { id: "partners", label: "Mission Partners" },
  ]

  const prayerTabs = [
    { id: "intercession", label: "Intercession" },
    { id: "prayer-chain", label: "Prayer Chain" },
    { id: "events", label: "Prayer Events" },
  ]

  const seniorTabs = [
    { id: "fellowship", label: "Senior Fellowship" },
    { id: "support", label: "Support & Care" },
    { id: "outings", label: "Trips & Outings" },
  ]

  const renderChildren = () => {
    const tab = activeChildrenTab
    const contentMap: Record<string, ContentItem> = {
      "kids-nursery": {
        image: "https://images.unsplash.com/photo-1588776814546-ec7b9e5b1ef1?auto=format&fit=crop&w=800&q=80",
        title: "Kids & Nursery",
        subtitle: "Here for Moms, Dads & Kids",
        desc: "We provide a fun, safe space for children to experience God's love through creative activities, storytelling, and worship.",
      },
      "middle-school": {
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        title: "Middle School",
        subtitle: "Growing in Faith",
        desc: "Middle schoolers engage in exciting lessons, small groups, and events that help them deepen their faith journey.",
      },
      "high-school": {
        image: "https://images.unsplash.com/photo-1507937284540-1f1f1d1e9d02?auto=format&fit=crop&w=800&q=80",
        title: "High School",
        subtitle: "Preparing for the Future",
        desc: "Our high school ministry equips students to live out their faith as they prepare for college and life beyond.",
      },
      awana: {
        image: "https://images.unsplash.com/photo-1601049541289-9ee7a4d8e5b8?auto=format&fit=crop&w=800&q=80",
        title: "Awana",
        subtitle: "Scripture Memory & Fun",
        desc: "Awana helps children learn God's Word through games, fun activities, and friendship.",
      },
    }

    const item = contentMap[tab]
    return (
      <ContentPanel
        imageSrc={item.image}
        title={item.title}
        subtitle={item.subtitle}
        description={item.desc}
        buttonText="Learn More"
        buttonColor="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500"
        showSchedule
      />
    )
  }

  const renderAdults = () => {
    const tab = activeAdultTab
    const contentMap: Record<string, ContentItem> = {
      discipleship: {
        image: "https://images.unsplash.com/photo-15508311071553da8c8464?auto=format&fit=crop&w=800&q=80",
        title: "Discipleship",
        desc: "Learn to follow Jesus deeply through mentorship, study, and spiritual discipline.",
      },
      "life-groups": {
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        title: "Life Groups",
        desc: "Build meaningful relationships as you grow together in faith through small groups.",
      },
      classes: {
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        title: "Bible Classes",
        desc: "Study the Word through structured classes that fit your season of life.",
      },
      builders: {
        image: "https://images.unsplash.com/photo-1573164713347-df1e9f6d0c2b?auto=format&fit=crop&w=800&q=80",
        title: "Builders Ministry",
        desc: "Hands-on service opportunities where faith meets action in our community.",
      },
      men: {
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
        title: "Men's Ministry",
        desc: "Men growing in strength, faith, and brotherhood through study and service.",
      },
      women: {
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        title: "Women's Ministry",
        desc: "Encouragement, prayer, and connection for women in all life stages.",
      },
    }

    const item = contentMap[tab]
    return (
      <ContentPanel
        imageSrc={item.image}
        title={item.title}
        description={item.desc}
        buttonText="Join Us"
        buttonColor="bg-gradient-to-r from-cyan-900 to-blue-900 hover:from-blue-900 hover:to-cyan-900"
      />
    )
  }

  const renderMusic = () => {
    const tab = activeMusicTab
    const contentMap: Record<string, ContentItem> = {
      worship: {
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
        title: "Worship Team",
        subtitle: "Leading in Praise",
        desc: "Join our worship team and lead the congregation in powerful, Spirit-filled worship through music and song.",
      },
      choir: {
        image: "https://images.unsplash.com/photo-1507838153414-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
        title: "Choir Ministry",
        subtitle: "Voices United",
        desc: "Sing together in harmony as we lift our voices in praise and worship to glorify God.",
      },
      tech: {
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
        title: "Tech & Media",
        subtitle: "Behind the Scenes",
        desc: "Serve through sound, lighting, and media production to create an excellent worship experience.",
      },
    }

    const item = contentMap[tab]
    return (
      <ContentPanel
        imageSrc={item.image}
        title={item.title}
        subtitle={item.subtitle}
        description={item.desc}
        buttonText="Get Involved"
        buttonColor="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-indigo-700 hover:to-purple-700"
      />
    )
  }

  const renderMissions = () => {
    const tab = activeMissionTab
    const contentMap: Record<string, ContentItem> = {
      local: {
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
        title: "Local Outreach",
        subtitle: "Serving Our Community",
        desc: "Make a difference in our local community through service projects, food drives, and community partnerships.",
      },
      global: {
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
        title: "Global Missions",
        subtitle: "Reaching the World",
        desc: "Partner with missionaries around the world to spread the Gospel and serve those in need across nations.",
      },
      partners: {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        title: "Mission Partners",
        subtitle: "Together in Ministry",
        desc: "Support and pray for our mission partners who are making an eternal impact around the globe.",
      },
    }

    const item = contentMap[tab]
    return (
      <ContentPanel
        imageSrc={item.image}
        title={item.title}
        subtitle={item.subtitle}
        description={item.desc}
        buttonText="Join a Mission"
        buttonColor="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600"
      />
    )
  }

  const renderPrayer = () => {
    const tab = activePrayerTab
    const contentMap: Record<string, ContentItem> = {
      intercession: {
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        title: "Intercession Ministry",
        subtitle: "Power in Prayer",
        desc: "Join our intercessory prayer team and stand in the gap for our church, community, and world.",
      },
      "prayer-chain": {
        image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80",
        title: "Prayer Chain",
        subtitle: "Connected in Prayer",
        desc: "Be part of our prayer chain network, lifting up urgent needs and praises throughout the week.",
      },
      events: {
        image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80",
        title: "Prayer Events",
        subtitle: "Gathering Together",
        desc: "Join us for special prayer gatherings, prayer walks, and corporate intercession events.",
      },
    }

    const item = contentMap[tab]
    return (
      <ContentPanel
        imageSrc={item.image}
        title={item.title}
        subtitle={item.subtitle}
        description={item.desc}
        buttonText="Join Prayer"
        buttonColor="bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-purple-700 hover:to-indigo-700"
      />
    )
  }

  const renderSeniors = () => {
    const tab = activeSeniorTab
    const contentMap: Record<string, ContentItem> = {
      fellowship: {
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        title: "Senior Fellowship",
        subtitle: "Living with Purpose",
        desc: "Connect with other seniors through regular fellowship gatherings, Bible studies, and meaningful conversations.",
      },
      support: {
        image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80",
        title: "Support & Care",
        subtitle: "Caring for One Another",
        desc: "Receive and provide support through our senior care network, including visits, meals, and prayer support.",
      },
      outings: {
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        title: "Trips & Outings",
        subtitle: "Adventures Together",
        desc: "Enjoy group trips, day outings, and special events designed for seniors to explore and have fun together.",
      },
    }

    const item = contentMap[tab]
    return (
      <ContentPanel
        imageSrc={item.image}
        title={item.title}
        subtitle={item.subtitle}
        description={item.desc}
        buttonText="Join Fellowship"
        buttonColor="bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-cyan-700 hover:to-teal-700"
      />
    )
  }

  const Section = React.memo(
    ({
      title,
      tabs,
      activeTab,
      onTabChange,
      accent,
      children,
    }: {
      title: string
      tabs: { id: string; label: string }[]
      activeTab: string
      onTabChange: (id: string) => void
      accent: string
      children: ReactElement
    }) => (
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
          <TabSection tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} accentColor={accent} />
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
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
      <Section
        title="Children"
        tabs={childrenTabs}
        activeTab={activeChildrenTab}
        onTabChange={setActiveChildrenTab}
        accent="bg-gradient-to-r from-amber-500 to-orange-500"
      >
        {renderChildren()}
      </Section>

      <Section
        title="Adults"
        tabs={adultTabs}
        activeTab={activeAdultTab}
        onTabChange={setActiveAdultTab}
        accent="bg-gradient-to-r from-cyan-900 to-blue-900"
      >
        {renderAdults()}
      </Section>

      <Section
        title="Music & Worship"
        tabs={musicTabs}
        activeTab={activeMusicTab}
        onTabChange={setActiveMusicTab}
        accent="bg-gradient-to-r from-purple-700 to-indigo-700"
      >
        {renderMusic()}
      </Section>

      <Section
        title="Missions & Outreach"
        tabs={missionTabs}
        activeTab={activeMissionTab}
        onTabChange={setActiveMissionTab}
        accent="bg-gradient-to-r from-green-600 to-emerald-600"
      >
        {renderMissions()}
      </Section>

      <Section
        title="Prayer Ministry"
        tabs={prayerTabs}
        activeTab={activePrayerTab}
        onTabChange={setActivePrayerTab}
        accent="bg-gradient-to-r from-indigo-700 to-purple-700"
      >
        {renderPrayer()}
      </Section>

      <Section
        title="Seniors Ministry"
        tabs={seniorTabs}
        activeTab={activeSeniorTab}
        onTabChange={setActiveSeniorTab}
        accent="bg-gradient-to-r from-teal-700 to-cyan-700"
      >
        {renderSeniors()}
      </Section>
    </main>
  )
}

export default MinistryTabs
