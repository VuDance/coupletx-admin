import React from "react";
import Container from "./components/Container";

const page = async () => {
  const res = await fetch(`${process.env.MY_URL}/api/categories/find`, {
    mode: "cors",
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="p-3 w-4/5">
      <p className=" text-xl font-semibold">Danh mục sản phẩm</p>
      <Container data={data.categories} />
    </div>
  );
};

export default page;
