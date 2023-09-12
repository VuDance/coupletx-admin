import Container from "@/app/components/Container";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async ({ searchParams }: any) => {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.MY_URL}/api/customers/getList?filter=${
      searchParams.filter || ""
    }`,

    {
      mode: "cors",
      cache: "no-store",
      headers: {
        authorization: `${session?.accessToken}`,
      },
    }
  );
  const data = await res.json();
  return (
    <div className="w-[80%] p-3">
      <Container
        type="users"
        rows={data.customers}
        textBtn="Danh sách khách hàng"
        title="Danh sách khách hàng"
        hideCreateButton={true}
      />
    </div>
  );
};

export default Page;
