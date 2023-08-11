"use client";

import { User } from "@prisma/client";
import React, { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

const Navbar = () => {
  const currentUser: any = useSession();

  return (
    <div className=" z-10 fixed w-screen">
      <Header currentUser={currentUser.data?.user} />
      <SideBar />
    </div>
  );
};

export default Navbar;
