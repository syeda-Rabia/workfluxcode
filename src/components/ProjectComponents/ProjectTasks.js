/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import Icon from "@ant-design/icons";
import { Button, Chip, IconButton, Tooltip } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import {
  Checkbox,
  Dropdown,
  Empty,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Popover,
  Select,
} from "antd";
import NewTaskDialog from "components/Create/NewTaskDialog";
import BackdropLoading from "components/Loading/BackdropLoading";
import ViewTaskDetails from "components/TaskComponents/ViewTaskDetails";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import ApiUrls from "utils/ApiUrls";
import { GET, PATCH, POST } from "utils/Functions";

const settingMenuOptions = [
  "duplicate",
  "archive",
  "unarchive",
  "active",
  "complete",
];
const key = "updatable";
const taskFilterOptions = ["active", "complete", "archive"];

const { Option } = Select;
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
const ExpandMoreIcon = (props) => <Icon component={arrowDown} {...props} />;

function ProjectTasks(props) {
  const [openNewTaskDialogBox, setOpenNewTaskDialogBox] = useState(false);
  const [openTaskDrawer, setOpenTaskDrawer] = React.useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [projectFilter, setProjectFilter] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const [allProjects, setAllProjects] = useState([]);
  // const [allClients, setAllClients] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
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
  const [newTaskList, setNewTaskList] = useState({
    project_id: props.location?.state._id,
  });

  // const [taskTitle, setTaskTitle] = useState("");
  useEffect(() => {
    getProjectTasks();
    getAllData();
    // getAllProjects();
    // getallclient();
  }, [refresh]);

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
    console.log(res, "resp");
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
    // console.log(resTask);
    let resProject = await GET(ApiUrls.GET_ALL_PROJECTS + `status=active`);
    console.log(resProject);
    let resClient = await GET(ApiUrls.GET_ALL_CLIENTS);
    console.log(resClient);

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
  const getProjectTasks = async () => {
    let res = await GET(
      ApiUrls.GET_PROJECT_TASKS +
        props.location?.state._id +
        `&status=${taskStatusFilter}`
    );
    console.log(res);
    setLoading(false);
    if (res.status == "200") {
      setPaginate({
        pageSize: res.per_page,
        totalRecord: res.total,
        currentPage: res.current_page,
      });
      setAllTasks(res.tasks[0].tasklists);
    }
  };
  // const getAllProjects = async () => {
  //   let res = await GET(ApiUrls.GET_ALL_PROJECTS + `status=active`);
  //   console.log(res);
  //   if (res.status == "200") {
  //     setAllProjects(res.projects);
  //   }
  // };
  // const getallclient = async () => {
  //   let res = await GET(ApiUrls.GET_ALL_CLIENTS);
  //   if (res.status == "200") {
  //     console.log(res);
  //     setAllClients(res.clients);
  //   }
  // };
  const filterTasks = async () => {
    setLoading(true);
    let res = await GET(
      ApiUrls.GET_PROJECT_TASKS +
        props.location?.state._id +
        `&status=${taskStatusFilter}`

      // ApiUrls.GET_ALL_TASKS +
      //   `status=${taskStatusFilter}&id=${props.location?.state._id}`
    );

    console.log(res, "resp status filter");
    if (res.status == "200") {
      setPaginate({
        pageSize: res.per_page,
        totalRecord: res.total,
        currentPage: res.current_page,
      });
      setAllTasks(res.tasks[0].tasklists);

      setLoading(false);
    }
  };
  const forceCompleteTask = async (status, taskID) => {
    console.log({ status, taskID });
    let res = await PATCH(ApiUrls.FORCE_UPDATE_TASK + taskID, {
      status: status,
    });
    console.log(res);
    if (res.status == "200") {
      message.success(res.message);

      setRefresh(!refresh);
    } else {
      message.error(res.message);
    }
  };
  const changeTaskStatus = async (status, taskID) => {
    message.loading({ content: "Action in progress..", key });

    let res = await PATCH(ApiUrls.UPDATE_TASK + taskID, {
      status: status,
    });
    console.log(res);
    if (res.status == "200") {
      message.success({
        content: res.message,
        key,
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
    console.log("res delete", res);
    if (res.status == "200") {
      message.success(res.message);
      setRefresh(!refresh);
    } else {
      message.error(res.message);
    }
  };

  const deleteTask = async (taskId) => {
    message.loading({ content: "Action in progress..", key });

    let res = await PATCH(ApiUrls.DELETE_TASK + taskId);
    console.log("res delete", res);
    if (res.status == "200") {
      message.success({
        content: res.message,
        key,
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
  const handleSubmit = async () => {
    let resp = await POST(ApiUrls.ADD_NEW_TASKLIST, newTaskList);
    console.log(resp);
    form.resetFields();
    if (resp.status == "200") {
      message.success(resp.message);
      setRefresh(!refresh);
    } else {
      message.error(resp.message);
    }
  };
  const TableRow = ({ item, index, selectedIndex }) => (
    <Draggable
      key={`${item._id}${index}`}
      draggableId={`${item._id} ${index}`}
      index={index}
    >
      {(provided, snapshot) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
              " " +
              (item.project.client?.last_name || "") ||
              item.project.client?.username}
          </td>
          <td>{item.project.projectName}</td>
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
            {item.assignee?.first_name !== undefined &&
            item.assignee?.first_name !== ""
              ? `${item.assignee?.first_name} ${item.assignee?.last_name || ""}`
              : item.assignee?.username}
          </td>
          <td>{moment(item.due_date).format("LL")}</td>
          <td>{"--"}</td>
          <td onClick={(e) => e.stopPropagation()}>
            <Dropdown
              trigger={["click"]}
              overlay={SettingMenu(
                item._id,
                index,
                item.status,
                item.isArchive
              )}
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
      )}
    </Draggable>
  );

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const move = (source, destination, droppableSource, droppableDestination) => {
    console.log({ source, destination, droppableSource, droppableDestination });
    const sourceClone = Array.from(source.tasks);
    const destClone = Array.from(destination.tasks);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = [];
    result[0] = sourceClone;
    result[1] = destClone;

    return result;
  };
  function onDragEnd(result) {
    // dropped outside the list
    console.log(result);
    if (
      !result.destination &&
      result.source.index === result.destination.index
    ) {
      //console.log("no-change");
      return;
    }

    if (result.type === "LIST") {
      console.log("*********** List Drag ***************");
      const items = reorder(
        allTasks,
        result.source.index,
        result.destination.index
      );
      console.log(items);
      setAllTasks(items);
      calldragTaskListApi(result);
    } else if (
      result.type === "TASK" &&
      result.destination.droppableId === result.source.droppableId
    ) {
      console.log("*********** Task Drag ***************");

      const tasks = reorder(
        allTasks[result.destination.droppableId.split(",")[2]].tasks,
        result.source.index,
        result.destination.index
      );
      const reorderTasks = JSON.parse(JSON.stringify(allTasks));
      reorderTasks[result.destination.droppableId.split(",")[2]].tasks = tasks;

      setAllTasks(reorderTasks);
      changeInnerTaskPosition(result);
    }
    if (
      result.type === "TASK" &&
      result.destination.droppableId !== result.source.droppableId
    ) {
      console.log("*********** Task Drag other List ***************");

      const data = move(
        allTasks[result.source.droppableId.split(",")[2]],
        allTasks[result.destination.droppableId.split(",")[2]],
        result.source,
        result.destination
      );
      const newState = JSON.parse(JSON.stringify(allTasks));
      newState[result.source.droppableId.split(",")[2]].tasks = data[0];
      newState[result.destination.droppableId.split(",")[2]].tasks = data[1];
      setAllTasks(newState);

      moveTaskToOtherList(result);
    }
    // if (result.destination.droppableId === result.source.droppableId) {} else {}
  }

  // function onDragEnd(result) {
  //   // dropped outside the list
  //   console.log(result);
  //   if (!result.destination) {
  //     return;
  //   }
  //   if (result.source.index === result.destination.index) {
  //     return;
  //   }
  //   const items = reorder(
  //     allTasks,
  //     result.source.index,
  //     result.destination.index
  //   );
  //   console.log(items);
  //   // setAllTasks(items);
  //   // calldragTaskListApi(result);
  // }
  const calldragTaskListApi = async (result) => {
    console.log(
      {
        project_id: props.location?.state._id,
        tasklist_id: result.draggableId.split(" ")[0],
        old_position: result.source.index + 1,
        new_position: result.destination.index + 1,
      },
      "list drag"
    );
    let res = await POST(ApiUrls.DRAG_TASKLIST, {
      project_id: props.location?.state._id,
      tasklist_id: result.draggableId.split(" ")[0],
      old_position: result.source.index + 1,
      new_position: result.destination.index + 1,
    });
    console.log(res);
  };
  const changeInnerTaskPosition = async (result) => {
    console.log(result);
    console.log(
      {
        tasklist_id: result.source.droppableId.split(",")[1],
        task_id: result.draggableId.split(" ")[0],
        old_position: result.source.index + 1,
        new_position: result.destination.index + 1,
      },
      "changeInnerTaskPosition"
    );
    let res = await POST(ApiUrls.DRAG_TASK, {
      tasklist_id: result.destination.droppableId.split(",")[1],
      task_id: result.draggableId.split(" ")[0],
      old_position: result.source.index + 1,
      new_position: result.destination.index + 1,
    });
    console.log(res);
  };
  const moveTaskToOtherList = async (result) => {
    console.log(result);
    console.log(
      {
        tasklist_id: result.source.droppableId.split(",")[1],
        task_id: result.draggableId.split(" ")[0],
        changed_tasklist: result.destination.droppableId.split(",")[1],
        old_position: result.source.index + 1,
        new_position: result.destination.index + 1,
      },
      "moveTaskToOtherList"
    );
    let res = await POST(ApiUrls.DRAG_TASK, {
      tasklist_id: result.source.droppableId.split(",")[1],
      task_id: result.draggableId.split(" ")[0],
      changed_tasklist: result.destination.droppableId.split(",")[1],
      old_position: result.source.index + 1,
      new_position: result.destination.index + 1,
    });
    console.log(res);
  };

  const [form] = Form.useForm();

  const content = (
    <div>
      <Form
        form={form}
        preserve={false}
        requiredMark={false}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {/* <Form.Item
          label="Project"
          name="project"
          initialValue={props.location?.state.projectName}
        >
          <Input readOnly={true} />
        </Form.Item> */}
        {/* <Form.Item
          name="project"
          label="Select Project"
          rules={[
            {
              required: true,
              message: "Please Select Project to create Task List!",
            },
          ]}
        >
          <Select
            className="w-100 radiusBorderInput"
            bordered={false}
            listItemHeight={10}
            listHeight={250}
            getPopupContainer={(trigger) => trigger.parentNode}
            onChange={(value) => {
              console.log(value);
              setNewTaskList({ ...newTaskList, project_id: value });
            }}
          >
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
        </Form.Item> */}
        <Form.Item
          name="taskList"
          label="Task List Name"
          rules={[
            {
              required: true,
              message: "Please Input Task list name!",
            },
          ]}
        >
          <Input
            bordered={false}
            className="radiusBorderInput"
            onChange={(e) => {
              setNewTaskList({ ...newTaskList, title: e.target.value });
            }}
          />
        </Form.Item>

        <div
          className="mt-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
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
  console.log("------> alll tasks ", allTasks);
  const Accordion = ({ i, list, taskListIndex }) => {
    const [expanded, setExpanded] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const isFirstRun = useRef(true);

    // const isOpen = i === expanded;

    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      setIsOpen(i === expanded);
    }, [expanded]);

    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (
      <div className="collapseContainer">
        <motion.header
          initial={false}
          className="collapseTitle"
          onClick={() => {
            console.log(isOpen ? false : i, "isOpen ? false : i", {
              isOpen,
              i,
            });

            setExpanded(isOpen ? false : i);
            if (isOpen) {
              console.log("if------>", isOpen);
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
            } else if (!isOpen) {
              console.log("else");
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
            }
          }}
          // animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
          // onClick={() =>}
        >
          <ExpandMoreIcon
            id={`collapse--${list._id}--icon-${taskListIndex}`}
            className={
              isOpen
                ? "transform duration-500 ease-in-out mr-2 position-relative -top-0.5 rotate-0"
                : "transform duration-500 ease-in-out mr-2 position-relative -top-0.5 -rotate-90"
            }
            style={{ marginTop: 5 }}
          />

          <span className="collapseSubHeading">
            {list.title}: {list.tasks.length}
          </span>
        </motion.header>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <Droppable
                droppableId={`droppable,${list._id},${taskListIndex}`}
                type="TASK"
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className="customTable"
                    style={{ margin: "0px" }}
                  >
                    <Table responsive borderless hover>
                      <thead>
                        <tr className="tableHeading">
                          <th scope="col">Task </th>
                          <th scope="col">Client</th>
                          <th scope="col">Project </th>
                          {/* <th scope="col">Progress </th> */}
                          <th scope="col">Task Label </th>
                          <th scope="col">Assigned to</th>
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
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    );
  };
  console.log(allTasks, "allTasks");
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
            handleClose={() => {
              drawerRef.current.handleClose();
              console.log("------------------------------> clicked");
            }}
            closeModal={() => setOpenNewTaskDialogBox(false)}
            projectID={props.location?.state}
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
            console.log(value);

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

        {/* <Select
          allowClear={true}
          className="filterButton"
          bordered={false}
          listItemHeight={10}
          listHeight={250}
          onChange={(value) => {
            console.log(value);
            if (value !== undefined) setProjectFilter(value);
            else setProjectFilter("");
          }}
          defaultValue="All Projects"
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <Option
            className="antSelect"
            style={{ textTransform: "capitalize" }}
            key="allProjects"
            value={""}
          >
            All Projects
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
        </Select> */}

        {props.userType === "owner" || props.userType === "collaborator" ? (
          <>
            <Button
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
            </Button>
            <Popover
              content={content}
              title="Add New Task List"
              placement="bottom"
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
            </Popover>
          </>
        ) : null}
      </div>

      {loading ? (
        <BackdropLoading loading={loading} />
      ) : allTasks.length < 1 ? (
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
          {allTasks.map((list, taskListIndex) => (
            <Droppable
              droppableId={`droppable ${list._id} ${list.title}`}
              key={taskListIndex}
              type="LIST"
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ backgroundColor: "white" }}
                >
                  <Draggable
                    key={list._id}
                    draggableId={`${list._id} ${list.title}`}
                    index={taskListIndex}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={taskListIndex}
                      >
                        <Accordion
                          key={taskListIndex}
                          i={taskListIndex}
                          taskListIndex={taskListIndex}
                          list={list}
                        />
                      </div>
                    )}
                  </Draggable>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      )}
      {loading === false && allTasks.length >= 0 && selectedID !== null ? (
        <ViewTaskDetails
          key={selectedID}
          selectedIdNUll={() => {
            setSelectedID(null);
          }}
          data={allTasks[selectedID.taskList].tasks[selectedID.task]}
          open={openTaskDrawer}
          loggedUser={props.loginUserInfo}
          picture={props.picture}
          userType={props.userType}
          onClose={() => {
            handleDrawer();
            setSelectedID(null);
          }}
          allProjects={data.allProjects}
          refresh={refresh}
          refreshTasks={() => {
            console.log("hellllo");

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
    picture: state.Login.picture,

    loginUserInfo: state.Login.user_info,
    userType: state.Login.user_info?.role?.title,
  };
};
export default connect(mapStatetoProps)(ProjectTasks);
