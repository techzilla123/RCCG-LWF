"use client";
import * as React from "react";

export const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = React.useState("https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/901a9ae2b1f6ac02f9bdb8fa4f4ad6f0b7ff6f27?placeholderIfAbsent=true");

  const thumbnails = ["https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/eb6faa61a8c2d1212bc2c8edb1ec3086254695df?placeholderIfAbsent=true", "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/d11fd2ae5a847ea7c569a5e84f189d653f1d39c5?placeholderIfAbsent=true", "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/2270196a407a950f0063335f61c2984ea89993b8?placeholderIfAbsent=true", "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true"];

  return (
    <section className="flex flex-col justify-center w-full min-h-[559px]">
      <div className="flex flex-1 gap-6 size-full">
        <img
          src={selectedImage}
          alt="Product preview"
          className="object-contain flex-1 shrink w-full aspect-[1.4] basis-0 min-w-60"
          onClick={() => {/* Handle full screen view */}}
        />
      </div>
      <p className="text-base text-black leading-[24px]">
        Click to view full screen
      </p>
      <div className="flex overflow-hidden overflow-x-auto gap-4 mt-2 w-full min-h-[120px]">
        {thumbnails.map((url, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(url)}
            className="flex-none"
          >
            <img
              src={url}
              alt={`Product thumbnail ${index + 1}`}
              className="object-contain flex-1 shrink aspect-[1.67] basis-0 max-w-60 min-w-[200px] w-[200px]"
            />
          </button>
        ))}
      </div>
    </section>
  );
};