import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "120px",
    width: "120px",
    [theme.breakpoints.down("xs")]: {
      height: "70px",
      width: "70px",
    },
  },
  headerGrid: {
    marginLeft: 100,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 75,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 50,
    },
  },
  main: {
    margin: "0px 100px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 75px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0px 50px",
    },
  },
  tab: {
    "&:hover": {
      fontWeight: "bold",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));
