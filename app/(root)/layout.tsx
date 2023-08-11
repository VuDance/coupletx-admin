import React from "react";
import Navbar from "@/app/components/navbar/Navbar";
import getCurrentUser from "../common/function/getCurrentUser";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-[#f1f2f4]">
      <Toaster />

      <Navbar />
      <div className="flex justify-end pt-20">{children}</div>
    </div>
  );
};

export default RootLayout;
