import { Button, Divider } from "@material-ui/core";
import { DatePicker, Form, Input, message, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import SelectCurrency from "react-select-currency";
import { Col } from "reactstrap";
import ApiUrls from "utils/ApiUrls";
import { GET, PATCH } from "utils/Functions";
import "./projectSettings.scss";

const { Option } = Select;

export default function ProjectSettings(props) {
  const [editProject, setEditProject] = useState({
    client_id: props.client?._id,
    projectName: props.projectName,
    currencyType: props.currencyType,
    hourlyRate: props.hourlyRate,
    start_date: props.start_date,
    end_date: props.end_date,
  });
  const [allClients, setAllClients] = useState([]);
  console.log("props", props);
  // get all clients data
  const getallclient = async () => {
    let res = await GET(ApiUrls.GET_ALL_CLIENTS);
    if (res.status == "200") {
      console.log(res);
      setAllClients(res.clients);
    }
  };

  useEffect(() => {
    getallclient();
  }, []);
  console.log("editProject", editProject);
  // update project
  const handleSubmit = async () => {
    let resp = await PATCH(ApiUrls.UPDATE_PROJECT + props._id, editProject);
    console.log(resp);

    if (resp.status == "200") {
      message.success("Project Updated Successfully.");
    } else {
      message.error("error");
    }
  };
  return (
    <div className="projectSettings--container">
      <Form layout="vertical" className="settingsForm" onFinish={handleSubmit}>
        <Form.Item label="Project Name">
          <Input
            className="radiusBorderInput"
            defaultValue={editProject.projectName}
            onChange={(e) => {
              setEditProject({
                ...editProject,
                projectName: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Client">
          <Select
            className="w-100 radiusBorderInput"
            bordered={false}
            listItemHeight={10}
            listHeight={250}
            defaultValue={props.client?.username}
            onChange={(value) => {
              setEditProject({
                ...editProject,
                client_id: value,
              });
            }}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {allClients.map((item, index) => (
              <Option
                className="antSelect"
                style={{ textTransform: "capitalize" }}
                key={index}
                value={item._id}
              >
                {item.username}
                <p style={{ textTransform: "lowercase", fontSize: 10 }}>
                  &nbsp;&nbsp;{item.email}
                </p>
              </Option>
            ))}
          </Select>
          {/* <Input
            className="radiusBorderInput"
            defaultValue={props.client?.name}
          /> */}
        </Form.Item>
        <Row className="p-0">
          <Col>
            <Form.Item label="Hourly Rate ">
              <Input
                className="radiusBorderInput"
                defaultValue={editProject.hourlyRate}
                onChange={(e) => {
                  setEditProject({
                    ...editProject,
                    hourlyRate: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Currency">
              <SelectCurrency
                className="w-100 radiusBorderInput form-control-sm  p-3"
                placeholder="Select Currency"
                value={editProject.currencyType}
                onChange={(e) => {
                  setEditProject({
                    ...editProject,
                    currencyType: e.target.value,
                  });
                }}
                // onChange={(e) => console.log("currency", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex flex-row justify-content-between w-50 w-sm-100">
          <Form.Item label="Start Date" style={{ width: "48%" }}>
            <DatePicker
              className="w-100 radiusBorderInput"
              defaultValue={
                editProject.start_date !== null
                  ? moment(editProject.start_date)
                  : ""
              }
              onChange={(date, dateString) => {
                console.log(dateString);
                setEditProject({
                  ...editProject,
                  start_date: dateString,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="End Date" style={{ width: "48%" }}>
            <DatePicker
              className="w-100 radiusBorderInput"
              defaultValue={
                editProject.end_date !== null
                  ? moment(editProject.end_date)
                  : ""
              }
              onChange={(date, dateString) => {
                console.log(dateString);
                setEditProject({
                  ...editProject,
                  end_date: dateString,
                });
              }}
            />
          </Form.Item>
        </div>
        <Divider className="my-3" />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="float-right "
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
}
