"use client";
import * as React from "react";
// import { useRouter } from "next/navigation";
// import ImageSection from "./ImageSection";
// import LearnMoreSection from "./LearnMoreSection";
// import HorizontalBorder from "./HorizontalBorder";

import MobileBackground from "./MobileBackground"; // first code for mobile
import DesktopBackground from "./DesktopBackground"; // second code for desktop

const Background: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // you can adjust the breakpoint
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileBackground /> : <DesktopBackground />;
};

export default Background;
