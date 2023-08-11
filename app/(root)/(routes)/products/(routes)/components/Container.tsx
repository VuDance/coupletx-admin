"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MainContainer from "./MainContainer";
import SideContainer from "./SideContainer";
import { Button } from "@mui/material";

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
  collections: any[];
  categories: any[];
}

const Container: React.FC<ContainerProps> = ({ collections, categories }) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      product_name: "",
      slug: "",
      description: "",
      preference: "",

      minPrice: "",
      maxPrice: "",
      quantity: "",
      productVariant: [] as unknown as ProductVariantType[],
    },
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex items-start w-[100%] mt-3 pl-8 pr-8 gap-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-3 w-full items-start">
            <MainContainer control={methods.control} />
            <SideContainer categories={categories} collections={collections} />
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
