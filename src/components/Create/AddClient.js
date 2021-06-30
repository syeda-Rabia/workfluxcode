import { Button } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import ApiUrls from "utils/ApiUrls";
import { POST } from "utils/Functions";

export default function AddClient({ open, handleClose }) {
  const [newClient, setNewClient] = useState({ name: "", email: "" });
  // submit new client data
  const handleSubmit = async () => {
    let resp = await POST(ApiUrls.ADD_CLIENT, newClient);
    console.log(resp);

    if (resp.status == "200") {
      message.success("Client Added Successfully.");
    }
  };

  return (
    <div>
      <Modal
        title="Create New Client"
        visible={open}
        onCancel={handleClose}
        footer={null}
        destroyOnClose={true}
        wrapClassName="antdModel"
      >
        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ padding: 10, overflow: "hidden" }}
        >
          <Form.Item
            label="Client Name"
            name="clientName"
            className="w-100"
            rules={[
              {
                required: true,
                message: "Please input Client Name!",
              },
            ]}
          >
            <Input
              className="w-100 radiusBorderInput"
              type="text"
              value={newClient.name}
              onChange={(event) => {
                console.log(event.target.value);
                event.persist();
                setNewClient({
                  ...newClient,
                  name: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="emial"
            className="w-100"
            rules={[
              {
                required: true,
                message: "Please input Email!",
              },
            ]}
          >
            <Input
              className="w-100 radiusBorderInput"
              type="email"
              value={newClient.email}
              onChange={(event) => {
                event.persist();

                setNewClient(() => {
                  return {
                    ...newClient,
                    email: event.target.value,
                  };
                });
              }}
            />
          </Form.Item>

          <Button
            className="w-100"
            endIcon={<AddCircleOutlineOutlinedIcon />}
            variant="contained"
            type="submit"
            color="primary"
          >
            Create
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
