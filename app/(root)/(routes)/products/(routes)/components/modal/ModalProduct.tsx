"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Divider } from "@mui/material";
import UploadImageWrapper from "../../../../../../components/input/UploadImageWrapper";
import Size from "../Size";
import InputModal from "./InputModal";
import { useFormContext } from "react-hook-form";

interface ModalProductProps {
  data?: any;
  open: boolean;
  handleClose: () => void;
  handleCommit: (data: any, color: string) => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({
  data,
  open,
  handleClose,
  handleCommit,
}) => {
  const { getValues } = useFormContext();

  const commitData = () => {
    const firstData = getValues("productVariant").find(
      (item: any) => item.color === data.color
    );
    const convertData = {
      data: { ...firstData, isChecked: data.isChecked },
      color: data.color,
    };
    return convertData;
  };
  if (data === null) {
    return null;
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-[#fff] h-5/6 w-1/2 rounded-lg p-3">
          <p className=" p-2 font-semibold text-xl">Chỉnh sửa {data.color}</p>
          <div className="h-[80%] overflow-y-scroll">
            <Divider className="mt-2" />
            <InputModal
              type="text"
              placeholder="Tên biến thể"
              label="Tên biến thể"
              value={{
                product_variant_name: data.product_variant_name,
                color: data.color,
              }}
            />

            <Divider className="mt-2" />
            <InputModal
              type="number"
              placeholder="Giá"
              label="Giá"
              value={{
                price: data.price,
                color: data.color,
              }}
            />

            <Divider className="mt-2" />

            <InputModal
              type="number"
              placeholder="Số lượng"
              label="Số lượng"
              value={{
                quantity: data.quantity,
                color: data.color,
              }}
            />

            <Divider className="mt-2" />

            <div className="bg-[#fff] shadow-md rounded-lg p-3">
              <p className=" font-semibold ">Hình ảnh</p>
              <UploadImageWrapper
                data={data.images}
                color={data.color}
                multiple
              />
            </div>

            <Divider className="mt-2" />
            <Size color={data.color} />
          </div>

          <div className="w-full flex justify-end mt-2">
            <Button
              variant="contained"
              color="success"
              className=" bg-green-500 text-white"
              onClick={() => {
                handleCommit(commitData().data, commitData().color);
                handleClose();
              }}
            >
              Hoàn tất
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalProduct;
