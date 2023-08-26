import { SvgIcon } from "@mui/material";
import React from "react";

interface DataBoxProps {
  icon: typeof SvgIcon;
  data: any;
  title: string;
  color: string;
  iconColor: "success" | "secondary" | "primary" | "warning";
}
const DataBox: React.FC<DataBoxProps> = ({
  data,
  title,
  color,
  icon: Icon,
  iconColor,
}) => {
  return (
    <div className={`${color} p-3 w-[24%] rounded-md text-white`}>
      <div className="flex justify-between items-center mb-3">
        <p>{title}</p>
        <Icon fontSize="large" color={iconColor} />
      </div>
      <p className=" font-bold text-3xl">{data}</p>
    </div>
  );
};

export default DataBox;
