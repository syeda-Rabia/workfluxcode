import React from "react";

export default function Categories() {
  return (
    <div>
      <form className="categoryForm">
        <div className="form-group">
          <span className="label">{"ADS & MARKETING"}</span>
          <input
            placeholder="Advertising"
            type="select"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <span className="label">COGS</span>
          <input
            placeholder="Cost of Labor"
            type="text"
            className="form-control"
          />
          <input
            placeholder={"Materials & Supplies"}
            type="text"
            className="form-control"
          />
          <input placeholder="Misc COGS" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <span className="label">{"COMMISIONS & FEES"}</span>
          <input placeholder="Misc Fees" type="text" className="form-control" />
          <input
            placeholder="Payment Processing Fees"
            type="text"
            className="form-control"
          />
          <input
            placeholder={"Subscriptions & Memberships"}
            type="text"
            className="form-control"
          />
        </div>
      </form>
    </div>
  );
}
