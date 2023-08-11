"use client";

import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputForm from "./input/InputForm";
import UploadImageWrapper from "@/app/components/input/UploadImageWrapper";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface ModalCreateCategoryProps {
  open: boolean;
  handleClose: () => void;
}

const ModalCreateCategory: React.FC<ModalCreateCategoryProps> = ({
  open,
  handleClose,
}) => {
  const session: any = useSession();
  const [loading, setLoading] = useState(false);
  const method = useForm({
    defaultValues: {
      name: "",
      gender: "",
      image: "",
    },
  });
  const handleSubmitData = async (data: any) => {
    try {
      const res = await axios.post(`/api/collections/create`, data, {
        headers: {
          authorization: session.data.accessToken,
        },
      });
      console.log(res);
      if (res.data.errorType === "Authorization") {
        toast.error(res.data.error);
      } else if (res.data.errorType === "TokenExpired") {
        toast.error(res.data.error);
        signOut();
      } else toast.success(res.data.message);
      handleClose();
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <Modal
        className="flex justify-between items-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={method.handleSubmit(handleSubmitData)}
          className="w-1/3 flex flex-col gap-2 p-2 h-auto bg-white rounded-xl"
        >
          <InputForm label="Tên danh mục" id="name" />

          <InputForm label="Giới tính" id="gender" />
          <div className="w-full">
            <p>Hình ảnh</p>
            <UploadImageWrapper multiple={false} />
          </div>
          <div className="w-full justify-end flex ">
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="success"
              className=" normal-case text-white bg-green-600"
            >
              Thêm
            </Button>
          </div>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default ModalCreateCategory;
