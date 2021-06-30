import React, { useState } from "react";
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
} from "@devexpress/dx-react-grid-material-ui";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import {
  makeStyles,
  Checkbox,
  IconButton,
  Chip,
  FormControlLabel,
} from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    marginTop: "20px",
    background: "#FFFFFF",
    border: "2px solid #EFEFEF",
    boxSizing: "border-box",
    borderRadius: "7px",

    "& table": {
      "& thead": {
        "& tr": {
          "& th": {
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "15px",

            color: "#484848",
          },
        },
        background: "#FAFBFD",
      },
      "& tbody": {
        "& tr": {
          "& td": {
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "15px",
            color: "#292929",
            whiteSpace: "break-spaces",
          },
        },
      },
    },
  },

  CheckboxLabel: {
    fontWeight: "normal",
    fontSize: "12px ",
    lineHeight: "15px",
    color: "#292929",
    whiteSpace: "break-spaces",
  },
});

export default function DragColumnTable() {
  const classes = useStyles();
  const [columns] = useState([
    { name: "Task", title: "Task" },
    { name: "Client", title: "Client" },
    { name: "Project", title: "Project" },
    { name: "TaskList", title: "Task List" },
    { name: "TaskLabel", title: "Task Label" },
    { name: "Assigned", title: "Assigned" },
    { name: "DueDate", title: "Due Date" },
    { name: "Timer", title: "Timer" },
    { name: "", title: "" },
  ]);
  const [rows] = useState([
    {
      Task: (
        <FormControlLabel
          classes={{ label: classes.CheckboxLabel }}
          value="end"
          control={<Checkbox color="primary" />}
          label="Felis sed sapien purus."
          labelPlacement="end"
        />
      ),
      Client: "Nulla dictum nisl vitae.",
      Project: "Proin odio velit.",
      TaskList: "Cras felis est vitae cursus at nisl.",
      TaskLabel: (
        <Chip
          style={{ backgroundColor: "#DA0000", color: "#Fff" }}
          label="Urgent"
        />
      ),
      Assigned: "$739.65",
      DueDate: "8/16/13",
      Timer: "12:00:00",
      "": (
        <IconButton
          style={{
            padding: "3px",
          }}
        >
          <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
        </IconButton>
      ),
    },
    {
      Task: (
        <FormControlLabel
          // style={{ wordBreak: "normal", whiteSpace: "nowrap" }}
          value="end"
          control={<Checkbox style={{ color: "#2B7AE4" }} />}
          label="Felis sed sapien purus."
          labelPlacement="end"
        />
      ),
      Client: "Nulla dictum nisl vitae.",
      Project: "Proin odio velit.",
      TaskList: "Cras felis est vitae cursus at nisl.",
      TaskLabel: (
        <Chip
          style={{ backgroundColor: "#DA0000", color: "#Fff" }}
          label="Urgent"
        />
      ),
      Assigned: "$739.65",
      DueDate: "8/16/13",
      Timer: "12:00:00",
      "": (
        <IconButton
          style={{
            padding: "3px",
          }}
        >
          <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
        </IconButton>
      ),
    },
    {
      Task: (
        <FormControlLabel
          // style={{ wordBreak: "normal", whiteSpace: "nowrap" }}
          value="end"
          control={<Checkbox style={{ color: "#2B7AE4" }} />}
          label="Felis sed sapien purus."
          labelPlacement="end"
        />
      ),
      Client: "Nulla dictum nisl vitae.",
      Project: "Proin odio velit.",
      TaskList: "Cras felis est vitae cursus at nisl.",
      TaskLabel: (
        <Chip
          style={{ backgroundColor: "#DA0000", color: "#Fff" }}
          label="Urgent"
        />
      ),
      Assigned: "$739.65",
      DueDate: "8/16/13",
      Timer: "12:00:00",
      "": (
        <IconButton
          style={{
            padding: "3px",
          }}
        >
          <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
        </IconButton>
      ),
    },
    {
      Task: (
        <FormControlLabel
          // style={{ wordBreak: "normal", whiteSpace: "nowrap" }}
          value="end"
          control={<Checkbox style={{ color: "#2B7AE4" }} />}
          label="Felis sed sapien purus."
          labelPlacement="end"
        />
      ),
      Client: "Nulla dictum nisl vitae.",
      Project: "Proin odio velit.",
      TaskList: "Cras felis est vitae cursus at nisl.",
      TaskLabel: (
        <Chip
          style={{ backgroundColor: "#DA0000", color: "#Fff" }}
          label="Urgent"
        />
      ),
      Assigned: "$739.65",
      DueDate: "8/16/13",
      Timer: "12:00:00",
      "": (
        <IconButton
          style={{
            padding: "3px",
          }}
        >
          <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
        </IconButton>
      ),
    },
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: "Task", width: "250px" },
  ]);
  const [columnOrder, setColumnOrder] = useState([
    "Task",
    "Client",
    "Project",
    "TaskList",
    "TaskLabel",
    "Assigned",
    "DueDate",
    "Timer",
    "",
  ]);

  return (
    <div className={classes.root}>
      <Grid rows={rows} columns={columns}>
        <DragDropProvider />
        <Table columnExtensions={tableColumnExtensions} />
        <TableColumnReordering
          order={columnOrder}
          onOrderChange={setColumnOrder}
        />
        <TableHeaderRow />
      </Grid>
    </div>
  );
}
