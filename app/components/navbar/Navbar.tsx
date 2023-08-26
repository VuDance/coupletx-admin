import { User } from "@prisma/client";
import React, { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { useRouter } from "next/navigation";

const Navbar = async () => {
  const currentUser = await getServerSession(authOptions);

  return (
    <div className=" z-10 fixed w-screen">
      <Header currentUser={currentUser?.user} />
      <SideBar />
    </div>
  );
};

export default Navbar;
