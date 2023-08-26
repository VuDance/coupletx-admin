"use client";

import React, { useEffect } from "react";
import DataBox from "./DataBox";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Chart from "./Chart";
import NewBlog from "./NewBlog";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

interface ContainerProps {
  data: any;
}

const Container: React.FC<ContainerProps> = ({ data }) => {
  useEffect(() => {
    if (data.errorType === "TokenExpired") {
      toast.error(data.error);
      signOut();
    } else if (data.errorType === "Authorization") {
      toast.error(data.error);
    }
  }, [data.error, data.errorType]);

  return (
    <div className=" mt-2 bg-white p-3 rounded-lg shadow-md">
      <div className=" gap-2 flex flex-wrap justify-between">
        <DataBox
          iconColor="success"
          color={"bg-green-400"}
          icon={GroupIcon}
          title={"Tổng user"}
          data={data?.overallStat?.totalUser || 0}
        />
        <DataBox
          iconColor="primary"
          color={"bg-blue-300"}
          icon={MonetizationOnIcon}
          title={"Tổng thu nhập"}
          data={data?.overallStat?.income || 0}
        />
        <DataBox
          iconColor="warning"
          color="bg-red-300"
          icon={TrendingUpIcon}
          title={"Tổng số lượng bán"}
          data={data?.overallStat?.sale || 0}
        />
        <DataBox
          iconColor="secondary"
          color="bg-purple-200"
          icon={Diversity3Icon}
          title={"Tổng nhân viên"}
          data={data?.overallStat?.employee || 0}
        />
      </div>

      <div className="flex justify-between">
        <Chart dataChart={data?.overallStat?.dataByMonth} />
        <NewBlog />
      </div>
    </div>
  );
};

export default Container;
