import React from "react";
import { Backdrop, makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function BackdropLoading({ loading }) {
  const classes = useStyles();

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
