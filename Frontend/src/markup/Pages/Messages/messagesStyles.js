import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    // margin: "20px 220px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 75px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0px 10px",
    },
  },
  search: {
    background: "#eeeeee",
  },
  oneItem: {
    width: 308,
    padding: 15,
    "&:hover": {
      borderLeft: "7px solid blue",
    },
  },
  sendButton: {
    textTransform: "none",
    background: "#2a41e8",
    padding: "0px 25px",
    color: "white",
    // fontSize: 16,
    height:"50px",
    "&:hover": { background: "#cccc" },
    "&:focus": { outline: "none" },
  },
  sendButtonFile: {
    textTransform: "none",
    background: "#2a41e8",
    padding: "0px 25px",
    color: "white",
    fontSize: 16,
    position:"absolute",
    height:"50px",
    top:"20px",
    
    left:"65%",
    "&:hover": { background: "#cccc" },
    "&:focus": { outline: "none" },
  },
}));
