"use client";
import * as React from "react";
import { BackButton } from "./BackButton";
import { ImageGallery } from "./ImageGallery";
import { ProductInfo } from "./ProductInfo";
import { PurchaseOptions } from "./PurchaseOptions";
import { ProductDetails } from "./ProductDetails";
import { ShippingInfo } from "./ShippingInfo";
import { ActionButtons } from "./ActionButtons";
import type { UploadedFile } from "../ProductsAddOne/MediaUpload"; // <-- add this line

type PreviewNewProps = {
  onPrevious: () => void;
  onCancel: () => void;
  uploadedFiles: UploadedFile[];
};



export const PreviewNew = ({ onPrevious, onCancel, uploadedFiles }: PreviewNewProps) => {
const [description, setDescription] = React.useState("");

React.useEffect(() => {
  const savedDescription = localStorage.getItem("description");
  if (savedDescription) {
    setDescription(savedDescription);
  }
}, []);


  
  return (
    <main className="overflow-hidden relative p-10 max-w-screen-sm bg-white rounded-2xl max-md:px-5">
      <header className="flex z-0 flex-col justify-center w-full">
      <BackButton onPrevious={onPrevious} />
        <h1 className="text-3xl font-semibold text-black leading-[40px]">
          Preview
        </h1>
      </header>

      <div className="z-0 mt-6 w-full">
        <ImageGallery />

        <article className="mt-6 w-full rounded-lg">
          <ProductInfo />

          <section className="overflow-hidden pt-4 mt-6 w-full border-t border-solid border-t-[color:var(--colour-stroke-default,#D5D5D5)]">
            <div className="flex flex-wrap justify-between items-center w-full">
              <h2 className="text-base font-semibold text-black leading-[20px]">
                Description
              </h2>
              {/* <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/9427faf66673e4569f04d609029152f1e6030a8b?placeholderIfAbsent=true"
                  alt="Toggle description"
                  className="object-contain self-stretch my-auto w-5 aspect-square"
                />
              </span> */}
            </div>
            <p className="mt-4 text-base tracking-normal leading-6 text-neutral-500">
              {/* <strong>Material:</strong> Premium Vinyl Material, Waterproof and Weatherproof,
              Strong Adhesive, Easy to Apply, Customizable Design, Residue Free Removal,
              Multiple Font and Color Options, Perfect for Balloons and Gifts, Versatile Use,
              Sleek and Professional Finish, Handcrafted Precision, Long Lasting Quality,
              Eco Friendly */}  {description || "No description available."}
            </p>
          </section>

          <PurchaseOptions />

          <div className="flex gap-2 items-center mt-6 w-full">
            <button className="flex flex-wrap flex-1 shrink gap-2 justify-center items-center self-stretch my-auto w-full h-14 basis-0 bg-[#EAEAEA] min-h-14 min-w-60 rounded-[50px]">
              <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/5b0bf44e7babacdd6dee65b220bba89df76116e0?placeholderIfAbsent=true"
                  alt="Cart icon"
                  className="object-contain self-stretch my-auto w-5 aspect-square"
                />
              </span>
              <span className="text-base font-medium text-center leading-[24px] text-stone-300">
                Add to cart
              </span>
            </button>
          </div>

          <ProductDetails />
          <ShippingInfo />
        </article>
      </div>

      <ActionButtons  onCancel={onCancel} uploadedFiles={uploadedFiles}/>

      <button
        className="flex absolute top-0 right-0 z-0 gap-2 justify-center items-center pt-16 pb-8 w-14 h-14 rounded-lg aspect-[1/1] bg-[rgba(0,0,0,0.00)] min-h-14"
        aria-label="Close preview"
      >
        <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-10">
          <span className="flex self-stretch my-auto w-10 min-h-10" />
        </span>
      </button>
    </main>
  );
};

export default PreviewNew;