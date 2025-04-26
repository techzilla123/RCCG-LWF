"use client";

import * as React from "react";
import { SideMenu } from "./Categorys/SideMenu";
import { CategoryList } from "./Categorys/CategoryList";

const Categorys: React.FC = () => {
  return (
    <div className="flex bg-white w-full py-6 px-4 overflow-x-auto">
      <SideMenu />
      <CategoryList />
    </div>
  );
};

export default Categorys;
