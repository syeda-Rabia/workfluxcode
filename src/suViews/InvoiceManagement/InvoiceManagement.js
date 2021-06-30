import React from "react";
import Invoice from "components/InvoicesComponents/Invoice";

export default function InvoiceManagement() {
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
        Invoice Management
      </h1>
      <Invoice />
    </div>
  );
}
