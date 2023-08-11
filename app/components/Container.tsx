"use client";

import { Product } from "@prisma/client";
import React from "react";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import TableData from "./TableData";
import SearchFilter from "./SearchFilter";

interface ContainerProps {
  type: string;
  rows: Product[];
  title: string;
  textBtn: string;
}

const Container: React.FC<ContainerProps> = ({
  type,
  rows,
  title,
  textBtn,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-[100%] gap-2 flex flex-col justify-center">
      <div className=" w-[100%] flex justify-between items-center">
        <h4 className=" text-xl font-semibold">{title}</h4>
        <Button
          onClick={() => router.push(pathname + "/new")}
          className=" bg-green-800 normal-case"
          variant="contained"
          color="success"
        >
          {textBtn}
        </Button>
      </div>
      <div className="w-full flex items-end justify-end">
        <SearchFilter />
      </div>
      <TableData rows={rows} type={type} />
    </div>
  );
};

export default Container;
