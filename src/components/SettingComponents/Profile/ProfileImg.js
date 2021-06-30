import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AXIOS_PATCH } from "utils/Functions";
import ApiUrls from "utils/ApiUrls";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { baseeURL } from "utils/Config";
import * as actionCreators from "store/actions";
// to show img in div
function getBase64(img, callback) {
  console.log("getbase64");
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
// check file type
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class ProfileImg extends React.Component {
  state = {
    loading: false,
  };
  // upload img to server
  updateProfileImage = async ({ file, onSuccess, onError }) => {
    console.log(file);
    let formData = new FormData();
    formData.append(`avatar`, file);
    let resp = await AXIOS_PATCH(
      ApiUrls.UPDATE_PROFILE + this.props.userID,
      formData
    );
    console.log(resp.data);
    if (resp.data.status == 200) {
      onSuccess("ok");
      message.success("Profile image updated.");
      if (this.props.userPicture) {
        this.props.onUserInfoUpdate({
          // user: resp.data.user_info,
          picture: baseeURL + resp.data.user_info.avatar,
        });
      }
    } else {
      message.error(resp.data.message);
      onError();
    }
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      console.log("loading");
      this.setState({ loading: true });
    }
    if (info.file.status === "done") {
      console.log("done");

      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className={this.props?.className} id="profileUpdateAntd">
        <Upload
          name="avatar"
          listType="picture-card"
          className={`rounded-circle ${this.props?.classes}`}
          showUploadList={false}
          customRequest={this.updateProfileImage}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl || this.props.defaultImg ? (
            <Avatar
              src={imageUrl || baseeURL + this.props.defaultImg}
              alt="avatar"
              style={{ width: "140px", height: "140px" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onUserInfoUpdate: (payload) =>
      dispatch(actionCreators.updateUserInfo(payload)),
  };
};
export default connect(null, mapDispatchToProps)(ProfileImg);
