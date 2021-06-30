import React from "react";
import { Input } from "antd";
import { Button, IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
export default function EmailForm({ onChange, data, setInviteNewPeople }) {
  const [emailInputLength, setEmailInputLength] = React.useState(1);

  return (
    <div className="">
      <div className="form-group ">
        <label htmlFor="emailInput">Email address</label>

        {Array.from({ length: emailInputLength }, (item, index) => (
          <div className="d-flex justify-content-between" key={index}>
            <Input
              required={true}
              type="email"
              value={data.email[index]}
              className="mb-2 radiusBorderInput"
              id="emailInput"
              style={{ width: "85%" }}
              onChange={(e) => {
                onChange(e, index);
              }}
            />

            <IconButton
              onClick={() => {
                if (emailInputLength > 1) {
                  setInviteNewPeople((state) => ({
                    ...state,
                    email: state.email.filter((_, id) => id !== index),
                  }));
                  setEmailInputLength(emailInputLength - 1);
                }
              }}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        ))}

        <Button
          // startIcon={<AddIcon />}
          style={{ color: "#C0C0C0" }}
          onClick={() => {
            setEmailInputLength(emailInputLength + 1);
          }}
        >
          + Add Another Email
        </Button>
      </div>
    </div>
  );
}
