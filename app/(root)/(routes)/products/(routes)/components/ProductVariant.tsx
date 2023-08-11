"use client";

import {
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import ModalProduct from "./modal/ModalProduct";
import { useFormContext } from "react-hook-form";

const columns: GridColDef[] = [
  { field: "product_variant_name", headerName: "Tên sản phẩm", flex: 1 },
  { field: "color", headerName: "Màu sắc", flex: 2 },
  { field: "quantity", headerName: "Số lượng", flex: 2 },
  { field: "price", headerName: "Giá", flex: 2 },
];
type ProductType = {
  color: string;
  product_variant_name: string;
  price: number;
  quantity: number;
  isChecked: boolean;
  size: string[];
  images: string[];
};

const ProductVariant = () => {
  const { watch, setValue } = useFormContext();
  const data: ProductType[] = watch("productVariant");
  const [variant, setVariant] = useState(data);
  const [tableVariant, setTableVariant] = useState(data);
  const [checkAll, setCheckAll] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleOpenModal = (data: any) => {
    setOpenModal(true);
    setDataModal(data);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const variantI = watch("productVariant");
  const handleClick = () => {
    setVariant((pre) => [
      ...pre,
      {
        color: "#000000",
        product_variant_name: "",
        price: 0,
        quantity: 0,
        isChecked: false,
        size: [],
        images: [],
      },
    ]);
    setValue("productVariant", [
      ...variantI,
      {
        color: "#000000",
        product_variant_name: "",
        price: 0,
        quantity: 0,
        size: [],
        images: [],
      },
    ]);
  };
  const handleDelete = (i: number) => {
    const updatedVariant = variant.filter((item, index: number) => i !== index);
    setVariant(updatedVariant);
  };
  const handleDone = () => {
    setTableVariant(variant);
  };
  const handleCheck = (key: string) => {
    if (key === "all") {
      setCheckAll(!checkAll);
      const updatedTableVariant = tableVariant.map((variant) => ({
        ...variant,
        isChecked: !checkAll,
      }));
      setTableVariant(updatedTableVariant);
    } else {
      const updatedTableVariant = tableVariant.map((variant) =>
        variant.color === key
          ? { ...variant, isChecked: !variant.isChecked }
          : variant
      );
      setTableVariant(updatedTableVariant);
      setCheckAll(true);
    }
  };
  const handleChange = (value: string, index: number) => {
    const updatedVariant = variant.map((item, i) =>
      i === index ? { ...item, color: value } : item
    );

    setVariant(updatedVariant);
    setValue("productVariant", updatedVariant);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-end">
        <Button
          onClick={() => handleClick()}
          className=" bg-green-700 mb-2"
          variant="contained"
          color="success"
          disableRipple
        >
          Thêm màu
        </Button>
      </div>

      {variant.length > 0 && (
        <>
          {variant.map((item, index) => (
            <div key={index} className="flex gap-4 mb-1">
              <TextField
                size="small"
                fullWidth
                defaultValue={item.color}
                placeholder="Mã màu"
                onChange={(e) => {
                  handleChange(e.target.value, index);
                }}
              />
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          ))}
          <div>
            <Button
              onClick={() => handleDone()}
              className="text-black"
              variant="outlined"
              disableRipple
            >
              Done(Đã xong)
            </Button>
          </div>
        </>
      )}
      {tableVariant.length > 0 && (
        <div className="overflow-x-scroll min-w-full  overflow-hidden ">
          <Table className="max-w-full ">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={checkAll}
                    onChange={() => handleCheck("all")}
                  />
                </TableCell>

                {columns.map((column) => (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableVariant.map((variant) => (
                <TableRow className=" relative" key={variant.color}>
                  <TableCell>
                    <Checkbox
                      checked={variant.isChecked}
                      onClick={() => handleCheck(variant.color)}
                    />
                  </TableCell>
                  <TableCell>{variant.product_variant_name}</TableCell>
                  <TableCell>{variant.color}</TableCell>
                  <TableCell>{variant.price}</TableCell>
                  <TableCell>{variant.quantity}</TableCell>
                  <TableCell className=" border-l-2 gap-1 bg-[#fff] z-10 justify-center min-h-[80px] flex items-center sticky right-0">
                    <IconButton onClick={() => handleOpenModal(variant)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <ModalProduct
        data={dataModal}
        open={openModal}
        handleClose={handleCloseModal}
        handleCommit={(data: any, color: string) => {
          setTableVariant((prevTableVariant) =>
            prevTableVariant.map((item) =>
              item.color === color ? { ...data } : item
            )
          );
          setVariant((prevTableVariant) =>
            prevTableVariant.map((item) =>
              item.color === color ? { ...data } : item
            )
          );
        }}
      />
    </div>
  );
};

export default ProductVariant;
