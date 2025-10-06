import React from 'react';

interface GiveReasonCardProps {
  number: string;
  title: string;
  description: string;
  position: 'left' | 'right';
  topOffset: string;
  mobileTopOffset: string;
}

export const GiveReasonCard: React.FC<GiveReasonCardProps> = ({
  number,
  title,
  description,
  position,
  topOffset,
  mobileTopOffset
}) => {
  const leftPosition = position === 'left' ? 'left-[111px]' : 'left-[741px]';
  const numberLeftPosition = position === 'left' ? 'left-[126px]' : 'left-[756px]';
  const titleLeftPosition = position === 'left' ? 'left-[171px]' : 'left-[801px]';
  const descriptionLeftPosition = position === 'left' ? 'left-[451px]' : 'left-[1081px]';

  // Special positioning for 03 and 04
  const isBottomRow = number === '03' || number === '04';
  const specialNumberLeft = number === '03' ? 'left-[393px]' : number === '04' ? 'left-[998px]' : numberLeftPosition;
  const specialDescriptionLeft = number === '03' ? 'left-[161px]' : number === '04' ? 'left-[791px]' : descriptionLeftPosition;
  const specialTitleLeft = number === '03' ? 'left-[171px]' : number === '04' ? 'left-[1003px]' : titleLeftPosition;

  const mobileLeftCard = 'max-md:left-[60px] max-sm:left-5';
  const mobileLeftNumber = 'max-md:left-20 max-sm:left-[30px]';
  const mobileLeftNumberSpecial = number === '03' || number === '04' ? 'max-md:left-[280px] max-sm:left-[200px]' : mobileLeftNumber;

  return (
    <>
      {/* Card Background */}
      <div className={`absolute shrink-0 bg-stone-900 h-[289px] rounded-[50px] ${topOffset} w-[610px] max-md:h-60 ${mobileTopOffset} max-md:w-[500px] max-sm:h-[200px] max-sm:w-[350px] ${leftPosition} ${mobileLeftCard}`} />

      {/* Large Number */}
      <div className={`absolute bg-clip-text h-[360px] text-[300px] ${isBottomRow ? topOffset.replace('top-[644px]', 'top-[684px]').replace('top-[335px]', 'top-[375px]') : topOffset.replace('top-[644px]', 'top-[684px]').replace('top-[335px]', 'top-[375px]')} w-[274px] max-md:text-[240px] max-md:w-[220px] max-sm:w-40 max-sm:h-[200px] max-sm:text-[180px] ${isBottomRow ? specialNumberLeft : numberLeftPosition} ${mobileLeftNumberSpecial}`}>
        <span className="text-[300px] max-md:text-[240px] max-sm:text-[180px]">{number}</span>
      </div>

      {/* Title */}
      <header className={`absolute text-xl font-bold leading-8 text-white uppercase h-[30px] ${isBottomRow ? topOffset.replace('top-[644px]', 'top-[684px]').replace('top-[335px]', 'top-[375px]') : topOffset.replace('top-[644px]', 'top-[684px]').replace('top-[335px]', 'top-[375px]')} w-[285px] ${isBottomRow ? specialTitleLeft : titleLeftPosition}`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </header>

      {/* Description */}
      <article className={`absolute text-lg leading-8 text-white h-[150px] ${topOffset.replace('top-[335px]', 'top-[458px]').replace('top-[644px]', 'top-[767px]')} w-[220px] ${isBottomRow ? specialDescriptionLeft : descriptionLeftPosition}`}>
        <p className="text-lg text-white">{description}</p>
      </article>
    </>
  );
};
