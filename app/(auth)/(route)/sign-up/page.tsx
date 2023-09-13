"use client";
import AuthButton from "@/app/components/input/AuthButton";
import GoogleIcon from "@mui/icons-material/Google";

import { signIn } from "next-auth/react";
import { Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUp = async (data: any) => {
    try {
      setLoading(true);
      await axios.post("/api/user/register", data);
      toast.success("Đăng kí thành công");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(signUp)}
      className=" flex flex-col p-3 border w-1/3 gap-2"
    >
      <TextField
        type="text"
        {...register("name", { minLength: 5, maxLength: 15 })}
        color={`${errors.password ? "error" : "primary"}`}
        id="outlined-basic"
        label="User name"
        variant="outlined"
        required
      />

      <TextField
        type="email"
        {...register("email")}
        id="outlined-basic"
        label="Email"
        required
        variant="outlined"
      />
      <TextField
        type="password"
        {...register("password", { minLength: 5, maxLength: 10 })}
        id="outlined-basic"
        label="Password"
        color={`${errors.password ? "error" : "primary"}`}
        variant="outlined"
        required
      />
      {errors.password && errors.password.type === "maxLength" && (
        <span className=" text-red-600">Mật khẩu quá dài</span>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <span className=" text-red-600">Mật khẩu quá ngắn</span>
      )}
      {errors.name && errors.name.type === "maxLength" && (
        <span className=" text-red-600">Tên người dùng quá dài</span>
      )}
      {errors.name && errors.name.type === "minLength" && (
        <span className=" text-red-600">Tên người dùng quá ngắn</span>
      )}
      <Button
        disabled={loading}
        type="submit"
        variant="outlined"
        color="success"
      >
        Đăng kí
      </Button>
      <Divider />
      <AuthButton
        label="Continue with Google"
        icon={GoogleIcon}
        // onClick={() => signIn("google", { callbackUrl: "/" })}
        onClick={() => signIn("google")}
      />
    </form>
  );
};

export default Page;
