"use client";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";

import React, { useMemo, useState } from "react";
import EnhancedTableHead from "./EnhancedTableHead";
import CreateBlogModal from "./modals/CreateBlogModal";
import { useSession } from "next-auth/react";
import DeleteModal from "@/app/components/modals/DeleteModal";
import DeleteAllModal from "@/app/components/modals/DeleteAllModal";
import Row from "./Row";

interface TableDataProps {
  rows: any[];
}

const TableData: React.FC<TableDataProps> = ({ rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<readonly string[] | any>([]);
  const [dataModal, setDataModal] = useState<any>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDeleteAll, setOpenModalDeleteAll] = useState(false);
  const [dataDelete, setDateDelete] = useState<any>({
    type: "",
    id: -1,
  });

  const session: any = useSession();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.title);
      setSelected(newSelected);
      console.log(selected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string,
    id: number
  ) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setDateDelete({ type: "blogs", id: id });
    setSelected(newSelected);
  };

  const visibleRows = useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rows, rowsPerPage]
  );
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <div>
      <CreateBlogModal
        session={session}
        isOpen={openEditModal}
        data={dataModal}
        onClose={() => setOpenEditModal(false)}
      />

      <DeleteModal
        inputData={{ type: dataDelete.type, id: parseInt(dataDelete.id) }}
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
      />
      <DeleteAllModal
        inputData={{ type: "blogs", data: selected }}
        isOpen={openModalDeleteAll}
        onClose={() => setOpenModalDeleteAll(false)}
      />

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />

          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.title);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <React.Fragment key={index}>
                  <Row
                    setOpenModalDelete={setOpenModalDelete}
                    setOpenEditModal={setOpenEditModal}
                    labelId={labelId}
                    row={row}
                    setDataModal={setDataModal}
                    setDateDelete={setDateDelete}
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                  />
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableData;
