import GridContainer from "components/Grid/GridContainer";
import React from "react";

export default function AddField() {
  return (
    <div>
      <h1 className="addField--heading">Add Field</h1>
      <GridContainer>
        <div className="addField--box">
          <span className="text">Short Text</span>
        </div>
        <div className="addField--box">
          <span className="text">Single Choice</span>
        </div>
        <div className="addField--box">
          <span className="text">Long Text</span>
        </div>
        <div className="addField--box">
          <span className="text">Multiple Choice</span>
        </div>
        <div className="addField--box">
          <span className="text">Image</span>
        </div>
        <div className="addField--box">
          <span className="text">Date Select</span>
        </div>
        <div className="addField--box">
          <span className="text">Upload File</span>
        </div>
      </GridContainer>
    </div>
  );
}
