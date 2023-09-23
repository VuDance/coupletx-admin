import React from "react";
import Navbar from "@/app/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-[#f1f2f4]">
      <Toaster />

      <Navbar />
      <div className="flex justify-end pt-20 min-h-screen">{children}</div>
    </div>
  );
};

export default RootLayout;
