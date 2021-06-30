import React, { Component, useState } from "react";
import { Row, Col, Alert, Container, Label, FormGroup } from "reactstrap";
import Button from "@material-ui/core/Button";
import { message } from "antd";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Form, Input } from "antd";

// action

import * as actionCreators from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import images
import logodark from "assets/img/logo.png";
import { POST, REGISTER_USER, WEBHOOKPOST } from "utils/Functions";
import ApiUrls from "utils/ApiUrls";

function Register(props) {
  const [registerUser, setRegisterUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event, values) => {
    setLoading(true);
    // let resp = await WEBHOOKPOST(registerUser);
    let resp = await REGISTER_USER(ApiUrls.USER_REGISTER, registerUser);
    console.log(resp);

    if (resp.status == "200") {
      message.success("Registration Done Successfully.");

      props.onUserRegister({
        user: resp.user_info,
        token: resp.token,
        platform: "Nodejs",
        userType: 0,
      });
    } else {
      setLoading(false);

      message.error(resp.message);
    }
    // props.registerUser(values);
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
                              Register account
                            </h4>
                            <p className="text-muted">
                              Get your free Workfluxe account now.
                            </p>
                          </div>

                          <div className="p-2 mt-4">
                            <Form
                              // form={form}
                              onFinish={handleSubmit}
                              requiredMark={false}
                              colon={false}
                              layout="vertical"
                              preserve={false}
                            >
                              <Form.Item
                                name="email"
                                label="Email"
                                style={{ marginBottom: 5 }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your Email!",
                                  },
                                ]}
                              >
                                <Input
                                  className="radiusBorderInput"
                                  placeholder="Enter Email"
                                  onChange={(event) => {
                                    setRegisterUser(() => {
                                      return {
                                        ...registerUser,
                                        email: event.target.value,
                                      };
                                    });
                                  }}
                                />
                              </Form.Item>
                              <Form.Item
                                name="username"
                                style={{ marginBottom: 5 }}
                                label="Username"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input Username!",
                                  },
                                ]}
                              >
                                <Input
                                  className="radiusBorderInput"
                                  placeholder="Enter Username"
                                  onChange={(event) => {
                                    setRegisterUser(() => {
                                      return {
                                        ...registerUser,
                                        username: event.target.value,
                                      };
                                    });
                                  }}
                                />
                              </Form.Item>
                              <Form.Item
                                name="password"
                                style={{ marginBottom: 5 }}
                                label="Password"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your password!",
                                    min: 6,
                                  },
                                ]}
                                hasFeedback
                              >
                                <Input.Password
                                  className="radiusBorderInput"
                                  placeholder="New Password"
                                  onChange={(event) => {
                                    setRegisterUser(() => {
                                      return {
                                        ...registerUser,
                                        password: event.target.value,
                                      };
                                    });
                                  }}
                                />
                              </Form.Item>

                              <Form.Item
                                name="confirm"
                                style={{ marginBottom: 5 }}
                                label="Confirm Password"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                  {
                                    required: true,
                                    message: "Please confirm your password!",
                                  },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (
                                        !value ||
                                        getFieldValue("password") === value
                                      ) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(
                                        new Error(
                                          "The two passwords that you entered do not match!"
                                        )
                                      );
                                    },
                                  }),
                                ]}
                              >
                                <Input.Password
                                  className="radiusBorderInput"
                                  placeholder="Confirm New Password"
                                  onChange={() => {}}
                                />
                              </Form.Item>

                              <div className="text-center">
                                <Button
                                  color="primary"
                                  variant="contained"
                                  type="submit"
                                >
                                  {loading ? "Loading ..." : "Register"}
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

export default connect(null, mapDispatchToProps)(Register);
