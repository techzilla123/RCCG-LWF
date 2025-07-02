"use client";
import React from "react";
import { SecuritySection } from "./SecuritySection";
import { FaGoogle, FaFacebook, FaXTwitter } from "react-icons/fa6"; // importing social icons

interface SocialAccountProps {
  icon: React.ReactNode;
  isConnected?: boolean;
  email?: string;
  platform: string;
  onDisconnect?: () => void;
}

const SocialAccount: React.FC<SocialAccountProps> = ({
  icon,
  isConnected = false,
  email,
  platform,
  onDisconnect,
}) => {
  return (
    <div className="flex items-center gap-4 w-full mt-5">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
        {icon}
      </div>

      <div className="flex flex-col flex-1">
        {isConnected ? (
          <>
            <p className="text-base font-semibold text-black">
              {platform} account connected:
            </p>
            <span className="text-blue-600 underline text-sm">{email}</span>
          </>
        ) : (
          <p className="text-base text-black underline">
            Connect {platform} account
          </p>
        )}
      </div>

      {isConnected && onDisconnect && (
        <button
          onClick={onDisconnect}
          className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          title="Disconnect"
        >
          <span className="text-lg font-bold text-gray-500">×</span>
        </button>
      )}
    </div>
  );
};

export const ThirdPartyAccounts: React.FC = () => {
  return (
    <SecuritySection
      title="Third-party accounts"
      description="Connect your third-party accounts to your Party Place profile to sign in and check out faster. Once connected, you can always disconnect them here."
      className="mt-10"
    >
      <SocialAccount
        icon={<FaGoogle className="w-6 h-6 text-[#DB4437]" />}
        isConnected={true}
        email="johndoe@gmail.com"
        platform="Google"
        onDisconnect={() => console.log("Disconnected Google")}
      />
      <SocialAccount
        icon={<FaFacebook className="w-6 h-6 text-[#1877F2]" />}
        platform="Facebook"
      />
      <SocialAccount
        icon={<FaXTwitter className="w-6 h-6 text-black" />}
        platform="X"
      />
    </SecuritySection>
  );
};
