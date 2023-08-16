"use client";

import { Category, SubCategory } from "@prisma/client";
import React, { useState } from "react";
import ListItem from "./ListItem";
import AddIcon from "@mui/icons-material/Add";
import ModalCategory from "./ModalCategory";

interface ListCategoriesProps {
  data: Category[];
  onChange: (subCategories: SubCategory[]) => void;
}

const ListCategories: React.FC<ListCategoriesProps> = ({ data, onChange }) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataModal, setDataModal] = useState();

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleSetDataModal = (data: any) => {
    setDataModal(data);
  };

  return (
    <div className="p-3 flex flex-col gap-2 flex-1">
      <ModalCategory
        action="create"
        open={open}
        handleClose={handleCloseModal}
      />
      <ModalCategory
        action="edit"
        data={dataModal}
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
      />
      {data &&
        data.length > 0 &&
        data.map((item: any) => (
          <ListItem
            handleOpenModalEdit={() => setOpenEditModal(true)}
            setDataModal={handleSetDataModal}
            data={item}
            key={item.id}
          />
        ))}
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
