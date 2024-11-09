import React from 'react';

import Footer from '@/components/Client/Footer';
import PaymentHistoryForm from '@/components/Client/history/PaymentHistoryForm';

function ClientHistoryFilled() {
  return (
    <div className="flex overflow-hidden relative flex-col bg-white"
    style={{marginTop:"-70px"}}>
     
      <main className="flex z-0 flex-col self-center px-32 pt-24 pb-6 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:max-w-full">
        <section className="flex flex-col flex-1 p-6 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
          <div className="flex gap-2.5 w-full min-h-[32px] max-md:max-w-full" />
          <PaymentHistoryForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ClientHistoryFilled;