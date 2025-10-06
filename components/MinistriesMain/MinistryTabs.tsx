"use client";

import React, { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { TabSection } from "./TabSection";
import { ContentPanel } from "./ContentPanel";
import { motion, AnimatePresence } from "framer-motion";

// Live arrow SVG URL (hosted on jsdelivr, using Heroicons)  
const ARROW_ICON_URL = "https://cdn.jsdelivr.net/npm/heroicons@2.1.1/24/solid/arrow-right.svg";

type ContentItem = {
  image: string;
  title: string;
  subtitle?: string;
  desc: string;
};

export const MinistryTabs: React.FC = () => {
  const [activeChildrenTab, setActiveChildrenTab] = useState<string>("kids-nursery");
  const [activeAdultTab, setActiveAdultTab] = useState<string>("discipleship");
  const [activeMusicTab, setActiveMusicTab] = useState<string>("worship");
  const [activeMissionTab, setActiveMissionTab] = useState<string>("local");
  const [activePrayerTab, setActivePrayerTab] = useState<string>("intercession");
  const [activeSeniorTab, setActiveSeniorTab] = useState<string>("fellowship");

  const childrenTabs = [
    { id: "kids-nursery", label: "Kids & Nursery" },
    { id: "middle-school", label: "Middle School" },
    { id: "high-school", label: "High School" },
    { id: "awana", label: "Awana" },
  ];

  const adultTabs = [
    { id: "discipleship", label: "Discipleship" },
    { id: "life-groups", label: "Life Groups" },
    { id: "classes", label: "Classes" },
    { id: "builders", label: "Builders" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
  ];

  const musicTabs = [
    { id: "worship", label: "Worship Team" },
    { id: "choir", label: "Choir" },
    { id: "tech", label: "Tech & Media" },
  ];

  const missionTabs = [
    { id: "local", label: "Local Outreach" },
    { id: "global", label: "Global Missions" },
    { id: "partners", label: "Mission Partners" },
  ];

  const prayerTabs = [
    { id: "intercession", label: "Intercession" },
    { id: "prayer-chain", label: "Prayer Chain" },
    { id: "events", label: "Prayer Events" },
  ];

  const seniorTabs = [
    { id: "fellowship", label: "Senior Fellowship" },
    { id: "support", label: "Support & Care" },
    { id: "outings", label: "Trips & Outings" },
  ];

  const renderChildren = () => {
    const tab = activeChildrenTab;
    const contentMap: Record<string, ContentItem> = {
      "kids-nursery": {
        image:
          "https://images.unsplash.com/photo-1588776814546-ec7b9e5b1ef1?auto=format&fit=crop&w=800&q=80",
        title: "Kids & Nursery",
        subtitle: "Here for Moms, Dads & Kids",
        desc:
          "We provide a fun, safe space for children to experience God’s love through creative activities, storytelling, and worship.",
      },
      "middle-school": {
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        title: "Middle School",
        subtitle: "Growing in Faith",
        desc:
          "Middle schoolers engage in exciting lessons, small groups, and events that help them deepen their faith journey.",
      },
      "high-school": {
        image:
          "https://images.unsplash.com/photo-1507937284540-1f1f1d1e9d02?auto=format&fit=crop&w=800&q=80",
        title: "High School",
        subtitle: "Preparing for the Future",
        desc:
          "Our high school ministry equips students to live out their faith as they prepare for college and life beyond.",
      },
      awana: {
        image:
          "https://images.unsplash.com/photo-1601049541289-9ee7a4d8e5b8?auto=format&fit=crop&w=800&q=80",
        title: "Awana",
        subtitle: "Scripture Memory & Fun",
        desc:
          "Awana helps children learn God’s Word through games, fun activities, and friendship.",
      },
    };

    const item = contentMap[tab];
    return (
      <ContentPanel
        imageSrc={item.image}
        title={item.title}
        subtitle={item.subtitle}
        description={item.desc}
        buttonText="Learn More"
        buttonColor="bg-amber-500"
        iconSrc={ARROW_ICON_URL}
        showSchedule
      />
    );
  };

  const renderAdults = () => {
    const tab = activeAdultTab;
    const contentMap: Record<string, ContentItem> = {
      discipleship: {
        image:
          "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80",
        title: "Discipleship",
        desc:
          "Learn to follow Jesus deeply through mentorship, study, and spiritual discipline.",
      },
      "life-groups": {
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        title: "Life Groups",
        desc:
          "Build meaningful relationships as you grow together in faith through small groups.",
      },
      classes: {
        image:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        title: "Bible Classes",
        desc:
          "Study the Word through structured classes that fit your season of life.",
      },
      builders: {
        image:
          "https://images.unsplash.com/photo-1573164713347-df1e9f6d0c2b?auto=format&fit=crop&w=800&q=80",
        title: "Builders Ministry",
        desc:
          "Hands-on service opportunities where faith meets action in our community.",
      },
      men: {
        image:
          "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
        title: "Men’s Ministry",
        desc:
          "Men growing in strength, faith, and brotherhood through study and service.",
      },
      women: {
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        title: "Women’s Ministry",
        desc:
          "Encouragement, prayer, and connection for women in all life stages.",
      },
    };

    const item = contentMap[tab];
    return (
      <ContentPanel
        imageSrc={item.image}
        title={item.title}
        description={item.desc}
        buttonText="Join Us"
        buttonColor="bg-cyan-900"
        iconSrc={ARROW_ICON_URL}
      />
    );
  };

  const renderMusic = () => (
    <ContentPanel
      imageSrc="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"
      title="Worship Ministry"
      subtitle="Leading in Praise"
      description="Serve through music, sound, or media as we lead the church in worshiping God together."
      buttonText="Get Involved"
      buttonColor="bg-purple-700"
      iconSrc={ARROW_ICON_URL}
    />
  );

  const renderMissions = () => (
    <ContentPanel
      imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
      title="Missions & Outreach"
      subtitle="Serving the World"
      description="Partner with local and global ministries to bring hope and help to those in need."
      buttonText="Join a Mission"
      buttonColor="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-600 shadow-lg hover:shadow-emerald-300/50 transition-all duration-300 transform hover:scale-105"
      iconSrc={ARROW_ICON_URL}
    />
  );

  const renderPrayer = () => (
    <ContentPanel
      imageSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
      title="Prayer Ministry"
      subtitle="Power in Prayer"
      description="Join a prayer group or participate in intercessory sessions that cover our church and community in prayer."
      buttonText="Join Prayer"
      buttonColor="bg-indigo-700"
      iconSrc={ARROW_ICON_URL}
    />
  );

  const renderSeniors = () => (
    <ContentPanel
      imageSrc="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
      title="Seniors Ministry"
      subtitle="Living with Purpose"
      description="A vibrant community for seniors to connect, grow, and serve together through fellowship and activities."
      buttonText="Join Fellowship"
      buttonColor="bg-teal-700"
      iconSrc={ARROW_ICON_URL}
    />
  );

  const Section = ({
    title,
    tabs,
    activeTab,
    onTabChange,
    accent,
    children,
  }: {
    title: string;
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    accent: string;
    children: React.ReactNode;
  }) => (
    <section className="w-full bg-stone-50 py-8 rounded-2xl shadow-sm">
      <SectionHeader title={title} accent={accent} />
      <div className="px-6 sm:px-10 lg:px-16">
        <TabSection
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          accentColor={accent}
        />
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );

  return (
    <main className="flex flex-col gap-12">
      <Section
        title="Children"
        tabs={childrenTabs}
        activeTab={activeChildrenTab}
        onTabChange={setActiveChildrenTab}
        accent="bg-amber-500"
      >
        {renderChildren()}
      </Section>

      <Section
        title="Adults"
        tabs={adultTabs}
        activeTab={activeAdultTab}
        onTabChange={setActiveAdultTab}
        accent="bg-cyan-900"
      >
        {renderAdults()}
      </Section>

      <Section
        title="Music & Worship"
        tabs={musicTabs}
        activeTab={activeMusicTab}
        onTabChange={setActiveMusicTab}
        accent="bg-purple-700"
      >
        {renderMusic()}
      </Section>

      <Section
        title="Missions & Outreach"
        tabs={missionTabs}
        activeTab={activeMissionTab}
        onTabChange={setActiveMissionTab}
        accent="bg-green-700"
      >
        {renderMissions()}
      </Section>

      <Section
        title="Prayer Ministry"
        tabs={prayerTabs}
        activeTab={activePrayerTab}
        onTabChange={setActivePrayerTab}
        accent="bg-indigo-700"
      >
        {renderPrayer()}
      </Section>

      <Section
        title="Seniors Ministry"
        tabs={seniorTabs}
        activeTab={activeSeniorTab}
        onTabChange={setActiveSeniorTab}
        accent="bg-teal-700"
      >
        {renderSeniors()}
      </Section>
    </main>
  );
};

export default MinistryTabs;
