import {
  ListItemButton,
  Box,
  Typography,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import { Link, useLocation } from "react-router-dom";
import "./SidebarData";
import { SidebarData } from "./SidebarData.js";

const useStyles = makeStyles(() =>
  createStyles({
    linkStyle: {
      textDecoration: "none",
    },
  })
);

const SidebarTask = () => {
  let location = useLocation();
  let classes = useStyles();
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        width: "15%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0,
      }}
    >
      <Box sx={{ display: "flex", margin: "20px", paddingTop: "20px" }}>
        <DoneSharpIcon
          sx={{
            height: "45px",
            width: "45px",
            backgroundColor: "#37B6D8",
            borderRadius: "50%",
            color: "#fff",
          }}
        ></DoneSharpIcon>
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontSize: 30,
            marginLeft: 2,
            textTransform: "capitalize",
          }}
        >
          task
        </Typography>
      </Box>
      <List sx={{ marginTop: "25px", listStyle: "none", paddingLeft: 0 }}>
        {SidebarData.map((item) => (
          <Link to={item.link} key={item.id} className={classes.linkStyle}>
            <ListItem
              sx={{
                borderRight:
                  location.pathname === item.link ? "4px solid #fff " : "none",
                padding: 0,
                color: "#fff",
              }}
            >
              <ListItemButton sx={{ padding: "15px", width: "100" }}>
                <ListItemIcon
                  sx={{
                    height: "30px",
                    width: "30px",
                    marginLeft: "20px",
                    color: "#fff",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};
export default SidebarTask;
