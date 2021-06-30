import React, { useEffect, useState } from "react";
import Card from "components/Card/Card";
import { Table } from "react-bootstrap";
import genericStyles from "assets/jss/material-dashboard-react/views/genericStyles";
import { Button, makeStyles, Input } from "@material-ui/core";
import { Popover } from "antd";

import SettingMenu from "components/SettingMenu/SettingMenu";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Form, Col, InputGroup } from "react-bootstrap";

import "./clientManagementStyling.scss";

import { POST, GET, REGISTER_USER } from "utils/Functions";
import { message } from "antd";

import ApiUrls from "utils/ApiUrls";
const useStyles = makeStyles(genericStyles);

export default function ClientManagementTable() {
  const [allClients, setAllClients] = useState([]);
  const [registerUser, setRegisterUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [state, setState] = useState({ visible: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    hide();
    let resp = await REGISTER_USER(ApiUrls.USER_REGISTER, registerUser);
    console.log(resp);

    if (resp.status == "200") {
      message.success("Registration Done Successfully.");
    }
  };
  const hide = () => {
    setState({
      visible: false,
    });
  };

  const handleVisibleChange = (visible) => {
    setState({ visible });
  };
  const getallclient = async () => {
    console.log("im in");
    let res = await GET(ApiUrls.SUPERUSER_GET_ALL_CLIENTS);
    console.log(res);
    if (res.status == "200") {
      setAllClients(res.users);
    }
  };

  useEffect(() => {
    getallclient();
  }, []);

  const TableRow = ({ item, index }) => (
    <tr>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>
        <SettingMenu />
      </td>
    </tr>
  );
  const content = (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Input
            className="form-control w-100 "
            disableUnderline
            placeholder="Enter Username"
            required="true"
            type="text"
            value={registerUser.username}
            onChange={(event) => {
              let val = event.target.value;
              setRegisterUser({
                ...registerUser,
                username: val,
              });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Input
            className="form-control  w-100 "
            disableUnderline
            placeholder="Enter Email"
            required="true"
            type="email"
            value={registerUser.email}
            onChange={(event) => {
              setRegisterUser(() => {
                return {
                  ...registerUser,
                  email: event.target.value,
                };
              });
            }}
          />
        </Form.Group>{" "}
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Input
            className="form-control  w-100 "
            disableUnderline
            placeholder="Enter Password"
            required="true"
            type="password"
            value={registerUser.password}
            onChange={(event) => {
              setRegisterUser(() => {
                return {
                  ...registerUser,
                  password: event.target.value,
                };
              });
            }}
          />
          <Form.Text className="text-muted">
            Password must be 6 characters long.
          </Form.Text>
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            endIcon={<AddCircleOutlineOutlinedIcon />}
            variant="contained"
            type="submit"
            color="primary"
          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  );

  const classes = useStyles();
  return (
    <div className="test">
      <Popover
        content={content}
        title="Add New Client"
        trigger="click"
        visible={state.visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button className="float-right" color="primary" variant="contained">
          New Client
        </Button>
      </Popover>
      <br />
      <br />
      <div className="customTable">
        <Table responsive borderless>
          <thead>
            <tr className="tableHeading">
              <th scope="col">User Name</th>
              <th scope="col">Email Address</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {allClients.map((client, index) => (
              <TableRow key={index} item={client} index={index} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
