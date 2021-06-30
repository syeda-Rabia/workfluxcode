import StyleLessTabBar from "components/CustomTabs/StyleLessTabBar";
import React from "react";
import Payments from "components/InvoicesComponents/Payments";
import Settings from "components/InvoicesComponents/Settings";
import Invoice from "components/InvoicesComponents/Invoice";
import MonthlySubscription from "./MonthlySubscription";
import YearlySubscription from "./YearlySubscription";
export default function Subscription() {
  return (
    <div>
      <h1 className="mt-2 settingComponents--heading">Subscription</h1>
      <StyleLessTabBar
        headerColor="info"
        tabs={[
          {
            tabName: "Monthly",
            tabContent: <MonthlySubscription />,
          },
          {
            tabName: "Yearly",

            tabContent: <YearlySubscription />,
          },
        ]}
      />
    </div>
  );
}
