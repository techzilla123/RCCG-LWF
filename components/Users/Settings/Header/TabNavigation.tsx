"use client";
import * as React from "react";
import { Tab } from "./Tab";
import Content from "../Content";
import { Security } from "../Security";
import Billing from "../Billing";
import Notification from "../Notification";
import General from "../General";

const TABS = [
  "Profile",
  "Security",
  "Payments",
  "Notifications",
  "Preferences",
];

export const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(TABS[0]);

  return (
    <div>
      {/* Responsive scrollable tab list */}
      <nav
        className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-6 w-full px-4"
        role="tablist"
        aria-label="Settings navigation"
      >
        {TABS.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </nav>

      {/* Tab Content */}
      <div className="mt-6 px-4">
        {activeTab === "Profile" && <div id="profile-panel"><Content /></div>}
        {activeTab === "Security" && <div id="security-panel"><Security /></div>}
        {activeTab === "Payments" && <div id="payments-panel"><Billing /></div>}
        {activeTab === "Notifications" && <div id="notifications-panel"><Notification /></div>}
        {activeTab === "Preferences" && <div id="preferences-panel"><General /></div>}
      </div>
    </div>
  );
};
