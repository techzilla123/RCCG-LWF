import React from 'react';
import SuccessModal from '@/components/Admin/register/verify/success/SuccessModal';


function AdminAuthSignupSuccess() {
  return (
    <div className="flex overflow-hidden relative flex-col bg-white"
    >
      <main className="flex z-0 flex-col justify-center items-center self-center px-32 py-52 pt-24 pb-6 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:py-24 max-md:max-w-full"
      >
        <SuccessModal />
      </main>
      
    </div>
  );
}

export default AdminAuthSignupSuccess;