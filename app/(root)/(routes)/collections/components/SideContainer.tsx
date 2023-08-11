"use client";

import UploadImageWrapper from "@/app/components/input/UploadImageWrapper";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const SideContainer = () => {
  const [active, setActive] = useState("1");
  const { setValue, getValues } = useFormContext();

  const handleChange = (event: SelectChangeEvent) => {
    setActive(event.target.value as string);
    setValue("status", event.target.value);
  };
  useEffect(() => {
    setActive(getValues("status"));
  }, [getValues]);
  return (
    <div className="w-1/3 flex flex-col gap-3">
      <div className="bg-[#fff] h-auto rounded-lg shadow-md p-3">
        <p>Trạng thái</p>
        <Select
          fullWidth
          size="small"
          value={active}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={1}>Đang hoạt động</MenuItem>
          <MenuItem value={2}>Không hàng nháp</MenuItem>
        </Select>
      </div>
      <div className="bg-[#fff] h-auto flex-grow rounded-lg shadow-md p-3">
        <UploadImageWrapper multiple={false} data={[]} />
      </div>
    </div>
  );
};

export default SideContainer;
