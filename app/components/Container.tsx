"use client";

import { Product } from "@prisma/client";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import TableData from "./TableData";
import SearchFilter from "./SearchFilter";
import toast from "react-hot-toast";

interface ContainerProps {
  type: string;
  rows: Product[];
  title: string;
  textBtn: string;
  error?: string;
}

const Container: React.FC<ContainerProps> = ({
  type,
  rows,
  title,
  textBtn,
  error,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (error && error.length > 0) {
      toast.error(error);
    }
  }, [error]);

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
      <TableData rows={rows || []} type={type} />
    </div>
  );
};

export default Container;
