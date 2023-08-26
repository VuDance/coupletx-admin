"use client";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

// interface DataProps {
//   id: number;
//   name: string;
// }

interface SelectOptionProps {
  title: string;
  selectedValue: string;
  data: any[];
  id: string;
}
const SelectOption: React.FC<SelectOptionProps> = ({
  title,
  data,
  selectedValue,
  id,
}) => {
  const [value, setValueData] = useState<string>(selectedValue);
  const { setValue } = useFormContext();

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
    setValueData(event.target.value as string);
    setValue(id, event.target.value as string);
  };
  return (
    <div>
      <p>{title}</p>

      <Select
        onChange={handleChange}
        fullWidth
        size="small"
        value={value}
        inputProps={{ "aria-label": "Without label" }}
      >
        {data && data.length > 0 ? (
          data.map((item: any) => (
            <MenuItem value={item.name} key={item.id}>
              {item.name}
            </MenuItem>
          ))
        ) : (
          <div className="flex p-2 justify-center items-center">
            Không có {title}
          </div>
        )}
      </Select>
    </div>
  );
};

export default SelectOption;
