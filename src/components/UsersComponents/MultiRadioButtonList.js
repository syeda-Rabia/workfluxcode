import { Radio, RadioGroup } from "@material-ui/core";
import React from "react";

export default function MultiRadioButtonList(props) {
  const { data } = props;
  const [value, setValue] = React.useState("client");

  const handleRoleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className="inviteNewPeople__content--checkBox py-3 mt-3 row"
        >
          <div className="d-flex">
            <RadioGroup
              value={value}
              onChange={(e) => {
                handleRoleChange(e);
                props.onChange(e);
              }}
            >
              <Radio value={item.heading} style={{ color: "#2B7AE4" }} />
            </RadioGroup>

            <div>
              <h3 className="checkbox-heading text-capitalize">
                {item.heading} <span>{item.price}</span>
              </h3>
              {item.text !== undefined ? (
                <span className="checkbox-text">{item.text}</span>
              ) : null}
              {item.subHeading !== undefined ? (
                <h3 className="checkbox-subHeading">{item.subHeading}</h3>
              ) : null}
              {item.option !== undefined ? (
                <>
                  <ul className="m-0 p-0 ml-3 checkbox-list">
                    {item.option.map((val, index) => (
                      <li key={index} className="listItem">
                        {val.text}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
