import React from 'react';
import { RootedSection } from './RootedSection';
import { ConnectItem } from './ConnectItem';
import { PlayIcon } from './PlayIcon';
import { ComputerIcon } from './ComputerIcon';
import { PhoneIcon } from './PhoneIcon';

export const GetConnected: React.FC = () => {
  return (
    <main className="box-border flex flex-col items-center px-10 pt-12 pb-28 w-full bg-white min-h-[858px] max-md:px-6 max-md:pt-10 max-md:pb-20 max-sm:px-4 max-sm:pt-5 max-sm:pb-16">
      <div className="flex flex-col items-center w-full max-w-[1080px] mx-auto">
        <header className="flex flex-col items-center pb-2.5">
          <h1 className="text-4xl text-center uppercase leading-[53.2px] text-zinc-800 max-sm:text-3xl max-sm:leading-10">
            GET<span className="font-bold">CONNECTED</span>
          </h1>
        </header>

        <div className="flex items-start w-full gap-10 mt-10 max-md:flex-col max-md:gap-8">
          <RootedSection />
          <div className="flex flex-col gap-12 items-start flex-1 min-h-px max-md:gap-8">
            <ConnectItem
              icon={<PlayIcon />}
              title="WATCH THE LATEST MESSAGE"
              description="Never miss a message! Watch the most recent teaching or explore our extensive media library to view or share past messages."
              linkText="VIEW MESSAGES →"
              hasBorder={true}
            />
            <ConnectItem
              icon={<ComputerIcon />}
              title="EXPERIENCE CHURCH ONLINE"
              description="Join us for Church Online and be part of a community of people from around the world. Join us on Facebook, YouTube or RCCGLWF.live this weekend."
              linkText="RCCGLWF.LIVE →"
              hasBorder={true}
            />
            <ConnectItem
              icon={<PhoneIcon />}
              title="RCCG Living Word Forney Blog"
              description="Everything you need in one place, including events, live and past messages, prayer, a Bible reading plan, check-in, giving, and more."
              linkText="VIEW BLOG →"
              hasBorder={false}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default GetConnected;
