/* eslint-disable no-unused-vars */
import React from "react";
import "./customDropdownButton.scss";
import { ClickAwayListener } from "@material-ui/core";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";

import { Dropdown, DropdownButton } from "react-bootstrap";
export default function CustomDropdownButton(props) {
  const [iconRotate, setIconRotate] = React.useState(false);
  var options;
  if (props.data !== undefined) {
    options = props.data;
  } else {
    options = ["Dummy Data"];
  }

  const [selected, setSelected] = React.useState(options[0]);

  return (
    <div className="customDropdown">
      <ClickAwayListener
        onClickAway={() => {
          setIconRotate(false);
        }}
      >
        <DropdownButton
          bsPrefix="dropdownButton"
          id="dropdownButton"
          className="m-1"
          onClick={() => {
            setIconRotate(!iconRotate);
          }}
          title={
            <span>
              {selected}
              <ExpandMoreOutlinedIcon
                className="float-right"
                id={
                  iconRotate
                    ? "dropdownButton--icon"
                    : "dropdownButton--iconRotateBack"
                }
              />
            </span>
          }
        >
          {options.map((val, index) => (
            <Dropdown.Item
              key={index}
              onClick={(e) => {
                setSelected(e.target.value);
              }}
              value={val}
              as="button"
            >
              {val}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </ClickAwayListener>
    </div>
  );
}
