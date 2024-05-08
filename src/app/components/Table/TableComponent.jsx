//Import Material React Table and its Types
import { MaterialReactTable } from "material-react-table";

//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
//App.tsx or similar
import {
  Box,
  createTheme,
  ListItemIcon,
  MenuItem,
  ThemeProvider,
  Typography,
  useTheme
} from "@mui/material";
import { esES } from "@mui/material/locale";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AccountCircle, Send } from "@mui/icons-material";

const Example = ({ columns, data }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      //   enableEditing
      enableGrouping={true}
      enableFacetedValues={true}
      enableColumnPinning={false}
      enableRowActions={true}
      enableRowSelection={true}
      enableSelectAll={false}
      initialState={{
        showColumnFilters: true,
        showGlobalFilter: true,
        columnPinning: {
          left: ["mrt-row-expand", "mrt-row-select"],
          right: ["mrt-row-actions"]
        }
      }}
      localization={MRT_Localization_ES}
      paginationDisplayMode={"pages"}
      //   positionToolbarAlertBanner={"bottom"}
      muiSearchTextFieldProps={{ size: "small", variant: "outlined" }}
      muiPaginationProps={{
        color: "secondary",
        rowsPerPageOptions: [10, 20, 30],
        shape: "rounded",
        variant: "outlined"
      }}
      renderDetailPanel={({ row }) => {
        return (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-around",
              left: "30px",
              maxWidth: "1000px",
              position: "sticky",
              width: "100%"
            }}
          >
            <img
              alt="avatar"
              height={200}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">Signature Catch Phrase:</Typography>
              <Typography variant="h1">&quot;{row.original.signatureCatchPhrase}&quot;</Typography>
            </Box>
          </Box>
        );
      }}
      renderRowActionMenuItems={({ closeMenu, row }) => [
        <MenuItem
          key={0}
          onClick={() => {
            console.log("Programando con el Maestro Exel", row.original);
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Profile
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => {
            // Send email logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          Send Email
        </MenuItem>
      ]}
    />
  );
};

const TableComponentProvider = ({ columns, data }) => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Example columns={columns} data={data} />
    </LocalizationProvider>
  );
};

export default TableComponentProvider;
