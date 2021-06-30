import StyleLessTabBar from "components/CustomTabs/StyleLessTabBar";
import React from "react";
import RevenueAndExpenses from "components/TransactionComponents/RevenueAndExpenses";
import Categories from "components/TransactionComponents/Categories";
import ConnectAccounts from "components/TransactionComponents/ConnectAccounts";
import "./transactions.scss";
export default function Transactions() {
  return (
    <div className="transactions__content">
      <h1 className="transactions__content--heading">Transactions</h1>
      <StyleLessTabBar
        tabs={[
          {
            tabName: "Revenue & Expenses",
            tabContent: <RevenueAndExpenses />,
          },
          {
            tabName: "Categories",

            tabContent: <Categories />,
          },
          {
            tabName: "Connect Accounts",

            tabContent: <ConnectAccounts />,
          },
        ]}
      />
    </div>
  );
}
