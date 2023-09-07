import BackButton from "@/app/components/BackButton";
import React from "react";
import Container from "../../components/Container";
import getCategories from "@/app/common/function/getCategories";

const page = async () => {
  const categories = await getCategories({ collectionId: null });
  console.log(categories);
  return (
    <div className="p-3 w-4/5">
      <BackButton href="/collections" label="Thêm bộ sưu tập" />
      <Container categories={categories || []} action="create" />
    </div>
  );
};

export default page;
