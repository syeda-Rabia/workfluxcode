import GridContainer from "components/Grid/GridContainer";
import React from "react";
import SubscriptionCard from "./SubscriptionCard";

export default function YearlySubscription() {
  return (
    <div>
      <div className="px-3">
        <GridContainer>
          <SubscriptionCard />
          <SubscriptionCard />
          <SubscriptionCard />
        </GridContainer>
      </div>
    </div>
  );
}
