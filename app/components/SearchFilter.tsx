"use client";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchFilter = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleSearch = (value: string) => {
    router.push(`?filter=${value}`);
  };

  return (
    <div
      className={`border rounded-xl h-10 flex items-center bg-white p-2 relative transition-all ${
        show ? "w-1/3" : "w-1/6"
      }`}
    >
      <div className="flex items-center justify-center pointer-events-none">
        <SearchIcon color="primary" />
      </div>
      <InputBase
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search…"
        sx={{ border: "none", "& fieldset": { border: "none" } }}
        className="pl-3  w-full h-full border-none"
      />
    </div>
  );
};

export default SearchFilter;
