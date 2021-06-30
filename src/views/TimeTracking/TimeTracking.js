import React from "react";
import TimeTrackings from "components/TimeTrackingComponents/TimeTracking";

export default function TimeTracking() {
  return (
    <div className="mx-1">
      <h1
        className="ml-2 my-4"
        style={{
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "31px",
          color: "#2B7AE4",
        }}
      >
        Time Tracking
      </h1>
      <TimeTrackings />
    </div>
  );
}
