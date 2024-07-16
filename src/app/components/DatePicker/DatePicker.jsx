import React from "react";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { esES } from "@mui/x-date-pickers/locales";
import moment from "moment";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "dayjs/locale/es";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
// import utc from 'dayjs/plugin/utc' // ES 2015
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
const tz = "America/Bogota";

dayjs.extend(utc);
dayjs.extend(timezone);

const DatePickerMi = ({
  title,
  inpuVarian,
  formaDate,
  value,
  handleChangeDatePicker,
  datePickerW100,
  id
}) => {
  // Hooks
  const [dateSearch, setDateSearch] = useState(null);

  useEffect(() => {
    setDateSearch(value);
  }, [value]);

  const theme = createTheme(
    // {
    //   palette: {
    //     primary: { main: "#1976d2" }
    //   }
    // },
    esES // x-date-pickers translations
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          className="dateTimePicker"
          dateAdapter={AdapterDayjs}
          adapterLocale="es"
        >
          <DatePicker
            disablePast={false}
            format="YYYY-MM-DD"
            // minDate={"1987-01-12"}
            onChange={(val) => {
              if (handleChangeDatePicker) {
                // handleChangeDatePicker(moment(val).format('YYYY-MM-DD"'));
                let newValue = dayjs(val).tz("America/Bogota");
                // console.log("holaa", dayjs().tz(tz), "-----", val);
                handleChangeDatePicker(newValue);
              }
            }}
            value={dayjs(dateSearch)}
            className="dateTimePicker"
            inputVariant="outlined"
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default DatePickerMi;
