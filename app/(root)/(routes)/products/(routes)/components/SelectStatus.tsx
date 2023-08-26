"use client";

import React from "react";
import SelectOption from "@/app/components/input/SelectOption";
import { useFormContext } from "react-hook-form";

const SelectStatus = () => {
  const { getValues } = useFormContext();

  const selectValue = [
    {
      id: 1,
      name: "Đang hoạt động",
    },
    {
      id: 2,
      name: "Không hoạt động",
    },
  ];

  return (
    <div className="bg-[#fff] rounded-lg shadow-md p-3">
      <SelectOption
        id="active"
        selectedValue={getValues("active")}
        data={selectValue}
        title="Trạng thái"
      />
    </div>
  );
};

export default SelectStatus;
