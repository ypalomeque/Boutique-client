import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { fakeData, formatPrice, typeCategory, usStates } from "app/utils/utils";
import React, { useMemo } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { createRow } from "material-react-table";
import TableComponentProvider from "app/components/Table/TableComponent";
import { GetCategories, SaveCategory } from "app/hooks/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expressionValidOnlyLetters, expressionValidOnlyNumbers } from "app/utils/constant";
import { NotificationAlert } from "app/components/NotificationAlert/Notification";

const CategoryServices = () => {
  const queryClient = useQueryClient();
  const [creatingRowIndex, setCreatingRowIndex] = useState();
  const [validationErrors, setValidationErrors] = useState({});

  const { data, isLoading: isLoadingCategories } = GetCategories();
  const dataCategories = data
    ?.filter((x) => x.type === 2)
    ?.map((el) => {
      if (el.type === 2) el.type = "Servicio";
      return {
        ...el
      };
    });

  const mutationSaveCategory = useMutation({
    mutationFn: SaveCategory,
    onError: (error, variables, context) => {
      let { message } = error.response.data;
      // console.log("Mostrando error", variables);
      // console.log("Mostrando error", context);
      NotificationAlert("error", "Registro Categoría", `${message}`);
    },
    onSuccess: (resp) => {
      NotificationAlert("success", "Registro Categoría", "Registro realizado con éxito.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "id",
      //   header: "Id",
      //   enableEditing: false,
      //   size: 80
      // },
      {
        accessorKey: "name",
        header: "Categória",
        size: 100,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined
            })
          //optionally add validation checking for onBlur or onChange
        }
      },
      {
        accessorKey: "amount",
        header: "Valor",
        muiEditTextFieldProps: {
          required: true,
          type: "text",
          error: !!validationErrors?.amount,
          helperText: validationErrors?.amount,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              amount: undefined
            })
        },
        Cell: ({ cell }) => (
          // <Box
          //   component="span"
          //   sx={(theme) => ({
          //     backgroundColor:
          //       cell.getValue() < 50_000
          //         ? theme.palette.error.dark
          //         : cell.getValue() >= 50_000 && cell.getValue() < 75_000
          //         ? theme.palette.warning.dark
          //         : theme.palette.success.dark,
          //     borderRadius: "0.25rem",
          //     color: "#fff",
          //     maxWidth: "9ch",
          //     p: "0.25rem"
          //   })}
          // >
          //   {cell.getValue()?.toLocaleString?.("en-US", {
          //     style: "currency",
          //     currency: "USD",
          //     minimumFractionDigits: 0,
          //     maximumFractionDigits: 0
          //   })}
          // </Box>
          <Box>
            {cell.getValue()?.toLocaleString?.("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </Box>
        )
      },
      {
        accessorKey: "type",
        header: "Tipo categória",
        editVariant: "select",
        editSelectOptions: typeCategory,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              type: undefined
            })
        }
      }
    ],
    [validationErrors]
  );

  const validateRequired = (value) => !!value?.length;
  const validateOnlyletters = (value) => expressionValidOnlyLetters.test(value);

  const validateOnlNumbers = (value) => expressionValidOnlyNumbers.test(value);

  function validateCategory(category) {
    // console.log("Datos ", category);
    return {
      name: !validateRequired(category.name)
        ? "La categoria es requerida"
        : !validateOnlyletters(category.name)
        ? "No se admiten número o carácteres espaeciales"
        : "",
      amount: !validateRequired(category.amount)
        ? "el valor Requiredo"
        : !validateOnlNumbers(category.amount)
        ? "Solo se admiten números"
        : "",
      type: !validateRequired(category.type) ? "El tipo es requerido" : ""
    };
  }

  const handleCreateCategory = async ({ values, row, table }) => {
    const newValidationErrors = validateCategory(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    if (values.type === "Servicio") values.type = 2;
    let data = {
      category: {
        name: values.name,
        amount: values.amount,
        type: values.type
      }
    };
    // await createUser({ ...values, managerId: row.original.managerId });
    mutationSaveCategory.mutate({ data });
    if (!mutationSaveCategory.error) {
      table.setCreatingRow(null); //exit creating mode
    }
  };

  const renderRowActions = ({ row, staticRowIndex, table }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      }}
      style={{ marginLeft: "-40%" }}
    >
      <Tooltip title="Editar">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {/* <Tooltip title="Delete">
        <IconButton color="error" onClick={() => () => {}}>
          <DeleteIcon />
        </IconButton>
      </Tooltip> */}
      <Tooltip title="Add Subordinate">
        <IconButton
          onClick={() => {
            setCreatingRowIndex((staticRowIndex || 0) + 1);
            table.setCreatingRow(
              createRow(
                table,
                {
                  id: null,
                  firstName: "",
                  lastName: "",
                  city: "",
                  state: "",
                  managerId: row.id,
                  subRows: []
                },
                -1,
                row.depth + 1
              )
            );
          }}
        >
          <PersonAddAltIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const rowCancel = () => {
    return false;
    setValidationErrors({});
  };

  const rowCanceSavel = () => {
    return false;
    setValidationErrors({});
  };

  const handleUpdateCategory = () => {
    console.log("Holaaa");
  };

  return (
    <Grid style={{ margin: "10px" }} marginTop={10}>
      <TableComponentProvider
        columns={columns}
        data={dataCategories}
        isLoading={isLoadingCategories ? true : false}
        enableRowSelection={true}
        renderRowActions={renderRowActions}
        onCreatingRowSave={handleCreateCategory}
        onCreatingRowCancel={() => rowCanceSavel()}
        onEditingRowSave={handleUpdateCategory}
        onEditingRowCancel={() => rowCancel()}
        enableEditing={true}
        positionCreatingRow={creatingRowIndex}
        enableExpanding={false}
        columnPinning={{ left: ["mrt-row-select", "mrt-row-actions"], right: [] }}
      />
    </Grid>
  );
};

export default CategoryServices;
