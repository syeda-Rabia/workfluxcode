import GridContainer from "components/Grid/GridContainer";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddField from "./AddField";
import TemplateForm from "./TemplateForm";

export default function Template() {
  return (
    <div>
      <GridContainer className="template">
        <Col sm={12} md={7} lg={7} className="template--form">
          <TemplateForm />
        </Col>
        <Col className="addField" sm={12} md={4} lg={4}>
          <AddField />
        </Col>
      </GridContainer>
    </div>
  );
}
