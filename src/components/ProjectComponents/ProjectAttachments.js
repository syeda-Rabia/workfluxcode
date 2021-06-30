import { Avatar, Button } from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { Empty, List, message, Spin, Upload } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import ApiUrls from "utils/ApiUrls";
import { baseeURL } from "utils/Config";
import { AXIOS_POST, GET, PATCH } from "utils/Functions";

export default function ProjectAttachments(props) {
  const [allAttachments, setAttachmnets] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  // calls at function mount and everytime refresh changes

  useEffect(() => {
    getAllAttachments();
  }, [refresh]);
  // get all attachmnets from server

  const getAllAttachments = async () => {
    setLoading(true);
    let res = await GET(ApiUrls.GET_PROJECT_ATTACHMENTS + props._id);
    console.log(res);
    setLoading(false);
    if (res.status == "200") {
      setAttachmnets(res.attachments);
    }
  };
  // send new file to server
  const addAttachments = async ({ file, onSuccess, onError }) => {
    console.log(file);
    let formData = new FormData();
    formData.append(`attachments`, file);
    formData.append("project_id", props._id);
    let resp = await AXIOS_POST(ApiUrls.ADD_ATTACHMENT, formData);

    console.log(resp.data);
    if (resp.data.status == 200) {
      onSuccess("ok");
      message.success("File added Successfully.");
      setRefresh(!refresh);
    } else {
      message.error(resp.data.message || resp.message);
      onError();
    }
  };

  return (
    <div>
      <div className="container">
        <div className="float-right">
          <Upload showUploadList={false} customRequest={addAttachments}>
            <Button
              variant="contained"
              color="primary"
              className="mb-3 rounded-pill"
            >
              + Click to Upload
            </Button>
          </Upload>
        </div>
        <div className="clear-both"></div>
      </div>

      {loading ? (
        <div className="w-100 h-full p-36  d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      ) : allAttachments.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={allAttachments}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key="delete"
                  className="rounded-pill"
                  onClick={async (file) => {
                    console.log(file);
                    let res = await PATCH(ApiUrls.DELETE_ATTACHMENT + item._id);
                    console.log(res);
                    if (res.status == "200") {
                      message.success(res.message, 0.5, () => {
                        setRefresh(!refresh);
                      });
                    } else {
                      message.error(res.message);
                    }
                  }}
                >
                  <RiDeleteBin5Line style={{ color: "#DA0000" }} />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    variant="rounded"
                    classes={{ img: "object-contain" }}
                    src={
                      /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(
                        `.${item.url.split(".").pop()}`
                      )
                        ? baseeURL + item.url
                        : /\.(doc|docx|txt|odt)$/i.test(
                            `.${item.url.split(".").pop()}`
                          )
                        ? require("assets/img/google-docs.svg")
                        : /\.(xlsx|xlsm|xls)$/i.test(
                            `.${item.url.split(".").pop()}`
                          )
                        ? require("assets/img/google-sheets.svg")
                        : /\.(pdf)$/i.test(`.${item.url.split(".").pop()}`)
                        ? require("assets/img/pdf.svg")
                        : require("assets/img/file.svg")
                    }
                  />
                }
                title={
                  <a
                    href={baseeURL + item.url}
                    target="_blank"
                    className="font-bold"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                }
                description={
                  <>
                    {item.uploadedBy && (
                      <span className="text-xs">
                        By:&nbsp;
                        {(item.uploadedBy.first_name || "") +
                          " " +
                          (item.uploadedBy.last_name || "") ||
                          item.uploadedBy.username}
                        &nbsp; <QueryBuilderIcon style={{ fontSize: 13 }} />
                        &nbsp;
                        {moment(item.uploadedAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                    )}
                  </>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty />
      )}
      {/* {loading ? (
        <div className="w-100 h-full p-48  d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      ) : allAttachments.length > 0 ? (
        <Upload
          listType="picture"
          fileList={allAttachments.map((file) => ({
            ...file,
            url: baseeURL + file.url,
          }))}
          //   showUploadList={{
          //     showRemoveIcon: false,
          //   }}
          onRemove={async (file) => {
            console.log(file);
            let res = await PATCH(ApiUrls.DELETE_ATTACHMENT + file._id);
            console.log(res);
            if (res.status == "200") {
              message.success(res.message, 0.5, () => {
                setRefresh(!refresh);
              });
            } else {
              message.error(res.message);
            }
          }}
          onPreview={async (file) => {
            window.open(file.url, "_blank");
          }}
        />
      ) : (
        <Empty />
      )} */}
    </div>
  );
}
