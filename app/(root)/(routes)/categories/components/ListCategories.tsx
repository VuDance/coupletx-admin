"use client";

import { Category, SubCategory } from "@prisma/client";
import React, { useState } from "react";
import ListItem from "./ListItem";
import AddIcon from "@mui/icons-material/Add";
import ModalCreateCategory from "./ModalCreateCategory";

interface ListCategoriesProps {
  data: Category[];
  onChange: (subCategories: SubCategory[]) => void;
}

const ListCategories: React.FC<ListCategoriesProps> = ({ data, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <ModalCreateCategory open={open} handleClose={handleCloseModal} />
      {data && data.length > 0 && <ListItem />}
      <div
        onClick={() => setOpen(true)}
        className=" underline text-black flex gap-1 cursor-pointer hover:opacity-70 font-semibold"
      >
        <AddIcon />
        <p>Thêm dach mục sản phẩm</p>
      </div>
    </div>
  );
};

export default ListCategories;
