"use client";

import SearchFilter from "@/app/components/SearchFilter";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import TableData from "./TableData";

interface ContainerProps {
  rows: any[];
  title: string;
  textBtn: string;
  error?: string;
}

const Container: React.FC<ContainerProps> = ({
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
    <div className=" w-[80%] p-3">
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
        {/* <TableData rows={rows || []} type={type} /> */}
        <TableData rows={[{ name: "1", history: [{ customerId: 1 }] }]} />
      </div>
    </div>
  );
};

export default Container;
