import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemIcon } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#FAFBFD",
    borderRadius: "7px",
  },
  primaryColor: {
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

export default function CustomList(props) {
  const { data } = props;
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {data.map((prop, key) => {
        return (
          <ListItem key={key}>
            {typeof prop.icon === "string" ? (
              <ListItemIcon>
                <Icon>{prop.icon}</Icon>
              </ListItemIcon>
            ) : (
              <ListItemIcon className={classes.primaryColor}>
                <prop.icon />
              </ListItemIcon>
            )}

            <div className="d-inline">{prop.primaryText}</div>
          </ListItem>
        );
      })}
    </List>
  );
}

CustomList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // primaryText: PropTypes.string.isRequired,
      icon: PropTypes.object,
    })
  ),
};
