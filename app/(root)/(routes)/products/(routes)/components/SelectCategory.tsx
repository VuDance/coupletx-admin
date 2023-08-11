import SelectOption from "@/app/components/input/SelectOption";
import React from "react";

interface SelectCategoryProps {
  categories: any[];
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ categories }) => {
  return (
    <div className="bg-[#fff] rounded-lg shadow-md p-3">
      <SelectOption selectedValue="" data={categories} title="Danh mục" />
    </div>
  );
};

export default SelectCategory;
