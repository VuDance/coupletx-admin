import Markdown from "@/app/components/input/Markdown";
import ProductTextField from "@/app/components/input/ProductTextField";
import React from "react";
import { useFormContext } from "react-hook-form";

const MainContainer = () => {
  const { control } = useFormContext();
  return (
    <div className="bg-[#fff] flex flex-col gap-2 rounded-lg p-3 shadow-md w-2/3">
      <ProductTextField
        label="Tiêu đề"
        id="name"
        placeholder="Ví dụ: Bộ sưu tập mùa hè,Siêu giảm giá,..."
      />
      <Markdown control={control} label="Mô tả" id="description" />
    </div>
  );
};

export default MainContainer;
