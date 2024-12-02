"use client";
import { styled, Box, Typography } from "@mui/material";
import CustomInputTitle from "@/component/atoms/InputTitle/InputTitle";
import CustomTextField from "@/component/atoms/TextField/TextField";
import { useFormik } from "formik";
import { loginSchema } from "@/schema/Schema";
import ErrorBox from "@/component/atoms/ErrorBox/ErrorBox";
import CustomButton from "@/component/atoms/Button/Button";

const SignInContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

const SignInCard = styled(Box)({
  padding: "32px",
  borderRadius: "8px",
  width: "500px",
});
const Title = styled(Typography)({
  textAlign: "center",
  fontSize: "24px",
  marginBottom: "20px",
  fontWeight: "600",
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("login user", values);
    },
  });

  return (
    <SignInContainer>
      <SignInCard>
        <Title>Sign In</Title>
        <form onSubmit={formik.handleSubmit}>
          <CustomInputTitle>E-mail</CustomInputTitle>
          <CustomTextField
            type="email"
            placeholder="namn@mail.com"
            name="email"
            value={formik.values.email}
            handleChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorBox message={formik.errors.email} />
          )}
          <CustomInputTitle>Password</CustomInputTitle>
          <CustomTextField
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            handleChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorBox message={formik.errors.password} />
          )}
          <CustomButton text="Sign In" />
        </form>
      </SignInCard>
    </SignInContainer>
  );
};

export default SignIn;
