"use client";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import React, { useState } from "react";

interface SecondaryMenuItem {
  label: string;
  onClick?: () => void;
  selected?: boolean;
}
interface SideBarItemProps {
  icon: typeof SvgIcon;
  label: string;
  onClick?: () => void;
  selected?: boolean;
  secondaryMenu?: SecondaryMenuItem[];
}
const SideBarItem: React.FC<SideBarItemProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
  secondaryMenu,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton
        onClick={secondaryMenu ? handleClick : onClick}
        selected={selected}
        className={`${selected && "text-green-700"} font-semibold`}
      >
        <ListItemIcon>
          <Icon className={`${selected && "text-green-700"}`} />
        </ListItemIcon>
        <ListItemText primary={label} />
        {secondaryMenu && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {secondaryMenu && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {secondaryMenu.map((item, index) => (
              <ListItemButton
                onClick={item.onClick}
                selected={item.selected}
                key={index}
                sx={{ pl: 9 }}
                className={`${item.selected && "text-green-700"} font-semibold`}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SideBarItem;
