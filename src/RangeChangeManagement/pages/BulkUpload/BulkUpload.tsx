import { Divider, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import ManageTaskEvent from "../../sections/ManageTask/ManageTaskEvent";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  value: {
    flex: 1,
  },
  container: {
    height: "100%",
  },
  tabHead: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
}));
function BulkUpload() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <div>
        <Typography variant="h6" color="primary" align="center">
          Commercial Web Application - Bulk Event Upload
        </Typography>
        <Divider />
      </div> */}
      <div className={classes.value}>
        <ManageTaskEvent />
      </div>
    </div>
  );
}

export default BulkUpload;
