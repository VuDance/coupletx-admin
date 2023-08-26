import BackButton from "@/app/components/BackButton";
import React from "react";
import Container from "../../components/Container";
import getCategories from "@/app/common/function/getCategories";

const Page = async (params: any) => {
  const { collectionId } = params.params;
  const categories = await getCategories({
    collectionId: parseInt(collectionId),
  });

  const res = await fetch(
    `${process.env.MY_URL}/api/collections/${collectionId}`,
    { mode: "cors", cache: "no-store" }
  );
  const data = await res.json();
  const convertData = {
    ...data.collection,
    collectionId,
  };
  return (
    <div className="p-3 w-4/5">
      <BackButton href="/collections" label="Home page" />
      <Container
        categories={categories || []}
        data={convertData}
        action="edit"
      />
    </div>
  );
};

export default Page;
