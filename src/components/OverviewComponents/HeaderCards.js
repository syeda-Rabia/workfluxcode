import React from "react";
import GridContainer from "components/Grid/GridContainer.js";

import HeaderCard from "./HeaderCard";
export default function HeaderCards() {
  return (
    <div className="px-3">
      <GridContainer>
        <HeaderCard title="Task" value="120" />
        <HeaderCard title="Project" value="10" />
        <HeaderCard title="Clients" value="5" />
      </GridContainer>
    </div>
  );
}
