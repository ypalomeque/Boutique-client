import { faCirclePlus, faPenToSquare, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, ListItemIcon, MenuItem } from "@mui/material";
import { ButtonComponent } from "app/components/Button/ButtonComponent";
import { ModalComponent } from "app/components/Modal/ModalComponent";
import SelectComponent from "app/components/select/SelectComponent";
import { GetUsers, SaveUser, UpdateUser } from "app/hooks/users";
import { useFormik } from "formik";
import * as Yup from "yup";

import React from "react";
import { useState } from "react";
import { memo } from "react";
import { FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DatepickerMui from "../../../components/DatePicker/DatePicker";
import { MAILFORMAT } from "app/utils/constant";
import { validateEmail } from "app/services/helpers";
import { GetIndicativesCountriesAndCities } from "app/hooks/indicativesCountriesAndCities";
import { GetRoles } from "app/hooks/roles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationAlert } from "app/components/NotificationAlert/Notification";
import TableComponentProvider from "app/components/Table/TableComponent";
import { findValueInObject } from "app/utils/utils";
import { Delete, Edit } from "@mui/icons-material";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";

const User = () => {
  let usersRoleFilter = [];
  const { data: dataIndicatives } = GetIndicativesCountriesAndCities();
  const { data: dataRoles } = GetRoles();

  const [idEdit, setIdEdit] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [optionsDocumentType] = useState([
    { value: 1, label: "CC" },
    { value: 2, label: "CE" },
    { value: 3, label: "PASAPORTE" }
  ]);
  const modalUser = async () => {
    if (idEdit) {
      userFormik.resetForm();
      setIdEdit("");
    }
    setIsOpen(!isOpen);
  };

  usersRoleFilter = dataRoles
    ?.filter((x) => x.name !== "Admin" && x.name !== "User System")
    ?.map((el) => {
      let options = {};
      if (el.name === "User") {
        options.value = el._id;
        options.label = "Cliente";
      } else if (el.name === "Domiciliary") {
        options.value = el._id;
        options.label = "Domiciliario";
      } else if (el.name === "Employee") {
        options.value = el._id;
        options.label = "Profesional";
      }

      return options;
    })
    .reverse();

  const queryClient = useQueryClient();

  const { data: usersData, isLoading: isLoadinUser } = GetUsers();
  // console.log(usersData, usersRoleFilter);
  const mutationSaveUser = useMutation({
    mutationFn: SaveUser,
    onError: (error, variables, context) => {
      let { message } = error.response.data;
      // console.log("Mostrando error", variables);
      // console.log("Mostrando error", context);
      NotificationAlert("error", "Registro Usuario", `${message}`);
    },
    onSuccess: (resp) => {
      NotificationAlert("success", "Registro Usuario", "Registro realizado con éxito.");
      clearData();
      modalUser();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  const mutationUpdateUser = useMutation({
    mutationFn: UpdateUser,
    onError: (error, variables, context) => {
      let { message } = error.response.data;
      //console.log("Mostrando error", error, variables);
      // console.log("Mostrando error", context);
      NotificationAlert("error", "Actualización Usuario", `${message}`);
    },
    onSuccess: (resp) => {
      NotificationAlert("success", "Actualización Usuario", "Registro Actualizado con éxito.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      modalUser();
      clearData();
    }
  });

  const userFormik = useFormik({
    initialValues: {
      userType: "1",
      name: "",
      documentType: "",
      documentNumber: "",
      phone: "",
      indicative: "",
      adress: "",
      email: "",
      birthdate: null
    },
    validationSchema: Yup.object({
      userType: Yup.string().required("Este campo es requerido"),
      name: Yup.string()
        .max(40, "El nombre no debe contener mas de 14 carácteres")
        .matches(/[A-Za-z]+/, "No se amdmiten numeros")
        .required("Este campo es requerido"),
      documentType: Yup.string().required("Este campo es requerido"),
      documentNumber: Yup.string()
        .min(0)
        .matches("^[0-9]+([,][0-9]+)?$", "Solo se admiten números positivos")
        .required("Este campo es requerido"),
      phone: Yup.string()
        .min(0)
        .matches(/^[0-9]+$/gi, "Solo se admiten números positivos")
        .required("Este campo es requerido"),
      indicative: Yup.string().required("Este campo es requerido"),
      email: Yup.string()
        .max(30, "El email no debe contener mas de 30 carácteres")
        .matches(MAILFORMAT, "Dirección de email invalida")
        .required("Este campo es requerido")
        .test(
          "Unique Email",
          "Este correo esta en uso", // <- key, message
          async function (value) {
            return new Promise((resolve, reject) => {
              validateEmail(value, idEdit ? idEdit : null)
                .then((resp) => {
                  if (resp) {
                    resolve(true);
                  }
                  resolve(false);
                })
                .catch((e) => resolve(true));
            });
          }
        )
    }),
    onSubmit: async (values) => {
      let data = {};
      if (idEdit) {
        data.user = {
          fullName: values.name,
          documentType: values.documentType,
          documentNumber: values.documentNumber,
          phone: values.phone,
          indicative: values.indicative,
          adress: values.adress,
          email: values.email,
          birthdate: values.birthdate,
          rol: values.userType
        };
        mutationUpdateUser.mutate([{ data }, idEdit]);
      } else {
        data.user = {
          fullName: values.name,
          documentType: values.documentType,
          documentNumber: values.documentNumber,
          phone: values.phone,
          indicative: values.indicative,
          adress: values.adress,
          email: values.email,
          birthdate: values.birthdate,
          rol: values.userType
        };
        mutationSaveUser.mutate({ data });
      }
    }
  });

  const clearData = () => {
    userFormik.resetForm();
    userFormik.values.email = "";
    userFormik.errors.email = false;
    // setFile(null);
    // setFileName("");
    // setFileNameTemp(null);
    // setFileTemp(null);
  };

  const stylesSelect = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "rgb(199, 82, 193)" : "rgb(199, 82, 193)",
      // background: "transparent",
      fontSize: "13px",
      maxHeight: "30px",
      cursor: "pointer",
      display: "flex",
      borderRadius: 50
    }),
    container: (baseStyles) => ({
      ...baseStyles,
      background: "#ec85e"
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: "black"
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      cursor: "pointer",
      borderRadius: "50px",
      maxHeight: "27px",
      display: "flex",
      alignItems: "center"
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "black"
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      background: "#ec85e6",
      color: "white"
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles
      // height: "30px",
      // marginTop: -1
    })
  };

  const themeSelect = (theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
      ...theme.colors,
      primary25: "rgb(199, 82, 193)",
      primary: "rgba(164, 5, 156,1)"
    }
  });

  const columns = [
    {
      accessorKey: "fullName", //accessorFn used to join multiple data into a single cell
      header: "Nombre",
      size: 250
    },
    {
      accessorKey: "documentNumber",
      // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
      // filterFn: "between",
      header: "Documento",
      size: 200
      //custom conditional format and styling
    },
    {
      accessorFn: (row) =>
        findValueInObject(optionsDocumentType, { value: row.documentType }).label,
      // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
      header: "Tipo doc",
      size: 150
      //custom conditional format and styling
    },
    {
      accessorKey: "phone", //hey a simple column for once
      header: "Teléfono",
      size: 220
    },
    {
      accessorKey: "indicative", //hey a simple column for once
      accessorFn: (row) => findValueInObject(dataIndicatives, { value: row.indicative })?.label,
      header: "Indicativo",
      size: 220
    },
    {
      accessorKey: "adress", //hey a simple column for once
      // accessorFn: (row) => `${row.state == 1 ? "Activo" : "Inactivo"}`,
      header: "Dirección",
      size: 200
    },
    {
      accessorFn: (row) =>
        findValueInObject(usersRoleFilter, { value: row.rol?._id })?.label.toString(),
      // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
      // filterFn: "between",
      header: "Tipo usuario",
      size: 200
      //custom conditional format and styling
    }
    // {
    //   accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
    //   id: "startDate",
    //   header: "Start Date",
    //   filterVariant: "date",
    //   filterFn: "lessThan",
    //   sortingFn: "datetime",
    //   Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
    //   Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
    //   muiFilterTextFieldProps: {
    //     sx: {
    //       minWidth: "250px"
    //     }
    //   }
    // }
  ];

  const renderRowActionMenuItems = ({ closeMenu, row }) => [
    <MenuItem
      key={0}
      onClick={() => {
        const {
          _id,
          fullName: name,
          documentType,
          documentNumber,
          phone,
          indicative,
          adress,
          email,
          state,
          birthdate,
          rol
        } = row.original;
        userFormik.setValues({
          userType: rol?._id,
          _id,
          name,
          documentType,
          documentNumber,
          phone,
          indicative,
          adress,
          email,
          state,
          birthdate,
          rol
        });
        setIdEdit(_id);
        modalUser();
        closeMenu();
      }}
      sx={{ m: 0 }}
    >
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      Editar Usuario
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
        <Delete />
      </ListItemIcon>
      Eliminar Usuario
    </MenuItem>
  ];

  return (
    <Grid className="container-fluid" style={{ marginTop: "-23px" }}>
      <ButtonComponent
        classButton="button-ppal"
        icon={<FontAwesomeIcon className="mr-1" icon={faUsers} />}
        title="Usuario"
        handle={modalUser}
      />
      <Grid className="mt-2">
        <TableComponentProvider
          columns={columns}
          data={usersData}
          isLoading={isLoadinUser ? true : false}
          enableColumnFilterModes={true}
          enableRowActions={true}
          enableRowSelection={true}
          enableSelectAll={true}
          renderRowActionMenuItems={renderRowActionMenuItems}
          columnPinning={{
            left: ["mrt-row-expand", "mrt-row-select"],
            right: ["mrt-row-actions"],
            expanded: true
          }}
        />
      </Grid>
      <ModalComponent open={isOpen} title={"Productos"} w100Modal={"w100Modal"}>
        <ModalHeader className="modal-title header-tyles">
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid>
              <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: "18px" }} />{" "}
              <span>{idEdit ? "Actualziar Usuario" : "Crear Usuario"}</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} onClick={modalUser} />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <Grid container>
            <Grid item xs={12} md={6} sm={6}>
              <FormGroup>
                <Label for="userType" className="labels">
                  Usuario
                </Label>
                <SelectComponent
                  optionsValues={usersRoleFilter}
                  loading={usersRoleFilter?.length > 0 ? false : true}
                  // loading={true}
                  valueOp={userFormik.values.userType}
                  handle={(value) => userFormik.setFieldValue("userType", value)}
                  onBlurFn={() => {}}
                  // placeHolder="Ejemp Piel"
                  calssNameSelect={"select-user-type"}
                  styles={stylesSelect}
                  theme={themeSelect}
                />
                {userFormik.touched.userType && userFormik.errors.userType && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {userFormik.touched.userType && userFormik.errors.userType}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} sm={4}>
                <FormGroup>
                  <Label for="name">Nombres y apellidos</Label>
                  <Input
                    className="form-control-input-ppal"
                    name="name"
                    value={userFormik.values.name}
                    onChange={userFormik.handleChange}
                    onBlur={userFormik.handleBlur}
                    placeholder="Ingrese el nombre completo"
                    type="text"
                  />
                  {userFormik.touched.name && userFormik.errors.name && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {userFormik.touched.name && userFormik.errors.name}
                      </p>
                    </div>
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <FormGroup>
                  <Label for="documentType" className="labels">
                    Tipo documento
                  </Label>
                  <SelectComponent
                    optionsValues={optionsDocumentType}
                    loading={optionsDocumentType?.length > 0 ? false : true}
                    // loading={true}
                    valueOp={userFormik.values.documentType}
                    handle={(value) => userFormik.setFieldValue("documentType", value)}
                    onBlurFn={() => {}}
                    // placeHolder="Ejemp Piel"
                    calssNameSelect={"select-user-document-type"}
                    styles={stylesSelect}
                    theme={themeSelect}
                  />
                  {userFormik.touched.documentType && userFormik.errors.documentType && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {userFormik.touched.documentType && userFormik.errors.documentType}
                      </p>
                    </div>
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <FormGroup>
                  <Label for="documentNumber">Documento</Label>
                  <Input
                    name="documentNumber"
                    onChange={userFormik.handleChange}
                    // onBlur={productFormik.handleBlur}
                    value={userFormik.values.documentNumber}
                    className="form-control-input-ppal"
                    onBlur={userFormik.handleBlur}
                    placeholder="Ingrese el documento"
                    type="text"
                  />
                  {userFormik.touched.documentNumber && userFormik.errors.documentNumber && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {userFormik.touched.documentNumber && userFormik.errors.documentNumber}
                      </p>
                    </div>
                  )}
                </FormGroup>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={3} sm={3}>
                <FormGroup>
                  <Label for="phone">Teléfono</Label>
                  <Input
                    className="form-control-input-ppal"
                    name="phone"
                    value={userFormik.values.phone}
                    onChange={userFormik.handleChange}
                    onBlur={userFormik.handleBlur}
                    placeholder="Ingrese el número de teléfono"
                    type="text"
                  />
                  {userFormik.touched.phone && userFormik.errors.phone && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {userFormik.touched.phone && userFormik.errors.phone}
                      </p>
                    </div>
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <FormGroup>
                  <Label for="indicative" className="labels">
                    Indicativo
                  </Label>
                  <SelectComponent
                    optionsValues={dataIndicatives}
                    loading={dataIndicatives?.length > 0 ? false : true}
                    // loading={true}
                    valueOp={userFormik.values.indicative}
                    handle={(value) => userFormik.setFieldValue("indicative", value)}
                    onBlurFn={() => {}}
                    // placeHolder="Ejemp Piel"
                    calssNameSelect={"select-order-category"}
                    styles={stylesSelect}
                    theme={themeSelect}
                  />
                  {userFormik.touched.indicative && userFormik.errors.indicative && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {userFormik.touched.indicative && userFormik.errors.indicative}
                      </p>
                    </div>
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={6} sm={6}>
                <FormGroup>
                  <Label for="adress">Dirección</Label>
                  <Input
                    className="form-control-input-ppal"
                    name="adress"
                    value={userFormik.values.adress}
                    onChange={userFormik.handleChange}
                    onBlur={userFormik.handleBlur}
                    placeholder="Ingrese la dirección"
                    type="text"
                  />
                  {userFormik.touched.adress && userFormik.errors.adress && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {userFormik.touched.adress && useFormik.errors.adress}
                      </p>
                    </div>
                  )}
                </FormGroup>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} sm={6}>
                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input
                    className="form-control-input-ppal"
                    name="email"
                    value={userFormik.values.email}
                    onChange={userFormik.handleChange}
                    onBlur={userFormik.handleBlur}
                    placeholder="Ingrese el correo"
                    type="text"
                  />
                  {/* {userFormik.touched.email && userFormik.errors.email && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {userFormik.touched.email && useFormik.errors.email}
                      </p>
                    </div>
                  )} */}

                  {userFormik.touched.email && userFormik.errors.email && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {userFormik.touched.email && userFormik.errors.email}
                      </p>
                    </div>
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={6} sm={6}>
                <FormGroup>
                  <Label for="email">Fecha Nacimiento</Label>
                  <DatepickerMui
                    value={userFormik.values.birthdate}
                    handleChangeDatePicker={(value) => {
                      // console.log("Show birthdate birthDate >>> ", value);
                      userFormik.setFieldValue("birthdate", value);
                    }}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Grid style={{ marginTop: "-25px" }}>
            <ButtonComponent
              classButton="button-ppal"
              title={idEdit ? "Actualizar" : "Aceptar"}
              icon={
                <FontAwesomeIcon
                  style={{ marginRight: "7px" }}
                  icon={idEdit ? faPenToSquare : faFloppyDisk}
                />
              }
              handle={userFormik.handleSubmit}
            />
          </Grid>
        </ModalFooter>
      </ModalComponent>
    </Grid>
  );
};

export default memo(User);
