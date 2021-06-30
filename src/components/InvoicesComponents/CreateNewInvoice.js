import React from "react";
import { Button, Divider, makeStyles, Box } from "@material-ui/core";
import { Col, Form, Row, Table } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";

import "./invoicesComponents.scss";
const useStyles = makeStyles(styles);

export default function CreateNewInvoice() {
  const classes = useStyles();
  const [fileName, setFileName] = React.useState(null);
  const [Background, setBackground] = React.useState(null);

  return (
    <div className="createNewInvoice">
      <Col sm={12} md={9} lg={9} className="purposal">
        <div className="d-flex justify-content-between">
          <Box display="flex" justifyContent="flex-start">
            <Button
              className="mr-2"
              classes={{
                root: classes.themeBlue,
              }}
            >
              Send
            </Button>
            <Button
              className="mr-2"
              classes={{
                root: classes.themeBlue,
              }}
            >
              Auto Send
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" className="mr-2">
              Preview
            </Button>
            <Button variant="outlined">Actions</Button>
          </Box>
        </div>

        <div className="createNewInvoice--div">
          <div className="d-flex flex-row div--header">
            {/* <div className="addlogoImg">
              <span className="text">Add Logo/Image</span>
            </div> */}
            {/* <div
              className="addlogoImg"
              style={{
                backgroundImage:
                  Background !== null ? `url(${Background})` : "none",
                // background: Background !== null ? "red" : "none",
              }}
            >
              <input
                type="file"
                name="file"
                id="file"
                className="addlogoImg--button"
                onChange={(evt) => {
                  setFileName(evt.target.files[0].name);
                  console.log("fileName", evt.target.files[0]);
                  // djhjf
                  if (evt.target.files && evt.target.files[0]) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                      setBackground(e.target.result);
                    };
                    reader.readAsDataURL(evt.target.files[0]);
                  }
                }}
              />
              {Background === null ? (
                <label className="text" htmlFor="file">
                  Add Logo/Image
                </label>
              ) : null}
            </div> */}
            <div
              className="addlogoImg"
              style={{
                backgroundImage:
                  Background !== null ? `url(${Background})` : "none",
                // background: Background !== null ? "red" : "none",
              }}
            >
              <label className="text">
                {Background === null ? " Add Logo/Image" : null}
                <input
                  type="file"
                  className="addlogoImg--button"
                  onChange={(evt) => {
                    if (evt.target.files && evt.target.files[0]) {
                      let reader = new FileReader();
                      reader.onload = (e) => {
                        setBackground(e.target.result);
                      };
                      reader.readAsDataURL(evt.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
            <div className="header--heading">
              <h5>AMZ Invoice</h5>

              <span>AMZ Growth Consulting</span>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <h1 className="invoiceHeading">Invoice</h1>
            <div className="d-flex flex-column">
              <span className="amountDue">Amount Due</span>
              <span className="price">$3,220.59</span>
            </div>
          </div>
          <Divider className="my-3" />

          <Form className="mt-3" id="form">
            <Form.Row>
              <Col sm={12} md={4} lg={4}>
                <Form.Label className="boldLabel">TO:</Form.Label>
                <Form.Control plaintext readOnly placeholder="Joe Smith" />
                <Form.Control plaintext readOnly placeholder="Amz Consulting" />
                <Form.Control
                  plaintext
                  readOnly
                  as="textarea"
                  style={{ resize: "none" }}
                  placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624"
                />
                <Form.Control
                  plaintext
                  readOnly
                  placeholder="example@example.com"
                />
                <Form.Control plaintext readOnly placeholder="(229) 555-0109" />
                <Button color="primary" style={{}}>
                  + Tax ID Number
                </Button>
                <br />
                <Button color="primary">+ Add Recipient</Button>
              </Col>
              <Col sm={12} md={4} lg={4}>
                <Form.Label className="boldLabel">FROM:</Form.Label>

                <Form.Control plaintext readOnly placeholder="Zul Q." />
                <Form.Control plaintext readOnly placeholder="WorkFluxe" />
                <Form.Control
                  plaintext
                  readOnly
                  as="textarea"
                  style={{ resize: "none" }}
                  placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624"
                />
                <Form.Control
                  plaintext
                  readOnly
                  placeholder="example@example.com"
                />
                <Form.Control plaintext readOnly placeholder="(480) 555-0103" />
              </Col>
              <Col sm={12} md={4} lg={4}>
                <Form.Control plaintext readOnly placeholder="Invoice #10002" />
                <Form.Control
                  plaintext
                  readOnly
                  placeholder="Invoice Date: 03/12/2020"
                />
                <Form.Control plaintext readOnly placeholder="WorkFluxe" />
                <Form.Control
                  plaintext
                  readOnly
                  as="textarea"
                  style={{ resize: "none" }}
                  placeholder="Due Date: 03/31/2020 (or upon receipt)"
                />
              </Col>
            </Form.Row>
            <Divider className="my-3" />
            <h6>Tincidunt quam nec vestibulum.</h6>
            <Table responsive borderless className="expensestable">
              <thead>
                <tr>
                  <th>SERVICES</th>
                  <th>RATE</th>
                  <th>UNITS</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Design</td>
                  <td>5</td>
                  <td>$50</td>
                  <td>$250</td>
                </tr>
                <tr>
                  <td>Design</td>
                  <td>5</td>
                  <td>$50</td>
                  <td>$250</td>
                </tr>
                <tr>
                  <td>Design</td>
                  <td>5</td>
                  <td>$50</td>
                  <td>$250</td>
                </tr>
              </tbody>
            </Table>
            <Button color="primary">+ Add Expenses</Button>
            <Divider className="my-3" />

            <div className="d-flex justify-content-between">
              <h6>Subtotal</h6>
              <h6>$1.500</h6>
            </div>
            <Form.Group as={Row} className="mb-0">
              <Form.Label column sm="4">
                Tax
              </Form.Label>
              <Col sm="8">
                <Form.Control plaintext readOnly defaultValue="0,00%" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-0">
              <Form.Label column sm="4">
                Discount
              </Form.Label>
              <Col sm="8">
                <Form.Control plaintext readOnly defaultValue="0,00%" />
              </Col>
            </Form.Group>
            <Divider className="my-3" />
            <div className="d-flex justify-content-between mb-3">
              <h6>Total</h6>
              <h6>$1.500</h6>
            </div>
            <h6>Payment</h6>
            <Button color="primary">+ Add Payment Method</Button>
            <p className="subHeading">
              Contact example@example.com for any payment inquiries
            </p>
            <h6>Late Fees</h6>
            <p className="subHeading">
              A late fee of 0,0% will be added to any invoice not paid by the
              due date
            </p>
            <h6>Notes and Attachments</h6>
            <p className="subHeading">Thank you for your business</p>
            <div className="inputfile">
              <input
                type="file"
                name="file"
                id="file"
                className="inputfile--button"
                onChange={(evt) => {
                  setFileName(evt.target.files[0].name);
                  if (evt.target.files && evt.target.files[0]) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                      setBackground(e.target.result);
                    };
                    reader.readAsDataURL(evt.target.files[0]);
                  }
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
          </Form>
        </div>
      </Col>
    </div>
  );
}
