import React from "react";
import SelectOption from "@/app/components/input/SelectOption";

interface SelectCollectionProps {
  selectValue: any[];
}

const SelectCollection: React.FC<SelectCollectionProps> = ({ selectValue }) => {
  return (
    <div className="bg-[#fff] rounded-lg shadow-md p-3">
      <SelectOption selectedValue="" data={selectValue} title="Bộ sưu tập" />
    </div>
  );
};

export default SelectCollection;
