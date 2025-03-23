import React from 'react';
import SideBar from '@/components/Admin/dashboard/settings/Sidebar';
import TopNav from '@/components/Admin/dashboard/settings/TopNav';
import ProfileSettings from '@/components/Admin/dashboard/settings/ProfileSettings';

function AdminSettingsProfile() {
  
  return (
    <div data-layername="adminSettingsProfile" className="flex flex-wrap justify-center bg-neutral-100 min-h-[832px]">
      <SideBar />
      <div data-layername="body" className="flex flex-col flex-1 shrink py-4 pr-4 pl-2 shadow-sm basis-0 min-w-[240px] max-md:max-w-full">
        <TopNav />
        <div data-layername="divider" className="flex gap-3 items-center px-0 py-0.5 w-full bg-white border-t border-solid  border-t-opacity-0 max-md:max-w-full">
        </div>
        <main data-layername="main" className="flex overflow-hidden flex-col flex-1 justify-center px-32 py-0 w-full bg-white max-md:px-5 max-md:max-w-full">
          <ProfileSettings />
        </main>
      </div>
    </div>
  );
}

export default AdminSettingsProfile;