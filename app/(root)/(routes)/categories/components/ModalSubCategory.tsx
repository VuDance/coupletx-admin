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
  const method = useForm({
    values: {
      category_id: category_id ? category_id : "",
      id: data ? data.id : "",
      name: data ? data.name : "",
      image: data ? data.image : "",
      slug: data ? data.slug : "",
    },
  });
  const handleSubmitData = async (data: any) => {
    // console.log(data);
    try {
      setLoading(true);
      const res = await axios.post(`/api/subcategories/${action}`, data, {
        headers: {
          authorization: session.data.accessToken,
        },
      });
      if (res.data.errorType === "Authorization") {
        toast.error(res.data.error);
      } else if (res.data.errorType === "TokenExpired") {
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
          <p>
            {action === "create" ? (
              "Tạo danh mục con"
            ) : (
              <p>
                Chỉnh sửa danh mục{" "}
                <span className=" font-semibold">{data?.name}</span>
              </p>
            )}
          </p>
          <InputForm label="Tên danh mục" id="name" />
          <InputForm label="Slug" id="slug" slug />
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

export default ModalSubCategory;
