import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../.././reducers/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    linkStyle: {
      textDecoration: "none",
      cursor: "pointer",
      color: "#078BBE",
      fontFamily: "roboto"
    },
  })
);

const FormLogin = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const schema = yup.object().shape({
    userName: yup.string().required("User Name is required."),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const onclickLogin = (data, e) => {
    e.preventDefault();
    const userName = data.userName;
    const password = data.password;
    if (userName && password) {
      login({ userName, password }, dispatch);
    }
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
        position: "relative",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "#078BBE",
          borderRadius: "10px 10px 0 0",
          padding: "20px",
          textTransform: "uppercase",
        }}
      >
        Login
      </Typography>
      <Box sx={{ width: "85%" }}>
        <TextField
          sx={{ width: "100%", marginTop: "20px", color: "#fff" }}
          label="User name*"
          variant="outlined"
          {...register("userName")}
          error={Boolean(errors.userName)}
          helperText={errors.userName?.message}
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
          helperText={errors.password?.message}
        />
      </Box>
      <Box>
        <Button
          variant="container"
          onClick={handleSubmit(onclickLogin)}
          sx={{
            backgroundColor: "#60D300",
            margin: "30px 30px 20px",
            borderRadius: "20px",
            padding: "10px",
            width: "350px",
            textAlign: "center",
            "&:hover": { backgroundColor: "#3cb371" },
          }}
          disabled={!isValid}
        >
          Login
        </Button>
      </Box>
      <Grid container rowSpacing={1} spacing={0} sx={{ marginBottom: 5 }}>
        <Grid xs={6}>
          <Typography variant="body1" sx={{ marginLeft: 10, color: "#808080" }}>
            Not registered ?
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Link
            to="/Register"
            className={classes.linkStyle}
          >
            Create an account
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormLogin;
