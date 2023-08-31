import {
  Box,
  Button,
  Checkbox,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface RowProps {
  isItemSelected: boolean;
  handleClick: (event: any, name: string, id: number) => void;
  row: any;
  labelId: string;

  setDataModal: (e: any) => void;
  setOpenEditModal: (e: any) => void;
  setOpenModalDelete: (e: any) => void;
  setDateDelete: (e: any) => void;
}

const Row: React.FC<RowProps> = ({
  setDateDelete,
  isItemSelected,
  handleClick,
  row,
  labelId,

  setDataModal,
  setOpenEditModal,
  setOpenModalDelete,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
        onClick={(event) => handleClick(event, row.title, parseInt(row.id))}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell id={labelId} align="left">
          {row.title}
        </TableCell>
        <TableCell align="left">{row.author}</TableCell>
        <TableCell align="left">
          {format(new Date(row.created_at), "HH:mm dd/MM/yyyy")}
        </TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() => {
              setOpenEditModal(true);
              setDataModal({
                id: row.id,
                type: "update",
                title: row.title,
                image: row.image,
              });
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => setOpenModalDelete(true)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className="flex justify-between items-center">
                <Typography variant="h6" gutterBottom component="div">
                  Post
                </Typography>
                <Button
                  onClick={() => router.push(`/blogs/${row.id}/posts/new`)}
                  className=" normal-case"
                >
                  Thêm bài viết
                </Button>
              </div>

              {row.posts.length > 0 ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Tên bài viết</TableCell>
                      <TableCell align="left">Tác giả</TableCell>
                      <TableCell align="left">Ngày tạo</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.posts.map((post: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell align="left">{post.title}</TableCell>
                        <TableCell align="left">{post.author}</TableCell>

                        <TableCell align="left">
                          {format(
                            new Date(post.created_at),
                            "HH:mm dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() =>
                              router.push(`/blogs/${row.id}/posts/${post.id}`)
                            }
                          >
                            <EditIcon color="primary" />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setOpenModalDelete(true);
                              setDateDelete({
                                type: "posts",
                                id: parseInt(post.id),
                              });
                            }}
                          >
                            <DeleteForeverIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>Không có bài post nào !</div>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
