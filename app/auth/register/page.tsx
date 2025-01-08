'use client'; // This line makes this a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import SocialAuthButton from '@/components/Admin/register/SocialAuthButton';
import InputField from '@/components/Admin/register/InputField';
import Button from '@/components/Admin/register/Button';

function SignUpPage() {
  const router = useRouter(); // Initialize the useRouter hook
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission

    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Prepare the payload
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Make the API call
      const response = await fetch(`${apiBaseUrl}/admin/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Handle the response
      if (response.ok) {
        localStorage.setItem('userEmail', formData.email);
        router.push('/auth/register/verify'); // Navigate to the verify page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred during signup.');
      }
    } catch (err) {
  console.error('Error:', err);
  setError('Failed to connect to the server.');
}
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
              <InputField
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
              <InputField
                label="Email/Phone"
                name="email"
                placeholder="Input email/phone"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              
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

              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}

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
