/* eslint-disable react-hooks/rules-of-hooks */
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { IconButton, Link, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useModalDelete from "@/app/hooks/useModalDelete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { format } from "date-fns";

const columnsUser: GridColDef[] = [
  {
    field: "name",
    headerName: "Tên khách hàng",
    width: 50,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    headerAlign: "center",
    align: "center",
    flex: 1,

    renderCell: (param: GridRenderCellParams<String>) => <p>{param.value}</p>,
  },

  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    align: "center",
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
    field: "isAdmin",
    headerName: "Vai trò",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (param: GridRenderCellParams<String>) => (
      <p>{param.value === true ? "Admin" : "User"}</p>
    ),
  },
  {
    field: "gender",
    headerName: "Giới tính",
    headerAlign: "center",
    align: "center",
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    flex: 1,

    renderCell: (param: GridRenderCellParams<any>) => (
      <p> {param.value === null ? "Không xác định" : param.value} </p>
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

      const [open, setOpen] = React.useState(false);
      const [loading, setLoading] = React.useState(false);

      const handleClose = () => {
        setOpen(false);
      };
      return (
        <div>
          <IconButton
            onClick={() => {
              modal.onOpen();
              modal.setValue(param.value);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton color="primary">
            <VisibilityIcon color="primary" onClick={() => setOpen(true)} />
          </IconButton>
          <Modal
            className=" items-center justify-center flex"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="w-1/2 p-3 rounded-md bg-white">
              <p className=" text-xl font-semibold">
                Thông tin {param.row.name}
              </p>
              <div className="flex flex-wrap mt-3">
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Tên khách hàng:</p>
                  <p>{param.row.name}</p>
                </div>
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Email:</p>
                  <p>{param.row.email}</p>
                </div>
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Giới tính:</p>
                  <p>
                    {param.row.gender === null
                      ? "Không xác định"
                      : param.row.gender}
                  </p>
                </div>
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Ngày sinh:</p>
                  <p>
                    {" "}
                    {format(
                      new Date(param.row.date_of_birth),
                      "HH:mm dd/MM/yyyy"
                    )}{" "}
                  </p>
                </div>
                <div className="flex items-center mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Trạng thái:</p>

                  {param.row.active === true && (
                    <p style={{ color: "green" }}>Đã kích hoạt</p>
                  )}
                  {param.row.active === false && (
                    <p style={{ color: "red" }} className=" text-red-500">
                      Chưa kích hoạt
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      );
    },
  },
];

export { columnsUser };
