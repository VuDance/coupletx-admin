import React from "react";

import Container from "@/app/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const Page = async ({ searchParams }: any) => {
  const cookieStore = await getServerSession(authOptions);

  let err = "";

  const res: any = await fetch(
    `${process.env.MY_URL}/api/products/find?filter=${
      searchParams.filter || ""
    }`,
    {
      headers: {
        authorization: `${cookieStore?.accessToken}`,
      },
      mode: "cors",
      cache: "no-store",
    }
  );
  const rows = await res.json();
  if (rows.error) {
    err = rows.error;
  }
  return (
    <div className=" w-[80%] p-3">
      <Container
        title="Sản phẩm"
        textBtn="Thêm sản phẩm"
        rows={rows.products}
        type="products"
        error={err}
      />
    </div>
  );
};

export default Page;
