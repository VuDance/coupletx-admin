"use client";

import { Button } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, label }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(href)} className="flex gap-3 items-center">
      <Button
        variant="outlined"
        className=" text-[#616a75] border-[#616a75] hover:border-[#616a75] hover:text-[black]"
      >
        <ArrowBackIcon />
      </Button>
      <p className=" font-semibold text-xl">{label}</p>
    </div>
  );
};

export default BackButton;
