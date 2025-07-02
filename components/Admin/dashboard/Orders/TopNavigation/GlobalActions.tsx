"use client";
import * as React from "react";
import { IconButton } from "./IconButton";
import { Divider } from "./Divider";
import { ProfileButton } from "./ProfileButton";

export const GlobalActions: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <IconButton icon="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/10e3b8a81a43cfb18a9e092a4f2a8a93d7ae086f?placeholderIfAbsent=true" />
      <Divider />
      <IconButton icon="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/403cc0c4dfc7d1643a6d9c7286ec9c2041de5ed3?placeholderIfAbsent=true" />
      <ProfileButton />
    </div>
  );
};
