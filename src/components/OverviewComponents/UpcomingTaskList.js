import React from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./upcomingTaskList.scss";
export default function UpcomingTaskList() {
  return (
    <GridItem xs={12} sm={12} md={6}>
      <div className="upcomingList__content container">
        <h5 className="upcomingListHeader"> Upcoming Tasks</h5>

        <List>
          <ListItem>
            <Card list>
              <CardBody>
                <p>
                  A varius quam aenean viverra. Elementum tincidunt quis
                  consequat cursus id. Platea senectus neque.
                </p>
                <span>
                  Send a Reminder
                  <ArrowForwardIcon />
                </span>
              </CardBody>
            </Card>
          </ListItem>
          <ListItem>
            <Card list>
              <CardBody>
                <p>
                  A varius quam aenean viverra. Elementum tincidunt quis
                  consequat cursus id. Platea senectus neque.
                </p>
                <span>
                  Update Purposal
                  <ArrowForwardIcon />
                </span>
              </CardBody>
            </Card>
          </ListItem>
          <ListItem>
            <Card list>
              <CardBody>
                <p>
                  A varius quam aenean viverra. Elementum tincidunt quis
                  consequat cursus id. Platea senectus neque.
                </p>
                <span>
                  Update Purposal <ArrowForwardIcon />
                </span>
              </CardBody>
            </Card>
          </ListItem>
        </List>
      </div>
    </GridItem>
  );
}
