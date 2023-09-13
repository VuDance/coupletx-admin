"use client";

import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { signOut } from "next-auth/react";
import Image from "next/image";

import logo from "@/app/images/shopifycart.svg";
import logoText from "@/app/images/shopifytext.svg";

const Header = ({ currentUser }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="p-3 shadow-sm bg-[#fff] flex justify-between items-center">
      <div className=" flex">
        <Image
          alt="logo"
          objectFit="cover"
          width={30}
          height={10}
          src={logo}
          className="h-7"
        />
        <Image
          alt="logo"
          objectFit="cover"
          width={100}
          height={50}
          src={logoText}
          className="h-8"
        />
      </div>
      {currentUser ? (
        <div className=" flex justify-center items-center gap-3">
          {/* <IconButton>
            <Badge color="secondary" badgeContent={1}>
              <NotificationsActiveIcon sx={{ color: "#616a75" }} />
            </Badge>
          </IconButton> */}
          <div>
            <Button onClick={handleClick} className=" gap-3">
              <Avatar alt="Avatar" src={currentUser.image} />
              <p className=" text-black">{currentUser.name}</p>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => signOut()}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      ) : (
        <Avatar alt="Avatar" src="@/app/images/unknownUser.png" />
      )}
    </div>
  );
};

export default Header;
