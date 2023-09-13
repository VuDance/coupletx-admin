"use client";

import { Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = async () => {
    try {
      setLoading(true);
      const res: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.status === 401) {
        toast.error(res.error);
        return;
      }
      toast.success("Đăng nhập thành công");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-3 rounded-lg shadow-md flex-col gap-2">
      <p className=" text-lg font-semibold">Admin Login</p>
      <TextField
        type="email"
        size="small"
        label="Email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      ></TextField>
      <TextField
        type="password"
        size="small"
        label="Mật khẩu"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      ></TextField>
      <Button variant="outlined" onClick={login}>
        {loading ? (
          <LoadingOutlined style={{ fontSize: "24px" }} />
        ) : (
          "Đăng nhập"
        )}
      </Button>
    </div>
  );
};

export default Page;
