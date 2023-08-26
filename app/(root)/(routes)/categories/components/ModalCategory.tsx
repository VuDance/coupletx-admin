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
import DeleteModal from "@/app/components/modals/DeleteModal";

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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSubmitData = async (data: any) => {
    if (
      data.image === "" ||
      data.gender === "" ||
      (data.gender !== "Nam" && data.gender !== "Nữ") ||
      data.name === "" ||
      data.slug === ""
    ) {
      toast.error("Vui lòng điền đầy đủ và hợp lệ thông tin");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`/api/categories/${action}`, data, {
        headers: {
          authorization: session.data.accessToken,
        },
      });

      toast.success(res.data.message);
      router.refresh();

      handleClose();
    } catch (error: any) {
      if (error.response.data.errorType === "Authorization") {
        toast.error(error.response.data.error);
      }
      if (error.response.data.errorType === "TokenExpired") {
        toast.error(error.response.data.error);
        signOut();
      } else {
        toast.error(error.response.data.message);
      }
      // console.error(error.response);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={handleCloseDeleteModal}
        inputData={{ type: "categories", id: data?.id }}
      />
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
          <div className="w-full gap-2 justify-end flex ">
            {action === "edit" && (
              <Button
                disabled={loading}
                variant="contained"
                color="error"
                onClick={() => {
                  setOpenDeleteModal(true), handleClose();
                }}
                className=" normal-case text-white bg-orange-600"
              >
                Xóa
              </Button>
            )}
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="success"
              className=" normal-case text-white bg-green-600"
            >
              {action === "edit" ? "OK" : "Thêm"}
            </Button>
          </div>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default ModalCreateCategory;
