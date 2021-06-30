import React from "react";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import GridContainer from "components/Grid/GridContainer";
export default function ImportAndExportData() {
  const [fileName, setFileName] = React.useState(null);
  return (
    <div>
      <h1 className="mt-2 settingComponents--heading">Subscription</h1>
      <GridContainer>
        <div className="importExportFile">
          <input
            type="file"
            name="file"
            id="file"
            className="importExportFile--button"
            onChange={(evt) => {
              setFileName(evt.target.files[0].name);
            }}
          />
          {fileName === null ? (
            <label htmlFor="file">
              <LabelOutlinedIcon style={{ marginRight: "10px" }} />
              Import Data
            </label>
          ) : (
            <label htmlFor="file">{fileName}</label>
          )}
        </div>
        <div className="importExportFile" style={{ background: "#F9F9F9" }}>
          <label>
            <LabelOutlinedIcon
              style={{ marginRight: "10px", transform: "scaleX(-1)" }}
            />
            Export Data
          </label>
        </div>
      </GridContainer>
    </div>
  );
}
