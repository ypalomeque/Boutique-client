import React from "react";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { esES } from "@mui/x-date-pickers/locales";
import moment from "moment";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "dayjs/locale/es";
const DatepickerMui = ({
  title,
  inpuVarian,
  formaDate,
  value,
  handleChangeDataPicker,
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
          adapterLocale="es"
          className="dateTimePicker"
          dateAdapter={AdapterDayjs}
        >
          <DateTimePicker
            onChange={(val) => {
              console.log("___", val);
              if (handleChangeDataPicker) {
                handleChangeDataPicker(moment(val).format("YYYY/MM/DD"));
              }
            }}
            className="dateTimePicker"
            inputVariant="outlined"
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default DatepickerMui;
