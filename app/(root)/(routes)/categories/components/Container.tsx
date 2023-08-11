"use client";

import { Category, SubCategory } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import ListCategories from "./ListCategories";
import ListSubCategory from "./ListSubCategory";
import { Divider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

interface ContainerProps {
  data: Category[];
}

const Container: React.FC<ContainerProps> = ({ data }) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryId, setCategoryId] = useState<any>();
  const param = useSearchParams();

  const handleChangeSubCategories = useCallback((list: SubCategory[]) => {
    setSubCategories(list);
  }, []);
  useEffect(() => {
    const subCate: any = data.find(
      (item: any) => item.slug === param?.get("category")
    );
    if (subCate) {
      setCategoryId(subCate.id);
      setSubCategories(subCate.subcategories);
    }
  }, [data, param]);

  return (
    <div className="flex p-2 m-2 w-full bg-white rounded-lg justify-between">
      <Toaster />
      <ListCategories data={data} onChange={handleChangeSubCategories} />
      <Divider orientation="vertical" flexItem />
      <ListSubCategory category_id={categoryId} data={subCategories} />
    </div>
  );
};

export default Container;
