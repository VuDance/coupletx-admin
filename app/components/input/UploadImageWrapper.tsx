"use client";

import ImageUpload from "@/app/components/ImageUpload";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface UploadImageWrapperProps {
  multiple?: boolean;
  color?: string;
  data?: string[];
}

const UploadImageWrapper: React.FC<UploadImageWrapperProps> = ({
  multiple,
  color,
  data,
}) => {
  const { setValue, getValues } = useFormContext();
  const [images, setImages] = useState<string[]>(data || []);

  const handleUpload = async (img: string) => {
    setImages((pre) => [...pre, img]);
  };
  useEffect(() => {
    if (color) {
      const productVariantIndex = getValues("productVariant").findIndex(
        (item: any) => item.color === color
      );
      setValue(`productVariant.${productVariantIndex}.images`, images);
      console.log(productVariantIndex);
    }
  }, [images, setValue, getValues, color]);

  return (
    <div className="w-full flex-wrap gap-1 flex">
      <ImageUpload multiple={multiple} onChange={handleUpload} />
      {images.length > 0 &&
        multiple &&
        images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden w-[calc(100%_/_3_-_4px)] h-[200px] flex items-center justify-center"
          >
            <div className=" flex items-center justify-center transition-all group-hover:translate-y-0 translate-y-12 left-0 bottom-0 absolute w-full h-1/3 bg-[0,0,0,0.5]">
              <IconButton>
                <DeleteIcon fontSize="large" sx={{ color: "#ccc" }} />
              </IconButton>
            </div>
            <Image
              width={200}
              height={200}
              className="w-full h-[200px]"
              src={image}
              alt="img"
            />
          </div>
        ))}
    </div>
  );
};

export default UploadImageWrapper;
