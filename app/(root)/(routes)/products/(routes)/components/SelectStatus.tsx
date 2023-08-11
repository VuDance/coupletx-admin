import React from "react";
import SelectOption from "@/app/components/input/SelectOption";

const SelectStatus = () => {
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
        selectedValue={selectValue[0].name}
        data={selectValue}
        title="Trạng thái"
      />
    </div>
  );
};

export default SelectStatus;
