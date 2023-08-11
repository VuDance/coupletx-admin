import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import prisma from "@/lib/prismadb";
import Container from "@/app/components/Container";

const Page = async () => {
  const rows = await prisma.product.findMany();
  return (
    <div className=" w-[80%] p-3">
      <Container
        title="Sản phẩm"
        textBtn="Thêm sản phẩm"
        rows={rows}
        type="products"
      />
    </div>
  );
};

export default Page;
