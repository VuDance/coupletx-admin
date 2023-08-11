import BackButton from "@/app/components/BackButton";
import React from "react";
import Container from "../../components/Container";

const page = () => {
  return (
    <div className="p-3 w-4/5">
      <BackButton href="/collections" label="Thêm bộ sưu tập" />
      <Container action="create" />
    </div>
  );
};

export default page;
