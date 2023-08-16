"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MainContainer from "./MainContainer";
import SideContainer from "./SideContainer";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Category } from "@prisma/client";

interface ContainerProps {
  data?: any;
  action: string;
  categories: Category[];
}

const Container: React.FC<ContainerProps> = ({ data, action, categories }) => {
  const [loading, setLoading] = useState(false);
  const userData: any = useSession();
  const router = useRouter();
  // console.log(data.categories[0].name);
  const methods = useForm({
    defaultValues: {
      name: data ? data.name : "",
      image: data ? data.image : "",
      description: data ? data.description : "",
      status: data ? parseInt(data.status) : 1,
      categories: data
        ? data.categories.map((item: Category) => item.name)
        : [],
    },
  });

  const onSubmit = async (submitData: any) => {
    // console.log(submitData);
    if (
      submitData.image === "" ||
      submitData.description === "" ||
      submitData.name === ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin (Tiêu đề, Mô tả, Hình ảnh");
      return;
    }
    let convertData = null;
    if (action === "create") {
      convertData = {
        ...submitData,
      };
    } else if (action === "edit") {
      convertData = {
        ...submitData,
        collectionId: data.collectionId,
      };
    }
    try {
      setLoading(true);
      let res = null;
      if (action === "create") {
        res = await axios.post(`/api/collections/${action}`, convertData, {
          headers: {
            authorization: userData.data.accessToken,
          },
        });
      } else {
        res = await axios.put(`/api/collections/${action}`, convertData);
      }

      if (res.data.errorType === "Authorization") {
        toast.error(res.data.error);
      } else if (res.data.errorType === "TokenExpired") {
        console.log("eheel");
        toast.error(res.data.error);
        signOut();
      } else {
        toast.success(res.data.message);
        router.push("/collections");
        router.refresh();
      }
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
    <div className="flex items-start w-[100%] mt-3 pl-8 pr-8 gap-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-3 w-full items-start">
            <MainContainer categories={categories} />
            <SideContainer />
          </div>
          <div className="w-full flex justify-end mt-3 items-end">
            <Button
              disabled={loading}
              color="success"
              className=" bg-green-600 normal-case"
              variant="contained"
              type="submit"
            >
              Lưu
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Container;
