"use client";

import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ValueProps {
  product_variant_name?: string;
  price?: string;
  quantity?: string;
  color: string;
}

interface InputModalProps {
  type: string;
  label: string;
  value: ValueProps;
  placeholder: string;
}

const InputModal: React.FC<InputModalProps> = ({
  label,
  value,
  placeholder,
  type,
}) => {
  const { getValues, setValue, watch } = useFormContext();
  const [text, setText] = useState<string | number>(
    value.product_variant_name || value.price || value.quantity || ""
  );

  const parentData = watch("productVariant");
  const handleChange = (text: string) => {
    setText(text);

    if (value.product_variant_name != undefined) {
      parentData.map((item: any) => {
        item.color === value.color ? (item.product_variant_name = text) : item;
      });

      setValue("productVariant", parentData);
    } else if (value.price != undefined) {
      parentData.map((item: any) => {
        item.color === value.color ? (item.price = parseInt(text)) : item;
      });

      setValue("productVariant", parentData);
    } else {
      parentData.map((item: any) => {
        item.color === value.color ? (item.quantity = parseInt(text)) : item;
      });

      setValue("productVariant", parentData);
    }
    console.log(getValues("productVariant"));
  };
  return (
    <div>
      <p className=" text-lg font-semibold">{label}</p>
      <TextField
        type={type}
        placeholder={placeholder}
        size="small"
        onChange={(e) => handleChange(e.target.value)}
        value={text}
      ></TextField>
    </div>
  );
};

export default InputModal;
