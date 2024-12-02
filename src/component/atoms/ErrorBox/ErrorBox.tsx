import React, { FC } from "react";
import { styled, Typography } from "@mui/material";

interface ErrorMessage {
  message?: string | string[];
}

const ErrorBox: FC<ErrorMessage> = ({ message }) => {
  return <Message>{message}</Message>;
};

export default ErrorBox;

export const Message = styled(Typography)<ErrorMessage>(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.error.main,
}));
