import React from 'react';
import LoginForm from '@/components/Admin/login/LoginForm';
import Footer from '@/components/Client/Footer';


function AdminAuthLogin() {
  return (
    <div className="flex overflow-hidden relative flex-col bg-white"
    style={{marginTop:"-120px"}}>
      
      <main className="flex z-0 flex-col justify-center items-center self-center px-32 py-40 pt-24 pb-6 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <LoginForm />
      
      </main>
  <Footer/>
    </div>
  );
}

export default AdminAuthLogin;