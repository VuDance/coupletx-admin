"use client";

import UploadImageWrapper from "@/app/components/input/UploadImageWrapper";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import slugify from "react-slugify";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import toast from "react-hot-toast";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: any;
  data?: any;
}

const CreateBlogModal: React.FC<CreateBlogModalProps> = ({
  isOpen,
  onClose,
  session,
  data,
}) => {
  const method = useForm({
    values: {
      type: data ? data.type : "",
      id: data ? data.id : null,
      title: data ? data.title : "",
      image: data ? data.image : "",
      slug: data ? data.slug : "",
      author: session?.data?.user?.name,
    },
  });
  const router = useRouter();
  const [value, setValueInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitData = async (data: any) => {
    if (data.image === "" || data.title === "" || data.slug === "") {
      toast.error("Vui lòng điền đầy đủ và hợp lệ thông tin");
      return;
    }
    try {
      setLoading(true);
      let res = null;
      if (data.type === "update") {
        res = await axios.put("/api/blogs/update", data, {
          headers: {
            authorization: session?.data.accessToken,
          },
        });
        toast.success(res.data.message);
      } else {
        res = await axios.post("/api/blogs/create", data, {
          headers: {
            authorization: session?.data.accessToken,
          },
        });
        toast.success(res.data.message);
      }
      router.refresh();

      onClose();
    } catch (error: any) {
      console.log(error);
      if (error.response.data.errorType === "Authorization") {
        toast.error(error.response.data.error);
      }
      if (error.response.data.errorType === "TokenExpired") {
        toast.error(error.response.data.error);
        signOut();
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <Modal
        style={{ backgroundColor: "transparent" }}
        // BackdropProps={{ style: { backgroundColor: "transparent" } }}
        className="flex items-center justify-center "
        open={isOpen}
        onClose={onClose}
      >
        <div className=" w-1/3 h-auto  p-6 gap-4 bg-white shadow-lg flex justify-between items-end flex-col rounded-lg">
          <form
            onSubmit={method.handleSubmit(handleSubmitData)}
            className="w-full flex flex-col items-end gap-2"
          >
            <div className=" w-full">
              <p className=" font-bold">Thêm blog</p>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div>
                <p className=" font-semibold">Tên blog</p>
                <TextField
                  {...method.register("title")}
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </div>
              <div>
                <p className=" font-semibold">Tên tác giả</p>
                <TextField
                  {...method.register("author")}
                  placeholder={session?.data?.user.name}
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </div>
              <div>
                <p className=" font-semibold">Slug</p>
                <div className="flex gap-2">
                  <TextField size="small" fullWidth value={value} />
                  <IconButton
                    onClick={() => {
                      setValueInput(slugify(method.getValues("title")));

                      method.setValue(
                        "slug",
                        slugify(method.getValues("title"))
                      );
                    }}
                  >
                    <AutorenewIcon />
                  </IconButton>
                </div>
              </div>
              <div>
                <p className=" font-semibold">Hình ảnh</p>
                <UploadImageWrapper multiple={false} />
              </div>
            </div>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="success"
              className=" normal-case text-white bg-green-600"
            >
              {data ? "Chỉnh sửa" : "Thêm"}
            </Button>
          </form>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default CreateBlogModal;
