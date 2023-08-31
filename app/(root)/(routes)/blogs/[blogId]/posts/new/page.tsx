import React from "react";
import Container from "../components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";

const page = async ({ params }: any) => {
  const cookieStore: any = await getServerSession(authOptions);
  return <Container blogId={params.blogId} session={cookieStore} />;
};

export default page;
