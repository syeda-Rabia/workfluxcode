import React from "react";
import Task from "components/TaskComponents/Task";

export default function MyTasks() {
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
        My Tasks
      </h1>
      <Task />
    </div>
  );
}
