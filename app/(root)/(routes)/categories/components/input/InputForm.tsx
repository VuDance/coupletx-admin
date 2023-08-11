import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputFormProps {
  label: string;
  id: string;
}

const InputForm: React.FC<InputFormProps> = ({ label, id }) => {
  const { setValue, getValues } = useFormContext();
  const [value, setValueInput] = useState(getValues(id));
  const handleChange = (value: string) => {
    setValueInput(value);
    setValue(id, value);
  };
  return (
    <div>
      <p>{label}</p>
      <TextField
        size="small"
        fullWidth
        value={value}
        onChange={(e: any) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default InputForm;
