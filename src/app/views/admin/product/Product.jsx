import React, { useEffect } from "react";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCirclePlus,
  faRotate,
  faSave,
  faTrashAlt,
  faUpload,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent } from "app/components/Button/ButtonComponent";
import { Box, FormGroup, Grid, ListItemIcon, MenuItem, Typography } from "@mui/material";
import TableComponentProvider from "../../../components/Table/TableComponent";
import { data2 } from "../../../utils/utils";
import Badge from "@mui/material/Badge";
import { ModalComponent } from "app/components/Modal/ModalComponent";
import { useState } from "react";
import { Input, Label, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Small } from "app/components/Typography";
import SelectComponent from "app/components/select/SelectComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NumericFormat } from "react-number-format";
import { BASE_URL_DEV, BASE_URL_PROD, NO_IMAGE } from "app/utils/constant";
import { Delete, Edit } from "@mui/icons-material";
import { GetCategories } from "app/hooks/categories";
import { deleteFileService, uploadFileService } from "app/services/filesService";
import { GetProducts, SaveProduct, UpdateProduct } from "app/hooks/products";
import moment from "moment-timezone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationAlert } from "app/components/NotificationAlert/Notification";

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
    accessorFn: (row) => `${row.name}`, //accessorFn used to join multiple data into a single cell
    id: "name", //id is still required when using accessorFn instead of accessorKey
    header: "Producto",
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
          alt="Foto"
          height={30}
          src={
            row?.original?.photo ? `${BASE_URL_DEV}archivo/${row?.original?.photo}` : `${NO_IMAGE}`
          }
          loading="lazy"
          style={{ borderRadius: "50%" }}
        />
        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
        <span>{renderedCellValue}</span>
      </Box>
    )
  },
  {
    accessorKey: "reference", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
    enableClickToCopy: true,
    filterVariant: "autocomplete",
    header: "Referencia",
    size: 300
  },
  {
    accessorKey: "purchasePrice",
    // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
    filterFn: "between",
    header: "Precio Compra",
    size: 200,
    //custom conditional format and styling
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
    accessorKey: "salePrice",
    // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
    filterFn: "between",
    header: "Precio Venta",
    size: 200,
    //custom conditional format and styling
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
    accessorKey: "stock", //hey a simple column for once
    header: "Stock",
    size: 220,
    Cell: ({ cell }) => (
      <Box
        className={`${
          cell.getValue("stock") > 0 && cell.getValue("stock") >= 7 ? "stock-up" : " stock-down"
        }`}
      >
        <Badge
          color="secondary"
          badgeContent={cell.getValue("stock") == 0 ? "0" : cell.getValue("stock")}
        ></Badge>
      </Box>
    )
  },
  {
    accessorKey: "outputs", //hey a simple column for once
    accessorFn: (row) => `${row.outputs == null ? 0 : row.state}`,
    header: "Salidas",
    size: 220,
    Cell: ({ cell }) => (
      <Box className={`${cell.getValue("outputs") > 0 ? "stock-up" : " stock-down"}`}>
        <Badge
          color="secondary"
          badgeContent={cell.getValue("outputs") == 0 ? "0" : cell.getValue("outputs")}
        ></Badge>
      </Box>
    )
  },
  {
    accessorKey: "state", //hey a simple column for once
    accessorFn: (row) => `${row.state == 1 ? "Activo" : "Inactivo"}`,
    header: "Estado",
    size: 200,
    Cell: ({ cell }) => (
      <Box
        component="span"
        sx={(theme) => ({
          backgroundColor:
            cell.getValue() === "Inactivo" ? "rgb(134, 2, 192)" : "rgb(199, 82, 193)",
          borderRadius: "0.25rem",
          color: "#fff",
          maxWidth: "9ch",
          p: "0.25rem"
        })}
      >
        {/* {cell.getValue() == 0 ? "Inactivo" : "Activo"} */}
        {cell.getValue().toString()}
      </Box>
    )
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

const Product = () => {
  const [spinner, setSpinner] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [updateImgFlag, setUpdateImgFlag] = useState(false);
  const [spinnerUpload, setSpinnerUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [fileTemp, setFileTemp] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileNameTemp, setFileNameTemp] = useState(null);
  const [messageNamImage, setMessageNamImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImg, setIsOpenImg] = useState(false);
  const modalProducts = async () => {
    if (fileNameTemp) {
      try {
        await deleteFileService(fileNameTemp);
        setMessageNamImage("");
        setFileNameTemp("");
        setFileTemp(null);
      } catch (error) {
        console.error("Mostrando el error al tratar de eliminar una foto !!!");
      }
    }
    setIsOpen(!isOpen);
  };
  const modalImg = async () => {
    setIsOpenImg(!isOpenImg);
  };

  const queryClient = useQueryClient();

  const { data } = GetCategories();
  const { data: products, isLoading: isLoadinProducts } = GetProducts();

  const options = data
    ?.filter((x) => x.type === 1)
    ?.map((el) => {
      return {
        label: el.name,
        value: el._id
      };
    });

  const renderDetailPanel = ({ row }) => {
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
          src={
            row?.original?.photo ? `${BASE_URL_DEV}archivo/${row?.original?.photo}` : `${NO_IMAGE}`
          }
          loading="lazy"
          style={{ borderRadius: "50%", width: "25%" }}
          onClick={() => renderChangeImg(row.original)}
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">{row.original.name}</Typography>
          <Typography variant="h6">{row.original.description}</Typography>
        </Box>
      </Box>
    );
  };

  const renderToolbarAlertBannerContent = ({ table }) => {
    // console.log(table);
    return (
      <Box sx={{ display: "flex", gap: "1rem", p: "5px", alignItems: "center" }}>
        <span>
          {table.getSelectedRowModel().rows.length} de {data2?.length} fila(s) seleccionada(s)
        </span>
        <Box
          component="span"
          onClick={() => {
            console.log(table.getSelectedRowModel().rows);
          }}
          sx={() => ({
            background: "#ec85e6",
            borderRadius: "50rem",
            display: "flex",
            color: "#fff",
            maxWidth: "29ch",
            p: ".30rem",
            cursor: "pointer",
            fontSize: "13px"
          })}
        >
          <FontAwesomeIcon
            style={{
              marginRight: "2px",
              paddingTop: "2px"
            }}
            icon={faTrashAlt}
          />
          Desea Eliminar Registros ?
        </Box>
      </Box>
    );
  };

  const renderRowActionMenuItems = ({ closeMenu, row }) => [
    <MenuItem
      key={0}
      onClick={() => {
        const {
          _id,
          name,
          reference,
          date,
          category,
          description,
          state,
          stock,
          discount,
          purchasePrice,
          salePrice,
          photo,
          outputs
        } = row.original;
        productFormik.setValues({
          _id,
          name,
          reference,
          date,
          category,
          description,
          state,
          stock,
          discount,
          purchasePrice,
          salePrice,
          photo,
          outputs
        });
        setIdEdit(_id);
        modalProducts();
        closeMenu();
      }}
      sx={{ m: 0 }}
    >
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      Editar Producto
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
      Eliminar Producto
    </MenuItem>
  ];

  const optionsState = [
    {
      label: "Disponible",
      value: "1",
      dialCode: "dialCode 1"
    },
    {
      label: "No disponible",
      value: "2",
      dialCode: "dialCode 2"
    }
  ];

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

  const mutationSaveProduct = useMutation({
    mutationFn: SaveProduct,
    onError: (error, variables, context) => {
      let { message } = error.response.data;
      // console.log("Mostrando error", variables);
      // console.log("Mostrando error", context);
      NotificationAlert("error", "Registro Producto", `${message}`);
    },
    onSuccess: (resp) => {
      NotificationAlert("success", "Registro Producto", "Registro realizado con éxito.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      clearData();
      setFileTemp(null);
      setTimeout(() => {
        modalProducts();
      }, 2500);
    }
  });

  const mutationUpdateProduct = useMutation({
    mutationFn: UpdateProduct,
    onError: (error, variables, context) => {
      let { message } = error.response.data;
      console.log("Mostrando error", error, variables);
      // console.log("Mostrando error", context);
      NotificationAlert("error", "Actualización Producto", `${message}`);
    },
    onSuccess: (resp) => {
      NotificationAlert("success", "Actualización Producto", "Registro Actualizado con éxito.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (idEdit && updateImgFlag) {
        modalImg();
        setIdEdit(null);
        setFileTemp(null);
        setFileNameTemp(null);
        fileNameTemp = null;
        fileTemp = null;
        setUpdateImgFlag(false);
      } else {
        modalProducts();
        clearData();
        setFileTemp(null);
        setFileNameTemp(null);
      }
    }
  });

  const productFormik = useFormik({
    initialValues: {
      date: null,
      name: "",
      reference: "",
      category: "",
      description: "",
      state: "1",
      stock: "",
      discount: "",
      purchasePrice: "",
      salePrice: "",
      photo: "",
      outputs: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(40, "El nombre no debe contener mas de 14 carácteres")
        .matches(/[A-Za-z]+/, "No se amdmiten numeros")
        .required("Este campo es requerido"),
      reference: Yup.string()
        .max(40, "El nombre no debe contener mas de 14 carácteres")
        .matches(/^[a-zA-Z0-9_.-]*$/, "No se amdmiten carácteres especiales")
        .required("Este campo es requerido"),
      category: Yup.string().required("Este campo es requerido"),
      state: Yup.string().required("Este campo es requerido"),
      stock: Yup.string()
        .min(0)
        .matches(/^[0-9]+$/gi, "Solo se admiten números positivos")
        .required("Este campo es requerido"),
      purchasePrice: Yup.string()
        .min(0)
        .matches("^[0-9]+([,][0-9]+)?$", "Solo se admiten números positivos")
        .required("Este campo es requerido"),
      salePrice: Yup.string()
        .min(0)
        .matches("^[0-9]+([,][0-9]+)?$", "Solo se admiten números positivos")
        .required("Este campo es requerido")
    }),
    onSubmit: async (values) => {
      values.date = moment().tz("America/Bogota").format("YYYY-MM-DD");
      values.purchasePrice = !values.purchasePrice.toString().includes(",")
        ? values.purchasePrice
        : values.purchasePrice.replace(",", "");
      values.salePrice = !values.salePrice.toString().includes(",")
        ? values.salePrice
        : values.salePrice.replace(",", "");
      // console.log("Mostrando valores ", values);
      if (fileNameTemp) values.photo = fileNameTemp;
      let data = {
        product: {
          date: values.date,
          name: values.name,
          reference: values.reference,
          category: values.category,
          description: values.description,
          state: values.state,
          stock: values.stock,
          discount: values.discount,
          purchasePrice: values.purchasePrice,
          salePrice: values.salePrice,
          photo: values.photo,
          outputs: values.outputs
        }
      };
      if (idEdit) {
        mutationUpdateProduct.mutate([{ data }, idEdit]);
      } else {
        mutationSaveProduct.mutate({ data });
      }
    }
  });

  const selectedHandleFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileTemp(reader.result);
    };
    let name = e.target.files[0].name;
    setFileName(name);
    // setFileNameAvatar(name);
    // console.log('Mostrando archivo selectedHandler => ', file, name, e.target.files[0])
  };

  const sendHandleFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setSpinnerUpload(true);
      try {
        let { data } = await uploadFileService(formData);
        setUpdateImgFlag(true);
        setFileNameTemp(data?.nameImage);
        setFileName("");
        setMessageNamImage("Foto subida con Exito!!");
        setSpinnerUpload(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const clearData = () => {
    productFormik.resetForm();
    setFile(null);
    setFileName("");
    setFileNameTemp(null);
    setFileTemp(null);
  };

  const handleUpdateFile = () => {
    if (idEdit && updateImgFlag) {
      let data = {
        product: {
          photo: fileNameTemp
        }
      };
      mutationUpdateProduct.mutate([{ data }, idEdit]);
    } else {
      modalImg();
    }
  };

  const renderChangeImg = (data) => {
    setIdEdit(data?._id);
    if (data?.photo) {
      setFileName(data?.photo);
      setFileTemp(`${BASE_URL_DEV}archivo/${data.photo}`);
    } else {
      setFileName("");
      setFileTemp("");
    }
    modalImg();
  };

  return (
    <Grid style={{ margin: "10px", marginTop: "-23px" }}>
      <ButtonComponent
        classButton="button-ppal"
        title="Producto"
        icon={<FontAwesomeIcon style={{ marginRight: "7px" }} icon={faCirclePlus} />}
        handle={() => {
          if (idEdit) setIdEdit("") && productFormik.resetForm();
          modalProducts();
        }}
      />
      <Grid marginTop={1}>
        <TableComponentProvider
          columns={columns2}
          data={products}
          enableColumnFilterModes={true}
          enableColumnOrdering={true}
          enableStickyHeader={true}
          enableStickyFooter={true}
          enableFacetedValues={true}
          enableColumnPinning={false}
          enableRowActions={true}
          renderDetailPanel={renderDetailPanel}
          renderToolbarAlertBannerContent={renderToolbarAlertBannerContent}
          enableRowSelection={true}
          enableSelectAll={true}
          isLoading={isLoadinProducts ? true : false}
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
              <span>{idEdit ? "Actualziar producto" : "Crear producto"}</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} onClick={modalProducts} />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <Grid container>
            <Grid md={4} sm={4} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="exampleEmail">Nombre Producto</Label>
                <Input
                  className="form-control-input-ppal"
                  name="name"
                  value={productFormik.values.name}
                  onChange={productFormik.handleChange}
                  onBlur={productFormik.handleBlur}
                  placeholder="Ingrese el nombre del producto"
                  type="text"
                />
                {productFormik.touched.name && productFormik.errors.name && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.name && productFormik.errors.name}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid md={4} sm={4} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="exampleEmail">Referencia</Label>
                <Input
                  className="form-control-input-ppal"
                  name="reference"
                  value={productFormik.values.reference.toUpperCase()}
                  onChange={productFormik.handleChange}
                  onBlur={productFormik.handleBlur}
                  placeholder="Ingrese la referencia del producto"
                  type="text"
                />
                {productFormik.touched.reference && productFormik.errors.reference && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.reference && productFormik.errors.reference}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid md={4} sm={4} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="categoria" className="labels">
                  Categoría
                </Label>
                <SelectComponent
                  optionsValues={options}
                  loading={options?.length > 0 ? false : true}
                  valueOp={productFormik.values.category}
                  handle={(value) => {
                    productFormik.setFieldValue("category", value);
                  }}
                  onBlurFn={() => {
                    productFormik.touched.category = true;
                  }}
                  placeHolder="Ejemp Piel"
                  name="category"
                  calssNameSelect={""}
                  styles={stylesSelect}
                  theme={themeSelect}
                />
                {productFormik.touched.category && productFormik.errors.category && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.category && productFormik.errors.category}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
          </Grid>
          <Grid container>
            <Grid md={7} sm={7} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="exampleEmail">Descripción</Label>
                <Input
                  className="form-control-input-ppal"
                  name="description"
                  value={productFormik.values.description}
                  onChange={productFormik.handleChange}
                  onBlur={productFormik.handleBlur}
                  placeholder="Ingrese la descripción"
                  type="text"
                />
              </FormGroup>
            </Grid>
            <Grid md={3} sm={3} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="categoria" className="labels">
                  Estado
                </Label>
                <SelectComponent
                  optionsValues={optionsState}
                  valueOp={productFormik.values.state}
                  handle={(value) => {
                    productFormik.setFieldValue("state", value);
                  }}
                  onBlurFn={() => {
                    productFormik.touched.state = true;
                  }}
                  placeHolder="Ejemp Disponible"
                  name="state"
                  calssNameSelect={""}
                  styles={stylesSelect}
                  theme={themeSelect}
                />
                {productFormik.touched.state && productFormik.errors.state && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.state && productFormik.errors.state}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid md={2} sm={2} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="exampleEmail">Stock</Label>
                <Input
                  className="form-control-input-ppal"
                  name="stock"
                  value={productFormik.values.stock}
                  onChange={productFormik.handleChange}
                  onBlur={productFormik.handleBlur}
                  placeholder="Ingrese el stock"
                  type="text"
                />
                {productFormik.touched.stock && productFormik.errors.stock && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.stock && productFormik.errors.stock}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
          </Grid>
          <Grid container>
            <Grid md={4} sm={4} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="exampleEmail">Precio Compra</Label>
                <NumericFormat
                  placeholder="Ingrese el precio de compra"
                  thousandSeparator=","
                  allowLeadingZeros
                  onChange={(e) => {
                    productFormik.setFieldValue("purchasePrice", e.target.value);
                  }}
                  // onBlur={productFormik.handleBlur}
                  value={productFormik.values.purchasePrice}
                  className="form-control-input-ppal"
                />
                {productFormik.touched.purchasePrice && productFormik.errors.purchasePrice && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.purchasePrice && productFormik.errors.purchasePrice}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid md={4} sm={4} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="exampleEmail">Precio Venta</Label>
                <NumericFormat
                  placeholder="Ingrese el precio de compra"
                  thousandSeparator=","
                  allowLeadingZeros
                  onChange={(e) => {
                    productFormik.setFieldValue("salePrice", e.target.value);
                  }}
                  // onBlur={productFormik.handleBlur}
                  value={productFormik.values.salePrice}
                  className="form-control-input-ppal"
                />
                {productFormik.touched.salePrice && productFormik.errors.salePrice && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.salePrice && productFormik.errors.salePrice}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid md={4} sm={4} xs={12} style={{ paddingLeft: "8px" }}>
              <FormGroup>
                <Label for="discount">Descuento</Label>
                <Input
                  className="form-control-input-ppal"
                  name="discount"
                  value={productFormik.values.discount}
                  onChange={productFormik.handleChange}
                  onBlur={productFormik.handleBlur}
                  placeholder="Ingrese el descuento"
                  type="text"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid md={4} sm={4} xs={12} marginTop={1} style={{ cursor: "pointer" }}>
            <Small
              className="custom-small"
              onClick={() => {
                if (fileNameTemp || fileName || fileTemp) {
                  setFileNameTemp(null);
                  setFileName("");
                  setFileTemp(null);
                }
                modalImg();
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="camera"
                class="svg-inline--fa fa-camera "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                style={{ marginRight: "2px", color: " rgb(255, 255, 255)", cursor: "pointer" }}
              >
                <path
                  fill="currentColor"
                  d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                ></path>
              </svg>
              Subir Foto
            </Small>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Grid style={{ marginTop: "-25px" }}>
            <ButtonComponent
              classButton="button-ppal"
              style={{ marginTop: "10px" }}
              title={idEdit ? "Actualizar" : "Aceptar"}
              disable={
                mutationSaveProduct.isPending || mutationUpdateProduct.isPending ? true : false
              }
              icon={
                <FontAwesomeIcon
                  style={{ marginRight: "7px" }}
                  icon={
                    mutationSaveProduct.isPending || mutationUpdateProduct.isPending
                      ? faRotate
                      : faSave
                  }
                  spin={
                    mutationSaveProduct.isPending || mutationUpdateProduct.isPending ? true : false
                  }
                />
              }
              handle={productFormik.handleSubmit}
            />
          </Grid>
        </ModalFooter>
      </ModalComponent>
      {/* Modal Para ver y subir imagenes de los productos */}
      <ModalComponent open={isOpenImg} title={"Foto Producto"} w100Modal={"w50Modal"}>
        <ModalHeader className="modal-title header-tyles">
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid>
              <FontAwesomeIcon icon={faCamera} style={{ fontSize: "18px" }} />{" "}
              <span>Foto Producto</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} onClick={modalImg} />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <Grid container md={12} sm={12} xs={12} spacing={1} style={{ margin: "0 auto" }}>
            <Grid className="content-image" md={7} sm={7} xs={12}>
              <Grid className="content-img">
                {!fileTemp && productFormik.values.photo ? (
                  <img
                    className="no-image"
                    src={`${BASE_URL_PROD}/product/photo/${productFormik?.values?.photo}`}
                    alt=""
                  />
                ) : fileTemp ? (
                  <img
                    className="no-image"
                    src={`${
                      fileTemp?.includes("https") || fileTemp?.includes("http")
                        ? `${fileTemp}`
                        : fileTemp
                    }`}
                  />
                ) : (
                  <img className="no-image" src={NO_IMAGE} />
                )}
              </Grid>
            </Grid>
            <Grid
              md={5}
              sm={3}
              sx={12}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Grid className="div-file-input">
                <label class="form-label">Cambiar foto</label>
                <input
                  type="file"
                  id="choose_file"
                  class="inputfile"
                  onChange={selectedHandleFile}
                ></input>
                <label for="choose_file">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="icon svg"
                    role="img"
                    aria-hidden="true"
                  >
                    <rect
                      width="480"
                      height="32"
                      x="16"
                      y="16"
                      fill="var(--ci-primary-color, currentColor)"
                      class="ci-primary"
                    ></rect>
                    <polygon
                      fill="var(--ci-primary-color, currentColor)"
                      points="155.883 195.883 178.51 218.51 240 157.02 240 456 272 456 272 157.02 333.49 218.51 356.117 195.883 256 95.764 155.883 195.883"
                      class="ci-primary"
                    ></polygon>
                  </svg>{" "}
                  Seleccione una foto
                </label>
                <span style={{ fontSize: "12px" }}>
                  {fileName ? (
                    <strong>
                      {fileName.length > 33
                        ? `${fileName.slice(0, fileName.length - 24)}...`
                        : fileName}
                    </strong>
                  ) : messageNamImage ? (
                    <div>
                      <strong
                        style={{ display: "flex", justifyContent: "start", alignItems: "start" }}
                      >
                        Foto subida con éxito!!
                      </strong>
                      <strong style={{ fontSize: "10px" }}>{fileNameTemp}</strong>
                    </div>
                  ) : (
                    <strong>Ningún archivo selecionado</strong>
                  )}
                </span>
                <label>
                  {" "}
                  <strong> </strong>
                </label>
              </Grid>
              <Grid>
                <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  alignItems={"center"}
                >
                  <ButtonComponent
                    handle={sendHandleFile}
                    icon={
                      <FontAwesomeIcon
                        style={{ marginRight: "4px" }}
                        icon={spinnerUpload ? faRotate : faUpload}
                        spin={spinnerUpload ? true : false}
                      />
                    }
                    title={spinnerUpload ? "Subiendo ..." : "Subir Foto"}
                    classButton={"button-upload"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Grid style={{ marginTop: "-25px" }}>
            <ButtonComponent
              classButton="button-ppal"
              title={idEdit ? "Actualizar" : "Aceptar"}
              icon={<FontAwesomeIcon style={{ marginRight: "7px" }} icon={faSave} />}
              handle={handleUpdateFile}
            />
          </Grid>
        </ModalFooter>
      </ModalComponent>
    </Grid>
  );
};

export default memo(Product);
