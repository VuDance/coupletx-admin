"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MainContainer from "./MainContainer";
import SideContainer from "./SideContainer";
import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import createProduct from "@/app/common/function/createProduct";
import { toast } from "react-hot-toast";
import updateProduct from "@/app/common/function/updateProduct";

type ProductVariantType = {
  color: string;
  quantity: string;
  size: [];
  images: [];
  product_variant_name: string;
  price: "";
  isChecked: boolean;
};

interface ContainerProps {
  subCategory: any[];
  data?: any;
  error?: string;
  update?: boolean;
  productId?: number;
}

const Container: React.FC<ContainerProps> = ({
  subCategory,
  data,
  error,
  update,
  productId,
}) => {
  const [loading, setLoading] = useState(false);
  const session: any = useSession();
  const methods = useForm({
    defaultValues: {
      product_name: data ? data.product_name : "",
      slug: data ? data.slug : "",
      description: data ? data.description : "",
      preference: data ? data.product_references : "",

      minPrice: data ? String(data.minPrice) : "",
      maxPrice: data ? String(data.maxPrice) : "",
      quantity: data ? String(data.quantity) : "",
      productVariant: data
        ? data.productVariants
        : ([] as unknown as ProductVariantType[]),
      subCategory: [],
      active: data ? data.active : "Đang hoạt động",
    },
  });
  const onSubmit = async (data: any) => {
    if (
      data.product_name === "" ||
      data.slug === "" ||
      data.description === "" ||
      data.preference === "" ||
      data.quantity === ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (
      data.maxPrice === "" ||
      data.minPrice === "" ||
      parseFloat(data.minPrice) > parseFloat(data.maxPrice)
    ) {
      toast.error("Giá dao động không hợp lệ");
      return;
    }

    if (data.productVariant.length > 0) {
      let sum = 0;
      for (var i = 0; i < data.productVariant.length; i++) {
        sum += parseFloat(data.productVariant[i].price);
      }
      if (sum > data.maxPrice) {
        toast.error("Số lượng biến thể lớn hơn tổng số lượng sản phẩm");
        return;
      }
    }
    try {
      setLoading(true);
      let res = null;
      if (update) {
        res = await updateProduct({
          productId,
          ...data,
          token: session.data.accessToken,
        });
      } else {
        res = await createProduct({
          ...data,
          token: session.data.accessToken,
        });
      }
      toast.success(res.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (error && error.length > 0) {
      if (error === "Token has expired") {
        signOut();
        toast.error(error);
      } else {
        toast.error(error);
      }
    }
  });

  return (
    <div className="flex items-start w-[100%] mt-3 pl-8 pr-8 gap-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-3 w-full items-start">
            <MainContainer control={methods.control} />
            <SideContainer subCategory={subCategory} />
          </div>
          <div className="w-full flex justify-end mt-3 items-end">
            <Button
              disabled={loading}
              color="success"
              className=" bg-green-600 normal-case"
              variant="contained"
              type="submit"
            >
              Lưu
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Container;
