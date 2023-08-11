"use client";

import { Button, TextField } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = async () => {
    try {
      const res: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.status === 401) {
        toast.error(res.error);
      }
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
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
      <Button onClick={login}>Click</Button>
    </div>
  );
};

export default Page;
