import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import { Spin, Empty, message, Menu, Dropdown, Modal, Input } from "antd";
import ApiUrls from "utils/ApiUrls";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { GET, PATCH } from "utils/Functions";
import { connect } from "react-redux";

// const settingMenuOptions = ["duplicate", "archive", "active", "complete"];

function UsersTable(props) {
  const [getAllUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
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
  const deleteUser = async (userID) => {
    if (props.loggedUserID == userID) {
      Modal.confirm({
        title: "Delete User?",
        content: "You don't have the permission to delete this user.",

        centered: true,
        cancelText: "Cancel",
        destroyOnClose: true,
        okButtonProps: {
          className: "rounded-pill d-none",
        },
        cancelButtonProps: { className: "rounded-pill" },
        maskStyle: {
          backgroundColor: "rgba(251, 251, 251, 0.8)",
        },
      });
    } else {
      let res = await PATCH(ApiUrls.DELETE_USER + userID);
      console.log("res delete", res);
      if (res.status == "200") {
        message.success(res.message);
        setRefresh(!refresh);
      } else {
        message.error(res.message);
      }
    }
  };

  const SettingMenu = (id) => (
    <Menu>
      {/* {settingMenuOptions
        .filter((st) => st !== status)
        .map((val) => (
          <Menu.Item
            key={val}
            onClick={() => {
              // changeTaskStatus(e.key, id);
              console.log("click", id);
            }}
          >
            {val}
          </Menu.Item>
        ))} */}

      <Menu.Item
        onClick={() => {
          deleteUser(id);
        }}
      >
        {"Delete"}
      </Menu.Item>
    </Menu>
  );

  const TableRow = ({ item, index }) => (
    <tr>
      <td>
        <Input
          style={{ textAlign: "center" }}
          defaultValue={
            item.first_name !== undefined && item.first_name !== ""
              ? `${item.first_name} ${item.last_name || ""}`
              : item.username
          }
          onBlur={async (e) => {
            console.log(e.target.value);

            console.log("enter");
            let resp = await PATCH(ApiUrls.UPDATE_PROFILE + item._id, {
              first_name: e.target.value,
            });
            console.log(resp);
            if (resp.status !== 200) {
              message.error(resp.message);
            }
          }}
          onKeyDown={async (e) => {
            console.log(e.target.value);
            if (e.key === "Enter") {
              console.log("enter");
              let resp = await PATCH(ApiUrls.UPDATE_PROFILE + item._id, {
                first_name: e.target.value,
              });
              console.log(resp);
              if (resp.status !== 200) {
                message.error(resp.message);
              }
            }
          }}
        />
      </td>
      <td style={{ textTransform: "lowercase" }}>{item.email}</td>
      <td>{item.role.title}</td>

      <td>
        {props.userType === "owner" ? (
          <Input
            style={{ textAlign: "center" }}
            defaultValue={item.company_info}
            onBlur={async (e) => {
              let resp = await PATCH(ApiUrls.UPDATE_PROFILE + item._id, {
                company_info: e.target.value,
              });
              console.log(resp);
              if (resp.status !== 200) {
                message.error(resp.message);
              }
            }}
            onKeyDown={async (e) => {
              console.log(e.target.value);
              if (e.key === "Enter") {
                console.log("enter");
                let resp = await PATCH(ApiUrls.UPDATE_PROFILE + item._id, {
                  company_info: e.target.value,
                });
                console.log(resp);
                if (resp.status !== 200) {
                  message.error(resp.message);
                }
              }
            }}
          />
        ) : (
          item.company_info
        )}
      </td>
      <td>
        {props.userType === "owner" ? (
          <Input
            style={{ textAlign: "center" }}
            defaultValue={item.title}
            onBlur={async (e) => {
              let resp = await PATCH(ApiUrls.UPDATE_PROFILE + item._id, {
                title: e.target.value,
              });
              console.log(resp);
              if (resp.status !== 200) {
                message.error(resp.message);
              }
            }}
            onKeyDown={async (e) => {
              console.log(e.target.value);
              if (e.key === "Enter") {
                console.log("enter");
                let resp = await PATCH(ApiUrls.UPDATE_PROFILE + item._id, {
                  title: e.target.value,
                });
                console.log(resp);
                if (resp.status !== 200) {
                  message.error(resp.message);
                }
              }
            }}
          />
        ) : (
          item.title
        )}
      </td>
      <td>{item.status}</td>
      <td>
        {props.userType === "owner" ? (
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
        ) : (
          <IconButton
            style={{
              padding: "3px",
            }}
          >
            <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
          </IconButton>
        )}
      </td>
    </tr>
  );
  return (
    <div>
      <div className="customTable">
        <Table responsive borderless hover>
          <thead>
            <tr className="tableHeading">
              <th scope="col">Name </th>
              <th scope="col">Email Address</th>
              <th scope="col">User Permissions </th>
              <th scope="col">Company</th>
              <th scope="col">Title </th>
              <th scope="col">Status </th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {getAllUsers !== null && getAllUsers.length > 0 ? (
              getAllUsers.map((user, index) => (
                <TableRow key={index} item={user} index={index} />
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
        {/* {paginate.totalRecord > 10 ? (
          <Pagination
            itemsCount={paginate.totalRecord}
            pageSize={paginate.pageSize}
            currentPage={paginate.currentPage}
            onPageChange={handlePageChange}
          />
        ) : null} */}
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  console.log(state);
  return {
    loggedUserID: state.Login.user_info._id,
    userType: state.Login.user_info?.role?.title,
  };
};
export default connect(mapStatetoProps)(UsersTable);
