"use client";

import { Category, SubCategory } from "@prisma/client";
import React, { useCallback, useState } from "react";
import ListCategories from "./ListCategories";
import ListSubCategory from "./ListSubCategory";
import { Divider } from "@mui/material";

interface ContainerProps {
  data: Category[];
}

const Container: React.FC<ContainerProps> = ({ data }) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const handleChangeSubCategories = useCallback((list: SubCategory[]) => {
    setSubCategories(list);
  }, []);
  return (
    <div className="flex p-2 m-2 w-full bg-white rounded-lg justify-between">
      <ListCategories data={data} onChange={handleChangeSubCategories} />
      <Divider orientation="vertical" flexItem />
      <ListSubCategory />
    </div>
  );
};

export default Container;
