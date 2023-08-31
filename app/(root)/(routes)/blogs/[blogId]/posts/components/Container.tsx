"use client";

import BackButton from "@/app/components/BackButton";
import Markdown from "@/app/components/input/Markdown";
import UploadImageWrapper from "@/app/components/input/UploadImageWrapper";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ContainerProps {
  session: any;
  blogId?: any;
  data?: any;
  type?: string;
}

const Container: React.FC<ContainerProps> = ({
  session,
  blogId,
  data,
  type,
}) => {
  const method = useForm({
    values: {
      id: data ? data.id : null,
      body: data ? data.body : "",
      author: data ? data.author : session?.user.name,
      title: data ? data.title : "",
      image: data ? data.image : "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmitData = async (dataInput: any) => {
    if (
      dataInput.image === "" ||
      dataInput.title === "" ||
      dataInput.author === "" ||
      dataInput.body === ""
    ) {
      toast.error("Vui lòng điền đầy đủ và hợp lệ thông tin");
      return;
    }
    try {
      setLoading(true);
      let res = null;
      const data = { ...dataInput, blog_id: parseInt(blogId) };
      if (type == "update") {
        res = await axios.put("/api/posts/update", data, {
          headers: {
            authorization: session?.accessToken,
          },
        });
        toast.success(res.data.message);
      } else {
        res = await axios.post("/api/posts/create", data, {
          headers: {
            authorization: session?.accessToken,
          },
        });
        toast.success(res.data.message);
      }
      router.refresh();
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
      <div className="w-[80%] p-3 flex flex-col gap-2">
        <BackButton href="/blogs" label="Thêm bài viết" />
        <form
          onSubmit={method.handleSubmit(handleSubmitData)}
          className="w-full flex flex-col gap-3  "
        >
          <div className="bg-white rounded-md p-3">
            <div>
              <p className=" font-semibold">Tên bài viết</p>
              <TextField
                {...method.register("title")}
                fullWidth
                size="small"
                placeholder="Nhập tên bài viết"
              />
            </div>
            <div>
              <p className=" font-semibold">Tên tác giả</p>
              <TextField
                {...method.register("author")}
                placeholder={session?.user.name}
                fullWidth
                size="small"
              />
            </div>
            <Markdown
              large={true}
              control={method.control}
              label="Nội dung"
              id="body"
            />
          </div>
          <div className="p-3 w-1/3 bg-white rounded-md">
            <p>Banner</p>
            <UploadImageWrapper multiple={false} />
          </div>
          <div className="w-full flex justify-end">
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="success"
              className=" bg-green-500"
            >
              {type == "update" ? "Chỉnh sửa" : "Thêm"}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Container;
