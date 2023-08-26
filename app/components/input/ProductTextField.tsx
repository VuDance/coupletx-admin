"use client";

import { IconButton, TextField } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import slugify from "react-slugify";

interface ProductTextFieldProps {
  label: string;
  small?: boolean;
  id: string;
  getValues?: any;
  placeholder?: string;
  slug?: boolean;
  value?: string;
}

const ProductTextField: React.FC<ProductTextFieldProps> = ({
  label,
  id,

  small,
  placeholder,
  slug,
  value,
}) => {
  const { register, getValues, setValue } = useFormContext();
  const [text, setText] = useState(
    value || getValues(id) || getValues("name") || ""
  );

  const handleChange = (value: string) => {
    setText(value);
  };
  return (
    <div>
      <p>{label}</p>
      <div className="flex gap-2">
        <TextField
          {...register(id)}
          className="text-sm"
          size="small"
          fullWidth={!small}
          placeholder={placeholder}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
        ></TextField>
        {slug && (
          <IconButton
            onClick={() => {
              setText(slugify(getValues("product_name")));
              setValue("slug", slugify(getValues("product_name")));
            }}
          >
            <AutorenewIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default ProductTextField;
