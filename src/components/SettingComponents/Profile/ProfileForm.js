import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { message } from "antd";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { connect } from "react-redux";
import SelectCurrency from "react-select-currency";
import ApiUrls from "utils/ApiUrls";
import { GET, PATCH } from "utils/Functions";
import "../settingComponents.scss";
import ProfileImg from "./ProfileImg";
import TimezoneSelect from "react-timezone-select";
import { motion } from "framer-motion";
const useStyles = makeStyles(styles);
function ProfileForm(props) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState([]);
  const [profileInfo, setProfileInfo] = useState({
    time_zone: {},
  });
  const [loading, setLoading] = useState(true);
  console.log(profileInfo.currency);

  useEffect(() => {
    getUserInfo();
  }, []);
  // SET default values of form
  const getUserInfo = async () => {
    let res = await GET(ApiUrls.GET_PROFILE_INFO + props.userID);
    console.log(res);
    if (res.status == "200") {
      setUserInfo(res.profile_info);
      setProfileInfo(res.profile_info);
      setLoading(false);
    } else {
      message.error(res.message);
    }
  };
  // update profile info
  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await PATCH(ApiUrls.UPDATE_PROFILE + props.userID, profileInfo);
    console.log(resp);
    if (resp.status == "200") {
      message.success(resp.message);
    } else {
      message.error(resp.message);
    }
  };

  return (
    <div>
      {!loading ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
            },
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Row className="settingComponents--form xs:flex-col-reverse sm:flex-col-reverse">
              <Col lg={6} className="mt-4">
                <Form.Group as={Col}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userInfo.first_name}
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        first_name: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userInfo.last_name}
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        last_name: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    defaultValue={userInfo.title}
                    type="text"
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        title: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Company Info</Form.Label>
                  <Form.Control
                    defaultValue={userInfo.company_info}
                    type="text"
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        company_info: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Address 1</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={userInfo.address_1}
                    type="text"
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        address_1: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    size="lg"
                    defaultValue={userInfo.address_2}
                    type="text"
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        address_2: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <div className="position-relative h-32">
                  <ProfileImg
                    className="position-absolute right-2"
                    classes="avatar-uploader"
                    userID={props.userID}
                    defaultImg={userInfo.avatar}
                    userPicture
                  />
                </div>
                <Form.Group as={Col}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userInfo.phone_no}
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        phone_no: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Tax ID Number</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userInfo.tax_id}
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        tax_id: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Country</Form.Label>

                  <CountryDropdown
                    classes="w-100 radiusBorderInput"
                    value={profileInfo.country}
                    style={{ padding: "7px" }}
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        country: e,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>State</Form.Label>

                  <RegionDropdown
                    classes="w-100 radiusBorderInput"
                    style={{ padding: "7px" }}
                    country={profileInfo.country}
                    value={profileInfo.state}
                    onChange={(e) => {
                      setProfileInfo({
                        ...profileInfo,
                        state: e,
                      });
                    }}
                  />
                </Form.Group>

                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group className="" as={Col}>
                      <Form.Label>Currency</Form.Label>
                      <SelectCurrency
                        className="w-100 radiusBorderInput form-control-sm  p-3"
                        placeholder="Select Currency"
                        style={{ minHeight: "39px" }}
                        value={`${profileInfo.currency}`}
                        onChange={(e) => {
                          setProfileInfo({
                            ...profileInfo,
                            currency: e.target.value,
                          });
                        }}
                        // onChange={(e) => console.log("currency", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group className="" as={Col}>
                      <Form.Label>Time Zone</Form.Label>
                      {/* <Form.Control type="text" /> */}
                      <TimezoneSelect
                        className="radiusBorderInput"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            border: "none !important",
                            minHeight: "35px",
                          }),
                        }}
                        value={profileInfo.time_zone || {}}
                        onChange={(e) => {
                          setProfileInfo({
                            ...profileInfo,
                            time_zone: e,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Button
              variant="contained"
              type="submit"
              className="mb-3 mr-3 float-right "
              classes={{
                root: classes.themeBlue,
                label: classes.whiteLabelColor,
              }}
            >
              Save Changes
            </Button>
          </Form>
        </motion.div>
      ) : null}
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    userID: state.Login.user_info._id,
  };
};

export default connect(mapStatetoProps)(ProfileForm);
