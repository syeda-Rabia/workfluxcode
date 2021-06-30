import React from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

export default function HeaderCard(props) {
  const { title, value, col } = props;

  return (
    <>
      {/* <GridItem xs={10} sm={10} md={col !== undefined ? col : 2}> */}
      <div className="mx-2" style={{ width: "199px", height: "143px" }}>
        <Card
          style={{
            boxShadow: "0px 10px 25px rgba(43, 122, 228, 0.05)",
            borderRadius: "20px",
          }}
        >
          <CardBody>
            <h4
              style={{
                fontFamily: "Mulish",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "18px",
                // lineHeight: "19px",
                textTransform: "uppercase",
                color: "#616161",
                // textAlign: "center",
                // marginRight: "3rem",

                // float: "left",
                // whiteSpace: "nowrap",
                // transform: "translate(-30%, 0%)",
              }}
            >
              {title}
            </h4>
            <div className="d-flex flex-row">
              <div
                style={{
                  height: "45px",
                  paddingRight: "15px",

                  borderLeft:
                    props.verticalLineColor !== undefined
                      ? `5px solid ${props.verticalLineColor}`
                      : "5px solid #C8DDF8",
                }}
              ></div>
              <h1
                style={{
                  fontFamily: "Mulish",
                  fontStyle: "normal",
                  fontWeight: "800",
                  fontSize: "40px",

                  color: props.color !== undefined ? "484848" : "#2B7AE4",
                }}
              >
                {value}
              </h1>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
