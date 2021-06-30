import CustomDropdownButton from "components/DropdownButton/CustomDropdownButton";
import GridContainer from "components/Grid/GridContainer";
import React from "react";
import ChartistGraph from "react-chartist";
import FinancialHeaderCard from "components/FinancialComponents/FinancialHeaderCard";
import { financialScreenChart } from "variables/charts.js";
import "./financials.scss";
import FinancialDetailsTable from "components/FinancialComponents/FinancialDetailsTable";
import { Col } from "react-bootstrap";
import ExpenseTable from "components/FinancialComponents/ExpenseTable";
import IncomeTable from "components/FinancialComponents/IncomeTable";
export default function Financials() {
  return (
    <div className="financials__content mx-2">
      {/* <StyleLessTabBar/> */}
      <h3 className="financials__content--heading">Financials</h3>
      <CustomDropdownButton />
      <h3 className="financials__content--subHeading">Financial Overview</h3>
      <GridContainer>
        <FinancialHeaderCard
          title="Income"
          value="$2.000"
          verticalLineColor="#2B7AE4"
        />
        <FinancialHeaderCard
          title="Expenses"
          value="$500"
          verticalLineColor="#8F8F8F"
        />
        <FinancialHeaderCard
          title="Profit"
          value="$1.500"
          verticalLineColor="#174788"
        />
        <FinancialHeaderCard
          title="Profit Margin"
          value="30%"
          verticalLineColor="#C8DDF8"
        />
      </GridContainer>
      <GridContainer>
        <Col className="p-0 px-2" xs={12} sm={12} md={12}>
          <div
            id="financialScreenChart"
            style={{
              backgroundColor: "#FAFBFD",
              borderRadius: "7px",
            }}
          >
            <ChartistGraph
              style={{
                height: "270px",
              }}
              className="ct-chart"
              data={financialScreenChart.data}
              type="Bar"
              options={financialScreenChart.options}
              responsiveOptions={financialScreenChart.responsiveOptions}
              listener={financialScreenChart.animation}
            />
            <div className="chartHelper">
              <div className="chartHelper--color"></div>
              <span className="chartHelper--text">Income</span>
              <div className="chartHelper--color"></div>
              <span className="chartHelper--text">Expenses</span>
              <div className="chartHelper--color"></div>
              <span className="chartHelper--text">Profit</span>
            </div>
          </div>
        </Col>
      </GridContainer>
      <GridContainer>
        <Col className="p-0 px-2" xs={12} sm={12} md={12}>
          <FinancialDetailsTable />
        </Col>
      </GridContainer>
      <GridContainer>
        <Col xm={12} sm={12} md={6} lg={6}>
          <h6 className="subHeading">Expenses</h6>
          <ExpenseTable />
        </Col>
        <Col xm={12} sm={12} md={6} lg={6}>
          <h6 className="subHeading">Income</h6>
          <IncomeTable />
        </Col>
      </GridContainer>
    </div>
  );
}
