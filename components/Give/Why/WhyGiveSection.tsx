"use client";
import React from 'react';
import { GiveReasonCard } from './GiveReasonCard';

export const WhyGiveSection: React.FC = () => {
  const giveReasons = [
    {
      number: '01',
      title: 'TITHES AND OFFERINGS',
      description: 'Giving our tithes and offerings shows our trust in God as Provider and supports the ongoing work of ministry.',
      position: 'left' as const,
      topOffset: 'top-[335px]',
      mobileTopOffset: 'max-md:top-[300px] max-sm:top-[280px]'
    },
    {
      number: '02',
      title: 'MISSIONS AND OUTREACH',
      description: 'Your generosity fuels local and global missions, helping us share the gospel and bring hope to the hurting.',
      position: 'right' as const,
      topOffset: 'top-[335px]',
      mobileTopOffset: 'max-md:top-[580px] max-sm:top-[500px]'
    },
    {
      number: '03',
      title: 'CHURCH GROWTH',
      description: 'As we grow, your giving provides facilities and resources to disciple believers and serve the community..',
      position: 'left' as const,
      topOffset: 'top-[644px]',
      mobileTopOffset: 'max-md:top-[860px] max-sm:top-[720px]'
    },
    {
      number: '04',
      title: 'BENEVOLENCE AND CARE',
      description: 'Through benevolence, we extend practical help and encouragement to the needy, lonely, and those in hardship.',
      position: 'right' as const,
      topOffset: 'top-[644px]',
      mobileTopOffset: 'max-md:top-[1140px] max-sm:top-[940px]'
    }
  ];

  return (
    <section className="overflow-hidden relative w-full min-h-screen">
      {/* Background */}
      <div className="absolute top-0 left-0 shrink-0 w-full opacity-75 bg-slate-700 h-[698px] max-sm:h-[1500px]" />

      {/* Main Heading */}
      <header className="absolute text-8xl font-bold text-white h-[120px] left-[111px] top-[84px] w-[860px]">
        <h1 className="text-8xl font-bold text-white">WHY GIVE?</h1>
      </header>

      {/* Description */}
      <article className="absolute text-xl leading-8 text-white h-[150px] left-[1056px] top-[105px] w-[295px]">
        <p className="text-xl text-white">
          Discover why giving at RCCG Living Word Forney is an act of worship, a
          step of faith, and a way to impact lives for God's kingdom.
        </p>
      </article>

      {/* Give Reason Cards */}
      {giveReasons.map((reason) => (
        <GiveReasonCard
          key={reason.number}
          number={reason.number}
          title={reason.title}
          description={reason.description}
          position={reason.position}
          topOffset={reason.topOffset}
          mobileTopOffset={reason.mobileTopOffset}
        />
      ))}
    </section>
  );
};
