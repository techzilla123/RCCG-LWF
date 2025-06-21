"use client";

import * as React from "react";
import { SideMenu } from "./Categorys/SideMenu";
import { CategoryList } from "./Categorys/CategoryList";

type CategorysProps = {
  selectedCategory: string;
};

const Categorys: React.FC<CategorysProps> = ({ selectedCategory }) => {
  const [localCategory, setLocalCategory] = React.useState<string>(selectedCategory);

  return (
    <div className="flex bg-white w-full py-6 px-4 overflow-x-auto">
      <SideMenu selectedCategory={localCategory} onSelect={setLocalCategory} />
      <CategoryList selectedCategory={localCategory} />
    </div>
  );
};

export default Categorys;
