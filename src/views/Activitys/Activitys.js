import Activity from "components/ActivityComponent/Activity";
import React from "react";

export default function Activitys() {
  return (
    <div>
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
        Activity
      </h1>
      <Activity />
    </div>
  );
}
