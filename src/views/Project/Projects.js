import React from "react";

import ProjectsTable from "components/ProjectComponents/ProjectsTable";
import { Container } from "react-bootstrap";

export default function Projects(props) {
  return (
    <Container className="p-0 px-1">
      <h1
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "31px",
          color: "#2B7AE4",
        }}
      >
        Projects
      </h1>
      <ProjectsTable {...props} />
    </Container>
  );
}
