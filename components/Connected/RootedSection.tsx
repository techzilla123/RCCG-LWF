import React from 'react';
import { useRouter } from 'next/navigation';

export const RootedSection: React.FC = () => {
  const router = useRouter();

  return (
    <section
      className="
        flex flex-col gap-6 items-start flex-1
        pt-10 pr-11 pb-3 pl-0
        border-r-2 border-r-stone-800
        max-md:border-r-0 max-md:border-b-2 max-md:border-b-stone-800
        max-md:pb-10 max-md:px-0
      "
    >
      <a href="/class" className="w-full">
        <img
          src="/believe.jpg"
          alt="Believer's Class"
          className="w-full max-w-[498px] object-cover rounded-sm"
        />
      </a>

      <article className="flex flex-col gap-4 w-full">
        <h3 className="text-base font-bold uppercase text-zinc-800">
          Believer&apos;s Class
        </h3>

        <p className="text-base font-light leading-6 text-zinc-800 max-sm:text-sm">
          The Believer’s Class is designed to strengthen your faith, deepen your understanding of God’s Word, and equip you for victorious Christian living. Through teaching, discussion, and fellowship, members grow in knowledge, wisdom, and spiritual maturity, building a firm foundation to walk confidently in Christ every day.
        </p>

        <button
          onClick={() => router.push('/class')}
          className="font-bold text-slate-700 hover:text-slate-600 transition-colors"
        >
          LEARN MORE →
        </button>
      </article>
    </section>
  );
};
