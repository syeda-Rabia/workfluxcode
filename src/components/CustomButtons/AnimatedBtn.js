import React from "react";
import { motion } from "framer-motion";
import { PlusOutlined } from "@ant-design/icons";
import SvgIcon from "@material-ui/core/SvgIcon";
import PlusIcon from "assets/img/plus.svg";

const slashMotion = {
  hover: {
    rotate: 90,
    transition: {
      type: "tween",
    },
  },
};
const textMotion = {
  rest: {
    color: "#2b7ae4",
  },
  hover: {
    color: "white",
    fontWeight: 600,
    transition: {
      duration: 0,
      type: "tween",
      ease: "easeOut",
    },
  },
};
const mainDiv = {
  rest: { width: 0, height: 0, opacity: 0, background: "transparent" },
  hover: {
    width: "100%",
    height: 30,
    // left: "-5px",
    opacity: 1,
    background: "#2b7ae4",
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeIn",
    },
  },
};
export default function AnimatedBtn({ label, onClick }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="animatedBtnDiv"
      onClick={onClick}
    >
      <motion.div className="increaseWidthDiv" variants={mainDiv} />

      <motion.div className="iconDiv" variants={slashMotion}>
        {/* <PlusOutlined /> */}
        <img width="10px" height="10px" src={PlusIcon} />
        {/* <SvgIcon component={PlusIcon}></SvgIcon> */}
      </motion.div>
      <motion.span variants={textMotion} className="text">
        {label}
      </motion.span>
    </motion.div>
  );
}
