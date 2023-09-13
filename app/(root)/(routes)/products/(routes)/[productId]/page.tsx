import BackButton from "@/app/components/BackButton";
import React from "react";
import Container from "../components/Container";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const page = async (params: any) => {
  const subCategory = await prisma.subCategory.findMany();
  const { productId } = params.params;
  const cookieStore = await getServerSession(authOptions);

  let err = "";

  const res: any = await fetch(
    `${process.env.MY_URL}/api/products/${productId}`,
    {
      headers: {
        authorization: `${cookieStore?.accessToken}`,
      },
      mode: "cors",
    }
  );
  const data = await res.json();
  if (data.error) {
    err = data.error;
  }
  const convertData = data.products.productVariants.map((prdv: any) => ({
    ...prdv,
    images: prdv.images.map((img: any) => img.imageUrl),
  }));
  data.products.productVariants = convertData;

  return (
    <div className="p-3 w-4/5">
      <BackButton href="/products" label="Thêm sản phẩm" />
      <Container
        productId={productId}
        update={true}
        error={err}
        data={data.products}
        subCategory={subCategory}
      />
    </div>
  );
};

export default page;
