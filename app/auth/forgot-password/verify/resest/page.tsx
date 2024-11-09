import React from 'react';

import ResetPasswordForm from '@/components/Admin/forget/verify/reset/ResetPasswordForm';
import Footer from '@/components/Client/Footer';

function ResetPasswordPage() {
  return (
    <div className="flex overflow-hidden relative flex-col bg-white">
    
      <main className="flex z-0 flex-col justify-center items-center self-center px-32 pt-44 pb-28 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <ResetPasswordForm />
      </main>
      <Footer />
    </div>
  );
}

export default ResetPasswordPage;