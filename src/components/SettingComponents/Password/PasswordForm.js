import React, { useState, useEffect, useRef } from "react";
import { Form, Col } from "react-bootstrap";
import { Input, message, Form as AntdForm } from "antd";

import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ApiUrls from "utils/ApiUrls";
import { PATCH } from "utils/Functions";
import { connect } from "react-redux";
const useStyles = makeStyles(styles);
function PasswordForm(props) {
  const classes = useStyles();
  const [changePassword, setChangePassword] = useState({});
  // const [passwordCheckError, setPasswordCheckError] = useState(false);
  // const [value, setValue] = useState("");
  const passwordForm = useRef(null);
  console.log(props);

  // const isFirstRun = useRef(true);
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }

  //   const timeoutId = setTimeout(() => validatePassword(), 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [value]);

  // const validatePassword = () => {
  //   if (changePassword.new_password !== value) {
  //     setPasswordCheckError(true);
  //   } else {
  //     setPasswordCheckError(false);
  //   }
  // };
  const [form] = AntdForm.useForm();
  console.log(form);
  const handleSubmit = async (e) => {
    console.log(e);
    let resp = await PATCH(
      ApiUrls.CHANGE_PASSWORD + props.userID,
      changePassword
    );

    console.log(resp);
    if (resp.status == "200") {
      message.success("Password Changed Successfully.");
      form.resetFields();
    } else {
      message.error("Incorrect Password!!!");
    }
  };
  return (
    <div>
      <AntdForm
        form={form}
        ref={passwordForm}
        onFinish={handleSubmit}
        className="settingComponents--form"
      >
        <Col sm={12} xm={12} md={6} lg={6}>
          <Form.Group>
            <Form.Label>Old Password</Form.Label>
            <AntdForm.Item
              name="oldpassword"
              rules={[
                {
                  required: true,
                  message: "Please input your Old Password!",
                },
              ]}
            >
              <Input.Password
                required
                className="radiusBorderInput"
                placeholder="Old Password"
                onChange={(e) => {
                  setChangePassword({
                    ...changePassword,
                    old_password: e.target.value,
                  });
                }}
              />
            </AntdForm.Item>
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <AntdForm.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                required
                className="radiusBorderInput"
                placeholder="New Password"
                onChange={(e) => {
                  setChangePassword({
                    ...changePassword,
                    new_password: e.target.value,
                  });
                }}
              />
            </AntdForm.Item>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm New Password</Form.Label>
            <AntdForm.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
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
              />
            </AntdForm.Item>
          </Form.Group>

          <Button
            type="submit"
            variant="contained"
            className=""
            classes={{
              root: classes.themeBlue,
              label: classes.whiteLabelColor,
            }}
          >
            Save Changes
          </Button>
        </Col>
      </AntdForm>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    userID: state.Login.user_info._id,
  };
};
// const PassForm = AntdForm.create()(PasswordForm);
export default connect(mapStatetoProps)(PasswordForm);
