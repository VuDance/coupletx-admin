"use client";

import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { toast } from "react-hot-toast";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface DataProps {
  type: string;
  data: [];
}

interface DeleteAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputData: DataProps;
}

const DeleteAllModal: React.FC<DeleteAllModalProps> = ({
  isOpen,
  onClose,
  inputData,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session: any = useSession();

  const data = {
    type: inputData.type,
    id: inputData.data,
  };

  const handleDelete = async () => {
    // console.log(data);
    try {
      setLoading(true);
      const res = await axios.delete(`/api/${data.type}/deleteAll`, {
        data,
        headers: {
          authorization: session?.data?.accessToken,
        },
      });
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
      router.refresh();
    }
  };

  return (
    <Modal
      style={{ backgroundColor: "transparent" }}
      className="flex items-center justify-center "
      open={isOpen}
      onClose={onClose}
    >
      <div className=" w-1/3 h-auto  p-6 gap-4 bg-white shadow-lg flex justify-between items-end flex-col rounded-lg">
        <div className="w-full">
          <p className="text-xl">Bạn có chắc muốn xóa không ?</p>
          <p>Nếu bạn xóa, bạn không thể khôi phục</p>
        </div>
        <div className="flex gap-2 ">
          <Button
            onClick={onClose}
            className="bg-white flex-1 text-black  hover:text-white"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleDelete}
            className=" bg-orange-500 flex-1 text-white"
            variant="contained"
            color="error"
          >
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAllModal;
