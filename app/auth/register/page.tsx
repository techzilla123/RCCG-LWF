'use client'; // This line makes this a client component

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import SocialAuthButton from '@/components/Admin/register/SocialAuthButton';
import InputField from '@/components/Admin/register/InputField';
import Button from '@/components/Admin/register/Button';

function SignUpPage() {
  const router = useRouter(); // Initialize the useRouter hook

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    router.push('/auth/register/verify'); // Navigate to the verify page
  };

  return (
    <main
      className="flex overflow-hidden relative flex-col bg-white"
      style={{ marginTop: '-82px' }}
    >
      <section className="flex z-0 flex-col items-center self-center px-32 pt-32 pb-6 pb-12 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:pt-24 max-md:max-w-full">
        <div className="flex flex-col justify-center items-center px-10 py-6 max-w-full bg-white rounded-2xl w-[464px] max-md:px-5">
          <div className="flex flex-col justify-center w-full rounded-xl">
            <header className="flex flex-col items-start text-center">
              <h1
                className="text-4xl font-semibold text-green-900"
                style={{ color: '#005E1E' }}
              >
                Sign up
              </h1>
              <p className="mt-3 text-base text-neutral-500">
                No signup/log in required, just verify your email/phone
              </p>
            </header>
            <div className="flex flex-col mt-6 w-full text-sm">
              <SocialAuthButton />
              <div className="flex gap-2 items-center mt-2.5 w-full leading-none text-center whitespace-nowrap text-neutral-500">
                <div className="flex flex-1 shrink self-stretch my-auto h-px basis-0 bg-zinc-300 w-[174px]" />
                <span className="self-stretch my-auto">OR</span>
                <div className="flex flex-1 shrink self-stretch my-auto h-px basis-0 bg-zinc-300 w-[174px]" />
              </div>
            </div>
            <form className="flex flex-col mt-6 w-full" onSubmit={handleSubmit}>
              <InputField label="Full Name" placeholder="John Doe" />
              <InputField label="Email/Phone" placeholder="Input email/phone" />
              <InputField label="Password" placeholder="Enter your password" type="password" />
              <InputField label="Confirm Password" placeholder="Confirm Password" type="password" />
              
              {/* Checkbox Input */}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="agree"
                  style={{ accentColor: '#08AA3B' }} // Green checkbox color
                />
                <label htmlFor="agree" className="ml-2 text-sm text-neutral-500">
                  Agree to Terms of Service
                </label>
              </div>

              <div
                className="flex flex-col mt-6 w-full text-sm font-medium text-center text-white rounded-[1000px]"
                style={{ background: '#08AA3B' }}
              >
                <Button type="submit">Create Account</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignUpPage;
