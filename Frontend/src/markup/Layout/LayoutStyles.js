import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  onlineInvisButtonNotSelected: {
    background: "#cccc",
    color: "#888",
    "&:hover": { background: "#cccc" },
    "&:focus": { outline: "none" },
  },
  onlineSelected: {
    background: "green",
    color: "white",
    "&:hover": { background: "green" },
    "&:focus": { outline: "none" },
  },
  invisibleSelected: {
    background: "black",
    color: "white",
    "&:hover": { background: "black" },
    "&:focus": { outline: "none" },
  },
  listItem: {
    display: "flex",
    alignItem: "center",
    cursor: "pointer",
    "&:hover": { color: "blue" },
  },
}));
