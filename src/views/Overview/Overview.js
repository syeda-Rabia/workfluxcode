import UpcomingTaskList from "components/OverviewComponents/UpcomingTaskList";
import React from "react";
import BigCalender from "components/OverviewComponents/BigCalender";
import OverviewCalender from "components/OverviewComponents/OverviewCalender";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import RecentProjectList from "components/OverviewComponents/RecentProjectList";
import RecentActivity from "components/OverviewComponents/RecentActivity";
import HeaderCards from "components/OverviewComponents/HeaderCards";
import HeaderCard from "components/OverviewComponents/HeaderCard";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import genericStyles from "assets/jss/material-dashboard-react/views/genericStyles";
import CustomList from "components/List/List";
import "./overView.scss";
import { Button, Card, makeStyles } from "@material-ui/core";
import ChartistGraph from "react-chartist";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  overviewScreenChart,
} from "variables/charts.js";
import CardBody from "components/Card/CardBody";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import EjectOutlinedIcon from "@material-ui/icons/EjectOutlined";
const useStyles = makeStyles(genericStyles);

export default function Overview() {
  const classes = useStyles();
  const recentTransactions = [
    {
      icon: CompareArrowsIcon,
      primaryText: (
        <p>
          <b>#2768913</b>&nbsp;id nibh quis. &nbsp;
          <u style={{ color: "#2B7AE4" }}>Sit fermentum</u>, feugiat lorem odio
          eget id facilisis tincidunt.
          <b style={{ color: "#09db05" }}>&nbsp;Approved</b>
        </p>
      ),
    },
    {
      icon: CompareArrowsIcon,
      primaryText: (
        <p>
          <b>#2768913</b>&nbsp;id nibh quis. &nbsp;
          <u style={{ color: "#2B7AE4" }}>Sit fermentum</u>, feugiat lorem odio
          eget id facilisis tincidunt.
          <b style={{ color: "#da0202" }}>&nbsp;Failed</b>
        </p>
      ),
    },
    {
      icon: CompareArrowsIcon,
      primaryText: (
        <p>
          <b>#2768913</b>&nbsp;id nibh quis. &nbsp;
          <u style={{ color: "#2B7AE4" }}>Sit fermentum</u>, feugiat lorem odio
          eget id facilisis tincidunt.
          <b style={{ color: "#db8708" }}>&nbsp;Pending</b>
        </p>
      ),
    },
  ];
  const recentInvoices = [
    {
      icon: EjectOutlinedIcon,
      primaryText: (
        <p>
          Invoice<b> #2768913</b> id nibh quis.{" "}
          <u style={{ color: "#2B7AE4" }}> Sit fermentum</u>, feugiat lorem odio
          eget id facilisis tincidunt.
        </p>
      ),
    },
    {
      icon: EjectOutlinedIcon,
      primaryText: (
        <p>
          Invoice<b> #2768913</b> id nibh quis.{" "}
          <u style={{ color: "#2B7AE4" }}> Sit fermentum</u>, feugiat lorem odio
          eget id facilisis tincidunt.
        </p>
      ),
    },
    {
      icon: EjectOutlinedIcon,
      primaryText: (
        <p>
          Invoice<b> #2768913</b> id nibh quis.{" "}
          <u style={{ color: "#2B7AE4" }}> Sit fermentum</u>, feugiat lorem odio
          eget id facilisis tincidunt.
        </p>
      ),
    },
  ];
  const recentDocuments = [
    {
      icon: PictureAsPdfOutlinedIcon,
      primaryText:
        "Lacus id nibh id nibh quis. Sit fermentum, feugiat lorem odio eget id facilisis tincidunt.",
    },
    {
      icon: PictureAsPdfOutlinedIcon,
      primaryText:
        "Lacus id nibh id nibh quis. Sit fermentum, feugiat lorem odio eget id facilisis tincidunt.",
    },
    {
      icon: PictureAsPdfOutlinedIcon,
      primaryText:
        "Lacus id nibh id nibh quis. Sit fermentum, feugiat lorem odio eget id facilisis tincidunt.",
    },
    {
      icon: PictureAsPdfOutlinedIcon,
      primaryText:
        "Lacus id nibh id nibh quis. Sit fermentum, feugiat lorem odio eget id facilisis tincidunt.",
    },
  ];
  return (
    <div className="overview--Content">
      <HeaderCards />
      <p
        style={{
          marginLeft: "20px",

          fontSize: "14px",
        }}
      >
        Due this week :25
      </p>

      <GridContainer>
        <UpcomingTaskList />
        <RecentProjectList />
      </GridContainer>
      <GridContainer>
        <GridItem id="containerTitle" xs={12} sm={12} md={7}>
          {/* <BigCalender /> */}
          <h1>Calender</h1>
          <OverviewCalender />
        </GridItem>
        <GridItem id="containerTitle" xs={12} sm={12} md={5}>
          <h1>Recent Activities</h1>

          <RecentActivity />
        </GridItem>
      </GridContainer>
      <h3 className=" mt-3">Financial Overview</h3>
      <GridContainer>
        <HeaderCard
          col={3}
          color="grey"
          verticalLineColor="#2B7AE4"
          title="Income"
          value="$2,000"
        />
        <HeaderCard
          col={3}
          color="grey"
          verticalLineColor="#2B7AE4"
          title="Expenses"
          value="$500"
        />
        <HeaderCard
          col={3}
          color="grey"
          verticalLineColor="#2B7AE4"
          title="Profit"
          value="$1500"
        />
        <HeaderCard
          col={3}
          color="grey"
          verticalLineColor="#2B7AE4"
          title="Profit Margin"
          value="30%"
        />
      </GridContainer>
      <div className="my-2">
        <Button
          className="mr-3"
          endIcon={<ExpandMoreOutlinedIcon />}
          classes={{
            label: classes.labelColor,
          }}
          variant="outlined"
        >
          Last 6 Months
        </Button>
        <Button
          endIcon={<ExpandMoreOutlinedIcon />}
          classes={{
            label: classes.labelColor,
          }}
          variant="outlined"
        >
          USD
        </Button>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <div
                id="overviewScreenChart"
                style={{
                  backgroundColor: "#FAFBFD",
                  borderRadius: "10px",
                }}
              >
                <ChartistGraph
                  className="ct-chart"
                  data={overviewScreenChart.data}
                  type="Bar"
                  options={overviewScreenChart.options}
                  responsiveOptions={overviewScreenChart.responsiveOptions}
                  listener={overviewScreenChart.animation}
                />
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6} lg={6}>
          <h3 className="">Time Tracking</h3>
          <Button
            className="my-3"
            endIcon={<ExpandMoreOutlinedIcon />}
            classes={{
              label: classes.labelColor,
            }}
            variant="outlined"
          >
            Last 6 Months
          </Button>
          <Card>
            <CardBody>
              <div
                id="overviewScreenChart"
                style={{
                  backgroundColor: "#FAFBFD",
                  borderRadius: "10px",
                }}
              >
                <ChartistGraph
                  style={{
                    height: "270px",
                  }}
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem id="containerTitle" xs={12} sm={12} md={6} lg={6}>
          <h1>Recent Documents</h1>
          <CustomList data={recentDocuments} />
        </GridItem>
      </GridContainer>
      {/* <br />
      <br />
      <br />
      <br /> */}
      <GridContainer>
        <GridItem id="containerTitle" xs={12} sm={12} md={6} lg={6}>
          <h1>Recent Invoices</h1>

          <CustomList data={recentInvoices} />
        </GridItem>
        <GridItem id="containerTitle" xs={12} sm={12} md={6} lg={6}>
          <h1>Recent Transactions</h1>

          <CustomList data={recentTransactions} />
        </GridItem>
      </GridContainer>
    </div>
  );
}
