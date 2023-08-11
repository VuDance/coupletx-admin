"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

interface ImageUploadProps {
  onChange: (value: string) => void;
  multiple?: boolean;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, multiple }) => {
  const { setValue, getValues } = useFormContext();
  const [singleImage, setSingleImage] = useState(getValues("image"));
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
      if (multiple === false) {
        setSingleImage(result.info.secure_url);
        setValue("image", result.info.secure_url);
      }
    },
    [multiple, onChange, setValue]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="unb4qhox"
      options={{ maxFiles: 6 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`${
              multiple === false ? "w-full" : "w-1/3"
            } text-neutral-600 relative cursor-pointer h-40 hover:opacity-70 transition border-dashed border-2 p-10 border-[#ccc] flex flex-col justify-center items-center gap-3`}
          >
            {multiple === false && singleImage !== "" ? (
              <Image
                alt="collection-img"
                src={singleImage}
                objectFit="contain"
                fill={true}
              />
            ) : (
              <>
                <CloudUploadIcon color="primary" />

                <p>Thêm ảnh</p>
              </>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
