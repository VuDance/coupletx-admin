/* eslint-disable react-hooks/rules-of-hooks */
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import useModalDelete from "@/app/hooks/useModalDelete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PendingIcon from "@mui/icons-material/Pending";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";

const columnsOrders: GridColDef[] = [
  {
    field: "user",
    headerName: "Mã đơn hàng",
    flex: 1,
    renderCell: (param: GridRenderCellParams<any>) => <p> {param.row.id}</p>,
  },
  {
    field: "payment_method",
    headerName: "Loại thanh toán",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (param: GridRenderCellParams<any>) => <p> {param.value}</p>,
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

    //   cellClassName: (params: GridCellParams<Number>) => {
    //     return "bg-green-400";
    //   },
    renderCell: (param: GridRenderCellParams<Number>) => (
      <>
        {param.value === "confirmed" && (
          <p
            style={{
              color: "white",
              background: "green",
              padding: 5,
              borderRadius: 10,
            }}
          >
            Đã xác nhận
          </p>
        )}
        {param.value === "waiting" && (
          <p
            style={{
              color: "white",
              backgroundColor: "orange",
              padding: 5,
              borderRadius: 10,
            }}
          >
            Đang chờ
          </p>
        )}
        {param.value === "canceled" && (
          <p
            style={{
              color: "white",
              backgroundColor: "red",
              padding: 5,
              borderRadius: 10,
            }}
          >
            Đã hủy
          </p>
        )}
      </>
    ),
  },
  {
    field: "phone_number",
    headerName: "Số lượng",
    headerAlign: "center",
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    flex: 1,
    align: "center",

    renderCell: (param: GridRenderCellParams<any>) => <p> {param.value}</p>,
  },
  {
    field: "total_price",
    headerName: "Giá tiền",
    headerAlign: "center",
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    flex: 1,
    align: "center",

    renderCell: (param: GridRenderCellParams<any>) => <p>{param.value}</p>,
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
      console.log(param);
      const status = param.row.status;
      const session: any = useSession();
      const router = useRouter();

      const [open, setOpen] = React.useState(false);
      const [loading, setLoading] = React.useState(false);
      const handleClose = () => {
        setOpen(false);
      };
      const updateOrder = async (id: string, status: string) => {
        try {
          setLoading(true);
          const data = { id: id, status: status };
          const res = await axios.put("/api/orders/updateOrder", data, {
            headers: {
              authorization: session?.data.accessToken,
            },
          });
          toast.success(res.data.message);
          router.refresh();
        } catch (error: any) {
          if (error.response.data.errorType === "Authorization") {
            toast.error(error.response.data.error);
          }
          if (error.response.data.errorType === "TokenExpired") {
            toast.error(error.response.data.error);
            signOut();
          } else {
            toast.error(error.response.data.message);
          }
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="flex justify-center items-center">
          {status === "waiting" && loading === false && (
            <>
              <IconButton
                onClick={() => {
                  updateOrder(param.row.id, "confirmed");
                }}
              >
                <CheckIcon color="success" />
              </IconButton>
              <IconButton
                onClick={() => {
                  updateOrder(param.row.id, "canceled");
                }}
              >
                <CloseIcon color="error" />
              </IconButton>
            </>
          )}
          {loading === true && (
            <>
              <PendingIcon />
            </>
          )}

          <IconButton color="primary" onClick={() => setOpen(true)}>
            <VisibilityIcon />
          </IconButton>
          <Modal
            className=" items-center justify-center flex"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="w-1/2 p-3 rounded-md bg-white">
              <p className=" font-semibold text-lg">Đơn hàng {param.value}</p>
              <div className="flex flex-wrap mt-3">
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Tên người mua:</p>
                  <p>{param.row.user.name}</p>
                </div>
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Mã đơn:</p>
                  <p>{param.value}</p>
                </div>
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Phương thức thanh toán:</p>
                  <p>{param.row.payment_method}</p>
                </div>
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Giá tiền:</p>
                  <p>{param.row.total_price} VND</p>
                </div>
                <div className="flex items-center mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Trạng thái:</p>
                  {param.row.status === "waiting" && (
                    <p style={{ color: "orange" }}>Đang chờ</p>
                  )}
                  {param.row.status === "confirmed" && (
                    <p style={{ color: "green" }}>Đã xác nhận</p>
                  )}
                  {param.row.status === "canceled" && (
                    <p style={{ color: "red" }} className=" text-red-500">
                      Đã hủy
                    </p>
                  )}
                </div>
                <div className="flex mb-3 w-1/2 gap-1">
                  <p className=" font-semibold">Ngày mua:</p>

                  <p>
                    {format(new Date(param.row.created_at), "HH:mm dd/MM/yyyy")}{" "}
                  </p>
                </div>
              </div>
              <Divider />
              <div
                style={{ height: 200, overflowY: "scroll" }}
                className="w-full h-[400px]"
              >
                <table align="center" className="w-full border">
                  <tbody>
                    <tr>
                      <th align="center">Mã SP</th>
                      <th align="center">Hình ảnh</th>
                      <th align="center">Tên SP</th>
                      <th align="center">Số lượng</th>
                      <th align="center">Size</th>
                      <th align="center">Giá</th>
                    </tr>
                    {param.row.order_item.map((item: any) => (
                      <tr key={item.id}>
                        <td align="center">{item.product_variant.id}</td>
                        <td align="center">
                          <Image
                            width={50}
                            height={50}
                            src={item.product_variant.images[0].imageUrl}
                            alt="image"
                          />
                        </td>
                        <td align="center">
                          {item.product_variant.product_variant_name}
                        </td>
                        <td align="center">{item.quantity}</td>
                        <td align="center">{item.size}</td>
                        <td align="center">{item.product_variant.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal>
        </div>
      );
    },
  },
];

export { columnsOrders };
