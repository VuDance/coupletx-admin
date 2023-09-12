"use client";

import SearchFilter from "@/app/components/SearchFilter";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableData from "./TableData";
import CreateBlogModal from "./modals/CreateBlogModal";
import { useSession } from "next-auth/react";

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
  const session: any = useSession();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  useEffect(() => {
    if (error && error.length > 0) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div className=" w-[80%] p-3">
      <CreateBlogModal
        session={session}
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      <div className="w-[100%] gap-2 flex flex-col justify-center">
        <div className=" w-[100%] flex justify-between items-center">
          <h4 className=" text-xl font-semibold">{title}</h4>
          <Button
            onClick={() => setOpenCreateModal(true)}
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
        <TableData rows={rows} />
      </div>
    </div>
  );
};

export default Container;
