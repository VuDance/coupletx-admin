"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ListItemProps {
  data: any;
  handleOpenModalEdit: () => void;
  setDataModal: (data: any) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  data,
  setDataModal,
  handleOpenModalEdit,
}) => {
  const router = useRouter();
  const param = useSearchParams();
  const handleClick = (slug: string) => {
    router.push(`/categories?category=${slug}`);
  };

  return (
    <div
      className={`border flex justify-between items-center p-2 cursor-pointer ${
        data.slug === param?.get("category") && "bg-green-500 text-white"
      }`}
      onClick={() => {
        handleClick(data.slug);
      }}
    >
      <p>{data.name}</p>
      <p
        className=" underline cursor-pointer "
        onClick={() => {
          setDataModal(data);
          handleOpenModalEdit();
        }}
      >
        Chỉnh sửa
      </p>
    </div>
  );
};

export default ListItem;
