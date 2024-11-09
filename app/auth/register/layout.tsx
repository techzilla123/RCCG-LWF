import type { Metadata } from "next";
import AuthFooter from "@/components/auth/AuthFooter";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <AuthFooter />
    </>
  );
}
