import * as React from "react";

interface FavoriteButtonProps {
  icon: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ icon }) => {
  return (
    <div className="flex absolute top-3 right-3 z-0 flex-col items-end w-12">
      <button className="flex justify-center items-center p-4 w-12 h-12 bg-white rounded-full"> {/* Increased button size */}
        <img
          src={icon}
          alt="Favorite"
          className="object-contain w-10 h-10 transform scale-150"  // Keep the icon at a smaller size but scale it
        />
      </button>
    </div>
  );
};
