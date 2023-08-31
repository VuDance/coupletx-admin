import React from "react";
import Container from "./components/Container";

const page = async ({ searchParams }: any) => {
  const res = await fetch(
    `${process.env.MY_URL}/api/blogs/find?filter=${searchParams.filter || ""}`,
    {
      mode: "cors",
      cache: "no-store",
    }
  );
  const rows = await res.json();

  return <Container rows={rows.blogs} textBtn="Thêm blog" title="Blogs" />;
};

export default page;
