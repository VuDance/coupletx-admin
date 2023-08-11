"use client";

import Button from "@mui/material/Button";
import { SvgIcon } from "@mui/material";
import React from "react";

interface AuthButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: typeof SvgIcon;
  variant?: "text" | "outlined" | "contained";

  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  variant,
  color,
  onClick,
}) => {
  return (
    <Button onClick={onClick} type="submit" variant={variant} color={color}>
      {label}
    </Button>
  );
};

export default AuthButton;
