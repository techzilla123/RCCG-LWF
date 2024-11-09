import React from 'react';
import TopNav from './TopNav';
import PaymentForm from './PaymentForm';
import Footer from './Footer';

function ClientPaymentPage() {
  return (
    <div className="flex overflow-hidden relative flex-col bg-white">
      <TopNav />
      <main className="flex z-0 flex-col self-center w-full max-md:max-w-full">
        <section className="flex flex-col px-32 pt-24 pb-6 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:max-w-full">
          <PaymentForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ClientPaymentPage;