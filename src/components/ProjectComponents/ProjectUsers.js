import { Button, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Form, message, Popover, Select, Skeleton } from "antd";
import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ApiUrls from "utils/ApiUrls";
import { DELETE, GET, POST } from "utils/Functions";
import "./users.scss";
const useStyles = makeStyles(styles);
const { Option } = Select;

function ProjectUsers(props) {
  const classes = useStyles();
  const [allFollowers, setAllFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [addUser, setAddUser] = useState({});

  console.log(props, "users");
  // calls at function mount and everytime refresh change
  useEffect(() => {
    getallFollowers();
    getallUsers();
  }, [refresh]);
  const getallUsers = async () => {
    setLoading(true);
    let res = await GET(ApiUrls.GET_ALL_USERS);
    console.log(res);
    setLoading(false);

    if (res.status == "200") {
      setAllUsers(res.users);
    }
  };
  const getallFollowers = async () => {
    let res = await GET(ApiUrls.GET_PROJECT_FOLLOWERS + props._id);
    console.log(res);
    if (res.status == "200") {
      setAllFollowers(res.followers);
    }
    setLoading(false);
  };

  const deleteUser = async (user) => {
    console.log(user);
    let resp = await DELETE(ApiUrls.DELETE_PROJECT_FOLLOWER, {
      project_id: props._id,
      user_id: user._id,
    });
    console.log(resp);
    if (resp.status == "200") {
      message.success(resp.message);
      setRefresh(!refresh);
    } else {
      message.error(resp.message);
    }
  };
  const handleSubmit = async () => {
    let resp = await POST(ApiUrls.ADD_PROJECT_FOLLOWER, {
      project_id: props._id,
      user_id: addUser.user_id,
    });
    console.log(resp);
    form.resetFields();
    if (resp.status == "200") {
      message.success(resp.message);
      setRefresh(!refresh);
    } else {
      message.error(resp.message);
    }
  };
  const [form] = Form.useForm();

  const content = (
    <div style={{ minHeight: "150px" }}>
      <Form
        form={form}
        preserve={false}
        requiredMark={false}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="user"
          label="Select User"
          rules={[
            {
              required: true,
              message: "Please Select User!",
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
              setAddUser({ ...addUser, user_id: value });
            }}
          >
            {allUsers
              .filter((user) => {
                return !allFollowers.some((item) => item._id === user._id);
              })
              .map((item, index) => (
                <Option
                  className="antSelect"
                  style={{ textTransform: "capitalize" }}
                  key={index}
                  value={item._id}
                >
                  {(item?.first_name || "") + (item?.last_name || "") ||
                    item?.username}
                </Option>
              ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="invite"
          label="Invite user as"
          rules={[
            {
              required: true,
              message: "Please Input Task list name!",
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => {
              console.log(e.target.value);
              setAddUser({ ...addUser, role: e.target.value });
            }}
          >
            <Space direction="vertical">
              <Radio value={"owner"}>Owner</Radio>
              <Radio value={"collaborator"}>Collaborator</Radio>
              <Radio value={"member"}>Member</Radio>
            </Space>
          </Radio.Group>
        </Form.Item> */}

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
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
  return (
    <div className="usersList__content">
      {props.userType === "owner" ? (
        <Popover
          content={content}
          title="Add New User"
          placement="bottom"
          trigger="click"
        >
          <Button
            endIcon={<AddCircleOutlineOutlinedIcon />}
            classes={{ root: classes.themeBlue }}
            className="float-right"
          >
            Add User
          </Button>
        </Popover>
      ) : null}
      <h3>Users</h3>

      <List className="usersList__content--list">
        {loading
          ? Array.from({ length: 4 }, () => (
              <Skeleton
                className="w-50"
                active
                title
                avatar
                paragraph={{ rows: 1 }}
              />
            ))
          : allFollowers.map((user, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <span>
                        {user.first_name !== undefined
                          ? `${user.first_name} ${user.last_name || ""}`
                          : user.username}

                        {props.userType === "owner" ? (
                          <Tooltip
                            title="Remove"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <IconButton
                              aria-label="Close"
                              className={classes.tableActionButton}
                              onClick={() => {
                                deleteUser(user);
                              }}
                            >
                              <DeleteOutlineIcon
                                className={
                                  classes.tableActionButtonIcon +
                                  " " +
                                  classes.close
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        ) : null}
                      </span>
                    </>
                  }
                  secondary={user.email}
                />
              </ListItem>
            ))}

        {/* {allFollowers.length > 0 &&
          } */}
      </List>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    loginUserInfo: state.Login.user_info,
    userType: state.Login.user_info?.role?.title,
  };
};
export default connect(mapStatetoProps)(ProjectUsers);
