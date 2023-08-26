"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Biểu đồ doanh thu",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

interface ChartProps {
  dataChart: any[];
}

const Chart: React.FC<ChartProps> = ({ dataChart }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu bán hàng",
        data:
          dataChart?.map((item: any) => {
            item.sale;
          }) || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className=" mt-2 basis-2/3">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
