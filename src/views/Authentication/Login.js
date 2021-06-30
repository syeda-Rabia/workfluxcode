/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import React from "react";

import { Row, Col, Container, Label, FormGroup } from "reactstrap";

import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
// import { checkLogin, apiError } from "../../store/actions";
import * as actionCreators from "store/actions";

// import images
import logodark from "assets/img/logo.png";

import "./authentication.scss";
import Snackbar from "components/Snackbar/Snackbar";

import { googleLogin, facebookLogin } from "services/firebase-signin";

import { REGISTER_USER } from "utils/Functions";
import { message, Form, Input } from "antd";

import ApiUrls from "utils/ApiUrls";
import BackdropLoading from "components/Loading/BackdropLoading";
import { baseeURL } from "utils/Config";

function Login(props) {
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loginDetails, setLoginDetails] = React.useState({
    email: null,
    password: null,
  });

  const onGoogleLogin = async () => {
    setLoading(true);

    let res = await googleLogin();
    console.log(res, "google");

    if (!res.hasOwnProperty("code")) {
      var username = res.additionalUserInfo.profile.email.split("@");
      let nodeGoogleLogin = await REGISTER_USER(ApiUrls.GOOGLE_LOGIN, {
        username: username[0],
        email: res.additionalUserInfo.profile.email,
        googleId: res.additionalUserInfo.profile.id,
      });
      if (nodeGoogleLogin.status == "200") {
        let {
          additionalUserInfo: {
            profile: { picture },
            providerId,
          },
        } = res;

        props.onUserLogin({
          user: nodeGoogleLogin.user_info,
          token: nodeGoogleLogin.token,
          platform: providerId,
          userType: nodeGoogleLogin.user_info.userType,
          picture,
        });
        props.history.push("/app/projects");
      } else {
        setErrorAlert(true);
        setErrorMessage(nodeGoogleLogin.message);
        setTimeout(function () {
          setErrorAlert(false);
        }, 3000);
      }
    } else {
      setErrorAlert(true);
      setErrorMessage(res.message);
      setTimeout(function () {
        setErrorAlert(false);
      }, 3000);
    }
    setLoading(false);
  };

  const onFacebookLogin = async () => {
    let res = await facebookLogin();
    if (!res.hasOwnProperty("code")) {
      let {
        additionalUserInfo: { profile, providerId },
        credential: { accessToken },
      } = res;

      var username = res.additionalUserInfo.profile.email.split("@");

      let nodeFacebookLogin = await REGISTER_USER(ApiUrls.GOOGLE_LOGIN, {
        username: username[0],
        email: res.additionalUserInfo.profile.email,
        googleId: res.additionalUserInfo.profile.id,
      });

      props.onUserLogin({
        user: nodeFacebookLogin.user_info,
        token: nodeFacebookLogin.token,
        platform: providerId,
        userType: nodeFacebookLogin.user_info.userType,
      });
      props.history.push("/app/overview");
    } else {
      setErrorAlert(true);
      setErrorMessage(res.message);
      setTimeout(function () {
        setErrorAlert(false);
      }, 3000);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    // props.history.push("/app/overview");
    // const res = await WEBHOOKPOST(loginDetails);
    let resp = await REGISTER_USER(ApiUrls.LOGIN_USER, loginDetails);

    console.log(resp, "res");
    setLoading(false);
    if (resp.status == "200") {
      message.success("Welcome to Workfluxe");

      props.onUserLogin({
        user: resp.user_info,
        token: resp.token,
        picture: baseeURL + resp.user_info.avatar,
        platform: "Nodejs",
        userType: resp.user_info.userType,
      });
    } else {
      message.error(resp.message);
    }
  };

  return (
    <React.Fragment>
      <BackdropLoading loading={loading} />

      <div className="loginScreen">
        <Container fluid className="p-0 ">
          <Row className="no-gutters loginScreen--row">
            <Col lg={8}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100 justify-content-center">
                <div className="loginScreen--innerDiv w-100 shadow ">
                  <Row className="justify-content-center ">
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
                          <h4 className="font-size-18 mt-4">Login</h4>
                          <p className="text-muted">
                            Get started by logging in to your account.
                          </p>
                        </div>
                        {/* 
                        {this.props.loginError && this.props.loginError ? (
                          <Alert color="danger">
                            {this.props.loginError}
                          </Alert>
                        ) : null} */}

                        <div className="p-2 mt-4">
                          <Form
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
                                  setLoginDetails(() => {
                                    return {
                                      ...loginDetails,
                                      email: event.target.value,
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
                                },
                              ]}
                            >
                              <Input.Password
                                className="radiusBorderInput"
                                placeholder="New Password"
                                onChange={(event) => {
                                  setLoginDetails(() => {
                                    return {
                                      ...loginDetails,
                                      password: event.target.value,
                                    };
                                  });
                                }}
                              />
                            </Form.Item>

                            <div className="custom-control custom-checkbox">
                              <Input
                                type="checkbox"
                                className="custom-control-input"
                                id="customControlInline"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-3 text-center position-relative ">
                              <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                className=""
                                onClick={() => {}}
                              >
                                Log In
                              </Button>
                              <span className="position-absolute right-0.5">
                                <Link
                                  to="forgot-password"
                                  className=" text-blue "
                                >
                                  Forgot your password?
                                </Link>
                              </span>
                            </div>

                            <div className="mt-2 text-center">
                              <Button
                                variant="contained"
                                className="rounded-pill w-48"
                                color="primary"
                                style={{ background: "white" }}
                                onClick={onGoogleLogin}
                              >
                                <div className="w-100">
                                  <img
                                    className="float-left"
                                    height="25"
                                    width="25"
                                    src="https://img.icons8.com/fluent/48/000000/google-logo.png"
                                  />
                                  <span className="text-blue ">
                                    Sign in with Google
                                  </span>
                                </div>
                              </Button>

                              {/* <Button
                                  color="primary"
                                  onClick={onFacebookLogin}
                                >
                                  <img
                                    height="25"
                                    width="25"
                                    src="https://img.icons8.com/fluent/48/000000/facebook-new.png"
                                  />
                                  facebook
                                </Button> */}
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
                          </Form>
                        </div>

                        <div className="mt-3 text-center">
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

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogin: (payload) => dispatch(actionCreators.loginUser(payload)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
