import React from "react";
import Container from "../components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const page = async ({ params }: any) => {
  const cookieStore: any = await getServerSession(authOptions);
  const res = await fetch(`${process.env.MY_URL}/api/posts/${params.slug}`, {
    mode: "cors",
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <Container
      type="update"
      data={data.post}
      blogId={params.blogId}
      session={cookieStore}
    />
  );
};

export default page;
