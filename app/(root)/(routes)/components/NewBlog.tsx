import { Blogs } from "@prisma/client";
import React from "react";
import NewBlogItem from "./NewBlogItem";

interface NewBlogProps {
  data: Blogs[];
}

const NewBlog: React.FC<NewBlogProps> = ({ data }) => {
  console.log(data);
  return (
    <div className=" mt-2 basis-1/3">
      <p className=" font-semibold mb-2">Blog mới</p>
      <div className="flex flex-col gap-2">
        {data &&
          data.map((blog) => (
            <NewBlogItem
              key={blog.id}
              title={blog.title}
              date={blog.created_at}
            />
          ))}
      </div>
    </div>
  );
};

export default NewBlog;
