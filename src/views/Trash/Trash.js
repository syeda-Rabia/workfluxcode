import { Button } from "@material-ui/core";
import { List, message, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import ApiUrls from "utils/ApiUrls";
import { GET, PATCH, DELETE } from "utils/Functions";
const key = "update";

export default function Trash() {
  const [trashItems, setTrashItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getTrashItems();
  }, [refresh]);
  const getTrashItems = async () => {
    let res = await GET(ApiUrls.GET_TRASH_ITEMS);
    console.log(res);
    setLoading(false);
    if (res.status == "200") {
      setTrashItems(res.trash_items);
    } else {
      message.error(res.message);
    }
  };
  const restoreTrashItem = async (item) => {
    console.log(item);
    message.loading({ content: "Action in progress..", key });

    let res = await PATCH(ApiUrls.TRASH_RESTORE + item.id, {
      table: item.table,
      trash_id: item._id,
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
      message.error(res.message);
    }
  };
  const deletePermenent = async (item) => {
    console.log(item);
    message.loading({ content: "Action in progress..", key });

    let res = await DELETE(ApiUrls.DELETE_PERMANENT + item.id, {
      table: item.table,
      trash_id: item._id,
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
      message.error(res.message);
    }
  };
  const emptyTrash = async () => {
    message.loading({ content: "Action in progress..", key });

    let res = await DELETE(ApiUrls.EMPTY_TRASH);
    console.log(res);
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
  return (
    <div>
      <h1
        className="my-4"
        style={{
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "31px",

          color: "#2B7AE4",
        }}
      >
        Trash
      </h1>
      <div>
        <Button
          color="primary"
          variant="contained"
          className="rounded-pill"
          onClick={emptyTrash}
        >
          Empty Trash
        </Button>
        <span
          style={{ marginLeft: "23px", fontSize: "14px", color: "#737373" }}
        >
          Items older than 30 days are automatically deleted forever.
        </span>
      </div>
      <div className="mt-3">
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={trashItems}
          loading={loading}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  color="primary"
                  key="restore"
                  onClick={() => restoreTrashItem(item)}
                >
                  Restore
                </Button>,
                <Popconfirm
                  key="deleteForever"
                  title="Are you sure to delete this?"
                  onConfirm={() => deletePermenent(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    color="secondary"
                    key="deleteForever"
                    // onClick={() => deletePermenent(item)}
                  >
                    Delete Forever
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={<span>{item.title}</span>}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
