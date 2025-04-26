import * as React from "react";
import { MenuButton } from "./MenuButton";

export const SideMenu: React.FC = () => {
  return (
    <nav className="p-4 rounded-2xl bg-stone-50 min-w-60 w-[267px]">
      <div className="flex-1 w-full">
        <MenuButton icon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/88a215d095a9cc37f0fbf899503dc8dec471dea2?placeholderIfAbsent=true" label="Balloons" isActive={true} />
        <MenuButton icon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/99669d3261e528df3456c6036e91dcac48d26dad?placeholderIfAbsent=true" label="Birthdays" />
        <MenuButton icon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/36ec17d9786b941b0e883c6bf11e39f2a2b38c99?placeholderIfAbsent=true" label="Holidays & Occasions" />
        <MenuButton icon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f3b1bdaac013192d5bc79182008198990569a8b8?placeholderIfAbsent=true" label="Party Supplies" />
        <MenuButton icon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/dad70678c904999895db481e1567a7c3089a1dbd?placeholderIfAbsent=true" label="Decoration" />
      </div>
      <div className="pt-2 w-full border-t border-solid border-t-[#D5D5D5]">
        <button className="flex gap-10 justify-between items-center pt-16 pb-8 w-full h-8 bg-black bg-opacity-0 min-h-8 rounded-[50px]">
          <span className="self-stretch my-auto text-sm tracking-normal leading-6 text-center text-blue-600">
            View all
          </span>
          <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/eeb4c98c4293661beb0261761ebda38f9ed3beaf?placeholderIfAbsent=true"
              className="object-contain self-stretch my-auto w-4 aspect-square"
              alt=""
            />
          </span>
        </button>
      </div>
    </nav>
  );
};
