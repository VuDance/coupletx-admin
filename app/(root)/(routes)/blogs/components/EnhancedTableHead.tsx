import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

interface EnhancedTableProps {
  numSelected: number;

  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const headCells = [
  { name: "" },

  { name: "Tên blog" },
  { name: "Tác giả" },
  {
    name: "Ngày tạo",
  },
  { name: "" },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell key={index} align={"left"}>
            {headCell.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
