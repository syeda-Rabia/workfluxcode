import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { message } from "antd";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ApiUrls from "utils/ApiUrls";
import { GET } from "utils/Functions";
import ClientProfileDetails from "./ClientProfileDetails";
import InvoiceOverView from "./InvoiceOverView";
var blueColor = "#2B7AE4";
var grayColor = "#7f7f7f";
export default function ClientProfile(props) {
  const [userInfo, setUserInfo] = useState([]);
  const history = useHistory();
  // console.log(props);
  // calls at function mount
  useEffect(() => {
    getUserInfo();
  }, []);
  // get userinfo from server

  const getUserInfo = async () => {
    let res = await GET(ApiUrls.GET_PROFILE_INFO + props.location.state._id);
    console.log(res);
    if (res.status == "200") {
      setUserInfo(res.profile_info);
    } else {
      message.error(res.message);
    }
  };
  return (
    <div>
      <Button
        style={{ color: "#C0C0C0" }}
        onClick={() => {
          history.push("/app/clients");
        }}
      >
        <ArrowBackIosIcon style={{ fontSize: 12 }} />
        Back to Clients
      </Button>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="d-flex project--title">
            <h1 className="font-weight-normal" style={{ color: grayColor }}>
              Client:&nbsp;
            </h1>
            <h1 className="font-weight-bold" style={{ color: blueColor }}>
              {(userInfo.first_name || " ") +
                " " +
                (userInfo.last_name || " ") || userInfo.username}
            </h1>

            {/* <IconButton style={{ color: blueColor }}>
              <SettingsOutlinedIcon />
            </IconButton> */}
          </div>
          <p style={{ color: grayColor }}>
            <span style={{ color: "#ABABAB" }}>Current Client</span>
          </p>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <Col xm={12} sm={12} md={6} lg={6}>
          <ClientProfileDetails {...{ userInfo }} />
        </Col>
        <Col xm={12} sm={12} md={6} lg={6}>
          <InvoiceOverView />
        </Col>
      </GridContainer>
    </div>
  );
}
