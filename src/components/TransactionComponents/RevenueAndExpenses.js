import { Button, Menu, MenuItem } from "@material-ui/core";
import CustomDropdownButton from "components/DropdownButton/CustomDropdownButton";
import React from "react";
import "./transactionComponents.scss";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import { makeStyles, Grid } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RevenueAndExpenseTable from "./RevenueAndExpenseTable";
import AddNewExpense from "./AddNewExpense";
import AddNewRevenue from "./AddNewRevenue";

const useStyles = makeStyles(styles);
export default function RevenueAndExpenses() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expenseOpen, setExpenseOpen] = React.useState(false);

  const handleExpenseDialogClose = () => {
    setExpenseOpen(false);
  };
  const handleExpenseClickOpen = () => {
    setAnchorEl(null);

    setExpenseOpen(true);
  };
  const [revenueOpen, setRevenueOpen] = React.useState(false);

  const handleRevenueDialogClose = () => {
    setRevenueOpen(false);
  };
  const handleRevenueClickOpen = () => {
    setAnchorEl(null);

    setRevenueOpen(true);
  };

  const classes = useStyles();

  return (
    <div className="revenueAndExpense__content">
      <div className="revenueAndExpense__content--buttons">
        <Grid container>
          <CustomDropdownButton data={["All Clients"]} />
          <div className="mediaQueryButtonRight">
            <CustomDropdownButton data={["All Projects"]} />
          </div>
          <CustomDropdownButton data={["All Categories"]} />
          <div className="mediaQueryButtonRight">
            <CustomDropdownButton data={["All Expenses"]} />
          </div>
          <Button
            onClick={handleClick}
            endIcon={<AddCircleOutlineOutlinedIcon />}
            variant="contained"
            className="ml-auto"
            classes={{
              root: classes.themeBlue,
              label: classes.whiteLabelColor,
            }}
          >
            Add New
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{
              transform: "translate(0px, 49px)",
            }}
          >
            <MenuItem onClick={handleExpenseClickOpen}>Expense</MenuItem>
            <MenuItem onClick={handleRevenueClickOpen}>Revenue</MenuItem>
          </Menu>
        </Grid>
      </div>

      <AddNewExpense
        handleDialogClose={handleExpenseDialogClose}
        open={expenseOpen}
      />
      <AddNewRevenue
        handleDialogClose={handleRevenueDialogClose}
        open={revenueOpen}
      />
      <RevenueAndExpenseTable />
    </div>
  );
}
