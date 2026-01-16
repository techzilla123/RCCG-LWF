// ContactInfo.tsx
import React from 'react';
import SocialIcons from './SocialIcons';

function ContactInfo() {
  return (
    <aside className="flex-1 mt-20 max-w-md">
      <div className="mb-10">
        <h3 className="mb-2 text-sm md:text-base font-medium opacity-70 text-stone-900">
          Address
        </h3>
        <address className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 uppercase not-italic">
           8485 Michael Talty Ave, 
          <br />
          Terrell, TX 75160, United States
        </address>
      </div>

      <div className="mb-10">
        <h3 className="mb-2 text-sm md:text-base font-medium opacity-70 text-stone-900">
          Contact Details
        </h3>
        <p className="mb-2 text-xl md:text-2xl font-bold text-gray-900 uppercase">
          <a href="tel:+14805550103" className="hover:text-gray-700 transition-colors">
            (480) 555-0103
          </a>
        </p>
       <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 uppercase">
  <a
    href="mailto:info@rccglivingwordforney.org"
    className="hover:text-gray-700 transition-colors"
  >
    info@rccglivingwordforney.org
  </a>
</p>

      </div>

      <div>
        <h3 className="mb-2 text-sm md:text-base font-medium opacity-70 text-stone-900">
          Find us here
        </h3>
        <SocialIcons />
      </div>
    </aside>
  );
}

export default ContactInfo;
