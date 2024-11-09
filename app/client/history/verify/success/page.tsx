import React from 'react';

import Footer from '@/components/Client/Footer';
import ClientHistoryTable from '@/components/Client/history/verify/success/ClientHistoryTable';

function ClientHistoryPage() {
  return (
    <div data-layername="clientHistory" className="flex overflow-hidden relative flex-col bg-white"
    style={{marginTop:"-70px"}}>
      
      <main className="flex z-0 flex-col self-center px-32 pt-24 pb-6 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:max-w-full">
        <ClientHistoryTable />
      </main>
      <Footer />
    </div>
  );
}

export default ClientHistoryPage;