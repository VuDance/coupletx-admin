"use client";

import { SubCategory } from "@prisma/client";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ModalSubCategory from "./ModalSubCategory";

interface ListCategoriesProps {
  data: SubCategory[];
  category_id: any;
}

const ListSubCategory: React.FC<ListCategoriesProps> = ({
  data,
  category_id,
}) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataModal, setDataModal] = useState<SubCategory>();

  return (
    <div className="flex-1 flex flex-col gap-2 transition-all p-3">
      <ModalSubCategory
        category_id={category_id}
        action="create"
        open={open}
        handleClose={() => setOpen(false)}
      />
      <ModalSubCategory
        data={dataModal}
        action="edit"
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
      />

      {category_id ? (
        <>
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="border transition-all flex justify-between items-center p-2 cursor-pointer"
              >
                <p>{item.name}</p>
                <p
                  className=" underline cursor-pointer "
                  onClick={() => {
                    setDataModal(item);
                    setOpenEditModal(true);
                  }}
                >
                  Chỉnh sửa
                </p>
              </div>
            ))
          ) : (
            <p className="p-2 w-full text-center">Không có danh mục con nào</p>
          )}
          <div
            onClick={() => setOpen(true)}
            className=" underline text-black flex gap-1 cursor-pointer hover:opacity-70 font-semibold"
          >
            <AddIcon />
            <p>Thêm dach mục sản phẩm</p>
          </div>
        </>
      ) : (
        <p className="p-2 w-full text-center">Vui lòng chọn chọn danh mục</p>
      )}
    </div>
  );
};

export default ListSubCategory;
