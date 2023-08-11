import BackButton from "@/app/components/BackButton";
import React from "react";
import Container from "../../components/Container";

const Page = async (params: any) => {
  const { collectionId } = params.params;
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
      <Container data={convertData} action="edit" />
    </div>
  );
};

export default Page;
