import Container from "@/app/components/Container";
import React from "react";

const Page = async ({ searchParams }: any) => {
  const res = await fetch(
    `${process.env.MY_URL}/api/collections/find?filter=${
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
        type="collections"
        rows={data.collections}
        textBtn="Tạo bộ sưu tập"
        title="Bộ sưu tập"
      />
    </div>
  );
};

export default Page;
