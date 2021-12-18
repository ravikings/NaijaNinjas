import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    background: "white",
    flex: 1,
    margin: "0px 220px",
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
    fontSize: 16,
    "&:hover": { background: "#cccc" },
    "&:focus": { outline: "none" },
  },
}));
