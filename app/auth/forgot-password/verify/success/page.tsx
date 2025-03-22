'use client';  // Add this line at the top

import React, { useState } from 'react';
import SuccessModal from '@/components/Admin/forget/verify/success/SuccessModal';

function AdminAuthSignupSuccess() {
  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Function to handle modal close
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col   bg-neutral-100 min-h-screen">
      <main className="flex flex-col justify-center items-center px-8 py-12 w-full bg-neutral-100 min-h-[800px] max-w-screen-lg mx-auto">
        {isModalOpen && <SuccessModal onClose={handleClose} />}
      </main>
    </div>
  );
}

export default AdminAuthSignupSuccess;
