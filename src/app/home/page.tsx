"use client";
import CustomButton from "@/component/atoms/Button/Button";
import ErrorBox from "@/component/atoms/ErrorBox/ErrorBox";
import CustomInputTitle from "@/component/atoms/InputTitle/InputTitle";
import CustomTextField from "@/component/atoms/TextField/TextField";
import { carInfoSchema } from "@/schema/Schema";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";

const MainContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  margin: "4rem 0px",
});

const MiddleContainer = styled(Box)({
  width: "700px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const RadioGroupTag = styled(RadioGroup)({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  marginTop: "1rem",
});

const ImageButton = styled(InputLabel)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "150px",
  height: "100px",
  fontSize: "12px",
  backgroundColor: "transparent",
  border: "1px solid #ddd",
  color: "black",
  cursor: "pointer",
  borderRadius: "8px",
});

const ImageTag = styled(Box)(() => ({
  width: "100%",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  borderRadius: "8px",
  border: "1px solid #ddd",
  position: "relative",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  "&:hover .trash": {
    opacity: 1,
    visibility: "visible",
  },
}));

const TrashIcon = styled(Box)(() => ({
  position: "absolute",
  zIndex: 9999,
  cursor: "pointer",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease, visibility 0.3s ease",
}));

const page = () => {
  const [noOfCopies, setNoOfCopies] = useState(1);
  const [imagePrev, setImagePrev] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      model: "",
      price: "",
      phone: "",
      pictures: [],
      city: "lahore",
    },
    validationSchema: carInfoSchema,
    onSubmit: (values) => {
      formik.resetForm();
      setImagePrev([]);
      setErrorMessage("");
      setNoOfCopies(1);
      toast.success("Car added successfully!");
      console.log("carInfo", values);
    },
  });

  const handleNoOfCopiesChange = (event: any) => {
    const selectedCopies = Number(event.target.value);
    setNoOfCopies(selectedCopies);

    if (imagePrev.length <= selectedCopies) {
      setErrorMessage("");
    }
  };

  const handleImageChange = (event: any) => {
    const image = event.target.files[0];

    if (imagePrev.length >= noOfCopies) {
      setErrorMessage(
        `You can only upload up to ${noOfCopies} image(s) based on the selected number of copies.`
      );
      return;
    }

    const imageUrl = URL.createObjectURL(image);
    formik.setFieldValue("pictures", [...formik.values.pictures, imageUrl]);
    setImagePrev((prev) => [...prev, imageUrl]);
    setErrorMessage("");
  };

  const handleRemoveImage = (index: any) => {
    const deleteImages = imagePrev?.filter((_, i) => i !== index);
    setImagePrev(deleteImages);
    formik.setFieldValue("pictures", deleteImages);
  };

  return (
    <MainContainer>
      <MiddleContainer>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInputTitle>Car Model</CustomInputTitle>
          <CustomTextField
            type="text"
            name="model"
            value={formik.values.model}
            handleChange={formik.handleChange}
          />
          {formik.touched.model && formik.errors.model && (
            <ErrorBox message={formik.errors.model} />
          )}

          <CustomInputTitle>Price</CustomInputTitle>
          <CustomTextField
            type="text"
            name="price"
            value={formik.values.price}
            handleChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price && (
            <ErrorBox message={formik.errors.price} />
          )}

          <CustomInputTitle>Phone</CustomInputTitle>
          <CustomTextField
            type="number"
            name="phone"
            value={formik.values.phone}
            handleChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone && (
            <ErrorBox message={formik.errors.phone} />
          )}

          <CustomInputTitle>City</CustomInputTitle>
          <RadioGroupTag
            aria-labelledby="demo-radio-buttons-group-label"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="lahore"
              control={<Radio />}
              label="Lahore"
            />
            <FormControlLabel
              value="Karachi"
              control={<Radio />}
              label="Karachi"
            />
          </RadioGroupTag>

          <CustomInputTitle>No of Copies</CustomInputTitle>
          <FormControl sx={{ m: 1, minWidth: 320 }}>
            <Select
              defaultValue={1}
              value={noOfCopies}
              onChange={handleNoOfCopiesChange}
            >
              {[...Array(10)].map((_, index) => (
                <MenuItem value={index + 1} key={index}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <CustomTextField
            type="file"
            name="pictures"
            id="image-upload"
            value=""
            handleChange={handleImageChange}
          />

          <Grid container spacing={2}>
            {imagePrev.map((img, index) => (
              <Grid size={{ xs: 4, md: 3, lg: 2 }} key={index}>
                <ImageTag>
                  <Image fill src={img} alt={`Preview ${index}`} />
                  <TrashIcon className="trash">
                    <DeleteIcon onClick={() => handleRemoveImage(index)} />
                  </TrashIcon>
                </ImageTag>
              </Grid>
            ))}
            <Grid size={{ xs: 4, md: 3, lg: 2 }}>
              <ImageButton htmlFor="image-upload">+ Add Pictures</ImageButton>
            </Grid>
          </Grid>
          {errorMessage && <ErrorBox message={errorMessage} />}
          {formik.touched.pictures && formik.errors.pictures && (
            <ErrorBox message={formik.errors.pictures} />
          )}

          <CustomButton text="Add Car" />
        </form>
      </MiddleContainer>
    </MainContainer>
  );
};

export default page;
