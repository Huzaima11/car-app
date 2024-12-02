import React, { FC } from "react";
import { InputLabel, styled } from "@mui/material";

interface InputTitleProps {
  children: string;
}

const CustomInputTitle: FC<InputTitleProps> = ({ children }) => {
  return <InputTitle className="font-poppins">{children}</InputTitle>;
};

export default CustomInputTitle;

export const InputTitle = styled(InputLabel)<InputTitleProps>(({ theme }) => ({
  fontSize: "16px",
  margin: "5px 0px",
  [theme.breakpoints.down(1080)]: {
    fontSize: "15px",
  },
}));
