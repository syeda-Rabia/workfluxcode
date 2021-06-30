import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import { Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({}));
export default function Notifications() {
  const classes = useStyles();

  const [notifications, setNotifications] = React.useState([
    {
      name: "Workfluxe notifications and reminders",
      check: false,
    },
    {
      name: "Reminder 1",
      check: false,
    },
    {
      name: "Reminder 2",
      check: false,
    },
    {
      name: "Reminder 3",
      check: false,
    },
    {
      name: "Reminder 4",
      check: false,
    },
    {
      name: "Articles and Tips",
      check: false,
    },
    {
      name: "Subscription Information",
      check: false,
    },
  ]);
  return (
    <div>
      <h1 className="mt-2 settingComponents--heading">Notifications</h1>
      <div className="d-flex flex-column">
        {notifications.map((pro, index) => (
          <FormControlLabel
            key={index}
            className="p-0 m-0"
            style={{ color: "#616162" }}
            control={
              <Checkbox
                className="p-1"
                checked={pro.check}
                onChange={() => {
                  let i = index;
                  let checkNotification = [...notifications];
                  checkNotification[i].check = !checkNotification[i].check;
                  setNotifications(checkNotification);
                }}
                style={{ color: "#2B7AE4" }}
              />
            }
            label={pro.name}
          />
        ))}
      </div>
    </div>
  );
}
