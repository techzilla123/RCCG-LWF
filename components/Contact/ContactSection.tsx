// ContactSection.tsx
import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

function ContactSection() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 md:py-20 bg-neutral-50">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 max-w-6xl mx-auto">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}

export default ContactSection;
