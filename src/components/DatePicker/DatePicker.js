import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function MuiDatePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          clearable
          className="w-100"
          disableToolbar
          autoOk
          variant="inline"
          format="dd/MM/yyyy"
          value={selectedDate}
          inputVariant="outlined"
          onChange={(date) => {
            handleDateChange(date);
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}
