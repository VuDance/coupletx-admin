"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Controller } from "react-hook-form";

interface MarkdownProps {
  label: string;
  id: string;
  control: any;
}

const Markdown: React.FC<MarkdownProps> = ({ label, id, control }) => {
  return (
    <Controller
      name={id}
      control={control}
      defaultValue=""
      // rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <div data-color-mode="light">
          <p>{label}</p>
          <MDEditor value={value} onChange={onChange} />
        </div>
      )}
    />
  );
};

export default Markdown;
