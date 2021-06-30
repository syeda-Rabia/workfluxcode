import ClientTable from "components/ClientComponents/ClientTable";
import React, { useState } from "react";

export default function Clients() {
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
        Clients
      </h1>
      <ClientTable />
    </div>
  );
}
