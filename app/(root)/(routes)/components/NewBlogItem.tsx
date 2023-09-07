import { format } from "date-fns";
import React from "react";

interface NewBlogItemProps {
  title: string;
  date: Date;
}

const NewBlogItem: React.FC<NewBlogItemProps> = ({ title, date }) => {
  return (
    <div className=" cursor-pointer p-2 rounded-lg border shadow-sm">
      <p className=" hover:underline transition-all  text-blue-500 font-semibold text-lg">
        {title}
      </p>

      <p className=" text-xs">{format(new Date(date), "HH:mm dd/MM/yyyy")}</p>
    </div>
  );
};

export default NewBlogItem;
