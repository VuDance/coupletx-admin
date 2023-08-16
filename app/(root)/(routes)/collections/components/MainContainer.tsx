import ChipSelect from "@/app/components/input/ChipSelect";
import Markdown from "@/app/components/input/Markdown";
import ProductTextField from "@/app/components/input/ProductTextField";
import { Category } from "@prisma/client";
import React from "react";
import { useFormContext } from "react-hook-form";

interface MainContainerProps {
  categories: Category[];
}

const MainContainer: React.FC<MainContainerProps> = ({ categories }) => {
  const { control } = useFormContext();
  return (
    <div className="bg-[#fff] flex flex-col flex-1 gap-2 rounded-lg p-3 shadow-md w-2/3">
      <ProductTextField
        label="Tiêu đề"
        id="name"
        placeholder="Ví dụ: Bộ sưu tập mùa hè,Siêu giảm giá,..."
      />
      <Markdown control={control} label="Mô tả" id="description" />
      <ChipSelect data={categories} type="categories" label="Chọn danh mục" />
    </div>
  );
};

export default MainContainer;
