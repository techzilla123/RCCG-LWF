import React from 'react';
import Footer from '@/components/Client/Footer';

import AuthResetForm from '@/components/Admin/forget/AuthResetForm';

function AuthResetPage() {
  return (
    <main className="flex overflow-hidden relative flex-col bg-white">

      <section className="flex z-0 flex-col justify-center items-center self-center px-32 pt-44 pb-28 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <AuthResetForm />
      </section>
      <Footer />
    </main>
  );
}

export default AuthResetPage;