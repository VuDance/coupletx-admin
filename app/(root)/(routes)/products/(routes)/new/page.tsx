import React from "react";
import BackButton from "@/app/components/BackButton";
import Container from "../components/Container";
import prisma from "@/lib/prismadb";

const Page = async () => {
  const collections = await prisma.collections.findMany();

  return (
    <div className="p-3 w-4/5">
      <BackButton href="/products" label="Thêm sản phẩm" />
      <Container collections={collections} categories={[]} />
    </div>
  );
};

export default Page;
