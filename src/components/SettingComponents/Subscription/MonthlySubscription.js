import GridContainer from "components/Grid/GridContainer";
import React from "react";
import SubscriptionCard from "./SubscriptionCard";

export default function MonthlySubscription() {
  return (
    <div className="px-3">
      <GridContainer>
        <SubscriptionCard />
        <SubscriptionCard />
        <SubscriptionCard />
      </GridContainer>
    </div>
  );
}
