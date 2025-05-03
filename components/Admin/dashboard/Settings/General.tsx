"use client";
import * as React from "react";
import { useState } from "react";

type HeroItem = {
  image: string;
  content: string;
};

export const General: React.FC = () => {
  const [heroes, setHeroes] = useState<HeroItem[]>([
    { image: "", content: "" },
    { image: "", content: "" },
    { image: "", content: "" },
  ]);

  const handleImageChange = (index: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newHeroes = [...heroes];
      newHeroes[index].image = reader.result as string;
      setHeroes(newHeroes);
    };
    reader.readAsDataURL(file);
  };

  const handleContentChange = (index: number, content: string) => {
    const newHeroes = [...heroes];
    newHeroes[index].content = content;
    setHeroes(newHeroes);
  };

  const handleSave = () => {
    // You can connect this to an API or context/store
    console.log("Saving hero section:", heroes);
    // Example: await updateHeroSection(heroes);
  };

  return (
    <div className="bg-white w-full min-h-screen py-12">
      <div className="max-w-3xl bg-white mx-auto px-4 space-y-8">
        <h3 className="text-2xl font-bold text-black mb-4">Update Hero Section</h3>
        {heroes.map((hero, index) => (
          <div key={index} className="space-y-4 border p-4 rounded-xl shadow">
            <div>
              <label className="block font-medium mb-1">Image {index + 1}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files?.[0] || null)}
              />
              {hero.image && (
                <img src={hero.image} alt={`Hero ${index + 1}`} className="mt-2 w-full rounded-md max-h-64 object-cover" />
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Content</label>
              <textarea
                className="w-full border rounded p-2"
                value={hero.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default General;
