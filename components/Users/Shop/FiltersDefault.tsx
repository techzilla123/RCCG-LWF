import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  List,
  Tag,
  DollarSign,
  Users,
  Calendar,
  Palette,
  Maximize,
  Star,
} from "lucide-react";

const filtersConfig = [
  { title: "Sort by", icon: Filter, type: "radio", options: ["Relevant to you", "Recently added", "Trending"] },
  { title: "Order by", icon: List, type: "radio", options: ["Ascending", "Descending"] },
  { title: "Category", icon: Tag, type: "checkbox", options: ["Latex balloons", "Foil balloons", "Number balloons", "Letter balloons", "Giant balloons"] },
  { title: "Listings", icon: Tag, type: "radio", options: ["For sale", "Rental"] },
  { title: "Price", icon: DollarSign, type: "radio", options: ["Cheapest first", "Most expensive first"] },
  { title: "Gender", icon: Users, type: "checkbox", options: ["Kids", "Women", "Men"] },
  { title: "Occasion", icon: Calendar, type: "checkbox", options: ["Birthday", "Parties", "Events", "Holidays", "Others"] },
  { title: "Color", icon: Palette, type: "checkbox", options: ["Black", "Red", "Gold", "Purple", "Pink", "Green", "Blue"] },
  { title: "Size", icon: Maximize, type: "checkbox", options: ["X-Large", "Large", "Medium", "Small", "X-Small", "XX-Small"] },
  { title: "Customer Rating", icon: Star, type: "radio", options: ["5-star", "4-star", "3-star", "2-star", "1-star"] },
];

export default function FiltersSidebar() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    () => Object.fromEntries(filtersConfig.map(({ title }) => [title, true]))
  );
  
  type FilterValue = string | string[];

const [filters, setFilters] = useState<{ [key: string]: FilterValue }>({
  "Sort by": "Relevant to you",
  "Listings": "For sale",
  "Customer Rating": "4-star",
});


  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleChange = (section: string, option: string, type: string) => {
    if (type === "radio") {
      setFilters((prev) => ({ ...prev, [section]: option }));
    } else {
      setFilters((prev) => {
        const current = prev[section] || [];
        if (current.includes(option)) {
          return { ...prev, [section]: current.filter((o: string) => o !== option) };
        } else {
          return { ...prev, [section]: [...current, option] };
        }
      });
    }
  };

  const clearAll = () => {
    setFilters({});
  };

  const applyFilters = () => {
    console.log("Applying filters: ", filters);
  };

  return (
    <motion.div
    layout
    className="w-64 p-4 bg-white shadow-lg rounded-md transition-all duration-300 overflow-hidden inline-block"
  >
  
      <h3 className="text-xl font-semibold mb-4">Filters</h3>
      {filtersConfig.map(({ title, icon: Icon, type, options }) => (
        <div key={title} className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(title)}
          >
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4" />
              <h3 className="font-medium">{title}</h3>
            </div>
            {openSections[title] ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
          <AnimatePresence initial={false}>
            {openSections[title] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-2 pl-6"
              >
                <div className="space-y-2">
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input
                        type={type}
                        name={title}
                        value={option}
                        checked={
                          type === "radio"
                            ? filters[title] === option
                            : (filters[title] || []).includes(option)
                        }
                        onChange={() => handleChange(title, option, type)}
                        className="accent-blue-500"
                      />
                      <label className="text-sm">{option}</label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="flex flex-col space-y-2 mt-6">
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Apply filters
        </button>
        <button
          onClick={clearAll}
          className="text-blue-600 py-2 rounded-md hover:underline"
        >
          Clear all
        </button>
      </div>
      </motion.div>
  );
}
