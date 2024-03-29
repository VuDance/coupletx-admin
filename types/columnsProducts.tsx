/* eslint-disable react-hooks/rules-of-hooks */
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { IconButton, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useModalDelete from "@/app/hooks/useModalDelete";

const columnsProduct: GridColDef[] = [
  {
    field: "imageUrl",
    headerName: "",
    width: 50,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
  },

  {
    field: "product_name",
    headerName: "Tên sản phẩm",

    flex: 1,
  },
  {
    field: "active",
    headerName: "Trạng thái",
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    headerAlign: "center",
    align: "center",
    flex: 1,

    //   cellClassName: (params: GridCellParams<Number>) => {
    //     return "bg-green-400";
    //   },
    renderCell: (param: GridRenderCellParams<Number>) => (
      <>
        {param.value === "Đang hoạt động" ? (
          <p
            style={{
              color: "black",
              background: "#cdfee1",
              padding: 5,
              borderRadius: 10,
            }}
          >
            Đang hoạt động
          </p>
        ) : (
          <p style={{ backgroundColor: "red", padding: 5, borderRadius: 10 }}>
            Không hoạt động
          </p>
        )}
      </>
    ),
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    headerAlign: "center",
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    flex: 1,
    align: "center",

    renderCell: (param: GridRenderCellParams<any>) => (
      <p>Có {param.value} sản phẩm</p>
    ),
  },

  {
    field: "id",
    headerName: "",
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    headerAlign: "center",
    flex: 1,

    align: "center",

    renderCell: (param: GridRenderCellParams<any>) => {
      const modal = useModalDelete();

      return (
        <div>
          <Link href={`products/${param.value}`} underline="none">
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => {
              modal.onOpen();
              modal.setValue(param.value);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      );
    },
  },
];

export { columnsProduct };
