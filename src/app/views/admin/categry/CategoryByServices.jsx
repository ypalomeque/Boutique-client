import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { dataC, typeCategory } from "app/utils/utils";
import React, { useMemo } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createRow } from "material-react-table";
import TableComponentProvider from "app/components/Table/TableComponent";
import { GetCategoriesQuery, SaveCategory } from "app/hooks/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expressionValidOnlyLetters, expressionValidOnlyNumbers } from "app/utils/constant";
import { NotificationAlert } from "app/components/NotificationAlert/Notification";
import TextField from "@mui/material/TextField";

const CategoryServices = () => {
  const queryClient = useQueryClient();
  const [creatingRowIndex, setCreatingRowIndex] = useState();
  const [validationErrors, setValidationErrors] = useState({});

  const { data, isLoading: isLoadingCategories } = GetCategoriesQuery();

  // const dataCategories = data?.filter((x) => x.type === 2);
  // ?.map((el) => {
  //   if (el.type === 2) el.type = "Servicio";
  //   return {
  //     ...el
  //   };
  // });

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
        // enableEditing: true,
        size: 50,
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
        size: 90,
        // enableEditing: true,
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
        size: 80,
        // accessorFn: (row) => typeCategory[0],
        editSelectOptions: typeCategory,
        muiEditTextFieldProps: {
          select: true,
          //required: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type
          //remove any previous validation errors when user focuses on the input
          // onFocus: () =>
          //   setValidationErrors({
          //     ...validationErrors,
          //     type: undefined
          //   })
        }
      }
    ],
    [validationErrors]
  );

  const validateRequired = (value) => !!value?.length;
  const validateOnlyletters = (value) => expressionValidOnlyLetters.test(value);

  const validateOnlNumbers = (value) => expressionValidOnlyNumbers.test(value);

  function validateCategory(category) {
    console.log("Datos ", category);
    return {
      name: !validateRequired(category?.name)
        ? "La categoria es requerida"
        : !validateOnlyletters(category?.name)
        ? "No se admiten número o carácteres espaeciales"
        : "",
      amount: !validateRequired(category?.amount?.toString())
        ? "el valor Requiredo"
        : !validateOnlNumbers(category?.amount)
        ? "Solo se admiten números"
        : "",
      type: !validateRequired(category?.type) ? "El tipo es requerido" : ""
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

  const renderRowActions = ({ row, table }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      }}
      style={{ marginLeft: "-80%" }}
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
      <Tooltip title="Nuevo registro">
        <IconButton
          onClick={() => {
            // setCreatingRowIndex((staticRowIndex || 0) + 1);
            table.setCreatingRow(
              createRow(
                table,
                {
                  _id: null,
                  name: "",
                  value: "",
                  category: ""
                },
                -1,
                row.depth + 1
              )
            );
          }}
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const rowCancel = () => {
    return false;
  };

  const rowCanceSave = ({ table }) => {
    // if (dataCategories.length === 0) {
    //   queryClient.invalidateQueries("categories");
    //   setValidationErrors({});
    // } else {
    //   table.setEditingRow(null);
    // }
    setValidationErrors({});
  };

  const handleUpdateCategory = ({ values, row, table }) => {
    console.log("falta la accion1", values.amount);
    const newValidationErrors = validateCategory(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      console.log("falta la accion1", newValidationErrors);
      setValidationErrors(newValidationErrors);
      return;
    }
    // setValidationErrors({});
    // console.log("falta la accion");
    return;
  };

  return (
    <Grid style={{ margin: "10px" }} marginTop={10}>
      <TableComponentProvider
        columns={columns}
        data={data}
        isLoading={isLoadingCategories ? true : false}
        enableRowSelection={true}
        renderRowActions={renderRowActions}
        onCreatingRowSave={handleCreateCategory}
        onCreatingRowCancel={rowCanceSave}
        onEditingRowSave={handleUpdateCategory}
        onEditingRowCancel={rowCancel}
        enableEditing={true}
        positionCreatingRow={creatingRowIndex}
        enableExpanding={false}
        columnPinning={{ left: ["mrt-row-select", "mrt-row-actions"], right: [] }}
      />
    </Grid>
  );
};

export default CategoryServices;
