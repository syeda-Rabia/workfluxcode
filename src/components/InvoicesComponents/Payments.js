import Card from "components/Card/Card";
import React from "react";
import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import { Col, Container, Row } from "react-bootstrap";
import stripeImg from "assets/img/stripe.svg";
import paypalImg from "assets/img/paypal.svg";
import GridItem from "components/Grid/GridItem";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import "./payments.scss";
import BankAccountInfoForm from "./BankAccountInfoForm";
import CheckPaymentInfoForm from "./CheckPaymentInfoForm";
const useStyles = makeStyles(styles);

export default function Payments() {
  const classes = useStyles();

  return (
    <Container fluid className="payment__content">
      <div style={{ margin: "0px -20px" }}>
        <GridItem xs={12} sm={6} md={7}>
          <Card plain>
            <CardBody className="payment__content--method">
              <h6
                className="d-inline  mr-2"
                style={{ textTransform: "uppercase" }}
              >
                My Payments Methods
              </h6>
              <p className="d-inline">No payment currently set up</p>
              <IconButton
                className="float-right"
                classes={{ root: classes.tableActionButton }}
              >
                <CreateOutlinedIcon className={classes.tableActionButtonIcon} />
              </IconButton>
            </CardBody>
          </Card>
        </GridItem>
      </div>

      <div style={{ margin: "0px -20px" }}>
        <GridItem xs={12} sm={6} md={7}>
          <Card plain style={{ backgroundColor: "rgba(250,251,253,255)" }}>
            <CardBody className="payment__content--stripe">
              <Row>
                <Col md={8}>
                  <img
                    alt="Stripe"
                    width="80px"
                    height="33px"
                    src={stripeImg}
                  />
                  <p>Accept Cridet Card and ACH payments via Stripe</p>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                  <Button
                    style={{
                      whiteSpace: "nowrap",
                    }}
                    classes={{
                      root: classes.themeBlue,
                      label: classes.whiteLabelColor,
                    }}
                  >
                    Connect to Stripe
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </GridItem>
      </div>
      <div style={{ margin: "0px -20px" }}>
        <GridItem xs={12} sm={6} md={7}>
          <Card plain style={{ backgroundColor: "rgba(250,251,253,255)" }}>
            <CardBody className="payment__content--paypal">
              <Row>
                <Col md={8}>
                  <img
                    alt="Paypal"
                    width="95px"
                    height="31px"
                    src={paypalImg}
                  />
                  <p>Accept Cridet Card and ACH payments via Stripe</p>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                  <Button
                    style={{
                      whiteSpace: "nowrap",
                    }}
                    classes={{
                      root: classes.themeBlue,
                      label: classes.whiteLabelColor,
                    }}
                  >
                    Connect to Paypal
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </GridItem>
      </div>
      <div style={{ margin: "0px -20px" }}>
        <GridItem xs={12} sm={6} md={7}>
          <Card plain style={{ backgroundColor: "rgba(250,251,253,255)" }}>
            <CardBody className="payment__content--wireTransfer">
              <Row>
                <Col md={8}>
                  <h3>Wire transfer</h3>
                  <p>
                    Display your Wire Transfer Details to get paid manually
                    outside Workfluxe
                  </p>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                  <Button
                    style={{
                      whiteSpace: "nowrap",
                      minWidth: "152px",
                    }}
                    classes={{
                      root: classes.themeBlue,
                      label: classes.whiteLabelColor,
                    }}
                  >
                    Add Bank Info
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </GridItem>
      </div>
      <div style={{ margin: "0px -20px" }}>
        <GridItem xs={12} sm={6} md={7}>
          <Card plain style={{ backgroundColor: "rgba(250,251,253,255)" }}>
            <CardBody className="payment__content--mailedCheck">
              <Row>
                <Col md={8}>
                  <h3 style={{ color: "#616162" }}>Mailed Check</h3>
                  <p>
                    Display your Wire Transfer Details to get paid manually
                    outside Workfluxe
                  </p>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                  <Button
                    style={{
                      whiteSpace: "nowrap",
                      minWidth: "152px",
                    }}
                    classes={{
                      root: classes.themeBlue,
                      label: classes.whiteLabelColor,
                    }}
                  >
                    Add Bank Info
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </GridItem>
      </div>
      <BankAccountInfoForm />
      <CheckPaymentInfoForm />
    </Container>
  );
}
