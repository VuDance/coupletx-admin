import React from "react";

const page = async ({ searchParams }: any) => {
  const res = await fetch(
    `${process.env.MY_URL}/api/user/verifyemail?token=${
      searchParams.token || ""
    }`,
    {
      mode: "cors",
      cache: "no-store",
      method: "PUT",
    }
  );
  const data = await res.json();
  return <div>{data.message}</div>;
};

export default page;
