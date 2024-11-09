import React from "react";
// Removed unused import for roboto

const AuthFooter = () => {
  return (
    <footer className="h-[61px] bg-[#001C09] roboto"> {/* Use roboto class if required */}
      <div className="flex items-center justify-between px-[9rem]">
        <h3 className="text-[#08AA3B] mt-[1rem]">support@yctmb.com</h3>
        <h3 className="text-[#717171] mt-[1rem]">
          &copy; 2024 yctmb. All rights reserved.
        </h3>
      </div>
    </footer>
  );
};

export default AuthFooter;
