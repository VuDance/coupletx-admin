"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import SideBarItem from "./SideBarItem";
import { List } from "@mui/material";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const items = useMemo(
    () => [
      {
        icon: HomeIcon,
        label: "Trang chủ",
        selected: pathname === "/",
        onClick: () => {
          router.push("/");
        },
      },
      {
        icon: LocalOfferIcon,
        label: "Sản phẩm",

        selected: pathname == process.env.MY_URL,
        onClick: undefined,
        secondaryMenu: [
          {
            label: "Kho hàng",
            selected: pathname?.includes("products"),
            onClick: () => {
              router.push("/products");
            },
          },
          {
            label: "Bộ sưu tập",
            selected: pathname?.includes("collections"),
            onClick: () => {
              router.push("/collections");
            },
          },
          {
            label: "Danh mục",
            selected: pathname?.includes("categories"),
            onClick: () => {
              router.push("/categories");
            },
          },
        ],
      },
      {
        icon: ShoppingBasketIcon,
        label: "Đơn hàng",
        selected: pathname?.includes("orders"),
        onClick: () => {
          router.push("/orders");
        },
      },
      {
        icon: PersonIcon,
        label: "Khách hàng",
        selected: pathname?.includes("customers"),
        onClick: () => {
          router.push("/customers");
        },
      },
      {
        icon: BookIcon,
        label: "Blog",
        selected: pathname?.includes("blogs"),
        onClick: () => {
          router.push("/blogs");
        },
      },
    ],
    [pathname, router]
  );
  return (
    <div className="p-3 w-1/5 border-r fixed">
      <List>
        {items.map((item, index) => (
          <SideBarItem {...item} onClick={item.onClick} key={index} />
        ))}
      </List>
    </div>
  );
};

export default SideBar;
