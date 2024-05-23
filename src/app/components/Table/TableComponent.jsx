//Import Material React Table and its Types
import { MaterialReactTable } from "material-react-table";

//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
//App.tsx or similar
import {
  Box,
  Button,
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
import { Edit, Delete } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Example = ({
  columns,
  data,
  enableColumnFilterModes,
  enableColumnOrdering,
  enableStickyHeader,
  enableStickyFooter,
  enableGrouping,
  enableFacetedValues,
  enableColumnPinning,
  enableRowActions,
  renderRowActions,
  renderDetailPanel,
  renderToolbarAlertBannerContent,
  enableSelectAll,
  enableRowSelection,
  enableEditing,
  isLoading,
  renderRowActionMenuItems,
  positionCreatingRow,
  enableExpanding,
  columnPinning,
  enableColumnActions
}) => {
  return (
    <MaterialReactTable
      enableColumnActions={true}
      columns={columns}
      data={data ? data : []}
      enableColumnFilterModes={enableColumnFilterModes}
      enableColumnOrdering={enableColumnOrdering}
      enableStickyHeader={enableStickyHeader}
      enableStickyFooter={enableStickyFooter}
      //   enableEditing
      enableGrouping={enableGrouping}
      enableFacetedValues={enableFacetedValues}
      enableColumnPinning={enableColumnPinning}
      enableRowActions={enableRowActions}
      enableRowSelection={enableRowSelection}
      enableEditing={enableEditing}
      enableSelectAll={enableSelectAll}
      enableExpanding={enableExpanding}
      createDisplayMode={"row"}
      editDisplayMode={"row"}

      // enablePagination={false}
      renderToolbarAlertBannerContent={
        renderToolbarAlertBannerContent ? renderToolbarAlertBannerContent : null
      }
      renderRowActions={renderRowActions ? renderRowActions : null}
      muiTableBodyRowProps={({ row }) => ({
        sx: {
          cursor: "pointer" //you might want to change the cursor too when adding an onClick
        }
      })}
      // HABILITAR Y DAR ESTILOS AL LOADING DE LA TABA
      state={{ isLoading: isLoading, columnPinning: columnPinning ? columnPinning : null }}
      muiCircularProgressProps={{
        color: "secondary",
        thickness: 5,
        size: 55
      }}
      muiSkeletonProps={{
        animation: "pulse",
        height: 28
      }}
      muiTableContainerProps={{ sx: { maxHeight: "440px" } }}
      initialState={{
        showColumnFilters: true,
        showGlobalFilter: true,
        columnPinning: columnPinning
          ? {
            left: ["mrt-row-expand", "mrt-row-select"],
            right: ["mrt-row-actions"],
            expanded: true
          }
          : null
      }}
      getRowId={(row) => row.id}
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
      renderDetailPanel={renderDetailPanel ? renderDetailPanel : null}
      renderRowActionMenuItems={renderRowActionMenuItems ? renderRowActionMenuItems : null}
      positionCreatingRow={positionCreatingRow ? positionCreatingRow : null}
      onCreatingRowSave={() => { }}
    />
  );
};

const TableComponentProvider = ({
  columns,
  data,
  enableColumnActions,

  enableColumnFilterModes,
  enableColumnOrdering,
  enableStickyHeader,
  enableStickyFooter,
  enableGrouping,
  enableFacetedValues,
  enableColumnPinning,
  enableRowActions,
  renderDetailPanel,
  renderToolbarAlertBannerContent,
  enableSelectAll,
  enableRowSelection,
  isLoading,
  renderRowActionMenuItems,
  renderRowActions,
  enableEditing,
  positionCreatingRow,
  enableExpanding,
  columnPinning
}) => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, esES)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Example
          columns={columns}
          data={data}
          enableColumnFilterModes={enableColumnFilterModes}
          enableColumnOrdering={enableColumnOrdering}
          enableStickyHeader={enableStickyHeader}
          enableStickyFooter={enableStickyFooter}
          enableGrouping={enableGrouping}
          enableFacetedValues={enableFacetedValues}
          enableColumnPinning={enableColumnPinning}
          enableRowActions={enableRowActions}
          renderDetailPanel={renderDetailPanel}
          enableSelectAll={enableSelectAll}
          enableRowSelection={enableRowSelection}
          renderToolbarAlertBannerContent={renderToolbarAlertBannerContent}
          isLoading={isLoading}
          renderRowActionMenuItems={renderRowActionMenuItems}
          renderRowActions={renderRowActions}
          enableEditing={enableEditing}
          positionCreatingRow={positionCreatingRow}
          enableExpanding={enableExpanding}
          columnPinning={columnPinning}
          enableColumnActions={enableColumnActions}

        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default TableComponentProvider;
