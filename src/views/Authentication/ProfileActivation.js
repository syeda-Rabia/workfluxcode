import React, { Component, useState } from "react";
import { Row, Col, Alert, Container, Label, FormGroup } from "reactstrap";
import Button from "@material-ui/core/Button";
import { message, Form, Input } from "antd";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action

import * as actionCreators from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import images
import logodark from "assets/img/logo.png";
import { PATCH } from "utils/Functions";
import ApiUrls from "utils/ApiUrls";

function ProfileActivation(props) {
  const [activateUser, setActivateUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  console.log(props);

  const handleSubmit = async () => {
    setLoading(true);
    let projectIDS = null;
    if (props.match.params.projectId !== undefined) {
      projectIDS = props.match.params.projectId.split(",");
    }

    console.log({
      ...activateUser,
      project: projectIDS,
    });
    let resp = await PATCH(ApiUrls.ACTIVATE_USER + props.match.params.userId, {
      ...activateUser,
      project: projectIDS,
    });
    console.log(resp);
    setLoading(false);
    if (resp.status == "200") {
      message.success(resp.message);

      props.onUserRegister({
        user: resp.user_info,
        token: resp.token,
        platform: "Nodejs",
        userType: resp.user_info.userType,
      });
      props.history.push("/app/overview");
    }
    // if (resp.status == "200" && resp.user_info.userType == 0) {
    //   props.onUserRegister({
    //     user: resp.user_info,
    //     token: resp.token,
    //     platform: "Nodejs",
    //     userType: resp.user_info.userType,
    //   });
    //   props.history.push("/app/overview");
    // }
  };

  return (
    <div>
      <React.Fragment>
        <div className="loginScreen">
          <Container fluid className="p-0">
            <Row className="no-gutters loginScreen--row">
              <Col lg={9}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100 justify-content-center">
                  <div className="loginScreen--innerDiv w-100 shadow ">
                    <Row className="justify-content-center">
                      <Col lg={4} md={4}>
                        <div className="authentication-bg">
                          <div className="bg-overlay">
                            <p>
                              Join 250,000+ freelancers and agencies using
                              Workfluxe.
                            </p>
                          </div>
                          <div className="bg-overlay">
                            <span>
                              Anyone doing #freelance work should use @workfluxe
                              for contracts/payment. It's amazing and saves
                              boatloads of time.
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={8} md={8}>
                        <div className="mt-3">
                          <div className="text-center">
                            <div>
                              <Link to="/" className="logo">
                                <img src={logodark} height="30" alt="logo" />
                              </Link>
                            </div>
                            <h4 className="font-size-18 mt-4">
                              Profile Activation
                            </h4>
                            <p className="text-muted">
                              You have been invited. Activate your profile now.
                            </p>
                          </div>

                          <div className="p-2 mt-4">
                            <Form
                              onFinish={handleSubmit}
                              requiredMark={false}
                              colon={false}
                              layout="vertical"
                              preserve={false}
                            >
                              <Form.Item
                                name="firstName"
                                label="First Name"
                                style={{ marginBottom: 5 }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your First Name!",
                                  },
                                ]}
                              >
                                <Input
                                  className="radiusBorderInput"
                                  placeholder="Enter Email"
                                  onChange={(event) => {
                                    setActivateUser(() => {
                                      return {
                                        ...activateUser,
                                        first_name: event.target.value,
                                      };
                                    });
                                  }}
                                />
                              </Form.Item>

                              <Form.Item
                                name="lastName"
                                label="Last Name"
                                style={{ marginBottom: 5 }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your Last Name!",
                                  },
                                ]}
                              >
                                <Input
                                  className="radiusBorderInput"
                                  placeholder="Enter Email"
                                  onChange={(event) => {
                                    setActivateUser(() => {
                                      return {
                                        ...activateUser,
                                        last_name: event.target.value,
                                      };
                                    });
                                  }}
                                />
                              </Form.Item>

                              <Form.Item
                                name="password"
                                style={{ marginBottom: 5 }}
                                label="Password"
                                help={
                                  <p>
                                    You password must be six characters long.
                                  </p>
                                }
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your password!",
                                    min: 6,
                                  },
                                ]}
                              >
                                <Input.Password
                                  className="radiusBorderInput"
                                  placeholder="New Password"
                                  onChange={(event) => {
                                    setActivateUser(() => {
                                      return {
                                        ...activateUser,
                                        password: event.target.value,
                                      };
                                    });
                                  }}
                                />
                              </Form.Item>

                              <div className="text-center">
                                <Button
                                  color="primary"
                                  variant="contained"
                                  type="submit"
                                >
                                  {loading ? "Loading ..." : "Activate Now"}
                                </Button>
                              </div>

                              {/* <div className="mt-4 text-center">
                                <p className="mb-0">
                                  By registering you agree to the Nazox{" "}
                                  <Link to="#" className="text-primary">
                                    Terms of Use
                                  </Link>
                                </p>
                              </div> */}
                            </Form>
                          </div>

                          <div className="mt-5 text-center">
                            <p>
                              Already have an account ?{" "}
                              <Link
                                to="/user/login"
                                className="font-weight-medium text-primary"
                              >
                                {" "}
                                Login
                              </Link>{" "}
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
    </div>
  );
}

// const mapStatetoProps = (state) => {
//   const { user, registrationError, loading } = state.Register;
//   return { user, registrationError, loading };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onUserRegister: (payload) => dispatch(actionCreators.registerUser(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ProfileActivation);
