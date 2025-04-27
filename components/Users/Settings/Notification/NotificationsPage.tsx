"use client";
import React, { useState } from "react";

interface NotificationSetting {
  title: string;
  description: string;
  category: "General" | "Updates";
  email: boolean;
  push: boolean;
}

const initialSettings: NotificationSetting[] = [
  {
    title: "Account activity",
    description: "Receive notification on account activity",
    category: "General",
    email: true,
    push: false,
  },
  {
    title: "Purchases & shipping",
    description: "Receive notifications on your billings, purchase and shipping status",
    category: "General",
    email: true,
    push: false,
  },
  {
    title: "Product activity",
    description: "Receive notification on newly added products, reviews and stock status on your favorite products",
    category: "General",
    email: true,
    push: true,
  },
  {
    title: "Updates & features",
    description: "Receive notifications on new features and updates",
    category: "Updates",
    email: true,
    push: true,
  },
  {
    title: "Promotions",
    description: "Receive notifications on sales and promotional offers",
    category: "Updates",
    email: true,
    push: true,
  },
];

export default function NotificationsPage() {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (index: number, type: "email" | "push") => {
    const updated = [...settings];
    updated[index][type] = !updated[index][type];
    setSettings(updated);
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);
    alert("Changes saved!");
  };

  return (
    <main className="flex flex-col w-full max-w-4xl px-6 py-10 mx-auto">
      <h3 className="text-xl font-bold mb-5" style={{color: "#000000"}}>Notifications</h3>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-50 text-gray-500 text-sm font-medium px-6 py-3">
          <span className="col-span-1">General</span>
          <span className="text-center">Email</span>
          <span className="text-center">Push</span>
        </div>

        {settings
          .filter((s) => s.category === "General")
          .map((setting, idx) => (
            <div
              key={setting.title}
              className="grid grid-cols-3 items-center px-6 py-4 border-t text-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium text-black">{setting.title}</span>
                <span className="text-gray-500">{setting.description}</span>
              </div>
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={setting.email}
                  onChange={() => handleToggle(idx, "email")}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={setting.push}
                  onChange={() => handleToggle(idx, "push")}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          ))}

        <div className="grid grid-cols-3 bg-gray-50 text-gray-500 text-sm font-medium px-6 py-3 border-t">
          <span className="col-span-1">Updates</span>
        </div>

        {settings
          .filter((s) => s.category === "Updates")
          .map((setting) => (
            <div
              key={setting.title}
              className="grid grid-cols-3 items-center px-6 py-4 border-t text-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium text-black">{setting.title}</span>
                <span className="text-gray-500">{setting.description}</span>
              </div>
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={setting.email}
                  onChange={() => handleToggle(settings.indexOf(setting), "email")}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={setting.push}
                  onChange={() => handleToggle(settings.indexOf(setting), "push")}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={handleSave}
        className="self-start mt-8 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all"
      >
        Save changes
      </button>
    </main>
  );
}
