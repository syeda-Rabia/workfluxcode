import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  IconButton,
  withStyles,
  makeStyles,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Form, Col, Row } from "react-bootstrap";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import allStyle from "assets/jss/material-dashboard-react/views/genericStyles";
const styles = (theme) => ({
  ...allStyle(theme),
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  heading: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "23px",

    textAlign: "center",

    color: "#2B7AE4",
    textTransform: "none",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogBox: {
    borderRadius: "7px",
    boxShadow: "0px 0px 65px rgba(43, 122, 228, 0.1)",
    "& .MuiBackdrop-root": {
      backgroundColor: "transparent",
    },
    "& .MuiDialog-paper": {
      overflowY: "unset !important",
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <FiberManualRecordIcon
        style={{
          color: "#DA0000",
          fontSize: "16px",
          position: "absolute",
        }}
      />
      <h6 className={classes.heading}>{children}</h6>

      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const useStyles = makeStyles(styles);
export default function AddNewExpense(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const { handleDialogClose, open } = props;
  const [fileName, setFileName] = React.useState(null);

  return (
    <div>
      <Dialog
        className={classes.dialogBox}
        maxWidth="md"
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          Add New Expense
        </DialogTitle>
        <DialogContent dividers>
          <Form className="p-3">
            <Form.Row className="addNewExpense--formRow">
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Expense Name
                  </Form.Label>
                  <Col sm={7} className="">
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Amount
                  </Form.Label>
                  <Col sm={7} className="">
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Date
                  </Form.Label>
                  <Col sm={7} className="">
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Recurring
                  </Form.Label>
                  <Col sm={7} className="">
                    <Form.Check
                      style={{
                        boxShadow: "0px 0px 65px rgba(43, 122, 228, 0.1)",
                        borderRadius: "7px",
                        width: "20px",
                        height: "20px",
                      }}
                      type="checkbox"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Repeat Every
                  </Form.Label>
                  <Col sm={7} className="">
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Project
                  </Form.Label>
                  <Col sm={6} className="">
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Client
                  </Form.Label>
                  <Col sm={6} className="">
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Category
                  </Form.Label>
                  <Col sm={6} className="">
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group>
                  <RadioGroup className="flex-row">
                    <FormControlLabel
                      value="Billable"
                      style={{ marginRight: "66px" }}
                      control={<Radio style={{ color: "#2B7AE4" }} />}
                      label="Billable"
                    />
                    <FormControlLabel
                      value="Non-Billable"
                      control={<Radio style={{ color: "#2B7AE4" }} />}
                      label="Non-Billable"
                    />
                  </RadioGroup>
                </Form.Group>
                <Form.Group>
                  <RadioGroup className="flex-row">
                    <FormControlLabel
                      value="Business"
                      style={{ marginRight: "55px" }}
                      control={<Radio style={{ color: "#2B7AE4" }} />}
                      label="Business"
                    />
                    <FormControlLabel
                      value="Personal"
                      control={<Radio style={{ color: "#2B7AE4" }} />}
                      label="Personal"
                    />
                  </RadioGroup>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="addNewExpense--formRow text">
              <Form.Group className="w-100">
                <Form.Label style={{ marginLeft: "5px" }}>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form.Row>
            <div className="inputfile">
              <input
                type="file"
                name="file"
                id="file"
                className="inputfile--button"
                onChange={(evt) => {
                  setFileName(evt.target.files[0].name);
                }}
              />

              {fileName === null ? (
                <label htmlFor="file">
                  <AttachFileOutlinedIcon style={{ marginRight: "10px" }} />
                  Include a file attachment
                </label>
              ) : (
                <label htmlFor="file">{fileName}</label>
              )}
            </div>
            <Button
              variant="contained"
              className="mr-auto mt-3"
              classes={{
                root: classes.themeBlue,
                label: classes.whiteLabelColor,
              }}
            >
              Add Expense
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
