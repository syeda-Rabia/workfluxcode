import ClientTable from "components/ClientComponents/ClientTable";
import ClientManagementTable from "components/SuperAdminComponents/ClientManagement/ClientManagementTable";
import React from "react";

export default function ClientManagement() {
  return (
    <div>
      <h1
        className="my-4"
        style={{
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "31px",

          color: "#2B7AE4",
        }}
      >
        Client Management
      </h1>
      {/* Todo  change this table because this is freelancer component */}
      {/* <ClientTable /> */}
      <ClientManagementTable />
    </div>
  );
}
