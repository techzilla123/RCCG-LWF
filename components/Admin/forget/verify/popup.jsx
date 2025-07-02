import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function TransactionModal({ shouldRedirect }) {
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (shouldRedirect) {
      // Redirect to /client/history/verify/success after a 3-second delay
      timer = setTimeout(() => {
        router.push("/auth/verify/reset"); // Navigate to the fixed path
      }, 3000);
    }

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [shouldRedirect, router]);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50"
      style={{ backdropFilter: "blur(5px)" }} // Optional blur effect
    >
      <section className="flex flex-col justify-center items-center px-8 py-10 bg-white rounded-2xl w-[90%] max-w-[500px] min-h-[250px] max-md:px-5 max-md:py-8 shadow-lg">
        {/* Loading Indicator */}
        <div className="flex gap-2.5 justify-center items-center mb-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a1c0fcb3748b3fead6d8aaa423d2bdc3a464d3a6aca8e5e6cc25509125c74f0?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
            alt="Loading indicator"
            className="object-contain w-12 h-12 animate-spin" // Added spin animation
          />
        </div>

        {/* Modal Text */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-2xl font-semibold text-green-900" style={{ color: "#005E1E" }}>
            Just a minute
          </h2>
          {/* <p className="mt-2 text-sm text-center text-neutral-500">
            Retrieving transaction history...
          </p> */}
        </div>
      </section>
    </div>
  );
}

export default TransactionModal;
