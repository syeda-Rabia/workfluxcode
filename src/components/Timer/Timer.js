import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import playButtonImg from "assets/img/startTimer.svg";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";

import "./timer.scss";

const useStyles = makeStyles(styles);

export default function Timer(props) {
  const classes = useStyles();
  var days = 0;
  var hours = 0;
  var mins = 0;
  var secs = 0;
  var timer;
  const [hour, setHour] = useState("00");
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");

  const handleStartTimmer = () => {
    if (timer == undefined) {
      setTimeout(function () {
        timer = setInterval(timerRun, 1000);
      }, 200);
    }
  };
  function timerRun() {
    if (secs < 59) {
      secs++;
    } else {
      secs = 0;
      mins++;
    }

    if (mins >= 59) {
      mins = 0;
      hours++;
    }

    if (hours >= 23) {
      hours = 0;
      days++;
    }
    setHour(checkZero(hours));
    setMin(checkZero(mins));
    setSec(checkZero(secs));

    function checkZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
  }

  return (
    <div className="border-top">
      <div className="timer">
        <span className="timer--span">
          {hour}:{min}:{sec}
        </span>

        <Button
          className="timer--button"
          disabled={sec !== "00" ? true : false}
          color="primary"
          onClick={handleStartTimmer}
        >
          <img src={playButtonImg} />
        </Button>

        {/* <Button className="px-4" classes={{ root: classes.themeBlue }}>
          <div className="d-flex flex-column ">
            <span
              style={{
                fontStyle: "normal",
                fontWeight: "300",
                fontSize: "16px",
              }}
            >
              Use WorkFluxe
            </span>{" "}
            <span>for FREE!</span>
          </div>
        </Button> */}
      </div>
    </div>
  );
}
