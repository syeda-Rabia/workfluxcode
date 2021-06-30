import React from "react";
import GridItem from "components/Grid/GridItem.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./recentProjectList.scss";
export default function RecentProjectList() {
  return (
    <GridItem xs={12} sm={12} md={6}>
      <div className="recentProjectList__content container">
        <h5 className="recentProjectList__content--title">Recent Projects</h5>
        <List>
          <ListItem
            style={{
              background: "#FAFBFD",
              padding: "20px",
              margin: "5px 0px",
              borderRadius: "7px 7px 0px 0px",
            }}
          >
            <div
              style={{
                height: "25px",

                borderLeft: "3px solid #2B7AE4",
              }}
            />
            <span>Felis sed sapien purus.</span>
          </ListItem>
          <ListItem
            style={{
              background: "#FAFBFD",
              padding: "20px",
              margin: "5px 0px",
            }}
          >
            <div
              style={{
                height: "25px",

                borderLeft: "3px solid #2B7AE4",
              }}
            />
            <span>Felis sed sapien purus.</span>
          </ListItem>
          <ListItem
            style={{
              background: "#FAFBFD",
              padding: "20px",
              margin: "5px 0px",
            }}
          >
            <div
              style={{
                height: "25px",

                borderLeft: "3px solid #2B7AE4",
              }}
            />
            <span>Felis sed sapien purus.</span>
          </ListItem>
          <ListItem
            style={{
              background: "#FAFBFD",
              padding: "20px",
              margin: "5px 0px",
            }}
          >
            <div
              style={{
                height: "25px",

                borderLeft: "3px solid #2B7AE4",
              }}
            />
            <span>Felis sed sapien purus.</span>
          </ListItem>
          <ListItem
            style={{
              background: "#FAFBFD",
              padding: "20px",
              margin: "5px 0px",
              borderRadius: "0px 0px 7px 7px ",
            }}
          >
            <span id="seeMore">
              See More <ArrowForwardIcon />
            </span>
          </ListItem>
        </List>
      </div>
    </GridItem>
  );
}
