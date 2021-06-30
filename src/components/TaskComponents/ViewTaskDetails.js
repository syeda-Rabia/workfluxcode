import { CopyOutlined, LinkOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import {
  Avatar as AntAvatar,
  Checkbox,
  Comment,
  DatePicker,
  Drawer,
  Empty,
  Form,
  Input,
  List,
  Mentions,
  message,
  Popover,
  Radio,
  Select,
  Tooltip as AntTooltip,
  Modal,
  Upload,
} from "antd";
import AnimatedBtn from "components/CustomButtons/AnimatedBtn";
import InlineToolbarTextEditor from "components/RichTextEditor/InlineToolbarTextEditor";
import UploadFile from "components/UploadFile/UploadFile";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Form as RBForm, Row } from "react-bootstrap";
import { BiArchiveIn, BiArchiveOut, BiEdit } from "react-icons/bi";
import ApiUrls from "utils/ApiUrls";
import { baseeURL } from "utils/Config";
import { AXIOS_POST, GET, PATCH, POST } from "utils/Functions";
import ColorPicker from "./ColorPicker";
import { useHistory } from "react-router-dom";

import "./viewTaskDetails.scss";

const { Option } = Select;

const newList = {
  hidden: {
    opacity: 0,

    y: -2,
    transition: {
      type: "spring",
      when: "afterChildren",
      staggerChildren: 0.3,
    },
  },
  visible: {
    opacity: 1,

    y: 0,
    transition: {
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};
const key = "updatable";
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
    md: { span: 6 },
    xl: { span: 5 },
    xxl: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    md: { span: 18 },
    xl: { span: 19 },
    xxl: { span: 21 },
  },
};
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const CommentList = ({ comments }) => {
  console.log(comments, "comments====>");
  // const newComment = comments.map((comment) => ({
  //   ...comment,
  //   attachments: comment.attachments.map((file) => ({
  //     ...file,
  //     url: baseeURL + file.url,
  //   })),
  // }));
  // console.log(newComment);
  return (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(item) => (
        <>
          <Comment
            author={item.sender?.username}
            avatar={
              <Avatar
                alt={item.sender?.username}
                src={baseeURL + item.sender?.avatar}
              />
            }
            content={item.message}
            datetime={moment(item.sending_time).format("L")}
          />
          <div className="ml-5">
            <Upload
              fileList={item.attachments}
              showUploadList={{
                showRemoveIcon: false,
              }}
              onPreview={async (file) => {
                window.open(baseeURL + file.url, "_blank");
              }}
            />
          </div>
        </>
      )}
    />
  );
};
const ListItem = ({ item, users, refresh, ...props }) => {
  const [openSubtaskAssignee, setOpenSubtaskAssignee] = useState(true);
  //

  return (
    <List.Item className="subtask">
      <List.Item.Meta />
      <div className="subtask--list w-100 d-flex flex-row align-items-center justify-content-between">
        <Checkbox
          checked={item.status == "complete" ? true : false}
          onChange={async (e) => {
            if (
              props.userType === "owner" ||
              props.userType === "collaborator"
            ) {
              message.loading({ content: "Action in progress..", key });

              let status = e.target.checked ? "complete" : "active";
              let resp = await PATCH(ApiUrls.EDIT_SUBTASK + item._id, {
                status: status,
              });

              if (resp.status == "200") {
                refresh();
                message.success({
                  content: resp.message,
                  key,
                  duration: 2.5,
                });
              } else message.error(resp.message);
            }
          }}
        />
        <Input
          defaultValue={item.title}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              let resp = await PATCH(ApiUrls.EDIT_SUBTASK + item._id, {
                title: e.target.value,
              });

              if (resp.status == "200") refresh();
            }
          }}
          style={{ width: "80%" }}
        />
        <ClickAwayListener onClickAway={() => setOpenSubtaskAssignee(true)}>
          {openSubtaskAssignee ? (
            <Avatar
              style={{ width: 26, height: 26, fontSize: 13 }}
              variant="rounded"
              onClick={() => {
                if (
                  props.userType === "owner" ||
                  props.userType === "collaborator"
                )
                  setOpenSubtaskAssignee(false);
              }}
            >
              {item.assignee != null ? (
                <Tooltip placement="top" title={item.assignee.username}>
                  <span>
                    {item.assignee.username
                      .split(" ")
                      .map(function (str) {
                        return str ? str[0].toUpperCase() : "";
                        // return str ? str.slice(0, 2).toUpperCase() : "";
                      })
                      .join("")}
                  </span>
                </Tooltip>
              ) : null}
            </Avatar>
          ) : (
            <motion.div
              initial={{ opacity: 0.5, width: 0 }}
              animate={{
                opacity: 1,
                width: "auto",
              }}
            >
              <Select
                placeholder="Assignee Name"
                bordered={false}
                className="w-100 radiusBorderInput"
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={async (val) => {
                  // onAssigneChange(val, index);
                  let res = await PATCH(ApiUrls.EDIT_SUBTASK + item._id, {
                    assign_person: val,
                  });

                  if (res.status == "200") {
                    refresh();
                  } else {
                    message.error(res.message);
                  }
                  setOpenSubtaskAssignee(true);
                }}
              >
                {users.map((item, index) => (
                  <Option
                    className="antSelect"
                    style={{ textTransform: "capitalize" }}
                    key={index}
                    value={item._id}
                  >
                    {item.first_name !== undefined
                      ? `${item.first_name} ${item.last_name || ""}`
                      : item.username}
                  </Option>
                ))}
              </Select>
            </motion.div>
          )}
        </ClickAwayListener>
        <Tooltip title="Delete" placement="top">
          <Button
            onClick={async () => {
              if (
                props.userType === "owner" ||
                props.userType === "collaborator"
              ) {
                message.loading({ content: "Action in progress..", key });

                let resp = await PATCH(ApiUrls.DELETE_SUBTASK + item._id);

                if (resp.status == "200") {
                  refresh();
                  message.success({
                    content: resp.message,
                    key,
                    duration: 2.5,
                  });
                } else {
                  message.error(resp.message);
                }
              }
            }}
          >
            <DeleteOutlineOutlinedIcon
              style={{ color: "#e06666", fontSize: 20 }}
            />
          </Button>
        </Tooltip>
      </div>
    </List.Item>
  );
};
function ViewTaskDetails({
  open,
  onClose,
  data,
  allProjects,
  refreshTasks,
  selectedIdNUll,
  loggedUser,
  picture,
  ...props
}) {
  const drawerWidth = useMediaQuery("(max-width:575px)") ? "100%" : "65%";
  const [show, setShow] = React.useState(false);
  let history = useHistory();
  const [editTask, setEditTask] = useState({
    project: data.project?._id,
    title: data.title,
    start_date: data.start_date,
    due_date: data.due_date,
    assign_person: data.assign_person,
    description: data.description,
    label: data.label,
    status: data.status,
    label_color: data.label_color,
    isArchive: data.isArchive,
    tasklist: data.tasklist,
    assign_by: loggedUser._id,
  });
  // const prevStatus = data.status;
  const [subTasks, setSubTasks] = useState({
    value: "",
    sub_tasks: [],
  });
  const [showSubTask, setShowSubTask] = useState(false);
  const [showDependency, setShowDependency] = useState(false);
  const [taskDep, setTaskDep] = useState("parent_task");

  const [selectedDepTask, setSelectedDepTask] = useState("");
  const [allTasks, setAllTasks] = useState(null);

  const [commentVal, setCommentVal] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const attachments = data.attachments.map((file) => ({
    ...file,
    url: baseeURL + file.url,
  }));
  const [addTaskList, setAddTaskList] = useState("");
  const [newTaskListArray, setNewTaskListArray] = useState([]);
  const [showTaskListInput, setShowTaskListInput] = useState(false);
  const [taskLists, setTaskLists] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [commentMentions, setCommentMentions] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [uploadCommentAttachments, setUploadCommentAttachments] = useState([]);
  const [commentAttachments, setCommentAttachments] = useState([]);
  const [showTaskLabelInput, setShowTaskLabelInput] = useState(false);
  const [addTaskLabel, setAddTaskLabel] = useState("");
  const [allLabels, setAllLabels] = useState([]);

  useEffect(() => {
    getallUsers();
    // getProjectTasks();
    // getProjectFollowers();
    return () => {
      console.log("IM umount");
    };
  }, []);
  useEffect(() => {
    getLabels();
  }, [refresh]);

  useEffect(() => {
    getProjectTaskList();
    // getProjectFollowers();
    getProjectTasks();
    return () => {};
  }, [editTask.project]);
  useEffect(() => {
    getProjectFollowers();

    return () => {};
  }, [editTask.project, data.followers.length]);
  const getallUsers = async () => {
    let res = await GET(ApiUrls.GET_ALL_USERS);
    if (res.status == "200") {
      setAllUsers(res.users);
    }
  };
  const getProjectFollowers = async () => {
    let res = await GET(ApiUrls.GET_PROJECT_FOLLOWERS + editTask?.project);
    console.trace(res);
    if (res.status == "200") {
      let newfollowers = res.followers.map((item) => {
        return {
          check: data.followers.some((fol) => {
            if (fol.follower._id === item._id) return true;
            else return false;
          }),
          ...item,
        };
      });

      console.log(newfollowers);
      setFollowers(newfollowers);
    }
  };
  const getProjectTasks = async () => {
    let res = await GET(
      ApiUrls.GET_PROJECT_TASKS_WITHOUT_LISTING +
        editTask?.project +
        `&status=active`
    );

    if (res.status == "200") {
      setAllTasks(res.tasks);
    }
  };
  const getProjectTaskList = async () => {
    let res = await GET(ApiUrls.GET_PROJECT_TASKLISTS + editTask.project);

    if (res.status == "200") {
      setTaskLists(res.tasklists);
    }
  };
  const getLabels = async () => {
    let res = await GET(ApiUrls.GET_ALL_LABLEL);
    console.log(res, "label---->");
    if (res.status == "200") {
      setAllLabels(res.labels);
    }
  };
  // return null if the prop data is undefined (wont show anything)
  if (data === undefined) return null;

  let tasksOptionMap = [
    ...data.dependency?.parent_task,
    ...data.dependency?.child_task,
  ];
  const handleSubmit = async () => {
    onClose();
    message.loading({ content: "Action in progress..", key });

    let formData = null;
    // if(assign_by:data.assign_person !== undefined?loggedUser._id:null)
    let { assign_by, assign_person, ...EDITTASK } = editTask;
    if (
      // data.assign_person !== undefined &&
      editTask.assign_person !== data.assign_person
    ) {
      formData = { ...EDITTASK, assign_person, assign_by };
    } else formData = { ...EDITTASK };
    console.log(formData, "formData");
    let resp = await PATCH(ApiUrls.UPDATE_TASK + data._id, formData);
    console.log(resp);
    if (resp.status == "200") {
      message.success({
        content: resp.message,
        key,
        duration: 2.5,
      });
      refreshTasks();
    } else {
      message.error({
        content: resp.message,
        key,
        duration: 2.5,
      });
    }
  };

  const handleSubtaskUpdate = (e, index) => {
    setSubTasks((prev) => {
      let sub_tasks = [...prev.sub_tasks];
      sub_tasks[index] = { ...sub_tasks[index] };
      sub_tasks[index].title = e.target.value;

      return { ...prev, sub_tasks };
    });
  };
  // console.log(data, "---> data");
  console.log(editTask, "---> editTask");

  return (
    <>
      <Drawer
        className="viewTask antModel drawerTitle"
        onClose={() => {
          onClose();
          if (
            data.status !== editTask.status ||
            data.isArchive !== editTask.isArchive
          ) {
            refreshTasks();
            selectedIdNUll();
          }
        }}
        visible={open}
        width={drawerWidth}
        placement="right"
        destroyOnClose={true}
        // closable={false}
        title={
          <div className="drawerTitle d-flex justify-content-between align-items-center">
            <Button
              variant="outlined"
              className={
                editTask.status == "active" ? "secondaryBtn" : "primaryBtn"
              }
              // color={editTask.status ? "primary" : "default"}
              endIcon={<CheckCircleOutlineIcon />}
              onClick={async () => {
                setEditTask({
                  ...editTask,
                  status: editTask.status == "active" ? "complete" : "active",
                });

                let resp = await PATCH(ApiUrls.UPDATE_TASK + data._id, {
                  status: editTask.status == "active" ? "complete" : "active",
                });

                if (resp.status == "200") {
                  message.success("Task Status Changed Successfully.");
                } else {
                  message.error(resp.message);
                }
              }}
            >
              Mark Complete
            </Button>

            <motion.div
              className="d-flex flex-row iconsDiv"
              initial="hidden"
              variants={newList}
              animate={show ? "visible" : "hidden"}
            >
              <motion.div variants={newList}>
                <IconButton>
                  <CopyOutlined />
                </IconButton>
              </motion.div>

              <motion.div variants={newList}>
                <Tooltip
                  placement="top"
                  title={editTask.isArchive ? "Unarchive" : "Archive"}
                >
                  <IconButton
                    onClick={async () => {
                      setEditTask({
                        ...editTask,
                        isArchive: !editTask.isArchive,
                      });

                      let status =
                        editTask.isArchive === true ? "unarchive" : "archive";

                      message.loading({ content: "Action in progress..", key });

                      let res = await PATCH(ApiUrls.UPDATE_TASK + data._id, {
                        status: status,
                      });

                      if (res.status == "200") {
                        message.success({
                          content: res.message,
                          key,
                          duration: 2.5,
                        });
                      } else {
                        message.error(res.message);
                      }
                    }}
                  >
                    {editTask.isArchive ? <BiArchiveOut /> : <BiArchiveIn />}
                  </IconButton>
                </Tooltip>
              </motion.div>

              <motion.div variants={newList}>
                <IconButton>
                  <LinkOutlined />
                </IconButton>
              </motion.div>
            </motion.div>

            <IconButton onClick={() => setShow(!show)} className="headerIcon">
              <SettingsOutlinedIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
        }
      >
        <Form
          requiredMark={false}
          colon={false}
          scrollToFirstError={true}
          labelAlign="left"
          layout="horizantal"
          onFinish={handleSubmit}
          initialValues={{
            "task-list": `${data.tasklist}*tasklist`,
            "task-label":
              data.label !== undefined && data.label_color !== undefined
                ? `${data.label},${data.label_color}`
                : null,
          }}
          {...layout}
        >
          <Row>
            <div className="taskTitle">
              <Input
                className="w-100 taskTitle--input "
                required={true}
                placeholder="Task Title"
                bordered={false}
                defaultValue={data.title}
                onChange={(event) => {
                  setEditTask({
                    ...editTask,
                    title: event.target.value,
                  });
                }}
              />
            </div>

            <Col lg={6} md={6}>
              <Form.Item label="Assigned to">
                <Select
                  placeholder="Assingee Name"
                  bordered={false}
                  defaultValue={data.assignee?._id}
                  className="w-100"
                  onChange={(value) => {
                    setEditTask({
                      ...editTask,
                      assign_person: value,
                    });
                  }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                >
                  {allUsers.map((item, index) => (
                    <Option
                      className="antSelect"
                      style={{ textTransform: "capitalize" }}
                      key={index}
                      value={item._id}
                    >
                      {item.first_name !== undefined
                        ? `${item.first_name} ${item.last_name || ""}`
                        : item.username}
                      {/* {item.username} */}
                    </Option>
                  ))}
                </Select>
                {/* <Input
                  placeholder="Assingee Name"
                  bordered={false}
                  defaultValue={data.assignee?.username}
                  onChange={(event) => {
                    setEditTask({
                      ...editTask,
                      assign_person: event.target.value,
                    });
                  }}
                /> */}
              </Form.Item>

              <Form.Item label="Start Date">
                <DatePicker
                  bordered={false}
                  className="w-100"
                  defaultValue={data.start_date && moment(data.start_date)}
                  onChange={(date, dateString) => {
                    setEditTask({
                      ...editTask,
                      start_date: dateString,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Task Label"
                name="task-label"
                // initialValue={`${data.label},${data.label_color}`}
              >
                <Select
                  placeholder="Task Label"
                  className="w-100"
                  bordered={false}
                  // defaultValue={`${data.label},${data.label_color}`}
                  onChange={(value) => {
                    const data = value.split(",");

                    console.log(data);
                    setEditTask({
                      ...editTask,
                      label: data[0],
                      label_color: data[1],
                    });
                  }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      {props.userType === "owner" ||
                      props.userType === "collaborator" ? (
                        <>
                          <Divider style={{ margin: "4px 0" }} />
                          <div
                            style={{
                              padding: 8,
                            }}
                          >
                            <AnimatePresence>
                              {showTaskLabelInput && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="d-flex"
                                >
                                  <Input
                                    style={{ flex: "auto" }}
                                    suffix={
                                      <ColorPicker
                                        color={data.label_color}
                                        onChange={(val) =>
                                          setEditTask({
                                            ...editTask,
                                            label_color: val,
                                          })
                                        }
                                      />
                                    }
                                    addonAfter={
                                      <button
                                        onClick={async (e) => {
                                          e.preventDefault();
                                          console.log("cliecked");
                                          if (addTaskLabel !== "") {
                                            let res = await POST(
                                              ApiUrls.ADD_LABEL,
                                              {
                                                title: addTaskLabel,
                                                color: editTask.label_color,
                                              }
                                            );
                                            console.log(res);
                                            if (res.status === 200) {
                                              setRefresh(!refresh);
                                            }

                                            // setTaskLabels([
                                            //   ...taskLabels,
                                            //   addTaskLabel,
                                            // ]);
                                            setAddTaskLabel("");
                                            setShowTaskLabelInput(
                                              !showTaskLabelInput
                                            );
                                          }
                                        }}
                                      >
                                        Add
                                      </button>
                                    }
                                    value={addTaskLabel}
                                    onChange={(e) => {
                                      setAddTaskLabel(e.target.value);
                                    }}
                                  />
                                  <Button
                                    onClick={() => {
                                      setShowTaskLabelInput(false);
                                    }}
                                  >
                                    X
                                  </Button>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {!showTaskLabelInput && (
                              <div className="d-flex">
                                <Button
                                  style={{ fontSize: 12 }}
                                  color="primary"
                                  className="w-100"
                                  onClick={() => {
                                    if (showTaskLabelInput === false) {
                                      setShowTaskLabelInput(
                                        !showTaskLabelInput
                                      );
                                    }
                                  }}
                                >
                                  + Add Custom Label
                                </Button>
                                <Tooltip
                                  placement="top"
                                  title="Manage Global Labels"
                                >
                                  <IconButton
                                    onClick={() => {
                                      Modal.confirm({
                                        title:
                                          "If you continue, you'll lose your work on this task!",
                                        centered: true,

                                        okText:
                                          "Yes! Take me to Labels Settings.",
                                        cancelText: "Cancel",
                                        destroyOnClose: true,
                                        okButtonProps: {
                                          className: "rounded-pill",
                                        },
                                        cancelButtonProps: {
                                          className: "rounded-pill",
                                        },
                                        maskStyle: {
                                          backgroundColor:
                                            "rgba(251, 251, 251, 0.8)",
                                        },
                                        onOk: () =>
                                          history.push("/app/global-labels"),
                                      });
                                    }}
                                  >
                                    <SettingsOutlinedIcon
                                      style={{ fontSize: 20 }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            )}
                          </div>
                        </>
                      ) : null}
                    </div>
                  )}
                >
                  {allLabels.map((item, index) => (
                    <Option
                      className="antSelect"
                      style={{ textTransform: "capitalize", color: item.color }}
                      key={index}
                      value={`${item.title},${item.color}`}
                    >
                      <span
                        className="circle"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Followers" name="followers">
                {data.followers.length > 0 && (
                  <AntAvatar.Group
                    style={{ marginLeft: "18px" }}
                    maxCount={2}
                    size={30}
                    maxStyle={{
                      color: "#fff",
                      backgroundColor: "#2b7ae4",
                    }}
                  >
                    {data.followers.map((item, index) => (
                      <AntTooltip
                        key={index}
                        title={
                          (item.follower?.first_name || "") +
                            (item.follower?.last_name || "") ||
                          item.follower?.username
                        }
                        placement="top"
                      >
                        <AntAvatar
                          style={{
                            backgroundColor: ColorList[index],
                          }}
                        >
                          {(item.follower?.first_name || "") +
                            (item.follower?.last_name || "") ||
                            item.follower?.username}
                          {/* {item.split(" ").map((str) => str[0].toUpperCase())} */}
                        </AntAvatar>
                      </AntTooltip>
                    ))}
                  </AntAvatar.Group>
                )}
                {props.userType === "owner" ||
                props.userType === "collaborator" ? (
                  <Popover
                    color="transparent"
                    content={
                      <div className="followerDiv">
                        {followers.length > 0 ? (
                          followers.map((item, index) => (
                            <div key={index}>
                              <Checkbox
                                checked={item.check}
                                className="float-left mr-2"
                                onChange={async (e) => {
                                  console.log(e.target);
                                  if (e.target.checked) {
                                    //add api

                                    let res = await POST(
                                      ApiUrls.ADD_FOLLOWERS,
                                      {
                                        task_id: data._id,
                                        followers: [item.username],
                                      }
                                    );
                                    if (res.status == "200") {
                                      setRefresh(!refresh);
                                      refreshTasks();
                                      message.success(res.message);
                                    } else {
                                      message.error(res.message);
                                    }
                                    console.log(res);
                                  } else {
                                    let res = await POST(
                                      ApiUrls.DELETE_FOLLOWERS,
                                      {
                                        task_id: data._id,
                                        followers: [item.username],
                                      }
                                    );
                                    //delete api
                                    console.log(res);
                                    if (res.status == "200") {
                                      setRefresh(!refresh);
                                      refreshTasks();
                                      message.success(res.message);
                                    } else {
                                      message.error(res.message);
                                    }
                                  }
                                  console.log(data.followers);
                                }}
                              ></Checkbox>
                              <span>
                                {(item?.first_name || "") +
                                  (item?.last_name || "") || item?.username}
                              </span>
                            </div>
                          ))
                        ) : (
                          <Empty />
                        )}
                      </div>
                    }
                  >
                    <IconButton
                      // style={{ marginLeft: "6%" }}
                      className="p-2 float-right"
                      color="primary"
                      onClick={() => {
                        setOpenFollowers(!openFollowers);
                      }}
                    >
                      <BiEdit />
                    </IconButton>
                  </Popover>
                ) : null}
              </Form.Item>
            </Col>
            <Col lg={6} md={6}>
              {/* <Form.Item label="Client Name">
                <Input bordered={false} value={data.project.client.name} />
              </Form.Item> */}
              <Form.Item label="Project">
                {/* <Input
                  bordered={false}
                  defaultValue={data.project.projectName}
                /> */}
                <Select
                  placeholder="Project Name"
                  bordered={false}
                  className="w-100"
                  defaultValue={data.project.projectName}
                  onChange={(value) => {
                    setEditTask({
                      ...editTask,
                      project: value,
                    });
                  }}
                >
                  {allProjects.map((item, index) => (
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
              </Form.Item>
              <Form.Item label="Due Date">
                <DatePicker
                  bordered={false}
                  className="w-100"
                  defaultValue={data.due_date && moment(data.due_date)}
                  onChange={(date, dateString) => {
                    setEditTask({
                      ...editTask,
                      due_date: dateString,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Task List"
                name="task-list"
                rules={[
                  {
                    required: true,
                    message: "Please Select Task List!",
                  },
                ]}
                // initialValue={`${data.tasklist}-tasklist`}
              >
                <Select
                  className="w-100"
                  bordered={false}
                  placeholder="Select Task List"
                  // defaultValue={`${data.tasklist}-tasklist`}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  onChange={(e) => {
                    const [val, key] = e.split("*");
                    console.log(e.split("*"));
                    // eslint-disable-next-line no-unused-vars
                    let { tasklist, new_tasklist, ...taskDetail } = editTask;

                    setEditTask({ ...taskDetail, [key]: val });
                  }}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      {props.userType === "owner" ||
                      props.userType === "collaborator" ? (
                        <>
                          <Divider style={{ margin: "4px 0" }} />
                          <div
                            style={{
                              padding: 8,
                            }}
                          >
                            <AnimatePresence>
                              {showTaskListInput && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <Input
                                    style={{ flex: "auto" }}
                                    addonAfter={
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();

                                          if (addTaskList !== "") {
                                            setNewTaskListArray([
                                              ...newTaskListArray,
                                              addTaskList,
                                            ]);
                                            setAddTaskList("");
                                            setShowTaskListInput(
                                              !showTaskListInput
                                            );
                                            setShowTaskListInput(
                                              !showTaskListInput
                                            );
                                          }
                                        }}
                                      >
                                        Add
                                      </button>
                                    }
                                    value={addTaskList}
                                    onChange={(e) => {
                                      setAddTaskList(e.target.value);
                                    }}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {!showTaskListInput && (
                              <Button
                                style={{ fontSize: 12 }}
                                color="primary"
                                className="w-100"
                                onClick={() => {
                                  if (showTaskListInput === false) {
                                    setShowTaskListInput(!showTaskListInput);
                                  }
                                }}
                              >
                                + Add new task list
                              </Button>
                            )}
                          </div>
                        </>
                      ) : null}
                    </div>
                  )}
                >
                  {taskLists.map((item, index) => (
                    <Option
                      className="antSelect"
                      key={index}
                      value={`${item._id}*tasklist`}
                    >
                      {item.title}
                    </Option>
                  ))}
                  {newTaskListArray.map((item, index) => (
                    <Option key={index} value={`${item}*new_tasklist`}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider className="mb-3" />

          <RBForm.Group className=" position-relative">
            <RBForm.Label>Description</RBForm.Label>
            <InlineToolbarTextEditor
              returnHtml={(html) => {
                setEditTask({
                  ...editTask,
                  description: html,
                });
              }}
              initialState={data.description}
            />
            {/* <Input.TextArea
              rows={4}
              bordered={false}
              maxLength="5000"
              defaultValue={data.description}
              onChange={(event) => {
                setEditTask({
                  ...editTask,
                  description: event.target.value,
                });
              }}
            /> */}
          </RBForm.Group>
          <UploadFile
            key={data.attachments}
            onChange={async (info) => {
              if (info.file.status == "done") {
                let formData = new FormData();
                formData.append(`attachments`, info.file.originFileObj);
                formData.append("project_id", data.project._id);
                formData.append("task_id", data._id);
                let resp = await AXIOS_POST(ApiUrls.ADD_ATTACHMENT, formData);

                if (resp.status == "200") {
                  message.success("Files added successfully.");
                  refreshTasks();
                }
              }
            }}
            defaultFileList={attachments}
            onPreview={async (file) => {
              window.open(file.url, "_blank");
            }}
            onRemove={async (file) => {
              let resp = await PATCH(ApiUrls.DELETE_ATTACHMENT + file._id);

              if (resp.status == "200") {
                message.success("File Deleted Successfully.");
              } else {
                message.error(resp.message);
              }
            }}
          />

          <Divider className="my-3" />
          {showSubTask ? (
            <div className="subtask--mainDiv">
              <h2>Subtasks</h2>
              <div className="subtaskFormDiv">
                <Input
                  className="w-100 radiusBorderInput "
                  size="large"
                  autoFocus={true}
                  placeholder="Name of subtask"
                  value={subTasks.value}
                  onChange={async (e) => {
                    setSubTasks({ ...subTasks, value: e.target.value });
                  }}
                  onPressEnter={async (event) => {
                    event.preventDefault();
                    if (subTasks.value !== "") {
                      setSubTasks({
                        value: "",
                      });

                      let resp = await POST(ApiUrls.ADD_SUBTASK, {
                        title: subTasks.value,
                        main_task: data._id,
                      });

                      if (resp.status == "200") refreshTasks();
                    }
                  }}
                />
                <div className="mt-3">
                  <Button
                    className="rounded-pill mr-2"
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      if (subTasks.value !== "") {
                        setSubTasks({
                          value: "",
                        });
                        let resp = await POST(ApiUrls.ADD_SUBTASK, {
                          title: subTasks.value,
                          main_task: data._id,
                        });

                        if (resp.status == "200") refreshTasks();
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    className="rounded-pill"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setShowSubTask(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : props.userType === "owner" ||
            props.userType === "collaborator" ? (
            <AnimatedBtn
              label="Add a Subtask"
              onClick={() => {
                setShowSubTask(true);
              }}
            />
          ) : null}

          {/* View props subtasks */}
          {data.sub_tasks.length > 0 ? (
            <List itemLayout="horizontal" dataSource={data.sub_tasks}>
              {data.sub_tasks.map((item, index) => (
                <ListItem
                  key={index}
                  item={item}
                  index={index}
                  onChange={handleSubtaskUpdate}
                  users={allUsers}
                  userType={props.userType}
                  refresh={refreshTasks}
                />
              ))}
            </List>
          ) : null}

          <Divider className="my-3" />
          {data.dependency.parent_task.length > 0 ? (
            <div className="dependency--maindiv">
              <h2>Parent Tasks</h2>
              <List
                size="small"
                dataSource={data.dependency.parent_task}
                renderItem={(item) => (
                  <List.Item
                    className="listItem"
                    actions={[
                      <Tooltip
                        key="delete-child-dependency"
                        title="Delete"
                        placement="top"
                      >
                        <Button
                          onClick={async () => {
                            if (
                              props.userType === "owner" ||
                              props.userType === "collaborator"
                            ) {
                              let res = await PATCH(
                                ApiUrls.DELETE_DEPENDENCY + item.dependency_id
                              );

                              if (res.status == "200") {
                                refreshTasks();
                              } else {
                                message.error(res.message);
                              }
                            }
                          }}
                        >
                          <DeleteOutlineOutlinedIcon
                            style={{ color: "#e06666", fontSize: 20 }}
                          />
                        </Button>
                      </Tooltip>,
                    ]}
                  >
                    {item.title}
                  </List.Item>
                )}
              />
            </div>
          ) : null}
          {data.dependency.child_task.length > 0 ? (
            <div className="dependency--maindiv">
              <h2>Child Tasks</h2>
              <List
                size="small"
                dataSource={data.dependency.child_task}
                renderItem={(item) => (
                  <List.Item
                    className="listItem"
                    actions={[
                      <Tooltip
                        key="delete-child-dependency"
                        title="Delete"
                        placement="top"
                      >
                        <Button
                          onClick={async () => {
                            if (
                              props.userType === "owner" ||
                              props.userType === "collaborator"
                            ) {
                              let res = await PATCH(
                                ApiUrls.DELETE_DEPENDENCY + item.dependency_id
                              );

                              if (res.status == "200") {
                                refreshTasks();
                              } else {
                                message.error(res.message);
                              }
                            }
                          }}
                        >
                          <DeleteOutlineOutlinedIcon
                            style={{ color: "#e06666", fontSize: 20 }}
                          />
                        </Button>
                      </Tooltip>,
                    ]}
                  >
                    {item.title}
                  </List.Item>
                )}
              />
            </div>
          ) : null}

          {showDependency ? (
            <div className="dependency--maindiv">
              <h2>Dependency</h2>
              <div className="dependencyFormDiv">
                <Radio.Group
                  name="radiogroup"
                  defaultValue={"parent_task"}
                  onChange={(e) => {
                    setTaskDep(e.target.value);
                  }}
                >
                  <Radio value={"parent_task"}>Parent Task</Radio>
                  <Radio value={"child_task"}>Child Task</Radio>
                </Radio.Group>
                <br />
                <Select
                  key={taskDep}
                  placeholder="Search For a Task..."
                  className="w-100 my-3 radiusBorderInput"
                  bordered={false}
                  style={{ width: 120 }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  onChange={(value) => {
                    setSelectedDepTask(value);
                  }}
                >
                  {allTasks
                    .filter((task) => {
                      return (
                        tasksOptionMap.every((item) => item._id !== task._id) &&
                        task._id !== data._id
                      );
                    })
                    .map((task, index) => {
                      return (
                        <Option
                          className="antSelect"
                          key={index}
                          value={task._id}
                        >
                          {task.title}
                        </Option>
                      );
                    })}
                  {/* {tasksOptionMap
                    .filter((task) => task._id.some(allTasks))
                    .map((task, index) => {
                      
                      return (
                        <Option
                          className="antSelect"
                          key={index}
                          value={task._id}
                        >
                          {task.title}
                        </Option>
                      );
                    })} */}
                  {/* {allTasks !== null
                    ? allTasks.map((task, index) => (
                        <Option
                          className="antSelect"
                          key={index}
                          value={task._id}
                        >
                          {task.title}
                        </Option>
                      ))
                    : null} */}
                </Select>
                <p>
                  Parent tasks should be completed before the current task.
                  Member assigned to the current task will be notified when each
                  parent task is finished.
                </p>
                <div>
                  <Button
                    className="rounded-pill mr-2"
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      if (taskDep === "parent_task") {
                        let newArray = [
                          ...data.dependency.parent_task,
                          ...data.dependency.child_task,
                        ];

                        let postData = newArray.every((task) => {
                          return task._id !== selectedDepTask;
                        });

                        setShowDependency(false);
                        if (postData) {
                          let resp = await POST(ApiUrls.ADD_DEPENDENCY, {
                            task_id: data._id,
                            parent_task: selectedDepTask,
                          });

                          if (resp.status == "200") {
                            refreshTasks();
                          } else {
                            message.error(resp.message);
                          }
                        }
                      } else if (taskDep === "child_task") {
                        let newArray = [
                          ...data.dependency.parent_task,
                          ...data.dependency.child_task,
                        ];

                        let postData = newArray.every((task) => {
                          return task._id !== selectedDepTask;
                        });

                        setShowDependency(false);
                        if (postData) {
                          let resp = await POST(ApiUrls.ADD_DEPENDENCY, {
                            task_id: data._id,
                            child_task: selectedDepTask,
                          });

                          if (resp.status == "200") {
                            refreshTasks();
                          } else {
                            message.error(resp.message);
                          }
                        }
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    className="rounded-pill"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setShowDependency(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : props.userType === "owner" ||
            props.userType === "collaborator" ? (
            <AnimatedBtn
              label="Add a Dependency"
              onClick={() => {
                setShowDependency(true);
              }}
            />
          ) : null}
          <Divider className="my-3" />

          <h3 className="comentTitle">Discussions</h3>

          {data.comments.length > 0 && <CommentList comments={data.comments} />}
          <Comment
            avatar={<Avatar alt="user" src={picture} />}
            content={
              openComment ? (
                <>
                  <div className="customEditor">
                    <Mentions
                      autoFocus={true}
                      value={commentVal}
                      onChange={(value) => {
                        setCommentVal(value);
                      }}
                      onSelect={(user) => {
                        if (!commentMentions.includes(user.value)) {
                          setCommentMentions([...commentMentions, user.value]);
                        }
                      }}
                      rows={4}
                      // onPressEnter={}
                    >
                      {followers.map((item, index) => (
                        <Mentions.Option key={index} value={item.username}>
                          {(item?.first_name || "") + (item?.last_name || "") ||
                            item?.username}
                        </Mentions.Option>
                      ))}
                    </Mentions>
                    <div className="editorAttachments">
                      <Upload
                        listType="picture"
                        className="w-100"
                        name="commentAttachments"
                        fileList={uploadCommentAttachments}
                        maxCount={10}
                        multiple={true}
                        // eslint-disable-next-line no-unused-vars
                        customRequest={({ file, onSuccess }) => {
                          setTimeout(() => {
                            onSuccess("ok");
                          }, 0);
                        }}
                        onChange={(info) => {
                          // if (info.file.status !== "uploading") {}
                          console.log(info);
                          if (info.fileList.length > 0) {
                            console.log("if inside  upload");
                            setUploadCommentAttachments(info.fileList);
                            setCommentAttachments(() =>
                              info.fileList.map((file) => file.originFileObj)
                            );
                          } else {
                            setUploadCommentAttachments([]);
                            setCommentAttachments([]);
                          }
                        }}
                      >
                        <div className="d-flex justify-content-between">
                          <div className="content">
                            <span className="title">Attachments</span>
                            <span className="detail">
                              (you can click to select attachments)
                            </span>
                          </div>
                          <Button
                            color="primary"
                            variant="outlined"
                            className="rounded-pill"
                          >
                            Upload File
                          </Button>
                        </div>
                      </Upload>
                    </div>
                  </div>
                  <div className="mt-3 ">
                    <Button
                      variant="outlined"
                      className="rounded-pill mr-2"
                      onClick={async () => {
                        try {
                          let commentStr = commentVal;
                          setCommentVal("");
                          setCommentMentions([]);
                          setUploadCommentAttachments([]);
                          setCommentAttachments([]);
                          if (commentVal !== "") {
                            let formData = new FormData();
                            if (commentAttachments.length > 0) {
                              for (
                                let i = 0;
                                i < commentAttachments.length;
                                i++
                              ) {
                                formData.append(
                                  `attachments`,
                                  commentAttachments[i]
                                );
                              }
                            }
                            formData.append("message", commentStr);
                            formData.append(
                              "sending_time",
                              moment().format("YYYY-MM-DD")
                            );
                            formData.append("sender_id", loggedUser._id);
                            formData.append("task_id", data._id);
                            formData.append(
                              "tagged",
                              JSON.stringify(commentMentions)
                            );
                            formData.append("project_id", data.project._id);

                            // for (let value of formData.values()) {
                            //   console.log(value, "form data");
                            // }
                            let res = await AXIOS_POST(
                              ApiUrls.ADD_COMMENTS,
                              formData
                            );
                            console.log(res);
                            if (res.status == 200) {
                              setTimeout(() => {
                                refreshTasks();
                              }, 500);
                            } else {
                              message.error(res.data.message);
                            }
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      Add Comment
                    </Button>
                    <Button
                      variant="outlined"
                      className="rounded-pill"
                      onClick={() => {
                        setCommentVal("");
                        setCommentMentions([]);
                        setUploadCommentAttachments([]);
                        setCommentAttachments([]);
                        setOpenComment(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div
                  onClick={() => {
                    setOpenComment(!openComment);
                  }}
                  className="showComment"
                >
                  Write a comment...
                </div>
              )
            }
          />
          {props.userType === "owner" || props.userType === "collaborator" ? (
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className="float-right"
            >
              Update
            </Button>
          ) : null}
        </Form>
      </Drawer>
    </>
  );
}

// export default ViewTaskDetails;
export default ViewTaskDetails;
