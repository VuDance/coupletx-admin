"use client";

import { Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputForm from "./input/InputForm";
import UploadImageWrapper from "@/app/components/input/UploadImageWrapper";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ModalCreateCategoryProps {
  action: string;
  open: boolean;
  data?: any;
  handleClose: () => void;
}

const ModalCreateCategory: React.FC<ModalCreateCategoryProps> = ({
  open,
  handleClose,
  action,
  data,
}) => {
  const router = useRouter();
  const session: any = useSession();
  const [loading, setLoading] = useState(false);
  const method = useForm({
    values: {
      id: data ? data.id : "",
      name: data ? data.name : "",
      gender: data ? data.gender : "",
      image: data ? data.image : "",
      slug: data ? data.slug : "",
    },
  });
  const handleSubmitData = async (data: any) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/categories/${action}`, data, {
        headers: {
          authorization: session.data.accessToken,
        },
      });
      if (res.data.errorType === "Authorization") {
        toast.error(res.data.error);
      } else if (res.data.errorType === "TokenExpired") {
        console.log("eheel");
        toast.error(res.data.error);
        signOut();
      } else {
        toast.success(res.data.message);
        router.refresh();
      }
      handleClose();
    } catch (error: any) {
      if (error.response.data.errorType === "TokenExpired") {
        toast.error(error.response.data.error);
        signOut();
      }
      console.error(error.response.data.errorType);
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
          <p className=" text-xl">
            {action === "create"
              ? "Thêm danh mục"
              : `Chỉnh sửa danh mục ${data?.name}`}
          </p>
          <InputForm label="Tên danh mục" id="name" />
          <InputForm label="Slug" id="slug" slug />
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
