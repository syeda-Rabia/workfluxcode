import { Button, ListItemIcon } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import { Empty, message, Skeleton } from "antd";
import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ApiUrls from "utils/ApiUrls";
import { GET } from "utils/Functions";

// handle mui componet styling
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",

    backgroundColor: "#FAFBFD",
    border: "1px solid #EFEFEF",
    boxSizing: "border-box",
    borderRadius: "7px",
  },
  inline: {
    display: "inline",
  },
  labelBtn: styles.labelColor,
  reset: {
    margin: 0,
    padding: 0,
  },
}));

export default function ProjectActivity(props) {
  const classes = useStyles();
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterActivities, setFilterActivities] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [date, setDate] = useState(moment().format("LL"));
  console.log("activity , {...props} ", props);
  // calls at function mount and everytime filterActivities changes

  useEffect(() => {
    getallActivities();
    return () => {};
  }, [filterActivities]);
  // get all activities from server

  const getallActivities = async () => {
    let res = await GET(
      ApiUrls.GET_ALL_ACTIVITIES +
        filterActivities +
        `&id=${props.location.state._id}`
    );
    console.log(res);
    setLoading(false);
    if (res.status !== 200) message.error(res.message);
    setAllActivities(res.activities);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Button
          classes={{
            label: classes.labelBtn,
          }}
          onClick={() => {
            setFilterActivities(
              moment(date).add(-1, "day").format("YYYY-MM-DD")
            );

            setDate(moment(date).add(-1, "day").format("LL"));
          }}
        >
          Previous Day
        </Button>
        <Button style={{ color: "#2B7AE4" }}>{date}</Button>
        <Button
          classes={{
            label: classes.labelBtn,
          }}
          onClick={() => {
            setFilterActivities(
              moment(date).add(1, "day").format("YYYY-MM-DD")
            );
            console.log(moment().diff(filterActivities, "days"));

            setDate(moment(date).add(1, "day").format("LL"));
          }}
        >
          Next Day
        </Button>
      </div>

      <List className={classes.root}>
        {loading ? (
          Array.from({ length: 4 }, () => (
            <Skeleton className="w-50" active avatar />
          ))
        ) : allActivities?.length > 0 ? (
          allActivities.map((activity, index) => (
            <ListItem key={index} alignItems="center">
              <ListItemIcon>
                <FiberManualRecordOutlinedIcon style={{ color: "#D2D2D2" }} />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar variant="rounded" alt="Remy Sharp" src={{}} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <p className=" capitalize ">
                    {activity.title}&nbsp;
                    {/* <Link
                      to={{
                        pathname:
                          "/app/projects/" + activity.project.projectName,
                        state: activity.project,
                      }}
                      style={{ color: "#2B7AE4" }}
                    >
                      {activity.project?.projectName}
                    </Link> */}
                    <span style={{ color: "#B9B9B9" }}>
                      {" "}
                      &nbsp;
                      {moment(activity.date).format("LT")}
                    </span>
                  </p>
                }
                // secondary={
                //   <React.Fragment>
                //     <span
                //       style={{ color: "#174788" }}
                //       className={classes.inline}
                //     >
                //       <AttachFileIcon />
                //       imagesforprojects.zip
                //     </span>
                //   </React.Fragment>
                // }
              />
            </ListItem>
          ))
        ) : (
          <Empty
            description={<span>No Activity to show...</span>}
            className="w-100 "
          />
        )}
      </List>
    </div>
  );
}
