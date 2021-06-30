import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemIcon } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#FAFBFD",
    borderRadius: "7px",
  },
  radioButton: {
    color: "#2B7AE4 !important",
  },
  listText: {
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#616161",
  },
}));

export default function RecentActivity() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <FiberManualRecordOutlinedIcon style={{ color: "#D2D2D2" }} />
        </ListItemIcon>
        <ListItemText
          classes={{ root: classes.listText }}
          primary="Sagittis nunc non odio sem. Purus sed bibendum iaculis."
          secondary="Jan 9, 2014"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <FiberManualRecordOutlinedIcon style={{ color: "#D2D2D2" }} />
        </ListItemIcon>
        <ListItemText
          classes={{ root: classes.listText }}
          primary="Sagittis nunc non odio sem. Purus sed bibendum iaculis."
          secondary="Jan 9, 2014"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <FiberManualRecordOutlinedIcon style={{ color: "#D2D2D2" }} />
        </ListItemIcon>
        <ListItemText
          classes={{ root: classes.listText }}
          primary="Sagittis nunc non odio sem. Purus sed bibendum iaculis."
          secondary="Jan 9, 2014"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <FiberManualRecordOutlinedIcon style={{ color: "#D2D2D2" }} />
        </ListItemIcon>
        <ListItemText
          classes={{ root: classes.listText }}
          primary="Sagittis nunc non odio sem. Purus sed bibendum iaculis."
          secondary="Jan 9, 2014"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <FiberManualRecordOutlinedIcon style={{ color: "#D2D2D2" }} />
        </ListItemIcon>
        <ListItemText
          classes={{ root: classes.listText }}
          primary="Sagittis nunc non odio sem. Purus sed bibendum iaculis."
          secondary="Jan 9, 2014"
        />
      </ListItem>
      <ListItem>
        <span
          style={{
            fontFamily: "Mulish",
            fontSize: "18px",
            fontStyle: "normal",
            lineHeight: "23px",
            textAlign: "left",
            color: "#2B7AE4",
          }}
        >
          See More <ArrowForwardIcon />
        </span>
      </ListItem>
    </List>
  );
}
