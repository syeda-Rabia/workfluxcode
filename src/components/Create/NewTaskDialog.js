import { CopyOutlined, LinkOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import {
  Avatar as AntAvatar,
  Checkbox,
  Comment,
  DatePicker,
  Empty,
  Form,
  Input,
  List,
  Mentions,
  message,
  Modal,
  Popover,
  Radio,
  Select,
  Tooltip as AntTooltip,
  Upload,
} from "antd";
import AnimatedBtn from "components/CustomButtons/AnimatedBtn";
import InlineToolbarTextEditor from "components/RichTextEditor/InlineToolbarTextEditor";
import ColorPicker from "components/TaskComponents/ColorPicker";
import UploadFile from "components/UploadFile/UploadFile";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Col, Form as RBForm, Row } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import ApiUrls from "utils/ApiUrls";
import { AXIOS_POST, GET, POST } from "utils/Functions";
import "./newTaskDialog.scss";
import { useHistory } from "react-router-dom";

// responsive design
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

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const key = "updatable";
const newList = {
  hidden: {
    opacity: 0,
    // x: 170,
    y: -2,
    transition: {
      type: "spring",
      when: "afterChildren",
      staggerChildren: 0.3,
    },
  },
  visible: {
    opacity: 1,
    // x: 170,
    y: -4,
    transition: {
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};
// comment list map
const CommentList = ({ comments, picture }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => (
      <>
        <Comment
          author={props.author}
          avatar={<Avatar alt="user" src={picture} />}
          content={<p>{props.message}</p>}
          datetime={props.sending_time}
        />
        <div className="ml-5">
          <Upload fileList={props.attachments}></Upload>
        </div>
      </>
    )}
  />
);
// subtask list map

const ListItem = ({
  item,
  index,
  onChange,
  users,
  onAssigneChange,
  onDelete,
}) => {
  const [openSubtaskAssignee, setOpenSubtaskAssignee] = useState(true);

  return (
    <List.Item className="subtask">
      <List.Item.Meta />
      <div className="subtask--list w-100 d-flex flex-row align-items-center justify-content-between">
        {/* <Checkbox /> */}
        <Input
          value={item.title}
          onChange={(e) => onChange(e, index)}
          style={{ width: "80%" }}
        />
        <ClickAwayListener onClickAway={() => setOpenSubtaskAssignee(true)}>
          {openSubtaskAssignee ? (
            <Avatar
              style={{ width: 26, height: 26, fontSize: 13 }}
              variant="rounded"
              onClick={() => {
                setOpenSubtaskAssignee(false);
              }}
            >
              {item.assign_person != null ? (
                <Tooltip
                  placement="top"
                  title={
                    users.filter((user) => user._id === item.assign_person)[0]
                      .username
                  }
                >
                  <span>
                    {users
                      .filter((user) => user._id === item.assign_person)[0]
                      .username.split(" ")
                      .map(function (str) {
                        return str ? str[0].toUpperCase() : "";
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
                className="w-100 radiusBorderInput"
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(val) => {
                  onAssigneChange(val, index);
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
          <DeleteOutlineOutlinedIcon
            onClick={() => {
              onDelete(index);
            }}
            style={{ color: "#e06666", fontSize: 24 }}
          />
        </Tooltip>
      </div>
    </List.Item>
  );
};
function NewTaskDialog(
  {
    refreshAfterSubmit,
    allProjects,
    projectID,
    loggedUser,
    closeModal,
    picture,
  },
  ref
) {
  const [newTask, setNewTask] = useState({
    project: projectID !== undefined ? projectID._id : null,
  });
  let history = useHistory();

  const [attachments, setAttachments] = useState([]);
  const [taskFiles, setTaskFiles] = useState([]);
  const [commentsFiles, setCommentsFiles] = useState([]);
  const [commentAttachments, setCommentAttachments] = useState([]);

  const [uploadCommentAttachments, setUploadCommentAttachments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showSubTask, setShowSubTask] = useState(false);
  const [showDependency, setShowDependency] = useState(false);
  const [allTasks, setAllTasks] = useState(null);
  const [subTasks, setSubTasks] = useState({
    value: "",
    sub_tasks: [],
  });
  const [dependencies, setDependencies] = useState({
    dependency: { parent_task: [], child_task: [] },
  });
  const [taskDep, setTaskDep] = useState("parent_task");
  const [parent_depList, setParent_depList] = useState([]);
  const [child_depList, setChild_depList] = useState([]);
  const [selectedDepTask, setSelectedDepTask] = useState("");
  const [followers, setFollowers] = useState([]);
  const [mentionUser, setMentionUser] = useState([]);
  const [openFollowers, setOpenFollowers] = useState(false);

  const [commentList, setCommentList] = useState({
    comments: [],
    submitting: false,
    value: "",
  });
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [addTaskList, setAddTaskList] = useState("");
  const [addTaskLabel, setAddTaskLabel] = useState("");
  const [showTaskListInput, setShowTaskListInput] = useState(false);
  const [showTaskLabelInput, setShowTaskLabelInput] = useState(false);
  const [newTaskListArray, setNewTaskListArray] = useState([]);
  const [taskLists, setTaskLists] = useState([]);
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [commentMentions, setCommentMentions] = useState([]);
  const [allLabels, setAllLabels] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const isFirstRun = useRef(true);
  const isFirstRunFollowers = useRef(true);
  const isFirstRunTaskList = useRef(true);
  let tasksOptionMap = [...parent_depList, ...child_depList];
  const [form] = Form.useForm();
  const selectRef = React.useRef();
  // getallUsers fromm server
  useEffect(() => {
    getallUsers();
    console.log("----------------------------------------------------> mount");
    return () => {
      console.log(
        "----------------------------------------------------> unmount"
      );
    };
  }, []);
  // calls at function mount  and everytime refresh changes

  useEffect(() => {
    getLabels();
  }, [refresh]);
  // calls at function mount  and everytime newTask.project changes and  wont run at first time

  useEffect(() => {
    if (isFirstRunFollowers.current && !projectID) {
      isFirstRunFollowers.current = false;
      return;
    }
    setCheckedList([]);
    setCommentMentions([]);

    // eslint-disable-next-line no-unused-vars
    let { tasklist, new_tasklist, ...taskDetail } = newTask;

    setNewTask({ ...taskDetail });
    setCommentList({
      comments: [],
      submitting: false,
      value: "",
    });

    getProjectFollowers();
  }, [newTask.project]);
  // calls at function mount  and everytime newTask.project changes and  wont run at first time

  useEffect(() => {
    if (isFirstRunTaskList.current && !projectID) {
      isFirstRunTaskList.current = false;
      return;
    }
    // setTaskLists([]);
    getProjectTaskList();
  }, [newTask.project]);
  // calls at function mount  and everytime newTask.project changes and  wont run at first time

  useEffect(() => {
    if (isFirstRun.current && !projectID) {
      isFirstRun.current = false;
      return;
    }
    // setAllTasks([]);
    getProjectTasks();
  }, [newTask.project]);
  // to control this child component  from parent
  useImperativeHandle(ref, () => {
    return {
      handleOpen,
      handleClose,
    };
  });
  // get all labels listing
  const getLabels = async () => {
    let res = await GET(ApiUrls.GET_ALL_LABLEL);
    console.log(res, "label---->");
    if (res.status == "200") {
      setAllLabels(res.labels);
    }
  };
  // open dialogue box
  const handleOpen = () => {
    setOpen(true);
  };
  // close dialogue box
  const handleClose = () => {
    setOpen(false);
  };
  // getProjectTaskList from server
  const getProjectTaskList = async () => {
    let res = await GET(ApiUrls.GET_PROJECT_TASKLISTS + newTask?.project);
    console.log(res);
    if (res.status == "200") {
      setTaskLists(res.tasklists);
    }
  };

  // get project followers from server
  const getProjectFollowers = async () => {
    let res = await GET(ApiUrls.GET_PROJECT_FOLLOWERS + newTask?.project);
    console.log(res);
    if (res.status == "200") {
      const follower = res.followers.map((i) => {
        return i.username;
      });
      console.log(follower);
      setFollowers(follower);
      setMentionUser(res.followers);
    }
  };
  // get all tasks
  const getProjectTasks = async () => {
    let res = await GET(
      ApiUrls.GET_PROJECT_TASKS_WITHOUT_LISTING +
        newTask?.project +
        `&status=active`
    );
    console.log(res);

    if (res.status == "200") {
      setAllTasks(res.tasks);
    }
  };
  // get all user of the project
  const getallUsers = async () => {
    let res = await GET(ApiUrls.GET_ALL_USERS + "assignee=true");
    if (res.status == "200") {
      setAllUsers(res.users);
    }
  };
  // submit new task detail
  const handleSubmit = async () => {
    handleClose();

    let formData = new FormData();
    if (attachments.length > 0) {
      for (let i = 0; i < attachments.length; i++) {
        formData.append(`attachments`, attachments[i]);
      }
    }

    for (let key in newTask) {
      formData.append(key, newTask[key]);
    }

    formData.append("files", JSON.stringify(taskFiles));
    formData.append("sub_tasks", JSON.stringify(subTasks.sub_tasks));
    formData.append("dependency", JSON.stringify(dependencies.dependency));
    formData.append("comments", JSON.stringify(commentList.comments));
    formData.append("followers", JSON.stringify(checkedList));
    // for (var value of formData.values()) {
    //   console.log(value);
    // }

    message.loading({ content: "Action in progress..", key });
    let resp = await AXIOS_POST(ApiUrls.ADD_TASK, formData);
    console.log(resp);
    refreshAfterSubmit();

    if (resp.status == "200") {
      message.success({
        content: "Task Added Successfully.",
        key,
        duration: 2.5,
      });
    } else {
      message.error("Something went wrong");
    }
  };

  // handle task file upload
  const handleFileUpload = async (info) => {
    // if (info.file.status !== "uploading") {}
    console.log(info);
    if (info.fileList.length > 0) {
      setAttachments(() => info.fileList.map((file) => file.originFileObj));
      setTaskFiles(() => info.fileList.map((file) => file.originFileObj.name));
    } else {
      setAttachments([]);
      setTaskFiles([]);
    }
  };
  // handle comment file upload
  const handleCommentAttachments = (info) => {
    // if (info.file.status === "uploading") {
    //   setAttachments([
    //     ...attachments,
    //     ...info.fileList.map((file) => file.originFileObj),
    //   ]);
    // }
    // if (info.file.status === "removed") {
    //   setAttachments(() =>
    //     attachments.filter((file) => file.uid !== info.file.uid)
    //   );
    // }
    if (info.fileList.length > 0) {
      console.log("if inside  upload");
      setUploadCommentAttachments(info.fileList);

      setCommentAttachments(() =>
        info.fileList.map((file) => file.originFileObj)
      );
      setCommentsFiles(() =>
        info.fileList.map((file) => file.originFileObj.name)
      );
    } else {
      setUploadCommentAttachments([]);
      setCommentAttachments([]);
      setCommentsFiles([]);
    }
    console.log(info);
  };
  // add new comment
  const AddComment = (e) => {
    if (!commentList.value) {
      e.preventDefault();
      return;
    }
    setAttachments([...attachments, ...commentAttachments]);
    setCommentList({
      value: "",
      comments: [
        ...commentList.comments,
        {
          author: loggedUser.username,
          message: commentList.value.replace(/^\n|\n$/g, ""),
          tagged: commentMentions,
          sending_time: moment().format("YYYY-MM-DD"),
          attachments: commentAttachments,
          files: commentsFiles,
        },
      ],
    });
    setCommentMentions([]);
    setCommentsFiles([]);
    setCommentAttachments([]);
    setUploadCommentAttachments([]);
  };

  // handle subtask edit functionality
  const handleSubtaskUpdate = (e, index) => {
    setSubTasks((prev) => {
      let sub_tasks = [...prev.sub_tasks];
      sub_tasks[index] = { ...sub_tasks[index] };
      sub_tasks[index].title = e.target.value;
      console.log(
        "sub_tasks[index]",
        sub_tasks[index],
        "subtask",
        subTasks.sub_tasks
      );
      return { ...prev, sub_tasks };
    });
  };
  // handle subtask assigne  change  functionality
  const handleSubtaskAssigneeUpdate = (val, index) => {
    setSubTasks((prev) => {
      let sub_tasks = [...prev.sub_tasks];
      sub_tasks[index] = { ...sub_tasks[index] };
      sub_tasks[index].assign_person = val;
      sub_tasks[index].assignPersonName = val;
      console.log(
        "sub_tasks[index]",
        sub_tasks[index],
        "subtask",
        subTasks.sub_tasks
      );
      return { ...prev, sub_tasks };
    });
  };
  // handle color picker value
  const handleColorChange = (val) => {
    setNewTask({
      ...newTask,
      label_color: val,
    });
  };
  // console.log(checkedList, "--------->");
  // console.log(commentList, "--------->");
  console.log(newTask, "--------->");
  // console.log(taskFiles, "--------->");
  // console.log(attachments, "attachments", "--------->");
  // console.log(commentMentions);
  // console.log(commentList, "setCommentList");

  return (
    <>
      <Modal
        visible={open}
        onCancel={handleClose}
        footer={null}
        destroyOnClose={true}
        centered={true}
        dividers={false}
        wrapClassName="antdModel"
        className="newTask"
        afterClose={closeModal}
        title={
          <div className="modalheader position-relative">
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
                <IconButton>
                  <ArchiveIcon />
                </IconButton>
              </motion.div>

              <motion.div variants={newList}>
                <IconButton>
                  <LinkOutlined />
                </IconButton>
              </motion.div>
            </motion.div>

            <IconButton onClick={() => setShow(!show)} className="headerIcon ">
              <SettingsOutlinedIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
        }
      >
        <>
          <Form
            form={form}
            requiredMark={false}
            colon={false}
            scrollToFirstError={true}
            labelAlign="left"
            layout="horizantal"
            onFinish={handleSubmit}
            preserve={false}
            {...layout}
          >
            <Row>
              <div className="taskTitle">
                <Input
                  className="w-100 taskTitle--input "
                  required={true}
                  placeholder="Task Title"
                  bordered={false}
                  onChange={(event) => {
                    setNewTask({
                      ...newTask,
                      title: event.target.value,
                    });
                  }}
                />
              </div>
              <Col lg={6} md={6}>
                <Form.Item label="Assigned to">
                  {/* <Input
                  placeholder="Assingee Name"
                  
                  onChange={(event) => {
                    setNewTask({
                      ...newTask,
                      assign_person: event.target.value,
                    });
                  }}
                /> */}
                  <Select
                    placeholder="Assignee Name"
                    className="w-100"
                    value={newTask.assign_person}
                    onChange={(value) => {
                      setNewTask({
                        ...newTask,
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
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Start Date">
                  <DatePicker
                    disabledDate={(current) =>
                      current &&
                      current > moment(newTask.due_date, "YYYY-MM-DD")
                    }
                    className="w-100"
                    onChange={(date, dateString) => {
                      setNewTask({
                        ...newTask,
                        start_date: dateString,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item label="Task Label" name="Task Label">
                  <Select
                    placeholder="Task Label"
                    className="w-100"
                    value={newTask.label}
                    onChange={(value) => {
                      const data = value.split(",");

                      console.log(data);
                      setNewTask({
                        ...newTask,
                        label: data[0],
                        label_color: data[1],
                      });
                    }}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    dropdownRender={(menu) => (
                      <div>
                        {menu}
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
                                    <ColorPicker onChange={handleColorChange} />
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
                                              color: newTask.label_color,
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
                                    setShowTaskLabelInput(!showTaskLabelInput);
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
                      </div>
                    )}
                  >
                    {allLabels.map((item, index) => (
                      <Option
                        className="antSelect"
                        style={{
                          textTransform: "capitalize",
                          color: item.color,
                        }}
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
                    {/* {taskLabels.map((item, index) => (
                      <Option
                        className="antSelect"
                        style={{ textTransform: "capitalize" }}
                        key={index}
                        value={`${item},newlabel`}
                      >
                        {item}
                      </Option>
                    ))} */}
                  </Select>
                </Form.Item>
                <Form.Item label="Followers" name="followers">
                  {checkedList.length > 0 && (
                    <AntAvatar.Group
                      style={{ marginLeft: "18px" }}
                      maxCount={2}
                      size={30}
                      maxStyle={{
                        color: "#fff",
                        backgroundColor: "#2b7ae4",
                      }}
                    >
                      {checkedList.map((item, index) => (
                        <AntTooltip key={index} title={item} placement="top">
                          <AntAvatar
                            style={{
                              backgroundColor: ColorList[index],
                            }}
                          >
                            {item}
                            {/* {item.split(" ").map((str) => str[0].toUpperCase())} */}
                          </AntAvatar>
                        </AntTooltip>
                      ))}
                    </AntAvatar.Group>
                  )}
                  <Popover
                    color="transparent"
                    trigger="focus"
                    content={
                      <motion.div
                        className="followerDiv"
                        // initial={{ width: 0, height: 0 }}
                        // animate={{ width: "100%", height: "auto" }}
                        // exit={{ opacity: 0 }}
                      >
                        <Checkbox
                          indeterminate={indeterminate}
                          onChange={(e) => {
                            setCheckedList(e.target.checked ? followers : []);
                            setIndeterminate(false);
                            setCheckAll(e.target.checked);
                          }}
                          checked={checkAll}
                        >
                          Select all
                        </Checkbox>
                        <Divider className="my-2" />
                        {followers.length > 0 ? (
                          <CheckboxGroup
                            className="d-flex flex-column"
                            options={followers}
                            value={checkedList}
                            onChange={(list) => {
                              console.log(list, "listtttttttt");
                              setCheckedList(list);
                              setIndeterminate(
                                !!list.length && list.length < followers.length
                              );
                              setCheckAll(list.length === followers.length);
                            }}
                          />
                        ) : (
                          <Empty />
                        )}
                      </motion.div>
                    }
                  >
                    <IconButton
                      // style={{ marginLeft: "6%" }}
                      className="p-2 float-right"
                      color="primary"
                      onClick={() => {
                        console.log(openFollowers);
                        setOpenFollowers(!openFollowers);
                      }}
                    >
                      <BiEdit />
                    </IconButton>
                  </Popover>
                </Form.Item>
              </Col>
              <Col lg={6} md={6}>
                {projectID !== undefined ? (
                  <Form.Item
                    label="Project"
                    name="project"
                    initialValue={projectID.projectName}
                  >
                    <Input readOnly={true} />
                  </Form.Item>
                ) : (
                  <Form.Item
                    label="Project"
                    name="Project"
                    rules={[
                      {
                        required: true,
                        message: "Please input Project Name!",
                      },
                    ]}
                  >
                    <Select
                      value={newTask.project}
                      placeholder="Project Name"
                      className="w-100"
                      onChange={(value) => {
                        setNewTask({
                          ...newTask,
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
                )}

                <Form.Item label="Due Date">
                  <DatePicker
                    disabledDate={(current) =>
                      current &&
                      current < moment(newTask.start_date, "YYYY-MM-DD")
                    }
                    className="w-100"
                    onChange={(date, dateString) => {
                      setNewTask({
                        ...newTask,
                        due_date: dateString,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  key={newTask.project}
                  label="Task List"
                  name="taskList"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Task List!",
                    },
                  ]}
                >
                  <Select
                    ref={selectRef}
                    className="w-100"
                    placeholder="Select Task List"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    onChange={(e) => {
                      const [val, key] = e.split("*");
                      // eslint-disable-next-line no-unused-vars
                      let { tasklist, new_tasklist, ...taskDetail } = newTask;

                      setNewTask({ ...taskDetail, [key]: val });
                    }}
                    dropdownRender={(menu) => (
                      <div>
                        {menu}
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
                                        console.log("cliecked");
                                        if (addTaskList !== "") {
                                          // setFollowers([
                                          //   ...followers,
                                          //   addTaskList,
                                          // ]);
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
                      </div>
                    )}
                  >
                    {taskLists.map((item, index) => (
                      <Option key={index} value={`${item._id}*tasklist`}>
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
                {/* <Form.Item label="Label Color">
                  <ColorPicker onChange={handleColorChange} />
                </Form.Item> */}
              </Col>
            </Row>

            <Divider className="mb-3" />

            <RBForm.Group>
              <RBForm.Label>Description</RBForm.Label>
              {/* <ReactDraftEditor
                returnHtml={(html) => {
                  console.log(html);
                }}
              /> */}
              <InlineToolbarTextEditor
                returnHtml={(html) => {
                  console.log(html);
                  setNewTask({
                    ...newTask,
                    description: html,
                  });
                }}
              />
              {/* <Input.TextArea
                rows={4}
                style={{ border: "1px solid #DADADA" }}
                maxLength="5000"
                // 
                onChange={(event) => {
                  setNewTask({
                    ...newTask,
                    description: event.target.value,
                  });
                }}
              /> */}
            </RBForm.Group>

            <UploadFile onChange={handleFileUpload} multiple={true} />
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
                    onChange={(event) =>
                      setSubTasks({ ...subTasks, value: event.target.value })
                    }
                    onPressEnter={(event) => {
                      // setShowSubTask(false);
                      event.preventDefault();
                      if (subTasks.value !== "") {
                        setSubTasks({
                          sub_tasks: [
                            ...subTasks.sub_tasks,
                            {
                              title: subTasks.value,
                              assign_person: null,
                            },
                          ],
                          value: "",
                        });
                      }
                    }}
                  />
                  <div className="mt-3">
                    <Button
                      className="rounded-pill mr-2"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        // setShowSubTask(false);
                        setSubTasks({
                          sub_tasks: [
                            ...subTasks.sub_tasks,
                            {
                              title: subTasks.value,
                              assign_person: null,
                            },
                          ],
                          value: "",
                        });
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
            ) : (
              <AnimatedBtn
                label="Add a Subtask"
                onClick={() => {
                  setShowSubTask(true);
                }}
              />
            )}
            {subTasks.sub_tasks.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={subTasks.sub_tasks}
                // renderItem={(item, index) => {}}
              >
                {subTasks.sub_tasks.map((item, index) => (
                  <ListItem
                    key={index}
                    item={item}
                    index={index}
                    onChange={handleSubtaskUpdate}
                    users={allUsers}
                    onAssigneChange={handleSubtaskAssigneeUpdate}
                    onDelete={(index) => {
                      setSubTasks((state) => ({
                        ...state,
                        sub_tasks: subTasks.sub_tasks.filter(
                          (_, id) => id !== index
                        ),
                      }));
                    }}
                  />
                ))}
              </List>
            ) : null}
            <Divider className="my-3" />
            {parent_depList.length > 0 ? (
              <div className="dependency--maindiv">
                <h2>Parent Tasks</h2>
                <List
                  size="small"
                  dataSource={parent_depList}
                  renderItem={(item, index) => (
                    <List.Item
                      className="listItem"
                      actions={[
                        <Tooltip
                          key="delete-parent-dependency"
                          title="Delete"
                          placement="top"
                        >
                          <DeleteOutlineOutlinedIcon
                            onClick={() => {
                              // parent_depList.
                              let array = JSON.parse(
                                JSON.stringify(parent_depList)
                              );
                              array.splice(index, 1);
                              console.log(index);
                              setParent_depList(array);
                              console.log(array);
                            }}
                            style={{ color: "#e06666", fontSize: 24 }}
                          />
                        </Tooltip>,
                      ]}
                    >
                      {item.title}
                    </List.Item>
                  )}
                />
              </div>
            ) : null}
            {child_depList.length > 0 ? (
              <div className="dependency--maindiv">
                <h2>Child Tasks</h2>
                <List
                  size="small"
                  dataSource={child_depList}
                  renderItem={(item, index) => (
                    <List.Item
                      className="listItem"
                      actions={[
                        <Tooltip
                          key="delete-child-dependency"
                          title="Delete"
                          placement="top"
                        >
                          <DeleteOutlineOutlinedIcon
                            onClick={() => {
                              let array = JSON.parse(
                                JSON.stringify(child_depList)
                              );
                              array.splice(index, 1);
                              console.log(index);
                              setChild_depList(array);
                              console.log(array);
                            }}
                            style={{ color: "#e06666", fontSize: 24 }}
                          />
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
                    style={{ width: 120 }}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    onChange={(value) => {
                      setSelectedDepTask(value);
                    }}
                  >
                    {allTasks !== null &&
                      allTasks
                        .filter((task) => {
                          return tasksOptionMap.every(
                            (item) => item._id !== task._id
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
                    Member assigned to the current task will be notified when
                    each parent task is finished.
                  </p>
                  <div>
                    <Button
                      className="rounded-pill mr-2"
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        if (taskDep === "parent_task") {
                          let arr = {
                            dependency: {
                              ...dependencies.dependency,
                              [taskDep]: !dependencies.dependency[
                                taskDep
                              ].includes(selectedDepTask)
                                ? [
                                    ...dependencies.dependency[taskDep],
                                    selectedDepTask,
                                  ]
                                : [...dependencies.dependency[taskDep]],
                            },
                          };
                          setDependencies({
                            dependency: { ...arr.dependency },
                          });

                          let parDepTask = allTasks.filter((task) => {
                            return arr.dependency[taskDep].includes(task._id);
                          });

                          setParent_depList(parDepTask);
                          setShowDependency(false);
                        }
                        if (taskDep === "child_task") {
                          let arr = {
                            dependency: {
                              ...dependencies.dependency,
                              [taskDep]: !dependencies.dependency[
                                taskDep
                              ].includes(selectedDepTask)
                                ? [
                                    ...dependencies.dependency[taskDep],
                                    selectedDepTask,
                                  ]
                                : [...dependencies.dependency[taskDep]],
                            },
                          };
                          setDependencies({
                            dependency: { ...arr.dependency },
                          });

                          let childDepTask = allTasks.filter((task) => {
                            return arr.dependency[taskDep].includes(task._id);
                          });

                          setChild_depList(childDepTask);
                          setShowDependency(false);
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
            ) : (
              <AnimatedBtn
                label="Add a Dependency"
                onClick={() => {
                  setShowDependency(true);
                }}
              />
            )}

            <Divider className="my-3" />

            <h3 className="comentTitle">Discussions</h3>

            {commentList.comments.length > 0 && (
              <CommentList comments={commentList.comments} picture={picture} />
            )}

            <Comment
              avatar={<Avatar alt="user" src={picture} />}
              content={
                openComment ? (
                  <>
                    <div className="customEditor">
                      <Mentions
                        autoFocus={true}
                        value={commentList.value}
                        onChange={(value) => {
                          if (value === "") {
                            setCommentMentions([]);
                          }
                          setCommentList({
                            ...commentList,
                            value: value,
                          });
                        }}
                        onSelect={(user) => {
                          if (!commentMentions.includes(user.value)) {
                            setCommentMentions([
                              ...commentMentions,
                              user.value,
                            ]);
                          }

                          console.log(user);
                        }}
                        rows={4}
                        // onPressEnter={AddComment}
                      >
                        {mentionUser.map((user, index) => (
                          <Mentions.Option key={index} value={user.username}>
                            {user.username}
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
                          customRequest={({ onSuccess }) => {
                            setTimeout(() => {
                              onSuccess("ok");
                            }, 0);
                          }}
                          onChange={handleCommentAttachments}
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
                        onClick={AddComment}
                      >
                        Add Comment
                      </Button>
                      <Button
                        variant="outlined"
                        className="rounded-pill"
                        onClick={() => {
                          setCommentList({
                            ...commentList,
                            value: "",
                          });
                          setUploadCommentAttachments([]);
                          setCommentMentions([]);
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
            <Divider className="my-3" />

            <div style={{ overflow: "hidden" }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className="float-right"
              >
                Create
              </Button>
            </div>
          </Form>
        </>
      </Modal>
    </>
  );
}
export default React.forwardRef(NewTaskDialog);
