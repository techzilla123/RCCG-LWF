import React from 'react';
import SideBar from '@/components/Admin/dashboard/settings/preferences/Sidebar';
import TopNav from '@/components/Admin/dashboard/settings/preferences/TopNav';
import PreferencesContent from '@/components/Admin/dashboard/settings/preferences/PreferencesContent';

function AdminSettingsPreferences() {
  return (
    <div className="flex flex-wrap justify-center bg-neutral-100 min-h-[832px]">
      <SideBar />
      <div className="flex flex-col flex-1 shrink py-4 pr-4 pl-2 shadow-sm basis-0 min-w-[240px] max-md:max-w-full">
        <TopNav />
        <PreferencesContent />
      </div>
    </div>
  );
}

export default AdminSettingsPreferences;