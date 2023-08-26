"use client";

import React from "react";
import SelectOption from "@/app/components/input/SelectOption";
import { useFormContext } from "react-hook-form";

interface SelectCollectionProps {
  selectValue: any[];
}

const SelectCollection: React.FC<SelectCollectionProps> = ({ selectValue }) => {
  const { getValues } = useFormContext();
  return (
    <div className="bg-[#fff] rounded-lg shadow-md p-3">
      <SelectOption
        id="subCategory"
        selectedValue={getValues("subCategory")}
        data={selectValue}
        title="Danh mục"
      />
    </div>
  );
};

export default SelectCollection;
