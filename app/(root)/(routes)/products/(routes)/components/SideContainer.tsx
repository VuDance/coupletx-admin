import React from "react";
import SelectStatus from "./SelectStatus";
import SelectCollection from "./SelectCollection";
import ChipSelect from "@/app/components/input/ChipSelect";

interface SideContainerProps {
  subCategory: any[];
}
const SideContainer: React.FC<SideContainerProps> = ({ subCategory }) => {
  return (
    <div className="basis-1/3 flex flex-col gap-3 h-auto ">
      <SelectStatus />
      {/* <SelectCollection selectValue={subCategory} /> */}
      <ChipSelect data={subCategory} label="Danh mục" type="subCategory" />
    </div>
  );
};

export default SideContainer;
