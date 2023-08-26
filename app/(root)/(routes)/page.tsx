import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Container from "./components/Container";

const page = async () => {
  const cookieStore = await getServerSession(authOptions);
  let data: any = null;

  const res = await fetch(`${process.env.MY_URL}/api/dashboard/`, {
    mode: "cors",
    cache: "no-store",
    headers: {
      authorization: `${cookieStore?.accessToken}`,
    },
  }).then(async (response) => {
    data = await response.json();
  });

  return (
    <div className="w-[80%] p-3">
      <p className=" font-semibold text-2xl">Dashboard</p>
      <Container data={data} />
    </div>
  );
};

export default page;
