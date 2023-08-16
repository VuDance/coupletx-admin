"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useFormContext } from "react-hook-form";

interface ChipSelectProps {
  data: any[];
  label: string;
  type: string;
}

const ChipSelect: React.FC<ChipSelectProps> = ({ data, label, type }) => {
  const { getValues, setValue } = useFormContext();
  const [categoryName, setCategoryName] = useState<string[]>(
    getValues(type) || []
  );

  const handleChange = (event: any, obj: any) => {
    const {
      target: { value },
    } = event;
    setValue(type, value);
    setCategoryName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="w-full">
      <p>{label}</p>
      <Select
        id="demo-multiple-chip"
        multiple
        className="w-full"
        value={categoryName}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {data.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
export default ChipSelect;
