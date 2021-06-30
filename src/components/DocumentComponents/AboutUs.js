import React from "react";
import { Row, Col } from "react-bootstrap";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { Button, IconButton } from "@material-ui/core";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import GridContainer from "components/Grid/GridContainer";

export default function AboutUs() {
  return (
    <div className="mt-5 aboutus">
      <Row>
        <Col sm={12} md={3} lg={3}>
          <div className="aboutus--addImg">
            <span className="text">Add Image</span>
          </div>
          <Button
            className="my-2"
            color="primary"
            startIcon={<CreateOutlinedIcon />}
          >
            Edit
          </Button>
        </Col>
        <Col sm={12} md={9} lg={9}>
          <p style={{ textAlign: "justify" }}>
            Ac dictumst eu varius enim sit at aliquam nisi porta. Egestas mattis
            risus viverra morbi platea duis. Aliquam cras curabitur arcu
            blandit. Elementum ac fermentum molestie massa.
          </p>
        </Col>
      </Row>
      <GridContainer>
        <IconButton>
          <LanguageOutlinedIcon />
        </IconButton>
        <IconButton>
          <EmailOutlinedIcon />
        </IconButton>
        <IconButton>
          <CallOutlinedIcon />
        </IconButton>
        <IconButton>
          <i className="fab fa-skype"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-whatsapp"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-linkedin"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-facebook-f"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-youtube-square"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-twitter"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-instagram"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-snapchat-ghost"></i>
        </IconButton>
      </GridContainer>
    </div>
  );
}
