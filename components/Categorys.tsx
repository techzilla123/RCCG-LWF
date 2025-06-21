"use client";

import * as React from "react";
import { SideMenu } from "./Categorys/SideMenu";
import { CategoryList } from "./Categorys/CategoryList";

const Categorys: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Balloons");

  return (
    <div className="flex bg-white w-full py-6 px-4 overflow-x-auto">
      <SideMenu selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      <CategoryList selectedCategory={selectedCategory} />
    </div>
  );
};

export default Categorys;
