import React from "react";

export default function FinancialHeaderCard(props) {
  const { title, value } = props;
  return (
    <div className="m-2">
      <div className="finanicalHeader--card">
        <h4 className="card--heading">{title}</h4>
        <div className="d-flex flex-row">
          <div
            style={{
              marginTop: "10px",
              height: "23px",
              paddingRight: "15px",
              borderLeft:
                props.verticalLineColor !== undefined
                  ? `5px solid ${props.verticalLineColor}`
                  : "5px solid #C8DDF8",
            }}
          ></div>
          <h1 className="card--price">{value}</h1>
        </div>
      </div>
    </div>
  );
}
