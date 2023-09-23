import {
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useCallback, useMemo, useState } from "react";
import ModalAddSize from "./modal/ModalAddSize";
import { useFormContext } from "react-hook-form";
import ModalEditSize from "./modal/ModalEditSize";

interface SizeProps {
  color: string;
}
interface DataModalEditProps {
  name_size: string;
  technical_specification: [];
}

const Size: React.FC<SizeProps> = ({ color }) => {
  const { getValues, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataModalEdit, setDataModalEdit] = useState<DataModalEditProps>({
    name_size: "",
    technical_specification: [],
  });

  const data = getValues("productVariant");
  const sizeList = data.find((item: any) => item.color === color);

  //handle create modal
  const handleOpenCreateSize = () => {
    setOpen(true);
  };
  const handleCloseCreateSize = () => {
    setOpen(false);
  };

  const handleDelete = (name: string) => {
    const filteredSizes = sizeList.size.filter(
      (v: any) => v.name_size !== name
    );
    setValue(
      "productVariant",
      sizeList.size.filter((v: any) =>
        v.color === color
          ? {
              filteredSizes,
            }
          : v
      )
    );
  };

  //handle edit modal
  const handleOpenModalEdit = (nameSize: string | undefined) => {
    if (nameSize !== undefined) {
      setDataModalEdit(
        sizeList.size.find(
          (item: DataModalEditProps) => item.name_size === nameSize
        )
      );
    } else {
      setDataModalEdit({
        name_size: "",
        technical_specification: [],
      });
    }
    setOpenEdit(true);
  };

  return (
    <div className="w-full">
      {/* Modal create size */}

      <ModalAddSize
        color={color}
        open={open}
        handleCloseCreateSize={handleCloseCreateSize}
      />
      <ModalEditSize
        data={dataModalEdit}
        color={color}
        open={openEdit}
        handleCloseEditSize={() => setOpenEdit(false)}
      />

      <p>Size</p>
      <div className="w-full flex justify-end">
        <Button
          onClick={handleOpenCreateSize}
          className=" bg-green-600 "
          variant="contained"
          color="success"
        >
          Thêm size
        </Button>
      </div>
      {sizeList?.size.length > 0 && (
        <Table className="w-full">
          <TableHead>
            <TableRow>
              <TableCell className="w-[58%]">Tên Size</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizeList.size.map((size: any) => (
              <TableRow className=" relative" key={size.name_size}>
                <TableCell>{size.name_size}</TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    className="border-black w-[100px] text-black hover:border-black"
                    size="small"
                    disableRipple
                    onClick={() => handleOpenModalEdit(size.name_size)}
                  >
                    Chỉnh sửa
                  </Button>
                  <IconButton onClick={() => handleDelete(size.name_size)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Size;
