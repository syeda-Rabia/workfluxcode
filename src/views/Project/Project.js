import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import MessageIcon from "@material-ui/icons/Message";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import TimelapseOutlinedIcon from "@material-ui/icons/TimelapseOutlined";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";

import { server } from "variables/general.js";

import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import AppbarTabs from "components/CustomTabs/AppbarTabs";
import ProjectHeader from "components/ProjectComponents/ProjectHeader";
import Activity from "components/ActivityComponent/Activity";
import Document from "components/ProjectComponents/Document";
import Notes from "components/ProjectComponents/Notes";
import TimeTracking from "components/TimeTrackingComponents/TimeTracking";
import ProjectUsers from "components/ProjectComponents/ProjectUsers";
import StyleLessTabBar from "components/CustomTabs/StyleLessTabBar";
import Invoice from "components/InvoicesComponents/Invoice";
import Payments from "components/InvoicesComponents/Payments";
import Settings from "components/InvoicesComponents/Settings";
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ProjectSettings from "components/ProjectComponents/ProjectSettings";
import { useHistory } from "react-router-dom";
import ProjectTasks from "components/ProjectComponents/ProjectTasks";
import ProjectActivity from "components/ProjectComponents/ProjectActivity";
import { Redirect } from "react-router-dom";
import ProjectAttachments from "components/ProjectComponents/ProjectAttachments";
import ProjectMessages from "components/ProjectComponents/ProjectMessages";
import { connect } from "react-redux";

function Project(props) {
  const history = useHistory();
  // Note Please Change this tab value to 2
  const [value, setValue] = React.useState(2);
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <>
      {props.location.state === undefined ? (
        <Redirect from="/app" to="/app/projects" />
      ) : (
        <div className="px-2" style={{ marginTop: "0px" }}>
          <Button
            startIcon={<ArrowBackIosIcon style={{ fontSize: 12 }} />}
            style={{ color: "#C0C0C0" }}
            onClick={() => {
              history.push("/app/projects");
            }}
          >
            Back to Projects
          </Button>
          <GridContainer>
            <ProjectHeader handleChange={handleChange} {...props} />

            <GridItem xs={12} sm={12} md={12}>
              <AppbarTabs
                headerColor="info"
                value={value}
                handleChange={handleChange}
                tabs={[
                  {
                    tabContent: <ProjectUsers {...props.location.state} />,
                  },
                  {
                    tabContent: <ProjectSettings {...props.location.state} />,
                  },
                  {
                    tabName: "Tasks",
                    tabIcon: ListOutlinedIcon,
                    tabContent: <ProjectTasks {...props} />,
                  },
                  {
                    tabName: "Activity",
                    tabIcon: GraphicEqIcon,
                    tabContent: <ProjectActivity {...props} />,
                  },
                  {
                    tabName: "Messages",
                    tabIcon: MessageIcon,
                    tabContent: (
                      <ProjectMessages
                        loginUserInfo={props.loginUserInfo}
                        {...props}
                      />
                    ),
                  },
                  {
                    tabName: "Attachments",
                    tabIcon: AttachFileIcon,
                    tabContent: (
                      <ProjectAttachments {...props.location.state} />
                    ),
                  },
                  // {
                  //   tabName: "Notes",
                  //   tabIcon: NoteOutlinedIcon,
                  //   tabContent: <Notes />,
                  // },
                  // {
                  //   tabName: "Time Tracking",
                  //   tabIcon: TimelapseOutlinedIcon,
                  //   tabContent: <TimeTracking />,
                  // },
                  // {
                  //   tabName: "Documents",
                  //   tabIcon: NoteOutlinedIcon,
                  //   tabContent: <Document />,
                  // },
                  // {
                  //   tabName: "Invoices",
                  //   tabIcon: EventNoteOutlinedIcon,
                  //   tabContent: (
                  //     <StyleLessTabBar
                  //       headerColor="info"
                  //       tabs={[
                  //         {
                  //           tabName: "Invoices",
                  //           tabContent: <Invoice />,
                  //         },
                  //         {
                  //           tabName: "Payments",

                  //           tabContent: <Payments />,
                  //         },
                  //         {
                  //           tabName: "Settings",

                  //           tabContent: <Settings />,
                  //         },
                  //       ]}
                  //     />
                  //   ),
                  // },
                  // {
                  //   tabName: "Expensive",
                  //   tabIcon: EuroOutlinedIcon,
                  //   tabContent: (
                  //     <Tasks
                  //       checkedIndexes={[1]}
                  //       tasksIndexes={[0, 1, 2]}
                  //       tasks={server}
                  //     />
                  //   ),
                  // },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      )}
    </>
  );
}
const mapStatetoProps = (state) => {
  return {
    loginUserInfo: state.Login.user_info,
  };
};
export default connect(mapStatetoProps)(Project);
