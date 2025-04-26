"use client";

import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

export const FiltersDefault = () => {
  const [collections, setCollections] = useState([
    "Favorites",
    "Birthday collections",
  ]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  ); // Track the selected collection

  const addCollection = () => {
    const newCollectionName = prompt("Enter the new collection name:");
    if (newCollectionName) {
      setCollections([...collections, newCollectionName]);
    }
  };

  const handleCollectionClick = (collection: string) => {
    // Toggle the selected collection
    setSelectedCollection(
      selectedCollection === collection ? null : collection
    );
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Collections</h2>
        <button
          onClick={addCollection}
          className="text-xl text-gray-600"
          aria-label="Add new collection"
        >
          <IoIosAdd />
        </button>
      </div>

      {/* Collections List */}
      <div className="mt-4">
        {collections.map((collection, index) => (
          <div
            key={index}
            onClick={() => handleCollectionClick(collection)} // Handle click
            className={`flex justify-between items-center p-2 rounded-md mb-2 ${
              selectedCollection === collection ? "bg-gray-100" : ""
            }`} // Apply bg-gray-100 only when selected
          >
            <span className="font-medium">{collection}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
