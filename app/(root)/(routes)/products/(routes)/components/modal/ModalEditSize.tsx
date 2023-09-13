"use client";

import { Button, IconButton, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TechSpecItem {
  name_technical_specification: string;
  value: string;
}

type TechSpecProps = TechSpecItem[];

interface ModalEditSizeProps {
  open: boolean;
  //   data?: DataProps;
  handleCloseEditSize: () => void;
  color: string;
  data?: { name_size: string; technical_specification: [] };
}

const ModalEditSize: React.FC<ModalEditSizeProps> = ({
  open,
  color,
  data,
  handleCloseEditSize,
}) => {
  const { watch, setValue, getValues } = useFormContext();
  const [nameSize, setNameSize] = useState("");
  const [technicalSpec, setTechnicalSpec] = useState<TechSpecProps>([]);

  const handleAddTechnicalSpec = () => {
    setTechnicalSpec((prev) => [
      ...prev,
      {
        name_technical_specification: "",
        value: "",
      },
    ]);
  };

  const handleOnChange = (num: number, field: string, value: string) => {
    if (field === "name_technical_specification") {
      const updatedTechnicalSpec = technicalSpec.map((item, index) =>
        index === num ? { ...item, name_technical_specification: value } : item
      );
      setTechnicalSpec(updatedTechnicalSpec);
    } else {
      const updatedTechnicalSpec = technicalSpec.map((item, index) =>
        index === num ? { ...item, value: value } : item
      );
      setTechnicalSpec(updatedTechnicalSpec);
    }
  };

  const handleDone = () => {
    const productVariant = getValues("productVariant");
    const productVariantIndex = productVariant.findIndex(
      (item: any) => item.color === color
    );
    const updateData = productVariant[productVariantIndex].size.map(
      (item: any) =>
        item.name_size === data?.name_size
          ? { name_size: nameSize, technical_specification: technicalSpec }
          : item
    );
    setValue(`productVariant.${productVariantIndex}.size`, updateData);

    setNameSize(""), setTechnicalSpec([]);
    handleCloseEditSize();
  };
  useEffect(() => {
    setNameSize(data?.name_size || "");
    setTechnicalSpec(data?.technical_specification || []);
  }, [data]);
  return (
    <Modal
      open={open}
      onClose={handleCloseEditSize}
      className="flex justify-center items-center"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" bg-white rounded-lg p-3 w-1/3 ">
        <TextField
          fullWidth
          onChange={(e) => setNameSize(e.target.value)}
          value={nameSize}
        ></TextField>
        <div className="flex w-full gap-2 flex-col justify-between items-center">
          <div className="flex w-full justify-between items-center">
            <p className="w-full">Thông số kỹ thuật</p>
            <IconButton onClick={handleAddTechnicalSpec}>
              <AddIcon color="primary" />
            </IconButton>
          </div>
          {technicalSpec.length > 0 &&
            technicalSpec.map((item, index) => (
              <div
                className="flex gap-2 justify-center items-center"
                key={index}
              >
                <TextField
                  onChange={(e) =>
                    handleOnChange(
                      index,
                      "name_technical_specification",
                      e.target.value
                    )
                  }
                  placeholder="Tên"
                  size="small"
                  value={item.name_technical_specification || ""}
                ></TextField>
                <p>:</p>
                <TextField
                  onChange={(e) =>
                    handleOnChange(index, "value", e.target.value)
                  }
                  placeholder="Giá trị"
                  size="small"
                  value={item.value || ""}
                ></TextField>
              </div>
            ))}
        </div>
        <Button
          disabled={nameSize === ""}
          onClick={handleDone}
          color="success"
          variant="contained"
          className="bg-green-700 mt-2"
          disableRipple
        >
          <p>Done (xong)</p>
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEditSize;
