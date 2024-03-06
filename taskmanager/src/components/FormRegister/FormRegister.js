import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, TextField, Container, Typography, Box } from "@mui/material";

const FormRegister = () => {
  const schema = yup.object().shape({
    userName: yup.string().required("User Name is required."),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .required("Password is required."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match.")
      .required("Please confirm your password."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const navigate = useNavigate();
  const onclickRegister = (data) => {
    if (data.userName && data.email && data.password) navigate("/");
  };

  return (
    <Container
      sx={{
        color: "#fff",
        backgroundColor: "#f2f3f4",
        borderRadius: "10px",
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "#078BBE",
          borderRadius: "10px 10px 0 0",
          padding: "20px",
          textTransform: "uppercase",
        }}
      >
        Register
      </Typography>
      <Box sx={{ width: "85%" }}>
        <TextField
          sx={{ width: "100%", marginTop: "30px", color: "#fff" }}
          label="User name*"
          variant="outlined"
          {...register("userName")}
          error={Boolean(errors.userName)}
          helperText={ errors.userName?.message}
        />
      </Box>
      <Box sx={{ width: "85%" }}>
        <TextField
          sx={{ width: "100%", marginTop: "20px", color: "#fff" }}
          label="Email*"
          variant="outlined"
          type="email"
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={ errors.email?.message}
        />
      </Box>
      <Box sx={{ width: "85%" }}>
        <TextField
          sx={{ width: "100%", marginTop: "20px", color: "#fff" }}
          label="Password*"
          variant="outlined"
          type="password"
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={ errors.password?.message}
        />
      </Box>
      <Box sx={{ width: "85%" }}>
        <TextField
          sx={{ width: "100%", marginTop: "20px", color: "#fff" }}
          label="Confirm Password*"
          variant="outlined"
          type="password"
          {...register("confirmPassword")}
          error={Boolean(errors.confirmPassword)}
          helperText={ errors.confirmPassword?.message}
        />
      </Box>
      <Box>
        <Button
          variant="container"
          sx={{
            backgroundColor: "#60D300",
            margin: "30px 30px",
            borderRadius: "20px",
            padding: "10px",
            width: "350px",
            textAlign: "center",
            "&:hover": { backgroundColor: "#3cb371" },
          }}
          onClick={handleSubmit(onclickRegister)}
          disabled = {!isValid}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};
export default FormRegister;
