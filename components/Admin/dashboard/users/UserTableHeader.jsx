import React from 'react';

function UserTableHeader({ isAllSelected, onSelectAll }) {
  return (
    <div className="flex overflow-hidden flex-wrap px-0 py-0.5 w-full rounded-lg bg-neutral-100 max-md:max-w-full">
      <div className="flex gap-1 items-center px-4 py-2 w-12 h-full">
        <div className="flex gap-1 items-center self-stretch my-auto w-4">
          <div className="flex overflow-hidden flex-col justify-center items-center self-stretch my-auto w-4 h-4 bg-white bg-opacity-0">
            <div className="flex flex-col justify-center items-center w-full rounded-sm">
            <input
  type="checkbox"
  className="flex w-4 h-4 rounded-sm border border-solid border-zinc-300 cursor-pointer"
  style={{ accentColor: '#08AA3B' }}
  checked={isAllSelected}
                onChange={onSelectAll}
/>

            </div>
          </div>
        </div>
      </div>
      <div className="flex relative flex-1 shrink gap-1 px-2 py-4 h-full text-sm font-medium leading-loose text-black basis-4 min-w-[160px]">
        <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
        <div className="z-0 flex-1 shrink my-auto basis-0">User ID</div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/936c5ae5899c0cc48ee2a69189a91288cc3e5042a1f0e5d39a5a808fcaff1acc?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain z-0 shrink-0 aspect-[0.5] w-[11px]" />
      </div>
      <div className="flex relative flex-1 shrink gap-1 px-2 py-4 h-full text-sm font-medium leading-loose text-black whitespace-nowrap basis-4 min-w-[160px]">
        <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
        <div className="z-0 flex-1 shrink my-auto basis-0">Contact</div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/936c5ae5899c0cc48ee2a69189a91288cc3e5042a1f0e5d39a5a808fcaff1acc?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain z-0 shrink-0 aspect-[0.5] w-[11px]" />
      </div>
      <div className="flex relative flex-1 shrink gap-1 px-2 py-4 h-full text-sm font-medium leading-loose text-black basis-4 min-w-[160px]">
        <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
        <div className="z-0 flex-1 shrink my-auto basis-0">Last Transaction</div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/936c5ae5899c0cc48ee2a69189a91288cc3e5042a1f0e5d39a5a808fcaff1acc?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain z-0 shrink-0 aspect-[0.5] w-[11px]" />
      </div>
      <div className="flex relative flex-1 shrink gap-1 px-2 py-4 h-full text-sm font-medium leading-loose text-right text-black basis-4">
        <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
        <div className="z-0 flex-1 shrink my-auto basis-0">Total Transactions</div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/936c5ae5899c0cc48ee2a69189a91288cc3e5042a1f0e5d39a5a808fcaff1acc?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain z-0 shrink-0 aspect-[0.5] w-[11px]" />
      </div>
      <div className="flex relative flex-1 shrink gap-1 items-start px-2 py-4 h-full text-sm font-medium leading-loose text-center text-black whitespace-nowrap basis-4">
        <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
        <div className="z-0 flex-1 shrink my-auto basis-0">Status</div>
      </div>
      <div className="flex relative flex-1 shrink gap-1 items-start px-2 py-4 h-full text-sm font-medium leading-loose text-black whitespace-nowrap basis-4">
        <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
        <div className="z-0 my-auto">Action</div>
      </div>
    </div>
  );
}

export default UserTableHeader;