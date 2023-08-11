"use client";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

// interface DataProps {
//   id: number;
//   name: string;
// }

interface SelectOptionProps {
  title: string;
  selectedValue: string;
  data: any[];
}
const SelectOption: React.FC<SelectOptionProps> = ({
  title,
  data,
  selectedValue,
}) => {
  const [value, setValue] = useState<string>(selectedValue);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
    setValue(event.target.value as string);
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
