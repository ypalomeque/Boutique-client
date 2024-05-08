import React from "react";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent } from "app/components/Button/ButtonComponent";
import { Box, Grid } from "@mui/material";
import TableComponentProvider from "../../../components/Table/TableComponent";
import { data1 } from "../../../utils/utils";

const columns = [
  {
    accessorKey: "name.firstName", //access nested data with dot notation
    header: "First Name",
    size: 150
  },
  {
    accessorKey: "name.lastName",
    header: "Last Name",
    size: 150
  },
  {
    accessorKey: "address", //normal accessorKey
    header: "Address",
    size: 200
  },
  {
    accessorKey: "city",
    header: "City",
    size: 150
  },
  {
    accessorKey: "state",
    header: "State",
    size: 150
  }
];

const columns2 = [
  {
    id: "employee", //id used to define `group` column
    header: "Employee",
    columns: [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
        id: "name", //id is still required when using accessorFn instead of accessorKey
        header: "Name",
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        )
      },
      {
        accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Email",
        size: 300
      }
    ]
  },
  {
    id: "id",
    header: "Job Info",
    columns: [
      {
        accessorKey: "salary",
        // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
        filterFn: "between",
        header: "Salary",
        size: 200,
        //custom conditional format and styling
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() < 50_000
                  ? theme.palette.error.dark
                  : cell.getValue() >= 50_000 && cell.getValue() < 75_000
                  ? theme.palette.warning.dark
                  : theme.palette.success.dark,
              borderRadius: "0.25rem",
              color: "#fff",
              maxWidth: "9ch",
              p: "0.25rem"
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </Box>
        )
      },
      {
        accessorKey: "jobTitle", //hey a simple column for once
        header: "Job Title",
        size: 350
      },
      {
        accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
        id: "startDate",
        header: "Start Date",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
        Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
        muiFilterTextFieldProps: {
          sx: {
            minWidth: "250px"
          }
        }
      }
    ]
  }
];
const Product = () => {
  return (
    <Grid style={{ margin: "10px", marginTop: "-23px" }}>
      <ButtonComponent
        classButton="button-ppal"
        title="Producto"
        icon={<FontAwesomeIcon style={{ marginRight: "7px" }} icon={faCirclePlus} />}
      />
      <Grid marginTop={1}>
        <TableComponentProvider columns={columns2} data={data1} />
      </Grid>
    </Grid>
  );
};

export default memo(Product);
