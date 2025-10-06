import React from 'react';

export const WelcomeContent: React.FC = () => {
  return (
    <article className="pr-10">
      <h2 className="mb-8 text-4xl font-bold text-gray-800 max-md:text-3xl max-sm:text-3xl">
        Welcome
      </h2>
      <p className="mb-6 text-base leading-relaxed text-gray-600 max-sm:text-sm">
        The Redeemed Christian Church of God Living Word Forney is the
        assembly of believers standing strong and standing together in
        Christ Jesus, imitating God as dear children, keeping the
        unity of the spirit in the bond of peace.
      </p>
      <p className="mb-6 text-base leading-relaxed text-gray-600 max-sm:text-sm">
        It is a place of hope for the hopeless, a place of refuge in
        times of trouble, a home for the needy and lonely, a shelter
        from the trouble storm, a school for the untaught. It is a
        place we are growing in the grace and knowledge of our Lord
        Jesus Christ and pressing towards the upward call of God unto
        Christlikeness. For whatever is born of God overcomes the
        world. And this is the victory that has overcome the world—
        our faith. You are all welcome.
      </p>
    </article>
  );
};
