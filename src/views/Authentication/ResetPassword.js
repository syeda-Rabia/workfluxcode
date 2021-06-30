import React from "react";

import { Row, Col, Container } from "reactstrap";

import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { withRouter, Link, useLocation } from "react-router-dom";
import * as actionCreators from "store/actions";

import "./authentication.scss";

import { PATCH } from "utils/Functions";
import { message, Form, Input } from "antd";

import ApiUrls from "utils/ApiUrls";
import BackdropLoading from "components/Loading/BackdropLoading";

function ResetPassword(props) {
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [resetPassword, setResetPassword] = React.useState("");
  const handleSubmit = async () => {
    setLoading(true);

    let resp = await PATCH(ApiUrls.RESET_PASSWORD + query.get("id"), {
      new_password: resetPassword,
    });

    console.log(resp, "res");
    setLoading(false);
    if (resp.status == "200") {
      message.success(resp.message);
      props.onUserLogin({
        user: resp.user_info,
        token: resp.token,
        platform: "Nodejs",
        userType: resp.user_info.userType,
      });
    } else {
      message.error(resp.message);
    }
  };
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  console.log(props);
  console.log(query.get("id"));
  const [form] = Form.useForm();

  return (
    <React.Fragment>
      <BackdropLoading loading={loading} />

      <div className="loginScreen overflow-hidden">
        <Container fluid className="p-0 ">
          <Row className="loginScreen--row">
            <Col lg={6}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100 justify-content-center">
                <div className="loginScreen--innerDiv w-100 shadow ">
                  <Row className="justify-content-center ">
                    <Col lg={7} md={7} className="">
                      <div className="mt-5 text-center">
                        <h4
                          className="text-gray-darkest"
                          style={{ fontSize: "26px" }}
                        >
                          Reset Password
                        </h4>
                        <div className="p-2 my-5">
                          <Form
                            form={form}
                            onFinish={handleSubmit}
                            requiredMark={false}
                            colon={false}
                            layout="vertical"
                            preserve={false}
                          >
                            <Form.Item
                              name="password"
                              label="New Password"
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
                                onChange={(e) => {
                                  setResetPassword(e.target.value);
                                }}
                              />
                            </Form.Item>

                            <Form.Item
                              name="confirm"
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

                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              Reset Password
                            </Button>
                          </Form>
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

export default withRouter(connect(null, mapDispatchToProps)(ResetPassword));
