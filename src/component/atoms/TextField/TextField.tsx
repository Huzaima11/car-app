import React, { useState } from "react";
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
interface CustomTextFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  message?: boolean;
  id?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  type,
  placeholder,
  value,
  id,
  handleChange,
}: any) => {
  const [visible, setVisible] = useState(false);
  const handleClickShowPassword = () => setVisible(!visible);

  return (
    <CustomField
      type={visible && type === "password" ? "text" : type}
      placeholder={placeholder}
      name={name}
      value={value}
      id={id}
      onChange={handleChange}
      slotProps={{
        input: {
          endAdornment: type === "password" && value?.length >= 1 && (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {visible ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default CustomTextField;

const CustomField = styled(TextField)(({ type }) => ({
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "white",
  display: type === "file" ? "none" : "",
}));
