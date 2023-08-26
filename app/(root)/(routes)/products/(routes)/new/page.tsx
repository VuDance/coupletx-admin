import React from "react";
import BackButton from "@/app/components/BackButton";
import Container from "../components/Container";
import prisma from "@/lib/prismadb";

const Page = async () => {
  const subCategory = await prisma.subCategory.findMany();

  return (
    <div className="p-3 w-4/5">
      <BackButton href="/products" label="Thêm sản phẩm" />
      <Container subCategory={subCategory} />
    </div>
  );
};

export default Page;
