import StyleLessTabBar from "components/CustomTabs/StyleLessTabBar";
import Payments from "components/InvoicesComponents/Payments";
import Settings from "components/InvoicesComponents/Settings";
import Invoice from "components/InvoicesComponents/Invoice";
import React from "react";
import CreateNewInvoice from "components/InvoicesComponents/CreateNewInvoice";

export default function Invoices() {
  return (
    <div>
      <h1
        className="my-4 ml-2"
        style={{
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "31px",

          color: "#2B7AE4",
        }}
      >
        Invoices
      </h1>
      <StyleLessTabBar
        headerColor="info"
        tabs={[
          {
            tabName: "Invoices",
            tabContent: <Invoice />,
          },
          {
            tabName: "Payments",

            tabContent: <Payments />,
          },
          {
            tabName: "Settings",

            tabContent: <Settings />,
          },
          {
            tabName: "Create New Invoice",

            tabContent: <CreateNewInvoice />,
          },
        ]}
      />
    </div>
  );
}
