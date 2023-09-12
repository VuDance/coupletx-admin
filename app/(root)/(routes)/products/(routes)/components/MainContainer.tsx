"use client";

import ProductTextField from "@/app/components/input/ProductTextField";
import React from "react";
import Markdown from "../../../../../components/input/Markdown";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ProductVariant from "./ProductVariant";

interface ProductTextFieldProps {
  control: any;
}

const MainContainer: React.FC<ProductTextFieldProps> = ({ control }) => {
  return (
    <div className=" basis-2/3 flex flex-col gap-3">
      <div className="bg-[#fff] flex flex-col gap-2 rounded-lg p-3 shadow-md">
        <ProductTextField
          id="product_name"
          label="Tiêu đề"
          placeholder="Áo thun ngắn tay"
        />
        <ProductTextField id="slug" label="Slug" placeholder="Slug" slug />
        <Markdown control={control} id="description" label="Mô tả" />
        <Markdown control={control} id="preference" label="Tham khảo" />
      </div>

      <div className="bg-[#fff] shadow-md rounded-lg p-3">
        <p className=" font-semibold ">Giá dao động</p>
        <div className="flex pl-4 pr-4 items-center justify-between">
          <ProductTextField label="Từ" small id="minPrice" placeholder="VND" />
          <ArrowCircleRightIcon color="primary" />
          <ProductTextField label="Đến" small id="maxPrice" placeholder="VND" />
        </div>
      </div>
      <div className="bg-[#fff] shadow-md rounded-lg p-3">
        <p className=" font-semibold ">Kho hàng</p>
        <ProductTextField
          label="Số lượng"
          small
          type="number"
          id="quantity"
          placeholder="Số lượng"
        />
      </div>
      <div className="bg-[#fff] w-full shadow-md rounded-lg p-3">
        <p className=" font-semibold ">Mẫu mã</p>
        <ProductVariant />
      </div>
    </div>
  );
};

export default MainContainer;
