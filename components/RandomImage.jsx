"use client"
import { useEffect, useState } from "react";

const images = [
  "/cropped-view-african-american-businesman-holding-mobile-phone-credit-card-while-paying-bill-cafe_273609-9166.jpg",
  "/paying-bills-concept-illustration_114360-22927.jpg","/pexels-tima-miroshnichenko-5198284(1).jpg"
];

export default function RandomImage() {
  const [imageSrc, setImageSrc] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageSrc(images[Math.floor(Math.random() * images.length)]);
    }, 600000); // Changes the image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <img
      src={imageSrc}
      alt="Payment concept illustration"
      className="flex z-0 flex-1 shrink bg-gray-200 basis-0 h-[482px] min-w-[240px] rounded-[40px] w-[500px] max-sm:hidden object-cover"
    />
  );
}
