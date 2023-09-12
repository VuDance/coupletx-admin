import Container from "@/app/components/Container";
import React from "react";

const Page = async ({ searchParams }: any) => {
  const res = await fetch(
    `${process.env.MY_URL}/api/orders/getList?filter=${
      searchParams.filter || ""
    }`,
    {
      mode: "cors",
      cache: "no-store",
    }
  );
  const data = await res.json();
  return (
    <div className="w-[80%] p-3">
      <Container
        type="orders"
        rows={data.orders}
        textBtn="Tạo bộ sưu tập"
        title="Đơn đặt hàng"
        hideCreateButton={true}
      />
    </div>
  );
};

export default Page;
