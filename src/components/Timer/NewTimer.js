import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import playButtonImg from "assets/img/startTimer.svg";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";

import "./timer.scss";
import Timer from "react-compound-timer";

const useStyles = makeStyles(styles);

export default function NewTimer(props) {
  return (
    <div className="border-top">
      <div className="timer">
        <Timer
          startImmediately={false}
          formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
        >
          {({ start, resume, pause, stop, reset, timerState }) => (
            <React.Fragment>
              <span className="timer--span">
                <Timer.Hours />:
                <Timer.Minutes />:
                <Timer.Seconds />
              </span>

              <div>
                <Button
                  className="timer--button"
                  color="primary"
                  onClick={start}
                >
                  <img src={playButtonImg} />
                </Button>
                {/* <button onClick={pause}>Pause</button> */}
                {/* <button onClick={resume}>Resume</button>
                <button onClick={stop}>Stop</button>
                <button onClick={reset}>Reset</button> */}
              </div>
            </React.Fragment>
          )}
        </Timer>

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
