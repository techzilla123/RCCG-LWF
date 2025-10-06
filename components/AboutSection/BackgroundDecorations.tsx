import React from 'react';

export const BackgroundDecorations: React.FC = () => {
  return (
    <div
      className="absolute inset-0 size-full bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Decorative Frame */}
      <img
        src="/Frame 37682.png"
        alt="Decoration"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
};
