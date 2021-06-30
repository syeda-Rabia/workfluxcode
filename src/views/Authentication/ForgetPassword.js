/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import React from "react";

import { Row, Col, Input, Container, Label, FormGroup } from "reactstrap";

import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
// import { checkLogin, apiError } from "../../store/actions";
import * as actionCreators from "../../store/actions";

// import images
import logodark from "assets/img/logo.png";

import "./authentication.scss";
import Snackbar from "components/Snackbar/Snackbar";

import { googleLogin, facebookLogin } from "services/firebase-signin";

import { POST } from "utils/Functions";
import { message } from "antd";

import ApiUrls from "utils/ApiUrls";
import BackdropLoading from "components/Loading/BackdropLoading";

function ForgotPassword(props) {
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const handleSubmit = async () => {
    setLoading(true);

    let resp = await POST(ApiUrls.FORGOT_PASSWORD, { email });

    console.log(resp, "res");
    setLoading(false);
    if (resp.status == "200") {
      message.success(resp.message);
    } else {
      message.error(resp.message);
    }
  };
  console.log(props);
  return (
    <React.Fragment>
      <BackdropLoading loading={loading} />

      <div className="loginScreen">
        <Container fluid className="p-0 ">
          <Row className="loginScreen--row">
            <Col lg={6}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100 justify-content-center">
                <div className="loginScreen--innerDiv w-100 shadow ">
                  <Row className="justify-content-center ">
                    <Col lg={7} md={7} className="">
                      <div className="mt-5">
                        <div className=" text-left">
                          <div>
                            <Link to="/" className="logo">
                              <img src={logodark} height="30" alt="logo" />
                            </Link>
                          </div>
                          <h4
                            className="mt-4 text-gray-darkest"
                            style={{ fontSize: "26px" }}
                          >
                            Reset Your Password
                          </h4>
                        </div>

                        <div className="p-2">
                          <AvForm
                            className="form-horizontal"
                            onValidSubmit={handleSubmit}
                          >
                            <FormGroup className="">
                              <Label htmlFor="username">Email</Label>
                              <AvField
                                name="Email"
                                value={email}
                                type="email"
                                className="form-control"
                                id="email"
                                validate={{ email: true, required: true }}
                                placeholder="Enter Email"
                                onChange={(event) => {
                                  setEmail(event.target.value);
                                }}
                              />
                            </FormGroup>

                            <div className="mt-3 text-center">
                              <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={() => {}}
                              >
                                Send password reset email
                              </Button>

                              <div className="mt-2">
                                <Snackbar
                                  place="tc"
                                  color="danger"
                                  // icon={AddAlert}
                                  message={errorMessage}
                                  open={errorAlert}
                                  closeNotification={() => setErrorAlert(false)}
                                  close
                                />
                              </div>
                            </div>
                          </AvForm>
                        </div>

                        <div className="my-5 text-center">
                          <p>
                            {"Don't have an account ?"}
                            <Link
                              to="/user/register"
                              className="font-weight-medium text-primary"
                            >
                              Register
                            </Link>
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onUserLogin: (payload) => dispatch(actionCreators.loginUser(payload)),
//   };
// };

export default withRouter(connect()(ForgotPassword));
