import React from 'react';

function SuccessModal() {
  return (
    <section className="flex relative flex-col justify-center px-14 py-14 max-w-full bg-white min-h-[400px] rounded-[32px] w-[600px] max-md:px-5"
    style={{marginTop:"-270px"}}>
  <div 
  className="flex z-10 gap-2.5 justify-center items-center self-center" 
  style={{ 
    width: '120px', 
    height: '120px', 
    marginTop: "0px"  // Adjust this based on the previous position
  }}
>
  <img
    loading="lazy"
    src="/success-0u6rqMvimp.png"
    alt="Success Icon"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    }}
  />
</div>


      <div className="flex z-0 flex-col pb-4 mt-4 w-full max-md:max-w-full">
        <h1 className="self-center text-3xl text-black">
          Sign-up Successful!
        </h1>
        <p className="mt-2 text-sm text-center text-neutral-500 max-md:max-w-full">
          Your account has been successfully created. <br />
          You will receive a notification when your account is <br /> fully setup and validated.
        </p>
      </div>
      <div className="flex z-0 flex-col self-center mt-4 text-sm font-medium text-center text-white whitespace-nowrap max-w-[400px] w-[400px]">
        <button className="overflow-hidden gap-2 self-stretch px-4 py-3 w-full h-10 bg-green-600 border border-solid border-black border-opacity-0 min-h-[40px] rounded-[1000px]"
        style={{background:"#08AA3B"}}>
          Finish
        </button>
      </div>
      <button aria-label="Close" className="flex absolute top-0 right-0 z-0 flex-col justify-center items-center p-6 w-16 max-md:px-5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cd6639a281fe0f88b695459898db8e1335a7bf20130cbd997142d371e8a9df7?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain w-full aspect-square" />
      </button>
    </section>
  );
}

export default SuccessModal;