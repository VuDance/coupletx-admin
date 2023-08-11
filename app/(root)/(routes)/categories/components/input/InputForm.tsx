import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import slugify from "react-slugify";

interface InputFormProps {
  label: string;
  id: string;
  slug?: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ label, id, slug }) => {
  const { setValue, getValues } = useFormContext();
  const [value, setValueInput] = useState(getValues(id));
  const handleChange = (value: string) => {
    setValueInput(value);
    setValue(id, value);
  };
  return (
    <div>
      <p>{label}</p>
      {slug ? (
        <div className="flex gap-2">
          <TextField size="small" fullWidth value={value} />
          <IconButton
            onClick={() => {
              setValueInput(slugify(getValues("name")));
              setValue("slug", slugify(getValues("name")));
            }}
          >
            <AutorenewIcon />
          </IconButton>
        </div>
      ) : (
        <TextField
          size="small"
          fullWidth
          value={value}
          onChange={(e: any) => handleChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputForm;
