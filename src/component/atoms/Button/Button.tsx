import React, { FC } from "react";
import { styled, Button } from "@mui/material";

const SignInButton = styled(Button)({
  marginTop: "20px",
  width: "100%",
  display: "block",
});

interface ButtonProps {
  text: string;
}

const CustomButton: FC<ButtonProps> = ({ text }) => {
  return (
    <SignInButton type="submit" variant="contained" color="primary">
      {text}
    </SignInButton>
  );
};

export default CustomButton;
