import { Button,Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../.././reducers/auth";

const MyAccount = () => {
  const dispatch = useDispatch()
  const path = useNavigate()
  const handleLogout = ()=>{
    dispatch(logout(null))
    path("/")
  }
  return (
    <Box sx={{  width: "85%",
      height: "100vh",
      position: "absolute",
      right: 0,
      top: 0,
      backgroundColor: "#fff"
  }}>
      <Typography
        variant="h5"
        sx={{
          marginTop: 5,
          color: "#333",
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        My Account
      </Typography>
      <Button variant="contained"  onClick = {handleLogout}>LOG OUT</Button>
    </Box>
  );
}
export default MyAccount;
