/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState, useRef } from "react";
import { IconButton, Tooltip, Chip } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { motion } from "framer-motion";
import {
  Menu,
  Dropdown,
  Select,
  Checkbox,
  message,
  Collapse,
  Modal,
  Empty,
} from "antd";
import Icon from "@ant-design/icons";
import { GET, PATCH } from "utils/Functions";
import ApiUrls from "utils/ApiUrls";
import NewTaskDialog from "components/Create/NewTaskDialog";
import ViewTaskDetails from "./ViewTaskDetails";
import moment from "moment";
import "./task.scss";
import Pagination from "components/Pagination/Pagination";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import BackdropLoading from "components/Loading/BackdropLoading";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const settingMenuOptions = [
  "duplicate",
  "archive",
  "unarchive",
  "complete",
  "active",
];
const taskFilterOptions = ["active", "complete", "archive"];

const { Option } = Select;
const statuskey = "changeStatus";
const deleteKey = "delete";
const taskTitle = {
  hover: {
    color: "#2b7ae4",
    fontWeight: "600",

    cursor: "pointer",
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeIn",
    },
  },
};
const arrowDown = () => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.41 0.294922L6 4.87492L10.59 0.294922L12 1.70492L6 7.70492L0 1.70492L1.41 0.294922Z" />
  </svg>
);
// arrow down svg
const ExpandMoreIcon = (props) => <Icon component={arrowDown} {...props} />;

function Task(props) {
  const [openNewTaskDialogBox, setOpenNewTaskDialogBox] = useState(false);
  const [openTaskDrawer, setOpenTaskDrawer] = React.useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [projectFilter, setProjectFilter] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const [allProjects, setAllProjects] = useState([]);
  // const [allClients, setAllClients] = useState([]);
  const [taskList, setTaskList] = useState([]);
  // const [newTaskList, setNewTaskList] = useState([]);

  const drawerRef = useRef();
  const [data, setData] = useState({
    allTasks: [],
    allClients: [],
    allProjects: [],
  });

  const [taskStatusFilter, setTaskStatusFilter] = useState(
    taskFilterOptions[0]
  );
  const [loading, setLoading] = useState(true);
  const isFirstRun = useRef(true);

  // const [taskTitle, setTaskTitle] = useState("");
  // get all data
  useEffect(() => {
    getAllTasks();
    getAllData();
    // getAllProjects();
    // getallclient();
  }, [refresh]);
  // calls at function mount and everytime projectFilter, taskStatusFilter changes

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    filterTasks();
  }, [projectFilter, taskStatusFilter]);

  /* Start  Pagination data  */

  const [paginate, setPaginate] = useState({
    pageSize: 0,
    currentPage: null,
    totalRecord: null,
  });

  const handlePageChange = async (page) => {
    let res = await GET(
      ApiUrls.GET_ALL_TASKS +
        `status=${taskStatusFilter}&id=${projectFilter}&page=${page}`
    );

    if (res.status == "200") {
      setPaginate({
        pageSize: res.per_page,
        totalRecord: res.total,
        currentPage: res.current_page,
      });
      setData({
        ...data,
        allTasks: res.tasks,
      });
    }
  };

  /* End  Pagination data  */

  const getAllData = async () => {
    // let resTask = await GET(ApiUrls.GET_ALL_TASKS + `status=active`);
    //
    let resProject = await GET(ApiUrls.GET_ALL_PROJECTS + `status=active`);

    let resClient = await GET(ApiUrls.GET_ALL_CLIENTS);

    // setLoading(false);

    if (
      // resTask.status == "200" &&
      resProject.status == "200" &&
      resClient.status == "200"
    ) {
      // setPaginate({
      //   pageSize: resTask.per_page,
      //   totalRecord: resTask.total,
      //   currentPage: resTask.current_page,
      // });

      setData({
        ...data,
        // allTasks: resTask.tasks,
        allProjects: resProject.projects,
        allClients: resClient.clients,
      });
    }
  };
  const getAllTasks = async () => {
    let res = await GET(ApiUrls.GET_MY_TASKS + `status=${taskStatusFilter}`);
    console.log(res);
    setLoading(false);
    if (res.status == "200") {
      setPaginate({
        pageSize: res.per_page,
        totalRecord: res.total,
        currentPage: res.current_page,
      });
      setTaskList(res.tasks);
    }
  };
  // const getAllProjects = async () => {
  //   let res = await GET(ApiUrls.GET_ALL_PROJECTS + `status=active`);
  //
  //   if (res.status == "200") {
  //     setAllProjects(res.projects);
  //   }
  // };
  // const getallclient = async () => {
  //   let res = await GET(ApiUrls.GET_ALL_CLIENTS);
  //   if (res.status == "200") {
  //
  //     setAllClients(res.clients);
  //   }
  // };
  const filterTasks = async () => {
    setLoading(true);
    let res = await GET(
      ApiUrls.GET_MY_TASKS + `status=${taskStatusFilter}&id=${projectFilter}`
    );

    if (res.status == "200") {
      setPaginate({
        pageSize: res.per_page,
        totalRecord: res.total,
        currentPage: res.current_page,
      });
      // setAllTasks(res.tasks);
      setTaskList(res.tasks);
      setLoading(false);
    }
  };
  const forceCompleteTask = async (status, taskID) => {
    let res = await PATCH(ApiUrls.FORCE_UPDATE_TASK + taskID, {
      status: status,
    });

    if (res.status == "200") {
      message.success(res.message);

      setRefresh(!refresh);
    } else {
      message.error(res.message);
    }
  };
  const changeTaskStatus = async (status, taskID) => {
    message.loading({ content: "Action in progress..", statuskey });
    console.log({ status });
    let res = await PATCH(ApiUrls.UPDATE_TASK + taskID, {
      status: status,
    });

    if (res.status == "200") {
      message.success({
        content: res.message,
        statuskey,
        duration: 2.5,
      });
      setRefresh(!refresh);
    } else {
      if (res.hasOwnProperty("dependency_error")) {
        Modal.confirm({
          title: "Mark as Complete?",
          centered: true,
          content: res.dependency_error,
          okText: "Ignore and mark as Complete",
          cancelText: "Cancel",
          destroyOnClose: true,
          okButtonProps: {
            className: "rounded-pill",
          },
          cancelButtonProps: { className: "rounded-pill" },
          maskStyle: {
            backgroundColor: "rgba(251, 251, 251, 0.8)",
          },
          onOk: () => forceCompleteTask(status, taskID),
        });
      } else {
        message.error(res.message);
      }
    }
  };
  const SettingMenu = (id, index, status, isArchived) => (
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
              changeTaskStatus(e.key, id);
            }}
          >
            {val}
          </Menu.Item>
        ))}

      <Menu.Item onClick={() => deleteTask(id)}>{"Delete"}</Menu.Item>
    </Menu>
  );
  const forceDeleteTask = async (taskId) => {
    let res = await PATCH(ApiUrls.FORCE_DELETE_TASK + taskId);

    if (res.status == "200") {
      message.success(res.message);
      setRefresh(!refresh);
    } else {
      message.error(res.message);
    }
  };

  const deleteTask = async (taskId) => {
    message.loading({ content: "Action in progress..", deleteKey });

    let res = await PATCH(ApiUrls.DELETE_TASK + taskId);

    if (res.status == "200") {
      message.success({
        content: res.message,
        deleteKey,
        duration: 2.5,
      });
      setRefresh(!refresh);
    } else {
      if (res.hasOwnProperty("dependency_error")) {
        Modal.confirm({
          title: "Delete Task?",
          centered: true,
          content: res.dependency_error,
          okText: "Delete and Disconnect Dependency",
          cancelText: "Cancel",
          destroyOnClose: true,
          width: 500,
          okButtonProps: { className: "rounded-pill" },
          cancelButtonProps: { className: "rounded-pill" },
          maskStyle: {
            backgroundColor: "rgba(251, 251, 251, 0.8)",
          },
          onOk: () => forceDeleteTask(taskId),
        });
      } else {
        message.error(res.message);
      }
    }
  };
  // const handleDrawer = useCallback(() => {
  //   setOpenTaskDrawer(!openTaskDrawer);
  // }, [openTaskDrawer]);

  const handleDrawer = () => {
    setOpenTaskDrawer(!openTaskDrawer);
  };
  // const [form] = Form.useForm();

  // const handleSubmit = async () => {
  //   let resp = await POST(ApiUrls.ADD_NEW_TASKLIST, newTaskList);
  //
  //   form.resetFields();
  //   if (resp.status == "200") {
  //     message.success(resp.message);
  //     setRefresh(!refresh);
  //   } else {
  //     message.error(resp.message);
  //   }
  // };
  // const content = (
  //   <div>
  //     <Form
  //       form={form}
  //       preserve={false}
  //       requiredMark={false}
  //       layout="vertical"
  //       onFinish={handleSubmit}
  //     >
  //       <Form.Item
  //         name="project"
  //         label="Select Project"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Please Select Project to create Task List!",
  //           },
  //         ]}
  //       >
  //         <Select
  //           className="w-100 radiusBorderInput"
  //           bordered={false}
  //           listItemHeight={10}
  //           listHeight={250}
  //           getPopupContainer={(trigger) => trigger.parentNode}
  //           onChange={(value) => {
  //
  //             setNewTaskList({ ...newTaskList, project_id: value });
  //           }}
  //         >
  //           {data.allProjects.map((item, index) => (
  //             <Option
  //               className="antSelect"
  //               style={{ textTransform: "capitalize" }}
  //               key={index}
  //               value={item._id}
  //             >
  //               {item.projectName}
  //             </Option>
  //           ))}
  //         </Select>
  //       </Form.Item>
  //       <Form.Item
  //         name="taskList"
  //         label="Task List Name"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Please Input Task list name!",
  //           },
  //         ]}
  //       >
  //         <Input
  //           bordered={false}
  //           className="radiusBorderInput"
  //           onChange={(e) => {
  //
  //             setNewTaskList({ ...newTaskList, title: e.target.value });
  //           }}
  //         />
  //       </Form.Item>

  //       <div
  //         className="mt-2"
  //         style={{ display: "flex", justifyContent: "center" }}
  //       >
  //         <Button
  //           endIcon={<AddCircleOutlineOutlinedIcon />}
  //           variant="contained"
  //           type="submit"
  //           color="primary"
  //         >
  //           Create
  //         </Button>
  //       </div>
  //     </Form>
  //   </div>
  // );
  const TableRow = ({ item, index, selectedIndex }) => {
    return (
      <tr
        onClick={() => {
          setSelectedID({
            project: selectedIndex.projectIndex,
            taskList: selectedIndex.taskListIndex,
            task: index,
          });
          handleDrawer();
        }}
      >
        <motion.td
          style={{
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          initial="rest"
          whileHover="hover"
          animate="rest"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            className="mr-2 float-left"
            checked={item.status == "complete" ? true : false}
            // defaultChecked={item.status == "complete" ? true : false}
            onChange={(e) => {
              let status = e.target.checked ? "complete" : "active";
              changeTaskStatus(status, item._id);
            }}
          />
          <Tooltip placement="top" title={item.title}>
            <motion.span
              variants={taskTitle}
              onClick={() => {
                setSelectedID({
                  project: selectedIndex.projectIndex,
                  taskList: selectedIndex.taskListIndex,
                  task: index,
                });
                handleDrawer();
              }}
            >
              {item.title}
            </motion.span>
          </Tooltip>
        </motion.td>

        <td>
          {(item.project.client?.first_name || "") +
            (item.project.client?.last_name || "") ||
            item.project.client?.username}
        </td>
        <td>{item.project?.projectName}</td>
        {/* <td style={{ minWidth: 150 }}>
          <Progress
            percent={
              item.progress !== undefined
                ? (
                    (item.progress?.complete_subtasks /
                      (item.progress?.active_subtasks +
                        item.progress?.complete_subtasks)) *
                      100 || 0
                  ).toFixed()
                : item.status === "complete"
                ? 100
                : 0
            }
          />
        </td> */}
        <td>
          {item.label !== undefined ? (
            <Chip
              style={{
                background: item?.label_color,
                color: "#Fff",
                minWidth: 80,
              }}
              label={item.label}
            />
          ) : (
            "----"
          )}
        </td>
        <td>
          {(item.assignee?.first_name || "") +
            (item.assignee?.last_name || "") || item.assignee?.username}
        </td>
        {/* <td>
          {(item.assigned_by?.first_name || "") +
            (item.assigned_by?.last_name || "") || item.assigned_by?.username}
        </td> */}
        <td>{moment(item.due_date).format("LL")}</td>
        <td>{"--"}</td>
        <td onClick={(e) => e.stopPropagation()}>
          <Dropdown
            trigger={["click"]}
            overlay={SettingMenu(item._id, index, item.status, item.isArchive)}
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
  };

  const CollapseProject = ({ task, projectIndex }) => {
    return (
      <div key={projectIndex}>
        <Collapse
          className="p-0 collapseContainer mt-3"
          onChange={() => {
            if (
              document
                .getElementById("collapse--icon" + `-${projectIndex}`)
                .classList.contains("rotate-0")
            ) {
              document
                .getElementById("collapse--icon" + `-${projectIndex}`)
                .classList.remove("rotate-0");
              document
                .getElementById("collapse--icon" + `-${projectIndex}`)
                .classList.add("-rotate-90");
            } else if (
              document
                .getElementById("collapse--icon" + `-${projectIndex}`)
                .classList.contains("-rotate-90")
            ) {
              document
                .getElementById("collapse--icon" + `-${projectIndex}`)
                .classList.remove("-rotate-90");
              document
                .getElementById("collapse--icon" + `-${projectIndex}`)
                .classList.add("rotate-0");
            }
          }}
          expandIcon={() => (
            <ExpandMoreIcon
              id={"collapse--icon" + `-${projectIndex}`}
              className="transform duration-500 ease-in-out rotate-0"
              style={{ color: "#2b7ae4", marginTop: 10 }}
            />
          )}
          defaultActiveKey={["1"]}
          ghost
        >
          <Collapse.Panel
            header={
              <>
                <span className="collapseHeading">{task.projectName}</span>
                <span className="company">Owner Company</span>
              </>
            }
            key="1"
          >
            {task.tasklists.map((list, taskListIndex) => (
              <Collapse
                ghost
                key={taskListIndex}
                onChange={() => {
                  if (
                    document
                      .getElementById(
                        `collapse--${list._id}--icon` + `-${taskListIndex}`
                      )
                      .classList.contains("rotate-0")
                  ) {
                    document
                      .getElementById(
                        `collapse--${list._id}--icon` + `-${taskListIndex}`
                      )
                      .classList.remove("rotate-0");
                    document
                      .getElementById(
                        `collapse--${list._id}--icon` + `-${taskListIndex}`
                      )
                      .classList.add("-rotate-90");
                  } else if (
                    document
                      .getElementById(
                        `collapse--${list._id}--icon` + `-${taskListIndex}`
                      )
                      .classList.contains("-rotate-90")
                  ) {
                    document
                      .getElementById(
                        `collapse--${list._id}--icon` + `-${taskListIndex}`
                      )
                      .classList.remove("-rotate-90");
                    document
                      .getElementById(
                        `collapse--${list._id}--icon` + `-${taskListIndex}`
                      )
                      .classList.add("rotate-0");
                  }
                }}
                expandIcon={() => (
                  <ExpandMoreIcon
                    id={`collapse--${list._id}--icon` + `-${taskListIndex}`}
                    className="transform duration-500 ease-in-out rotate-0"
                    style={{ marginTop: 5 }}
                  />
                )}
                defaultActiveKey={["1"]}
              >
                <Collapse.Panel
                  className="customPanel"
                  header={
                    <h3 className="collapseSubHeading">
                      {list.title}: {list.tasks.length}
                    </h3>
                  }
                  key="1"
                >
                  <div className="customTable" style={{ margin: "0px" }}>
                    <Table responsive borderless hover>
                      <thead>
                        <tr className="tableHeading">
                          <th scope="col">Task </th>
                          <th scope="col">Client</th>
                          <th scope="col">Project </th>
                          {/* <th scope="col">Progress </th> */}
                          <th scope="col">Task Label </th>
                          <th scope="col">Assigned to</th>
                          {/* <th scope="col">Assigned by</th> */}
                          <th scope="col">Due Date </th>
                          <th scope="col">Timer </th>

                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.tasks.length > 0 ? (
                          list.tasks.map((task, taskIndex) => (
                            <TableRow
                              // project={key}
                              selectedIndex={{
                                projectIndex,
                                taskListIndex,
                              }}
                              key={taskIndex}
                              item={task}
                              index={taskIndex}
                            />
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8">
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
                </Collapse.Panel>
              </Collapse>
            ))}
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  };
  // to reorder array on drag end
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    // dropped outside the list
    console.log(result);
    if (!result.destination) {
      return;
    }

    const items = reorder(
      taskList,
      result.source.index,
      result.destination.index
    );
    console.log(items);
    setTaskList(items);
  }
  return (
    <>
      <div className="taskButtons">
        {openNewTaskDialogBox ? (
          <NewTaskDialog
            ref={drawerRef}
            refreshAfterSubmit={() => {
              setRefresh(!refresh);
            }}
            openModal={openNewTaskDialogBox}
            handleClose={() => drawerRef.current.handleClose()}
            closeModal={() => setOpenNewTaskDialogBox(false)}
            allProjects={data.allProjects}
            loggedUser={props.loginUserInfo}
            picture={props.picture}
          />
        ) : null}
        <Select
          allowClear={true}
          placeholder="Active Tasks"
          className="mr-2 filterButton"
          bordered={false}
          listItemHeight={10}
          listHeight={250}
          onChange={(value) => {
            if (value !== undefined) setTaskStatusFilter(value);
            else setTaskStatusFilter("");
          }}
          defaultValue="Active Tasks"
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {taskFilterOptions.map((val, index) => (
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

        <Select
          allowClear={true}
          placeholder="All Projects"
          className="filterButton"
          bordered={false}
          listItemHeight={10}
          listHeight={250}
          onChange={(value) => {
            if (value !== undefined) setProjectFilter(value);
            else setProjectFilter("");
          }}
          defaultValue="All Projects"
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <Option
            className="antSelect"
            style={{ textTransform: "capitalize" }}
            value={""}
          >
            {"All Projects"}
          </Option>
          {data.allProjects.map((item, index) => (
            <Option
              className="antSelect"
              style={{ textTransform: "capitalize" }}
              key={index}
              value={item._id}
            >
              {item.projectName}
            </Option>
          ))}
        </Select>

        {props.userType === "owner" || props.userType === "collaborator" ? (
          <>
            {/* <Button
              onClick={() => {
                // drawerRef.current.handleOpen();
                setOpenNewTaskDialogBox(!openNewTaskDialogBox);
              }}
              endIcon={<AddCircleOutlineOutlinedIcon />}
              variant="contained"
              className="float-right taskButton"
              id="floatingButton"
              color="primary"
            >
              New Task
            </Button> */}
            {/* <Popover
              content={content}
              title="Add New Task List"
              trigger="click"
            >
              <Button
                endIcon={<AddCircleOutlineOutlinedIcon />}
                variant="contained"
                className="float-right taskButton mr-2"
                color="primary"
              >
                New Task List
              </Button>
            </Popover> */}
          </>
        ) : null}
      </div>

      {loading ? (
        <BackdropLoading loading={loading} />
      ) : taskList.length < 1 ? (
        <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
          <Empty
            // image={require("assets/img/undraw_empty.svg")}
            // imageStyle={{
            //   height: 200,
            //   width: 200,
            //   display: "block",
            //   marginLeft: "auto",
            //   marginRight: "auto",
            // }}
            description={<span>No Tasks to show...</span>}
            className="w-100 "
          />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {taskList.map((task, projectIndex) =>
                  task.tasklists?.length > 0 ? (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={projectIndex}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={projectIndex}
                        >
                          <CollapseProject
                            task={task}
                            projectIndex={projectIndex}
                          />
                        </div>
                      )}
                    </Draggable>
                  ) : null
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {loading === false &&
      Object.keys(taskList).length >= 0 &&
      selectedID !== null ? (
        <ViewTaskDetails
          // key={selectedID.index}
          selectedIdNUll={() => {
            setSelectedID(null);
          }}
          data={
            taskList[selectedID.project].tasklists[selectedID.taskList].tasks[
              selectedID.task
            ]
          }
          open={openTaskDrawer}
          loggedUser={props.loginUserInfo}
          picture={props.picture}
          userType={props.userType}
          onClose={() => {
            handleDrawer();
            setSelectedID(null);
          }}
          allProjects={data.allProjects}
          refreshTasks={() => {
            setRefresh(!refresh);
          }}
        />
      ) : null}

      {/* <DragColumnTable /> */}
    </>
  );
}
const mapStatetoProps = (state) => {
  return {
    loginUserInfo: state.Login.user_info,
    userType: state.Login.user_info?.role?.title,
    picture: state.Login.picture,
  };
};
export default connect(mapStatetoProps)(Task);
