import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import { Button, Upload } from "antd";
import React from "react";
import "./upload.scss";
export default function UploadFile(props) {
  // eslint-disable-next-line no-unused-vars
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <div className="w-100">
      <Upload
        className="w-100"
        name="attachments"
        maxCount={10}
        // beforeUpload={() => false}
        customRequest={dummyRequest}
        // onChange={onChange}
        {...props}
      >
        <Button className="uploadFile" icon={<AttachFileOutlinedIcon />}>
          Include a file attachment
        </Button>
      </Upload>
    </div>
  );
}
