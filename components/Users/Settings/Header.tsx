import * as React from "react";
import { TabNavigation } from "./Header/TabNavigation";


export const Header: React.FC = () => {
  return (
    <header className="flex flex-col justify-center px-6 pt-6 bg-stone-50 text-neutral-500 max-md:px-5">
      <TabNavigation />
    </header>
  );
};

export default Header;
