import { Coiny } from 'next/font/google';

const coiny = Coiny({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-coiny',
});

export const HeroHeadline = () => {
  return (
    <h1
    className={`${coiny.variable} font-[var(--font-coiny)] text-[40px] md:text-[64px] leading-[1.1]`}
  >
    <span
      className="custom-shadow text-[#85C8FF] drop-shadow-[3px_3px_0px_#000]"
      data-text="Shop the "
    >
      Shop the{' '}
    </span>
    <span
      className="custom-shadow text-[#FF99AA] drop-shadow-[3px_3px_0px_#000]"
      data-text="moments "
    >
      moments{' '}
    </span>
    <span
      className="custom-shadow text-[#85C8FF] drop-shadow-[3px_3px_0px_#000]"
      data-text="that "
    >
      that{' '}
    </span>
    <span
      className="custom-shadow text-[#85C8FF] drop-shadow-[3px_3px_0px_#000]"
      data-text="keep You & Your "
    >
      keep You & Your{' '}
    </span>
    <span
      className="custom-shadow text-[#85C8FF] drop-shadow-[3px_3px_0px_#000]"
      data-text="kid"
    >
     kids{' '}
    </span>
    
    <span
      className="custom-shadow text-[#FF99AA] drop-shadow-[3px_3px_0px_#000]"
      data-text="kids smiling..."
    >
     smiling...
    </span>
  </h1>
    
  );
};
