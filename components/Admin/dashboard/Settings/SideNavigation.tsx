import React from "react";

export const SideNavigation = () => {
  return (
    <nav className="p-4 bg-white min-h-screen w-[200px]"> 
      <div className="flex gap-4 items-center pr-24 w-full max-md:pr-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/2edaecb760d5ecfabe8b85b71f478b16584a22ac?placeholderIfAbsent=true"
          alt="Company Logo"
          className="object-contain self-stretch my-auto h-14 aspect-[74.48/55.86] w-[74px]"
        />
      </div>
      <div className="overflow-hidden flex-1 mt-4 w-full">
        <hr className="h-px bg-gray-200 border-0" />

        <ul className="mt-3 space-y-3">
          <li>
            <a
              href="/admin-dashboard"
              className="flex gap-6 w-full rounded-lg  min-h-10"
            >
              <div className="flex flex-1 gap-2 items-center px-4">
                <img src="/Vector.png" alt="" className="w-4 h-4" />
                <span className="text-sm leading-6 text-black">Home</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/admin-customer" className="flex gap-6 w-full rounded-lg min-h-10">
              <div className="flex flex-1 gap-2 items-center px-4">
                <img src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/144e28e46f6209c17c0e973c51ca3587cd77202e?placeholderIfAbsent=true" alt="" className="w-4 h-4" />
                <span className="text-sm leading-6 text-black">Customers</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/admin-products" className="flex gap-6 w-full rounded-lg min-h-10">
              <div className="flex flex-1 gap-2 items-center px-4">
                <img src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/3d87e60d6085de2008138e5f399c9e9588d93d63?placeholderIfAbsent=true" alt="" className="w-4 h-4" />
                <span className="text-sm leading-6 text-black">Products</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/admin-orders" className="flex gap-6 w-full rounded-lg min-h-10">
              <div className="flex flex-1 gap-2 items-center px-4">
                <img src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/9a9a48a7fc47b76948611ed5e629faec656d6cfb?placeholderIfAbsent=true" alt="" className="w-4 h-4" />
                <div className="flex gap-0.5 items-center">
                  <span className="text-sm leading-6 text-black">Orders</span>
                  <span className="px-1 text-xs font-medium leading-3 text-white bg-rose-600 rounded-[37.5px]">
                    3
                  </span>
                </div>
              </div>
            </a>
          </li>
        </ul>

        <hr className="my-3 h-px bg-gray-200 border-0" />

        <ul className="mt-3">
          <li>
            <a href="/admin-settings" className="flex gap-6 w-full  bg-stone-200 rounded-lg min-h-10">
              <div className="flex flex-1 gap-2 items-center px-4">
                <img src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/74328686e0d9954b1ebfee1acaecbaddee1fb034?placeholderIfAbsent=true" alt="" className="w-4 h-4" />
                <span className="text-sm leading-6 text-black">Settings</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
