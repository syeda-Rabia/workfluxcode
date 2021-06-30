import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { Form, message } from "antd";
import style from "assets/jss/material-dashboard-react/views/genericStyles";
import BackdropLoading from "components/Loading/BackdropLoading";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ApiUrls from "utils/ApiUrls";
import { GET, POST } from "utils/Functions";
import EmailForm from "./EmailForm";
import "./inviteNewPeople.scss";
import MultiRadioButtonList from "./MultiRadioButtonList";

const useStyle = makeStyles(style);
const memberCheckBox = [
  {
    heading: "owner",
    price: "$1/month",
    text: "Can do everything you can.",
  },
  {
    heading: "collaborator",
    price: "$1/month",
    subHeading: "Will be able to:",
    option: [
      { text: "Access projects assigned" },
      { text: "Create new projects" },
      { text: "Create proposals" },
      { text: "Create contracts" },
      { text: "Create and manage tasks" },
      { text: "Be assigned tasks" },
      { text: "Track time" },
    ],
  },
  {
    heading: "member",
    price: "$1/month",
    subHeading: "Will be able to:",
    option: [
      { text: "Perform action on Task" },
      { text: "Perform action on Project" },
    ],
  },

  {
    heading: "client",
    price: "Free",
    subHeading: "Will be able to:",
    option: [
      { text: "Time track" },
      { text: "Upload files" },
      { text: "Add comments on discussions " },
    ],
  },
];
export default function InviteNewPeople(props) {
  const classes = useStyle();
  const history = useHistory();
  console.log(props);

  const [allProjects, setAllProjects] = useState([]);
  useEffect(() => {
    getAllProjects();
  }, []);
  // function to select all projects
  const handleSelectAll = () => {
    const data = JSON.parse(JSON.stringify(allProjects));
    let newdata = data.map((project) => ({
      ...project,
      check: true,
    }));
    console.log(newdata);
    setAllProjects(newdata);
  };
  // function to unselect all project
  const handleSelectNone = () => {
    const data = JSON.parse(JSON.stringify(allProjects));
    let newdata = data.map((project) => ({
      ...project,
      check: false,
    }));

    console.log(newdata);
    setAllProjects(newdata);
  };

  const [inviteNewPeople, setInviteNewPeople] = useState({
    email: [],
    role: "client",
    client_type: "user",
  });
  const [userRole, setUserRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const handleInviteEmailList = (e, index) => {
    const list = { ...inviteNewPeople };
    const emailList = [...list.email];
    emailList[index] = e.target.value;
    setInviteNewPeople({ ...inviteNewPeople, email: emailList });
  };
  const getAllProjects = async () => {
    let res = await GET(ApiUrls.GET_ALL_PROJECTS + "status=active");
    console.log(res);
    if (res?.status == "200") {
      let projects = res.projects.map((project) => {
        return {
          projectName: project.projectName,
          id: project._id,
          check: false,
        };
      });
      console.log(projects);

      setAllProjects(projects);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    let filterData = null;
    if (
      allProjects.length > 0 &&
      (userRole == "member" || userRole == "collaborator")
    ) {
      console.log(":bhsgdhgds");
      filterData = allProjects
        .filter((project) => {
          return project.check === true;
        })
        .map((project) => {
          return project.id;
        });
      console.log(filterData);
    }

    console.log({
      email: inviteNewPeople.email,
      role: inviteNewPeople.role,
      project: filterData,
    });
    let resp = await POST(ApiUrls.INVITE_USER, {
      email: inviteNewPeople.email,
      role: inviteNewPeople.role,
      project: filterData,
      client_type: inviteNewPeople.client_type,
    });
    console.log(resp);
    setLoading(false);

    if (resp.status == "200") {
      message.success(resp.message);
      props.history.goBack();
    } else {
      message.error(resp.message);
    }
  };
  console.log(inviteNewPeople, userRole);
  return (
    <div className="inviteNewPeople__content">
      <Button
        style={{ color: "#C0C0C0" }}
        onClick={() => {
          history.push("/app/users");
        }}
      >
        <ArrowBackIosIcon style={{ fontSize: 12 }} /> Back to Users
      </Button>
      <BackdropLoading loading={loading} />
      <Form onFinish={handleSubmit}>
        <Col xs={12} sm={12} md={6} className="inviteNewPeople__content--main">
          <h1>Invite New People</h1>
          <h6>Who do you want to invite?</h6>
          <EmailForm
            onChange={handleInviteEmailList}
            data={inviteNewPeople}
            {...{ setInviteNewPeople }}
          />
          <h6>What role will they have?</h6>
          <MultiRadioButtonList
            data={memberCheckBox}
            onChange={(e) => {
              console.log(e.target.value);
              setUserRole(e.target.value);
              setInviteNewPeople({ ...inviteNewPeople, role: e.target.value });
            }}
          />
          {allProjects !== null &&
          allProjects.length > 0 &&
          (userRole == "member" || userRole == "collaborator") ? (
            <div>
              <h1 className="projectSelectHeading">
                Which projects can they access?
              </h1>
              <div className="d-flex flex-column">
                {allProjects != null
                  ? allProjects.map((pro, index) => (
                      <FormControlLabel
                        key={index}
                        style={{ color: "#616161" }}
                        control={
                          <Checkbox
                            checked={pro.check}
                            onChange={() => {
                              let i = index;
                              let checkProjects = [...allProjects];
                              checkProjects[i].check = !checkProjects[i].check;
                              setAllProjects(checkProjects);
                            }}
                            style={{ color: "#2B7AE4" }}
                          />
                        }
                        label={pro.projectName}
                      />
                    ))
                  : null}
              </div>
              <Row>
                <Button style={{ color: "#8F8F8F" }} onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button style={{ color: "#8F8F8F" }} onClick={handleSelectNone}>
                  Select None
                </Button>
              </Row>
            </div>
          ) : null}
          <Button
            type="submit"
            className="my-3 w-25"
            endIcon={<SendOutlinedIcon />}
            classes={{
              root: classes.themeBlue,
              label: classes.whiteLabelColor,
            }}
          >
            Send
          </Button>
        </Col>
      </Form>
    </div>
  );
}
