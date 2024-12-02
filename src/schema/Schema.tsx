import * as Yup from "yup";

export const phoneRegex = /^((\+92|0092|92|0)?)(3)([0-9]{9})$/;

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export const carInfoSchema = Yup.object().shape({
  model: Yup.string()
    .min(3, "Car Model must be at least 3 characters")
    .required("Car model is required"),
  price: Yup.string().required("Price is required"),
  phone: Yup.string()
    .matches(phoneRegex, "Phone number must be 11 digits")
    .required("Phone number is required"),
  city: Yup.string().required("Phone number is required"),
  pictures: Yup.array()
    .min(1, "At least 1 picture is required")
    .required("Pictures are required"),
});
