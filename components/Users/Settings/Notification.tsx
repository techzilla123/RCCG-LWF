"use client";
import React from "react";
import  NotificationsPage   from "./Notification/NotificationsPage";


export const Security: React.FC = () => {
  return (
    <div className="bg-white w-full min-h-screen ">
      <div className="max-w-3xl bg-white mx-auto">
       <NotificationsPage />
      
      </div>
    </div>
  );
};

export default Security;
