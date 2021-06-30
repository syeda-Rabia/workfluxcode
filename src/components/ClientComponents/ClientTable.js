import { Button, IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SearchIcon from "@material-ui/icons/Search";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import {
  Dropdown,
  Empty,
  Form,
  Input,
  Menu,
  message,
  Popover,
  Spin,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FormControl, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ApiUrls from "utils/ApiUrls";
import { GET, PATCH, POST } from "utils/Functions";
import "./clientComponents.scss";

// const settingMenuOptions = ["duplicate", "archive", "active", "complete"];

export default function ClientTable() {
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ visible: false });
  const [newClient, setNewClient] = useState({ name: "", email: "" });
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState("");
  const [filterClient, setFilterClient] = useState([]);
  // get all clients form server
  const getallclient = async () => {
    console.log("im in");
    setLoading(true);
    let res = await GET(ApiUrls.GET_ALL_CLIENTS + "type=record");
    console.log(res);
    setLoading(false);

    if (res.status == "200") {
      setAllClients(res.clients);
    }
  };
  // calls at function mount and everytime refresh changes

  useEffect(() => {
    getallclient();
  }, [refresh]);
  //  won't run at first time
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const timeoutId = setTimeout(() => searchClient(), 500);
    return () => clearTimeout(timeoutId);
  }, [value]);

  // search filter for clients table
  const searchClient = () => {
    const filtered_clients = allClients.filter((client) => {
      let name = `${client.first_name || ""} ${client.last_name || ""}`;
      console.log(name);
      return (
        name.toLowerCase().match(value.toLowerCase()) ||
        client.email.toLowerCase().match(value.toLowerCase())
      );
    });
    setFilterClient(filtered_clients);
    // setAllClients(filtered_clients);

    console.log(filtered_clients);
    console.log(value);
  };
  // to submit new client data
  const handleSubmit = async () => {
    hide();

    let resp = await POST(ApiUrls.ADD_CLIENT, {
      email: [newClient.email],
      name: newClient.name,
      role: "client",
      client_type: "record",
    });
    console.log(resp);
    setRefresh(!refresh);

    if (resp.status == "200") {
      message.success("Client Added Successfully.");
    } else {
      message.error(resp.message);
    }
  };
  // to delete client
  const deleteClient = async (userID) => {
    let res = await PATCH(ApiUrls.DELETE_USER + userID);
    console.log("res delete", res);
    if (res.status == "200") {
      message.success(res.message);
      setRefresh(!refresh);
    } else {
      message.error(res.message);
    }
  };
  // to hide popover
  const hide = () => {
    setState({
      visible: false,
    });
    form.resetFields();
  };
  // handle visiblity of popover
  const handleVisibleChange = (visible) => {
    setState({ visible });
    form.resetFields();
  };
  const [form] = Form.useForm();
  // content  of popover
  const content = (
    <div>
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Client Name"
          name="clientName"
          className="w-100"
          rules={[
            {
              required: true,
              message: "Please input Client Name!",
            },
          ]}
        >
          <Input
            className="w-100 radiusBorderInput"
            type="text"
            value={newClient.name}
            onChange={(event) => {
              console.log(event.target.value);
              event.persist();
              setNewClient({
                ...newClient,
                name: event.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="emial"
          className="w-100"
          rules={[
            {
              required: true,
              message: "Please input Email!",
            },
          ]}
        >
          <Input
            className="w-100 radiusBorderInput"
            type="email"
            value={newClient.email}
            onChange={(event) => {
              event.persist();

              setNewClient(() => {
                return {
                  ...newClient,
                  email: event.target.value,
                };
              });
            }}
          />
        </Form.Item>

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
  // setting menu popover dropdown menu
  const SettingMenu = (id) => (
    <Menu>
      {/* {settingMenuOptions
        .filter((st) => st !== status)
        .map((val, index) => (
          <Menu.Item
            key={val}
            onClick={(e) => {
              // changeTaskStatus(e.key, id);
              console.log("click", id);
            }}
          >
            {val}
          </Menu.Item>
        ))} */}

      <Menu.Item
        onClick={() => {
          deleteClient(id);
        }}
      >
        {"Delete"}
      </Menu.Item>
    </Menu>
  );
  // table row map
  const TableRow = ({ item, index }) => (
    <tr>
      <td>{"----"}</td>
      <td>
        <Link
          to={{
            pathname: "/app/client/" + item.username,
            state: item,
          }}
        >
          {item.first_name !== undefined
            ? item.first_name + " " + (item.last_name || " ")
            : "----"}
        </Link>
      </td>
      <td>{item.email}</td>
      <td>{"----"}</td>
      <td>{"----"}</td>
      <td>{"----"}</td>
      <td>{"----"}</td>

      <td>
        <Dropdown
          trigger={["click"]}
          overlay={SettingMenu(item._id, index, item.status)}
          placement="bottomCenter"
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <IconButton
            style={{
              padding: "3px",
            }}
          >
            <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
          </IconButton>
        </Dropdown>
      </td>
    </tr>
  );

  return (
    <>
      <div className="d-flex" style={{ flexWrap: "wrap" }}>
        <InputGroup className="col-md-4 pl-0" style={{ marginLeft: "2px" }}>
          <FormControl
            style={{ borderRight: "none" }}
            placeholder="Search"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <InputGroup.Append>
            <Button
              style={{
                border: "1px solid #ced4da",
                borderRadius: "0px 5px 5px 0px",
                borderLeft: "none",
              }}
              variant="outlined"
            >
              <SearchIcon style={{ fill: "#495057" }} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {/* <Button
          className="filterBtn"
          style={{ wordWrap: "normal" }}
          endIcon={<ExpandMoreOutlinedIcon />}
          classes={{
            label: classes.labelColor,
          }}
          variant="outlined"
        >
          Filter
        </Button> */}

        <Popover
          content={content}
          title="Add New Client"
          trigger="click"
          visible={state.visible}
          onVisibleChange={handleVisibleChange}
        >
          <Button
            className="float-right ml-auto"
            style={{ wordWrap: "normal" }}
            endIcon={<AddCircleOutlineOutlinedIcon />}
            variant="contained"
            color="primary"
            id="floatingButton"
          >
            New Client
          </Button>
        </Popover>
      </div>
      {/* <FrolaTextEditor /> */}
      {/* <ReactDraftEditor /> */}
      <div className="customTable">
        <Table responsive borderless>
          <thead>
            <tr className="tableHeading">
              <th scope="col">Company Name</th>
              <th scope="col">Contact Name</th>
              <th scope="col">Email Address</th>
              <th scope="col">Outstanding Invoice</th>
              <th scope="col">Overdue Invoice</th>
              <th scope="col">Paid Invoice</th>
              <th scope="col">Client Category</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {filterClient.length > 0 ? (
              filterClient.map((client, index) => (
                <TableRow key={index} item={client} index={index} />
              ))
            ) : allClients.length > 0 ? (
              allClients.map((client, index) => (
                <TableRow key={index} item={client} index={index} />
              ))
            ) : loading ? (
              <tr>
                <td colSpan="8">
                  <Spin />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="9">
                  <Empty className="w-100 " />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
