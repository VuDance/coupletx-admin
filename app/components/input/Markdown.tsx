"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Controller } from "react-hook-form";

interface MarkdownProps {
  label: string;
  id: string;
  control: any;
  large?: boolean;
}

const Markdown: React.FC<MarkdownProps> = ({ label, id, control, large }) => {
  return (
    <Controller
      name={id}
      control={control}
      defaultValue=""
      // rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <div data-color-mode="light">
          <p className=" font-semibold">{label}</p>
          <MDEditor
            className={`${large && "!h-[500px]"}`}
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    />
  );
};

export default Markdown;
