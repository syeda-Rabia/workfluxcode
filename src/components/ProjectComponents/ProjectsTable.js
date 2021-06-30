import { Button as MuiButton, IconButton } from "@material-ui/core";
// @material-ui/icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import {
  DatePicker,
  Dropdown,
  Empty,
  Form,
  Input as AntInput,
  Menu,
  message,
  Popover,
  Progress,
  Select,
  Spin,
} from "antd";
import Pagination from "components/Pagination/Pagination";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
// core components
import { Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ApiUrls from "utils/ApiUrls";
import { GET, PATCH, POST } from "utils/Functions";
import "./projectsTable.scss";

const { Option } = Select;

const projectFilterOptions = ["active", "complete", "archive"];
const settingMenuOptions = [
  "duplicate",
  "archive",
  "unarchive",
  "complete",
  "active",
];
const key = "updatable";

function ProjectsTable(props) {
  const [state, setState] = useState({ visible: false });
  const [newProject, setNewProject] = useState({
    client_id: null,
    new_client: null,
    projectName: "",
    currencyType: "",
    hourlyRate: "",
    start_date: "",
    end_date: "",
  });
  const [allClients, setAllClients] = useState([]);
  const [allProjects, setAllProjects] = useState(null);
  const [openNewClientFields, setOpenNewClientFields] = React.useState(false);
  const [refresh, setRefresh] = useState(false);

  const [projectStatusFilter, setProjectStatusFilter] = useState(
    projectFilterOptions[0]
  );
  const [clientFilter, setClientFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const isFirstRun = useRef(true);

  // calls at function mount and everytime refresh changes

  useEffect(() => {
    getallclient();
    getAllProjects();
  }, [refresh]);
  // calls at function mount and everytime refresh changes and wont run at first time

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    filterProject();
  }, [projectStatusFilter, clientFilter]);
  // get all clients
  const getallclient = async () => {
    let res = await GET(ApiUrls.GET_ALL_CLIENTS);
    if (res.status == "200") {
      console.log(res);
      setAllClients(res.clients);
    }
  };

  const getAllProjects = async () => {
    let res = await GET(
      ApiUrls.GET_ALL_PROJECTS +
        `name=${clientFilter}&status=${projectStatusFilter}`
    );
    console.log(res);
    setLoading(false);
    if (res.status == "200") {
      setPaginate({
        ...paginate,
        pageSize: res.per_page,
        totalRecord: res.total,
        currentPage: res.current_page,
      });
      setAllProjects(res.projects);
    }
  };

  const SettingMenu = (id, status, isArchived) => (
    <Menu>
      {settingMenuOptions
        .filter((st) => {
          if (st == "archive") return !isArchived;
          if (st == "unarchive") return isArchived;
          if (!isArchived) return st !== status;
        })

        .map((val) => (
          <Menu.Item
            key={val}
            onClick={(e) => {
              changeprojectStatus(e.key, id);
              // console.log("click", id);
            }}
          >
            {val}
          </Menu.Item>
        ))}
      <Menu.Item onClick={() => deleteProject(id)}>{"Delete"}</Menu.Item>
    </Menu>
  );
  const changeprojectStatus = async (status, projectID) => {
    message.loading({ content: "Action in progress..", key });

    let res = await PATCH(ApiUrls.UPDATE_PROJECT + projectID, {
      status: status,
    });
    if (res.status == "200") {
      message.success({
        content: res.message,
        key,
        duration: 2.5,
      });
      setRefresh(!refresh);
    } else {
      message.error(res.message);
    }
  };
  const deleteProject = async (projectID) => {
    message.loading({ content: "Action in progress..", key });

    let res = await PATCH(ApiUrls.DELETE_PROJECT + projectID);
    console.log("res delete", res);
    if (res.status == "200") {
      message.success({
        content: res.message,
        key,
        duration: 2.5,
      });
      setRefresh(!refresh);
    } else {
      message.error(res.message);
    }
  };

  /* Start  Pagination data  */
  const [paginate, setPaginate] = useState({
    pageSize: 0,
    currentPage: null,
    totalRecord: null,
  });

  const handlePageChange = async (page) => {
    let res = await GET(
      ApiUrls.GET_ALL_PROJECTS +
        `name=${clientFilter}&status=${projectStatusFilter}&page=${page}`
    );
    console.log(res, "resp");
    if (res.status == "200") {
      setPaginate({
        ...paginate,
        pageSize: res.per_page,
        totalRecord: res.total,
        currentPage: res.current_page,
      });
      setAllProjects(res.projects);
    }
  };

  /* End  Pagination data  */

  const filterProject = async () => {
    setLoading(true);
    let res = await GET(
      ApiUrls.GET_ALL_PROJECTS +
        `name=${clientFilter}&status=${projectStatusFilter}`
    );
    console.log(res, "resp status filter");
    setLoading(false);

    if (res.status == "200") {
      setPaginate({
        ...paginate,
        pageSize: res.per_page,
        totalRecord: res.total,
        currentPage: res.current_page,
      });
      setAllProjects(res.projects);
    } else {
      message.error(res.message);
    }
  };
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    hide();
    let resp = await POST(ApiUrls.ADD_PROJECT, newProject);
    console.log(resp);
    form.resetFields();
    if (resp.status == "200") {
      message.success("Project Added Successfully.");
      setRefresh(!refresh);
    } else {
      message.error(resp.message);
    }
  };
  const hide = () => {
    setState({
      visible: false,
    });
    setNewProject({});
    setOpenNewClientFields(false);
  };

  const handleVisibleChange = (visible) => {
    form.resetFields();
    setState({ visible });
    setNewProject({});
    setOpenNewClientFields(false);
  };

  const popoverForm = () => (
    <>
      <Form
        form={form}
        preserve={false}
        requiredMark={false}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="client"
          label="Client"
          rules={[
            {
              required: true,
              message: "Please Select Client!",
            },
          ]}
        >
          <Select
            value={newProject.client}
            className="w-100 radiusBorderInput"
            bordered={false}
            listItemHeight={10}
            listHeight={250}
            getPopupContainer={(trigger) => trigger.parentNode}
            onChange={(value) => {
              console.log(value);
              setNewProject({
                ...newProject,
                client_id: value,
              });
            }}
            onSelect={(value) => {
              if (value == "new_client") {
                setNewProject({
                  ...newProject,
                  client: null,
                });

                setTimeout(() => {
                  setOpenNewClientFields(true);
                }, 500);
              }
              setOpenNewClientFields(false);
            }}
          >
            <Option className="antSelect" value="new_client">
              + New Client
            </Option>
            {allClients.map((item, index) => (
              <Option
                className="antSelect"
                style={{ textTransform: "capitalize" }}
                key={index}
                value={item._id}
              >
                {item.name}
                <p style={{ textTransform: "lowercase", fontSize: 10 }}>
                  &nbsp;&nbsp;{item.email}
                </p>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div>
          <AnimatePresence>
            {openNewClientFields ? (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Form.Item
                  name="newClient"
                  label="Client Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input New Client Name!",
                    },
                  ]}
                >
                  <AntInput
                    value={newProject.new_client?.name}
                    className="radiusBorderInput"
                    onChange={(event) => {
                      event.persist();
                      setNewProject(() => {
                        return {
                          ...newProject,
                          new_client: {
                            ...newProject.new_client,
                            name: event.target.value,
                          },
                        };
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Client Email"
                  name="clientEmail"
                  className="w-100 "
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "The input is not valid Email!",
                    },
                  ]}
                >
                  <AntInput
                    value={newProject.new_client?.email}
                    className="radiusBorderInput"
                    onChange={(event) => {
                      event.persist();

                      setNewProject(() => {
                        return {
                          ...newProject,
                          new_client: {
                            ...newProject.new_client,
                            email: event.target.value,
                          },
                        };
                      });
                    }}
                  />
                </Form.Item>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <Form.Item
          label="Project Name"
          name="projectName"
          className="w-100 "
          rules={[
            {
              required: true,
              message: "Please input Project Name!",
            },
          ]}
        >
          <AntInput
            value={newProject.projectName}
            className="radiusBorderInput"
            onChange={(event) => {
              event.persist();
              setNewProject(() => {
                return {
                  ...newProject,
                  projectName: event.target.value,
                };
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Start Date" name="startDate" className="w-100 ">
          <DatePicker
            className="w-100 radiusBorderInput"
            disabledDate={(current) =>
              current && current > moment(newProject.due_date, "YYYY-MM-DD")
            }
            onChange={(date, dateString) => {
              console.log(dateString);
              setNewProject(() => {
                return {
                  ...newProject,
                  start_date: dateString,
                };
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Due Date" name="dueDate" className="w-100 ">
          <DatePicker
            key={newProject.start_date}
            className="w-100 radiusBorderInput"
            disabledDate={(current) =>
              current && current < moment(newProject.start_date, "YYYY-MM-DD")
            }
            onChange={(date, dateString) => {
              console.log(dateString);
              setNewProject(() => {
                return {
                  ...newProject,
                  end_date: dateString,
                };
              });
            }}
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MuiButton
            endIcon={<AddCircleOutlineOutlinedIcon />}
            variant="contained"
            type="submit"
            color="primary"
          >
            Create
          </MuiButton>
        </div>
      </Form>
    </>
  );
  const TableRow = ({ item }) => (
    <tr>
      <td style={{ textTransform: "capitalize" }}>
        <Link
          to={{
            pathname: "/app/projects/" + item.projectName,
            state: item,
          }}
        >
          <span
            whileHover={{ scale: 1.1, color: "#2B7AE4" }}
            whileTap={{ scale: 0.9 }}
          >
            {item.projectName}
          </span>
        </Link>
      </td>

      <td>
        {item.client.first_name !== undefined
          ? `${item.client.first_name} ${item.client.last_name || ""}`
          : item.client.username}
      </td>
      <td>
        {(item.start_date && moment(item.start_date).format("LL")) || "----"}
      </td>
      <td>
        {item.end_date !== null ? moment(item.end_date).format("LL") : "----"}
      </td>
      <td>{item.status}</td>
      <td style={{ minWidth: 150 }}>
        <Progress
          percent={
            item.progress !== undefined
              ? (
                  (item.progress?.complete_tasks /
                    (item.progress?.active_tasks +
                      item.progress?.complete_tasks)) *
                    100 || 0
                ).toFixed()
              : 0
          }
        />
      </td>
      <td>{"----"}</td>
      <td>{"----"}</td>
      <td>{"----"}</td>
      <td>{"----"}</td>
      <td>
        <Dropdown
          trigger={["click"]}
          overlay={SettingMenu(item._id, item.status, item.isArchived)}
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
    <div className="projectTable__content w-100">
      <Row className="projectTable__content--buttons w-100 justify-content-between">
        <div>
          <Select
            allowClear={true}
            placeholder="Active Projects"
            className="mr-2 filterButton"
            bordered={false}
            listItemHeight={10}
            listHeight={250}
            onChange={(value) => {
              console.log(value);
              if (value !== undefined) setProjectStatusFilter(value);
              else setProjectStatusFilter("");
            }}
            defaultValue="Active Projects"
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {projectFilterOptions.map((val, index) => (
              <Option
                className="antSelect"
                style={{ textTransform: "capitalize" }}
                key={index}
                value={val}
              >
                {val}
              </Option>
            ))}
          </Select>
          {props.userType === "owner" || props.userType === "collaborator" ? (
            <Select
              allowClear={true}
              placeholder="All Clients"
              className="filterButton"
              bordered={false}
              listItemHeight={10}
              listHeight={250}
              onChange={(value) => {
                if (value !== undefined) setClientFilter(value);
                else setClientFilter("");
              }}
              defaultValue="All Clients"
              getPopupContainer={(trigger) => trigger.parentNode}
            >
              <Option
                className="antSelect"
                style={{ textTransform: "capitalize" }}
                value={""}
              >
                {"All Clients"}
              </Option>
              {allClients.map((item, index) => (
                <Option
                  className="antSelect"
                  style={{ textTransform: "capitalize" }}
                  key={index}
                  value={item._id}
                >
                  {(item?.first_name || "") + (item?.last_name || "") ||
                    item?.username}
                  {/* {item.username} */}
                </Option>
              ))}
            </Select>
          ) : null}
        </div>

        {props.userType === "owner" || props.userType === "collaborator" ? (
          <Popover
            content={popoverForm}
            title="New Project"
            trigger="click"
            visible={state.visible}
            onVisibleChange={handleVisibleChange}
            overlayStyle={{ height: "100vh", overflow: "auto" }}
          >
            <MuiButton
              endIcon={<AddCircleOutlineOutlinedIcon />}
              variant="contained"
              className="float-right"
              color="primary"
            >
              New Project
            </MuiButton>
          </Popover>
        ) : null}
      </Row>

      <div className="customTable">
        <Table responsive borderless>
          <thead>
            <tr className="tableHeading">
              <th scope="col">Project Title </th>
              <th scope="col">Client Name </th>
              <th scope="col">Start Date </th>
              <th scope="col">End Date </th>
              <th scope="col">Status </th>
              <th scope="col">Tasks Progress</th>
              <th scope="col">Outstanding Invoice </th>
              <th scope="col">Overdue Invoice</th>
              <th scope="col">Paid Invoice </th>
              <th scope="col">Client Category </th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {allProjects !== null && allProjects.length > 0 ? (
              allProjects.map((client, index) => (
                <TableRow key={index} item={client} index={index} />
              ))
            ) : loading ? (
              <tr>
                <td colSpan="11">
                  <Spin />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="11">
                  <Empty className="w-100 " />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {paginate.totalRecord > 10 ? (
          <Pagination
            itemsCount={paginate.totalRecord}
            pageSize={paginate.pageSize}
            currentPage={paginate.currentPage}
            onPageChange={handlePageChange}
          />
        ) : null}
      </div>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    myId: state.Login.user_info._id,
    userType: state.Login.user_info?.role?.title,
  };
};
export default connect(mapStatetoProps)(ProjectsTable);
