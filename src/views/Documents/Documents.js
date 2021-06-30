import React from "react";
import StyleLessTabBar from "components/CustomTabs/StyleLessTabBar";

import Document from "components/ProjectComponents/Document";
import DocumentTemplatesTable from "components/DocumentComponents/DocumentTemplatesTable";
import EmailTemplatesTable from "components/DocumentComponents/EmailTemplatesTable";

export default function Documents() {
  return (
    <div className="documents">
      <h1
        style={{
          margin: "30px 15px",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "31px",
          color: "#2B7AE4",
        }}
      >
        Documents
      </h1>{" "}
      <StyleLessTabBar
        tabs={[
          {
            tabName: "Documents",
            tabContent: <Document />,
          },
          {
            tabName: "Document Templates",

            tabContent: <DocumentTemplatesTable />,
          },
          {
            tabName: "Email templates",

            tabContent: <EmailTemplatesTable />,
          },
        ]}
      />
    </div>
  );
}
