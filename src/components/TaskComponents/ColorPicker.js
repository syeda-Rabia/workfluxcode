import React from "react";
import { SketchPicker } from "react-color";
import { Popover, Tooltip } from "antd";
import { CgColorPicker } from "react-icons/cg";
class ColorPicker extends React.Component {
  state = {
    hex: this.props.color || "",
  };
  // change color and send it ti parent
  handleChange = (color, e) => {
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
    this.props.onChange(color.hex);
    this.setState({ hex: color.hex });
  };

  render() {
    const content = (
      <SketchPicker
        color={this.state.hex}
        onClick={(e) => {
          console.log(e);
        }}
        onChange={this.handleChange}
      />
    );
    return (
      <>
        <Tooltip title="Pick task label color" placement="top">
          <Popover placement="bottom" trigger="click" content={content}>
            <CgColorPicker style={{ color: this.state.hex || "#000" }} />
          </Popover>
        </Tooltip>
      </>
    );
  }
}

export default ColorPicker;
