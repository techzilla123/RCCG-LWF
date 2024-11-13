import React from 'react';
import Link from 'next/link';
import InputField from './InputField';

function ProfileSettings() {
  return (
    <div
      data-layername="content"
      className="flex flex-col flex-1 pb-4 w-full rounded-lg max-md:max-w-full"
    >
      <div
        data-layername="title"
        className="flex gap-2 items-center py-6 w-full max-md:max-w-full"
      >
        <div
          data-layername="tabGroup"
          className="flex gap-4 items-start self-stretch my-auto border border-solid bg-black bg-opacity-0 border-black border-opacity-0 rounded-[1000px]"
        >
          <div
            data-layername="tabs"
            className="flex gap-2 justify-center items-center p-2 bg-neutral-100 rounded-[1000px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d859ee12df10ba613400245024e83be3564dc8c83e508b849e032151cee8280a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
              alt="Profile icon"
              className="object-contain self-stretch my-auto w-4 aspect-square"
            />
            <div
              data-layername="tabs"
              className="self-stretch my-auto text-sm text-black"
            >
              Profile
            </div>
          </div>
          <Link href="/dashboard/settings/preferences"> <div
            data-layername="tabs"
            className="flex gap-2 justify-center items-center p-2 bg-black bg-opacity-0 rounded-[1000px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecba1fe832e32fb2976ce1af73cd9ea7fd903ad69c74aa172370da1665679134?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
              alt="Preferences icon"
              className="object-contain self-stretch my-auto w-4 aspect-square"
            />
            
            <div
              data-layername="tabs"
              className="self-stretch my-auto text-sm text-neutral-500"
            >
              Preferences
            
            </div>
          
          </div>
          </Link>
        </div>
      </div>
      <form
        data-layername="settings"
        className="flex flex-col flex-1 p-6 w-full rounded-lg border border-solid border-zinc-300 max-md:px-5 max-md:max-w-full"
      >
        <h2
          data-layername="title"
          className="gap-2 self-stretch pb-6 w-full text-2xl font-medium text-black max-md:max-w-full"
        >
          My Profile
        </h2>
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div
              data-layername="firstRow"
              className="flex flex-wrap gap-4 w-full max-md:max-w-full"
            >
              <div
                data-layername="input"
                className="flex flex-col flex-1 shrink self-start text-base basis-0 min-h-[100px] min-w-[240px]"
              >
                <label
                  htmlFor="fullName"
                  data-layername="text"
                  className="gap-2.5 self-start text-neutral-500"
                >
                  Full Name
                </label>

                <InputField
                  defaultValue="John Doe"
                  placeholder="Full Name"
                  type="text"
                />
              </div>
              <div
                data-layername="input"
                className="flex flex-col flex-1 shrink basis-0 min-w-[240px]"
              >
                <label
                  htmlFor="gender"
                  data-layername="text"
                  className="gap-2.5 self-start text-base whitespace-nowrap text-neutral-500"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  defaultValue=""
                  data-layername="menuItem2ndLevel"
                  className="flex items-center justify-center px-4 mt-2 w-full h-10 bg-white rounded-lg border border-solid shadow-sm border-zinc-300 text-black text-base focus:outline-none focus:ring-0"
                >
                  <option value="" disabled>
                    Choose option
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full max-md:max-w-full">
            <div
              data-layername="firstRow"
              className="flex flex-wrap gap-4 items-start w-full max-md:max-w-full"
            >
              <div
                data-layername="input"
                className="flex flex-col flex-1 shrink text-base whitespace-nowrap basis-0 min-h-[100px] min-w-[240px]"
              >
                <label
                  htmlFor="email"
                  data-layername="text"
                  className="gap-2.5 self-start text-neutral-500"
                >
                  Email
                </label>
                <InputField
                  type="text"
                  defaultValue="johndoe@email.com"
                />
              </div>
              <div
                className="flex flex-col flex-1 shrink basis-0 min-h-[100px] min-w-[240px]"
              >
                <InputField
                  label="Password"
                  type="password"
                  defaultValue="••••••••"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          data-layername="cta"
          className="flex flex-1 gap-2.5 items-start self-start h-full text-sm font-medium text-center mt-6"
        >
          <button
            type="submit"
            data-layername="primaryCta"
            className="flex justify-center items-center overflow-hidden gap-2 self-stretch px-4 py-3 h-10 text-white bg-green-600 border border-solid border-black border-opacity-0 min-h-[40px] rounded-[1000px]"
            style={{ background: '#08AA3B' }}
          >
            Save changes
          </button>
          <button
            type="button"
            data-layername="secCta"
            className="overflow-hidden gap-2 self-stretch px-4 py-3 h-10 whitespace-nowrap border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[40px] rounded-[1000px] text-neutral-500 w-[98px]"
          >
            Cancel
          </button>
        </div>
        <button
          type="button"
          data-layername="primaryCta"
          className="flex overflow-hidden gap-2 justify-center items-center self-start px-4 py-3 h-10 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[40px] rounded-[1000px] mt-4"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8f73a5fe6edcc6e35eea4386dfa723cb3241171ee621c12d1e1a2720c3c1cda?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
            alt="Delete account"
            className="object-contain self-stretch my-auto w-4 aspect-square"
          />
          <span
            data-layername="text"
            className="self-stretch my-auto text-sm font-medium text-center text-red-600"
          >
            Delete Account
          </span>
        </button>
      </form>
    </div>
  );
}

export default ProfileSettings;
