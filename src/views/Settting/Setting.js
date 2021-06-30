import VerticalTabs from "components/CustomTabs/VerticalTabs";
import React from "react";
import Payments from "components/InvoicesComponents/Payments";
import Settings from "components/InvoicesComponents/Settings";
import Invoice from "components/InvoicesComponents/Invoice";
import Profile from "components/SettingComponents/Profile/Profile";
import Password from "components/SettingComponents/Password/Password";
import Subscription from "components/SettingComponents/Subscription/Subscription";
import UsersTable from "components/UsersComponents/UsersTable";
import Notifications from "components/SettingComponents/Notifications/Notifications";
import Integrations from "components/SettingComponents/Integrations/Integrations";
import ImportAndExportData from "components/SettingComponents/ImportAndExportData/ImportAndExportData";
import { connect } from "react-redux";
function Setting(props) {
  return (
    <div>
      <h1
        className="ml-2 mt-4"
        style={{
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "31px",

          color: "#2B7AE4",
        }}
      >
        Settings
      </h1>
      <div>
        <VerticalTabs
          headerColor="info"
          tabs={[
            {
              tabName: "Profile",
              tabContent: <Profile />,
            },
            props.platform === "Nodejs"
              ? {
                  tabName: "Password",

                  tabContent: <Password />,
                }
              : null,
            {
              tabName: "Subsciption",

              tabContent: <Subscription />,
            },
            {
              tabName: "Users",

              tabContent: <UsersTable />,
            },
            {
              tabName: "Notifications",

              tabContent: <Notifications />,
            },
            {
              tabName: "Integrations",

              tabContent: <Integrations />,
            },
            {
              tabName: "Import/Export Data",

              tabContent: <ImportAndExportData />,
            },
            {
              tabName: "Referral Program",

              tabContent: <Settings />,
            },
          ].filter((item) => item !== null)}
        />
      </div>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    platform: state.Login.platform,
  };
};
export default connect(mapStatetoProps)(Setting);
