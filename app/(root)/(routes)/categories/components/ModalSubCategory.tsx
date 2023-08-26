import { Button, Modal } from "@mui/material";
import { SubCategory } from "@prisma/client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputForm from "./input/InputForm";
import UploadImageWrapper from "@/app/components/input/UploadImageWrapper";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DeleteModal from "@/app/components/modals/DeleteModal";

interface ModalSubCategoryProps {
  open: boolean;
  handleClose: () => void;
  data?: SubCategory;
  action: string;
  category_id?: string;
}

const ModalSubCategory: React.FC<ModalSubCategoryProps> = ({
  open,
  handleClose,
  data,
  action,
  category_id,
}) => {
  const router = useRouter();
  const session: any = useSession();
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const method = useForm({
    values: {
      category_id: category_id ? category_id : "",
      id: data ? data.id : "",
      name: data ? data.name : "",
      image: data ? data.image : "",
      slug: data ? data.slug : "",
    },
  });

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSubmitData = async (data: any) => {
    // console.log(data);
    if (data.image === "" || data.name === "" || data.slug === "") {
      toast.error("Vui lòng điền đầy đủ và hợp lệ thông tin");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`/api/subcategories/${action}`, data, {
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={handleCloseDeleteModal}
        inputData={{ type: "subcategories", id: data?.id || -1 }}
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
          <div>
            {action === "create" ? (
              "Tạo danh mục con"
            ) : (
              <div>
                Chỉnh sửa danh mục{" "}
                <span className=" font-semibold">{data?.name}</span>
              </div>
            )}
          </div>
          <InputForm label="Tên danh mục" id="name" />
          <InputForm label="Slug" id="slug" slug />
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

export default ModalSubCategory;
