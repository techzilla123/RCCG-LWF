import React from 'react';
import Link from 'next/link';
import PreferenceSection from './PreferenceSection';
import SettingOption from './SettingOption';

function PreferencesContent() {

   
  return (
    <main className="flex overflow-hidden flex-col justify-center px-32 py-0 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col pb-4 w-full rounded-lg max-md:max-w-full">
        <div className="flex gap-2 items-center py-6 w-full max-md:max-w-full">
        <div className="flex gap-4 items-start self-stretch my-auto border border-solid bg-black bg-opacity-0 border-black border-opacity-0 rounded-[1000px]">
        <Link href="/dashboard/settings">
            <button  className="flex cursor-pointer gap-2 justify-center items-center p-2 bg-black bg-opacity-0 rounded-[1000px]">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/143cbcc01aea062bb20b8ac002c50888b82abd21445fc5b73e918c337fffa6c3?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain self-stretch my-auto w-4 aspect-square" />
              <span className="self-stretch my-auto text-sm text-neutral-500">Profile</span>
            </button></Link>
            <button className="flex cursor-pointer gap-2 justify-center items-center p-2 bg-neutral-100 rounded-[1000px]">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1788b31a2828fd3904ad1b992af372c040528e1269b9f1001fbd1dc236e1ca88?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain self-stretch my-auto w-4 aspect-square" />
              <span className="self-stretch my-auto text-sm text-black">Preferences</span>
            </button>
           
          </div> 
        </div>
        <section className="flex flex-col p-6 w-full rounded-lg border border-solid border-zinc-300 max-md:px-5 max-md:max-w-full">
          <h1 className="gap-2 self-stretch pb-6 w-full text-2xl font-medium text-black whitespace-nowrap max-md:max-w-full">
            Preferences
          </h1>
          <PreferenceSection title="General">
            <SettingOption
              title="Date Format"
              description="Preferred chart style to present your data and analytics reports on the dashboard"
              action={
                <div className="flex flex-col justify-center w-20 h-10 rounded-lg shadow-sm bg-black bg-opacity-0">
                  <div className="flex overflow-hidden flex-1 gap-2 items-center pr-2 pl-2 size-full">
                    <span className="self-stretch my-auto text-sm text-neutral-500">Default</span>
                    <img src="/down.png" alt="" className="object-contain self-stretch my-auto w-3 aspect-square " />
                  </div>
                </div>
              }
            />
            <SettingOption
              title="Charts"
              description="Preferred chart style to present your data and analytics reports on the dashboard"
              action={
                <div className="flex flex-col justify-center w-20 h-10 rounded-lg shadow-sm bg-black bg-opacity-0">
                  <div className="flex overflow-hidden flex-1 gap-2 items-center pr-2 pl-2 size-full">
                    <span className="self-stretch my-auto text-sm text-neutral-500">Default</span>
                    <img src="/down.png" alt="" className="object-contain self-stretch my-auto w-3 aspect-square " />
                  </div>
                </div>
              }
            />
          </PreferenceSection>
          <PreferenceSection title="Notifications Alert">
            <SettingOption
              title="Mobile push notifications"
              description="Receive push notifications on mentions and comments via your mobile app"
              action={
                <div className="flex items-center py-0.5 pr-0.5 pl-3.5 w-7 bg-green-600 rounded-2xl"
                style={{ background: '#08AA3B' }}>
                  <div className="flex overflow-hidden flex-col self-stretch my-auto w-3 rounded-[77px] shadow-[0px_2px_4px_rgba(0,35,11,0.2)]"
                  >
                    <div className="flex shrink-0 w-full h-3 bg-white rounded-2xl${
                      isSwitchOn ? 'translate-x-5' : 'translate-x-0'
                    }"
                    ></div>
                  </div>
                </div>
              }
            />
            <SettingOption
              title="Sounds"
              description="Allow sound alert during notifications"
              action={
                <div className="flex items-center py-0.5 pr-0.5 pl-3.5 w-7 bg-green-600 rounded-2xl"
                style={{ background: '#08AA3B' }}>
                  <div className="flex overflow-hidden flex-col self-stretch my-auto w-3 rounded-[77px] shadow-[0px_2px_4px_rgba(0,35,11,0.2)]">
                    <div className="flex shrink-0 w-full h-3 bg-white rounded-2xl"></div>
                  </div>
                </div>
              }
            />
          </PreferenceSection>
          <PreferenceSection title="Email Preferences">
            <SettingOption
              title="Always send email notifications"
              description="Receive emails on new transactions, payment, invites, reminders, access requests, and property changes"
              action={
                <div className="flex items-center py-0.5 pr-0.5 pl-3.5 w-7 bg-green-600 rounded-2xl"
                style={{ background: '#08AA3B' }}>
                  <div className="flex overflow-hidden flex-col self-stretch my-auto w-3 rounded-[77px] shadow-[0px_2px_4px_rgba(0,35,11,0.2)]">
                    <div className="flex shrink-0 w-full h-3 bg-white rounded-2xl"></div>
                  </div>
                </div>
              }
            />
            <SettingOption
              title="Reports"
              description="Receive periodic reports on transactions and user activities"
              action={
                <div className="flex flex-col justify-center w-20 h-10 rounded-lg shadow-sm bg-black bg-opacity-0">
                  <div className="overflow-hidden flex-1 gap-2 self-stretch px-2 whitespace-nowrap size-full">
                    None
                    
                  </div>
                  
                </div>
              }
            />
          </PreferenceSection>
          <PreferenceSection title="Analytics Target">
            <SettingOption
              title="User"
              description="Monthly target users"
              action={
                <div className="flex flex-1 shrink gap-4 items-start self-stretch my-auto text-xs basis-0 text-zinc-300">
                  <div className="flex flex-col flex-1 shrink w-full basis-0">
                    <div className="flex gap-3 items-center px-4 py-2 w-full bg-white rounded-lg border border-solid border-zinc-300">
                               <input
                        type="number"
                        placeholder="Input target"
                        className="flex-1 text-center font-bold shrink self-stretch text-black focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              }
            />
            <SettingOption
              title="Transactions"
              description="Monthly target transactions"
              action={
                <div className="flex flex-1 shrink gap-4 items-start self-stretch my-auto text-xs basis-0 text-zinc-300">
                  <div className="flex flex-col flex-1 shrink w-full basis-0">
                    <div className="flex gap-3 items-center px-4 py-2 w-full bg-white rounded-lg border border-solid border-zinc-300">
                    <input
                        type="number"
                        placeholder="Input target"
                        className="flex-1 text-center font-bold text-black focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              }
            />
            <SettingOption
              title="Charts"
              description="Preferred chart style to present your data and analytics reports on the dashboard"
              action={
                <div className="flex flex-col justify-center w-20 h-10 rounded-lg shadow-sm bg-black bg-opacity-0">
                  <div className="flex overflow-hidden flex-1 gap-2 items-center pr-2 pl-2 size-full">
                    <span className="self-stretch my-auto text-sm text-neutral-500">Default</span>
                    <img src="/down.png" alt="" className="object-contain self-stretch my-auto w-3 aspect-square " />
                  </div>
                </div>
              }
            />
          </PreferenceSection>
          <SettingOption
            title="Clear data and history"
            description="All data and records will be deleted. This cannot be undone once completed"
            descriptionClass="text-red-600"
            action={
              <button className="overflow-hidden gap-2 self-stretch p-2 h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px] text-sm font-medium text-center text-red-600">
                Clear
              </button>
            }
          />
          <div className="flex flex-wrap gap-2.5 items-end pt-10 w-full text-sm font-medium text-center max-md:max-w-full">
            <button className="overflow-hidden justify-center items-center gap-2 self-stretch px-4 py-3 h-10 text-white bg-green-600 border border-solid border-black border-opacity-0 min-h-[40px] rounded-[1000px]"
            style={{ background: '#08AA3B' }}>
              Save changes
            </button>
            <button className="overflow-hidden gap-2 self-stretch px-4 py-3 h-10 whitespace-nowrap border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[40px] rounded-[1000px] text-neutral-500 w-[98px]">
              Cancel
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PreferencesContent;