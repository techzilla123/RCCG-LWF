import React from 'react';

function ContactFormSection() {
  return (
    <section data-layername="ctaAction" className="flex z-0 gap-2.5 justify-center items-center px-32 py-20 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div data-layername="content" className="flex flex-col self-stretch my-auto min-w-[240px] w-[605px]">
        <div data-layername="headingAndSupportingText" className="flex flex-col justify-center items-center w-full max-md:max-w-full">
          <h2 data-layername="heading" className="text-4xl font-semibold tracking-tighter leading-none" style={{ color: '#005E1E' }}>
            Contact Us
          </h2>
          <p data-layername="supportingText" className="mt-1 text-xl text-neutral-500 max-md:max-w-full">
            Our friendly team would love to hear from you.
          </p>
        </div>
        <form data-layername="form" className="flex flex-col mt-10 w-full max-md:max-w-full">
          <div data-layername="formFields" className="flex flex-col w-full max-md:max-w-full">
  <div data-layername="row" className="flex flex-wrap gap-8 items-start w-full text-base max-md:max-w-full">
    <div data-layername="input" className="flex flex-col flex-1 shrink basis-0 min-h-[111px] min-w-[240px]">
      <label htmlFor="fullName" data-layername="text" className="gap-2.5 self-start text-neutral-500">
        Full Name
      </label>
      <div data-layername="inputField" className="flex gap-3 items-center px-4 py-3 mt-2 w-full h-10 bg-white rounded-lg border border-solid border-neutral-500 min-h-[40px] text-zinc-300">
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="John Doe"
          className="flex-1 shrink self-stretch my-auto w-full min-w-[240px] bg-transparent outline-none"
        />
      </div>
    </div>
    <div data-layername="input" className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-h-[111px] min-w-[240px]">
      <label htmlFor="email" data-layername="text" className="gap-2.5 self-start text-neutral-500">
        Email
      </label>
      <div data-layername="inputField" className="flex gap-3 items-center px-4 py-3 mt-2 w-full h-10 bg-white rounded-lg border border-solid border-neutral-500 min-h-[40px] text-zinc-300">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="johndoe@email.com"
          className="flex-1 shrink self-stretch my-auto w-full min-w-[240px] bg-transparent outline-none"
        />
      </div>
    </div>
  </div>
  <div data-layername="textareaInputField" className="flex flex-col w-full text-xl font-medium leading-none whitespace-nowrap min-h-[187px] text-neutral-500 max-md:max-w-full">
    <div data-layername="textareaInputFieldBase" className="flex flex-col flex-1 w-full max-md:max-w-full">
      <div data-layername="inputWithLabel" className="flex flex-col flex-1 w-full max-md:max-w-full">
        <label htmlFor="message" data-layername="label">Message</label>
        <textarea
          id="message"
          name="message"
          className="flex-1 gap-2 py-2.5 mt-4 w-full bg-white rounded-2xl border border-solid shadow-sm border-neutral-500 min-h-[151px] max-md:max-w-full resize-none outline-none p-4"
        ></textarea>
      </div>
    </div>
  </div>
  <div data-layername="actions" className="flex flex-col self-end mt-6 max-w-full text-sm font-medium text-center text-white w-[286px]">
    <button
      type="submit"
      data-layername="ctaButton"
      className="overflow-hidden gap-2 self-stretch p-4 w-full h-12 border border-solid border-black border-opacity-0 min-h-[48px] rounded-[1000px]"
      style={{ background: '#08AA3B' }}
    >
      Send Message
    </button>
  </div>
</div>
</form>
</div>
</section>
);
}

export default ContactFormSection;