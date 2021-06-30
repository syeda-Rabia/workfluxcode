import { makeStyles, Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";
import faceImg from "assets/img/faces/marc.jpg";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import style from "assets/jss/material-dashboard-react/views/genericStyles";
import ProfileImg from "components/SettingComponents/Profile/ProfileImg";
import ApiUrls from "utils/ApiUrls";
import { PATCH } from "utils/Functions";
import { message } from "antd";

const useImportStyles = makeStyles(style);
export default function ClientProfileDetails(props) {
  const Importclasses = useImportStyles();
  const [companyDetails, setCompanyDetails] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  console.log("profile", props);
  console.log({ companyDetails, contactDetails });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await PATCH(ApiUrls.UPDATE_PROFILE + props.userInfo._id, {
      company_details: companyDetails,
      contact_details: contactDetails,
    });
    console.log(resp);
    if (resp.status == "200") {
      message.success(resp.message);
    } else {
      message.error(resp.message);
    }
  };

  return (
    <div className="newClient__content">
      <ProfileImg
        classes="avatar-uploader"
        defaultImg={props.userInfo.avatar}
        userID={props.userInfo._id}
      />

      <h6 className="newClient__content--heading">COMPANY DETAILS</h6>
      <form className="newClient__content--form" onSubmit={handleSubmit}>
        <div className="row">
          <label
            style={{ whiteSpace: "nowrap" }}
            className="col-sm-3 col-md-3 col-lg-3 m-0   col-form-label"
          >
            Phone Number:
          </label>
          <div className="col-sm-9 col-md-9 col-lg-9 p-0 ml-2.5">
            <input
              type="tel"
              pattern="^\+\d{1,15}$|\d{1,15}$"
              className="form-control-plaintext"
              defaultValue={props.userInfo.company_details?.phone_no}
              onChange={(e) => {
                setCompanyDetails({
                  ...companyDetails,
                  phone_no: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <label
            style={{ whiteSpace: "nowrap" }}
            className="col-sm-3 col-md-3 col-lg-3  col-form-label"
          >
            Company Website:
          </label>
          <div className="col-sm-9 col-md-9 col-lg-9">
            <input
              type="text"
              className="form-control-plaintext"
              defaultValue={props.userInfo.company_details?.website}
              onChange={(e) => {
                setCompanyDetails({
                  ...companyDetails,
                  website: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <label
            style={{ whiteSpace: "nowrap" }}
            className="col-sm-3 col-md-3 col-lg-3  col-form-label"
          >
            Company Address:
          </label>
          <div className="col-sm-9 col-md-9 col-lg-9">
            <input
              type="text"
              className="form-control-plaintext"
              defaultValue={props.userInfo.company_details?.address}
              onChange={(e) => {
                setCompanyDetails({
                  ...companyDetails,
                  address: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <h6
          className="newClient__content--heading"
          style={{ marginTop: "25px" }}
        >
          CONTACT DETAILS
        </h6>
        <div className="newClient__content--form">
          <div className="row">
            <label
              style={{ whiteSpace: "nowrap" }}
              className="col-sm-3 col-md-3 col-lg-3  col-form-label"
            >
              Contact Name:
            </label>
            <div className="col-sm-9 col-md-9 col-lg-9">
              <input
                type="text"
                className="form-control-plaintext"
                defaultValue={props.userInfo.contact_details?.name}
                onChange={(e) => {
                  setContactDetails({
                    ...contactDetails,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="row">
            <label
              style={{ whiteSpace: "nowrap" }}
              className="col-sm-3 col-md-3 col-lg-3  col-form-label"
            >
              Company Position:
            </label>
            <div className="col-sm-9 col-md-9 col-lg-9">
              <input
                type="text"
                className="form-control-plaintext"
                defaultValue={props.userInfo.contact_details?.position}
                onChange={(e) => {
                  setContactDetails({
                    ...contactDetails,
                    position: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="row">
            <label
              style={{ whiteSpace: "nowrap" }}
              className="col-sm-3 col-md-3 col-lg-3  col-form-label"
            >
              Email Address:
            </label>
            <div className="col-sm-9 col-md-9 col-lg-9">
              <input
                type="email"
                className="form-control-plaintext"
                defaultValue={props.userInfo.contact_details?.email}
                onChange={(e) => {
                  setContactDetails({
                    ...contactDetails,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="row">
            <label
              style={{ whiteSpace: "nowrap" }}
              className="col-sm-3 col-md-3 col-lg-3  col-form-label"
            >
              Phone Number:
            </label>
            <div className="col-sm-9 col-md-9 col-lg-9">
              <input
                type="text"
                className="form-control-plaintext"
                defaultValue={props.userInfo.contact_details?.phone_no}
                onChange={(e) => {
                  setContactDetails({
                    ...contactDetails,
                    phone_no: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <Button
            type="submit"
            style={{ wordWrap: "normal", marginTop: "35px" }}
            variant="contained"
            classes={{
              root: Importclasses.themeBlue,
              label: Importclasses.whiteLabelColor,
            }}
          >
            Update
          </Button>
          {/* <Button
            style={{ wordWrap: "normal", marginTop: "35px" }}
            endIcon={<AddCircleOutlineOutlinedIcon />}
            variant="contained"
            classes={{
              root: Importclasses.themeBlue,
              label: Importclasses.whiteLabelColor,
            }}
          >
            Add Contact
          </Button> */}
        </div>
      </form>
    </div>
  );
}
