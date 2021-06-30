import GridContainer from "components/Grid/GridContainer";
import React from "react";
import zapier from "assets/img/zapier.svg";
import slack from "assets/img/slack.svg";
import calendar from "assets/img/calendar.svg";
import { Avatar, Button } from "@material-ui/core";

export default function Integrations() {
  return (
    <div>
      <h1 className="mt-2 settingComponents--heading">Integrations</h1>
      <div className="settingComponents--imgs">
        <Button>
          <img className="mx-3" src={zapier} alt="zapier" />
        </Button>
        <Button>
          <img className="mx-3" src={slack} alt="slack" />
        </Button>
        <Button>
          <img className="mx-3" src={calendar} alt="calendar" />
        </Button>
      </div>
    </div>
  );
}
