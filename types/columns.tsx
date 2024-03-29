import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { IconButton, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useModalDelete from "@/app/hooks/useModalDelete";

const columnsCollections: GridColDef[] = [
  {
    field: "image",
    headerName: "",
    width: 50,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,

    renderCell: (param: GridRenderCellParams<String>) => (
      <Image src={param.value} width={50} height={50} alt="Product Image" />
    ),
  },

  {
    field: "name",
    headerName: "Tên bộ sưu tập",

    flex: 1,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    headerAlign: "center",
    align: "center",
    flex: 1,

    renderCell: (param: GridRenderCellParams<Number>) => (
      <>
        {param.value === 1 ? (
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
    field: "categories",
    headerName: "Danh mục",
    headerAlign: "center",
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    flex: 1,
    align: "center",

    renderCell: (param: GridRenderCellParams<any>) => (
      <p>Có {param.value.length} danh mục</p>
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const modal = useModalDelete();

      return (
        <div>
          <Link href={`collections/${param.value}`} underline="none">
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

export { columnsCollections };
