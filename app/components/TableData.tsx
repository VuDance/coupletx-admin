"use client";

import { columnsCollections } from "@/types/columns";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import useModalDelete from "../hooks/useModalDelete";
import DeleteModal from "./modals/DeleteModal";
import useDeleteAllModal from "../hooks/useDeleteAllModal";
import DeleteAllModal from "./modals/DeleteAllModal";
import { Button } from "@mui/material";
import { columnsProduct } from "@/types/columnsProducts";

interface TableDataProps {
  type: string;
  rows: Product[];
}

const TableData: React.FC<TableDataProps> = ({ rows, type }) => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const modal = useModalDelete();
  const modalDeleteAll = useDeleteAllModal();

  useEffect(() => {
    if (type === "collections") {
      setColumns(columnsCollections);
    }
    if (type === "products") {
      setColumns(columnsProduct);
    }
  }, [type]);

  return (
    <>
      <DeleteModal
        inputData={{ type: type, id: parseInt(modal.value) }}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
      <DeleteAllModal
        inputData={{ type: type, data: modalDeleteAll.value }}
        isOpen={modalDeleteAll.isOpen}
        onClose={modalDeleteAll.onClose}
      />
      <DataGrid
        style={{ backgroundColor: "#fff", height: "auto" }}
        rows={rows}
        autoHeight
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          modalDeleteAll.setValue(newRowSelectionModel);
        }}
        disableRowSelectionOnClick
      />
      {modalDeleteAll.value.length > 1 && (
        <Button
          onClick={modalDeleteAll.onOpen}
          className="bg-orange-500 text-white w-[12%] normal-case"
          variant="contained"
          color="error"
        >
          Xóa tất cả
        </Button>
      )}
    </>
  );
};

export default TableData;
