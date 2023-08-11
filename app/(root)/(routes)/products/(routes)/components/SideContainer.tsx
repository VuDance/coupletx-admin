import React from "react";
import SelectStatus from "./SelectStatus";
import SelectCollection from "./SelectCollection";
import SelectCategory from "./SelectCategory";

interface SideContainerProps {
  collections: any[];
  categories: any[];
}
const SideContainer: React.FC<SideContainerProps> = ({
  collections,
  categories,
}) => {
  return (
    <div className="basis-1/3 flex flex-col gap-3 h-auto ">
      <SelectStatus />
      <SelectCollection selectValue={collections} />
      <SelectCategory categories={categories} />
    </div>
  );
};

export default SideContainer;
