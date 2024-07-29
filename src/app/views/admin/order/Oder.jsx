import React from "react";
import {
  faCartPlus,
  faCirclePlus,
  faCreditCard,
  faDollarSign,
  faHandHoldingDollar,
  faMagnifyingGlass,
  faMoneyCheckDollar,
  faRotate,
  faSave,
  faTruckArrowRight,
  faUserPlus,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Box, Grid, Typography } from "@mui/material";
import { ActualProduct } from "app/components/OrderProduct";
import { OrderProduct } from "app/components/OrderProduct/OrderProduct";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Pagination from "app/components/Pagination/Pagination";
import SelectComponent from "app/components/select/SelectComponent";
import { GetProducts } from "app/hooks/products";
import { find, findIndex } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ButtonComponent } from "app/components/Button/ButtonComponent";
import { useState } from "react";
import { ModalComponent } from "app/components/Modal/ModalComponent";
import { NumericFormat } from "react-number-format";
import { GetCostDomicilies } from "app/hooks/costDomicilies";
import { GetDepartamentsMunicipies } from "app/hooks/departmentsMunicipies";
import LoadingSpinner, {
  calValueDiscountOnProduct,
  calValuePercentageDicountOfProducts,
  calValuePercentageDicountOfWholesale,
  findValueInArray,
  findValueInObject,
  formatPrice
} from "app/utils/utils";
import { GetUsers, SaveUser } from "app/hooks/users";
import { GetCategories } from "app/hooks/categories";
import { MAILFORMAT } from "app/utils/constant";
import { validateEmail } from "app/services/helpers";
import { NotificationAlert } from "app/components/NotificationAlert/Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetRoles } from "app/hooks/roles";
import { GetIndicativesCountriesAndCities } from "app/hooks/indicativesCountriesAndCities";
import DatepickerMui from "../../../components/DatePicker/DatePicker";
import { GetMethodpayments } from "app/hooks/methodpayments";
import { GetGeneralConfigurations } from "app/hooks/generalConfigurations";
import { SaveOrder } from "app/hooks/order";

const Oder = () => {
  const [idEdit] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalPartialPayment, setIsOpenModalPartialPayment] = useState(false);
  const [isOpenOrderCart, setIsOpenOrderCart] = useState(false);
  const [isOpenMWholeSales, setIsOpenMWholeSales] = useState(false);
  const [isOpenMWholeSalesDiscount, setIsOpenMWholeSalesDiscount] = useState(false);
  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(5);
  const [isOpenModDomicile, setIsOpenModDomicile] = useState(false);
  const [isOpenModShipping, setIsOpenModShipping] = useState(false);
  const [total, setTotal] = useState(0);
  const [efective, setEfective] = useState(0);
  const [moneyBack, setMoneyBack] = useState(0);
  const [moneyBackClient, setMoneyBackClient] = useState(0);
  const [valueTransference, setValueTransference] = useState(0);
  const [discountOfProducts, setDiscountOfProducts] = useState(0);
  const [discountOfSales, setDiscountOfSales] = useState(0);
  const [wholesaleDiscont, setWholesaleDiscount] = useState(0); // discount on wholesale
  const [totalProducsCart, setTotalProducsCart] = useState(0);
  const [checkedDomicilie, setCheckedDomicilie] = useState(false);
  const [checkedShipping, setCheckedShipping] = useState(false);
  const [isPackaging, setIsPackaging] = useState(true);
  const [methodPayment, setMethodPayment] = useState("");
  const [productsOrderList, setProductsOrderList] = useState([]);
  const [municipiesList, setMunicipiesList] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [client, setClient] = useState("");
  const [clientDetailOrder, setClientDetailOrder] = useState("");

  const modalUser = async () => {
    setIsOpen(!isOpen);
  };

  const modalWholeSales = async () => {
    setIsOpenMWholeSales(!isOpenMWholeSales);
  };

  const modalWholeSalesDiscount = async () => {
    setIsOpenMWholeSalesDiscount(!isOpenMWholeSalesDiscount);
  };

  const modalPartialPayment = async () => {
    setIsOpenModalPartialPayment(!isOpenModalPartialPayment);
  };

  const modalOrderCart = async () => {
    setIsOpenOrderCart(!isOpenOrderCart);
  };

  let noData = false;
  let categoriesMap = [];
  let result = [];
  //const maximum = Pokemons.length / porPagina;
  let domiciliaryUsers = [];
  let clients = [];
  let methodpayments = [];
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

  const { data: categories } = GetCategories();
  const { data: products, isLoading: isLoadinProducts } = GetProducts();
  const { data: costDomicilies } = GetCostDomicilies();
  const { data: users } = GetUsers();
  const { data: departamentsMunicipies, isLoading: isLoadingDepMuni } = GetDepartamentsMunicipies();
  const { data: dataIndicatives } = GetIndicativesCountriesAndCities();
  const { data: dataMethodpayments } = GetMethodpayments();
  const { data: generalConfigurations } = GetGeneralConfigurations();

  const queryClient = useQueryClient();

  domiciliaryUsers = findValueInArray(users, { rol: { name: "Domiciliary" } })?.map((x) => ({
    value: x._id,
    label: x.fullName
  }));

  clients = findValueInArray(users, { rol: { name: "User" } })?.map((x) => ({
    value: x._id,
    label: x.fullName
  }));

  const { data: dataRoles } = GetRoles();

  categoriesMap = categories
    ?.filter((el) => el.type !== 2)
    ?.map((x) => ({ value: x._id, label: x.name }));

  categoriesMap?.push({ value: "all", label: "TODO" });

  methodpayments = dataMethodpayments?.map((x) => ({ value: x._id, label: x.name }));

  const validDataAndSendRequest = () => {
    setEfective(getTotal().total);

    if (productsOrderList.length === 0) {
      NotificationAlert("info", "Pedido", "Por favor selecciona un producto");
    } else if (!client) {
      NotificationAlert("info", "Pedido", "Por favor selecciona el cliente");
    } else if (!methodPayment) {
      NotificationAlert("info", "Pedido", "Por favor selecciona el método de pago");
    } else {
      modalPartialPayment();
    }
  };

  const calValueTransference = (e) => {
    e = e.target.value.toString().replaceAll(",", "");
    setValueTransference(e);
    if (e <= getTotal().total) {
      let copyTotal = getTotal().total;
      setEfective(copyTotal - e);
    }
  };

  const calValueMoeyBack = (e) => {
    e = e.target.value.toString().replaceAll(",", "");
    if (efective > 0) {
      setMoneyBack(e);
      if (e > efective) {
        let copyTotal = efective;
        setMoneyBackClient(e - copyTotal);
      }
    }
    if (e === 0 || e === "0" || e === "") {
      setMoneyBack(0);
      setMoneyBackClient(0);
    }
  };

  const saveOrder = () => {
    let data = {};
    data.products = productsOrderList;
    data.user = { _id: "6699d818a21db261d880377b" };
    data.client = findValueInObject(users, { _id: client });
    data.paymentMethod = find(methodpayments, {
      value: methodPayment
    })?.label;
    data.subTotal = getTotal().subtotal;
    data.totalSales = getTotal().total;
    data.discountForProducts = discountOfProducts ? discountOfProducts.replaceAll(",", "") : 0;
    data.discountForSale = discountOfSales ? discountOfSales.replaceAll(",", "") : 0;
    data.discountWoleSales = wholesaleDiscont ? wholesaleDiscont.replaceAll(",", "") : 0;
    data.percentageDiscountOnProducts = 0;
    data.percentageDiscountOnSale = calValuePercentageDicountOfWholesale(
      getTotal().total,
      discountOfSales
    );
    data.percentageDiscountOnWoleSales = calValuePercentageDicountOfWholesale(
      getTotal().total,
      wholesaleDiscont
    );
    data.iva = 0;
    data.cantProducts = totalProducsCart;
    if (valueTransference > 0 || valueTransference > "0") {
      data.payementPartial = {
        paymentMethods: [
          find(methodpayments, {
            value: methodPayment
          })?.label,
          "TRANSFERENCIA"
        ],
        efective: efective,
        transference: valueTransference
      };
    }
    if (checkedDomicilie) {
      data.domicilie = {
        departament: find(departamentsMunicipies?.departamentsFilter, {
          value: domicilieFormik.values.departament
        })?.label,
        municipie: municipiesList[domicilieFormik.values.municipie]?.label?.toString(),
        costDomiciliary: domicilieFormik.values.costDomicilie,
        domiciliary: {
          _id: domicilieFormik.values.domiciliary,
          fullName: find(domiciliaryUsers, {
            value: domicilieFormik.values.domiciliary
          })?.label
        },
        shippingCost: domicilieFormik.values.shippingCost,
        adress: domicilieFormik.values.adress
      };
    }
    if (checkedShipping) {
      data.shipping = {
        departament: find(departamentsMunicipies?.departamentsFilter, {
          value: shippingFormik.values.departament
        })?.label,
        municipie: municipiesList[shippingFormik.values.municipie]?.label?.toString(),
        costOperation: shippingFormik.values.operationCost,
        shippingCost: shippingFormik.values.shippingCost,
        adress: shippingFormik.values.adress
      };
    }
    if (isPackaging === false) {
      if (generalConfigurations.length > 0 && generalConfigurations[0].valuePacking) {
        data.packing = generalConfigurations[0].valuePacking;
      } else {
        data.packing = 0;
      }
    } else {
      data.packing = 0;
    }
    console.log(data);
    mutationSaveOrder.mutate({ data });
  };

  const addProduct = (product) => {
    let sum = parseInt(total);
    let discOfProducts = parseInt(discountOfProducts);
    let copy = [...productsOrderList];
    let totalProds = 0;
    let index = findIndexItem(product._id);
    if (index !== -1) {
      // copy[index].qantity = copy[index].qantity + 1;
      return;
    } else {
      copy.push(product);
    }
    discOfProducts = calValueDiscountOnProduct(product);
    if (discOfProducts) {
      product.percentageOfProducts = (product.discount * product.quantity) / 100;
    }
    sum = sum + product.salePrice;
    totalProds = copy.reduce((sum, cur) => sum + cur.quantity, 0);
    setProductsOrderList(copy);
    setTotalProducsCart(totalProds);
    setTotal(sum);
    setDiscountOfProducts(discOfProducts);
  };

  const findIndexItem = (id) => {
    try {
      return findIndex(productsOrderList, { _id: id });
    } catch (error) {
      return false;
    }
  };

  function updateProduct(product, quantity) {
    let sum = parseInt(total);
    let copy = [...productsOrderList];
    let discOfProducts = parseInt(discountOfProducts);
    let totalProds = 0;
    let index = findIndexItem(product._id);
    let resValue = 0;
    if (index !== -1) {
      if (discOfProducts) {
        copy[index].percentageOfProducts = (product.discount * product.quantity) / 100;
      }
      const actualValue = copy[index].quantity * product.salePrice;
      const newValue = quantity * product.salePrice;
      resValue = newValue - actualValue;
      sum = sum + resValue;
      copy[index].quantity = quantity;
      totalProds = copy.reduce((sum, cur) => sum + cur.quantity, 0);
      setProductsOrderList(copy);
      setTotalProducsCart(totalProds);
      setDiscountOfProducts(discOfProducts);
      setTotal(sum);
    }
  }

  function deleteProduct(product) {
    let sum = parseInt(total);
    let copy = [...productsOrderList];
    let totalProds = 0;
    let index = findIndexItem(product._id);
    if (index !== -1) {
      sum = sum - product.salePrice * product.quantity;
      if (copy.length > 1) {
        totalProds = copy.reduce((sum, cur) => sum + cur.quantity, 0);
        copy.splice(index, 1);
      } else {
        copy = [];
      }
    }
    setProductsOrderList(copy);
    setTotalProducsCart(totalProds);
    setTotal(sum);
  }

  const renderDetailOrderCart = () => {
    let cli = find(users, { _id: client });
    setClientDetailOrder(cli);
    modalOrderCart();
  };
  /**Logic for create users */
  // console.log("Total", total);
  const [optionsDocumentType] = useState([
    { value: 1, label: "CC" },
    { value: 2, label: "CE" },
    { value: 3, label: "PASAPORTE" }
  ]);

  let usersRoleFilter = [];
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
              validateEmail(value, null)
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
  });

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
      clearDataUser();
      modalUser();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  const mutationSaveOrder = useMutation({
    mutationFn: SaveOrder,
    onError: (error, variables, context) => {
      let { message } = error.response.data;
      // console.log("Mostrando error", variables);
      // console.log("Mostrando error", context);
      NotificationAlert("error", "Registro Pedido", `${message}`);
    },
    onSuccess: (resp) => {
      NotificationAlert("success", "Registro Pedido", "Registro realizado con éxito.");
      modalPartialPayment();
      clearData();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  const domicilieFormik = useFormik({
    initialValues: {
      departament: "",
      municipie: "",
      costDomicilie: "0",
      shippingCost: "0",
      idDpartament: "",
      domiciliary: "",
      adress: ""
    },
    validationSchema: Yup.object().shape({
      departament: Yup.string().required("Este campo es requerido"),
      // municipie: Yup.object().shape({
      //   label: Yup.string().required("Este campo es requerido"),
      //   value: Yup.number().required("Este campo es requerido")
      // }),
      municipie: Yup.string().required("Este campo es requerido"),
      domiciliary: Yup.string().required("Este campo es requerido"),
      adress: Yup.string()
        .max(70, "El nombre no debe contener mas de 70 carácteres")
        .required("Este campo es requerido")
    }),
    onSubmit: async (values) => {
      // values.date = moment().tz("America/Bogota").format("YYYY-MM-DD");
      // console.log(values);
      // domicilieFormik.setSubmitting(true);
      setIsOpenModDomicile(false);
    }
  });

  const shippingFormik = useFormik({
    initialValues: {
      departament: "",
      municipie: "",
      adress: "",
      operationCost: "0",
      shippingCost: "0"
    },
    validationSchema: Yup.object().shape({
      departament: Yup.string().required("Este campo es requerido"),
      municipie: Yup.string().required("Este campo es requerido"),
      // domiciliary: Yup.string().required("Este campo es requerido"),
      adress: Yup.string()
        .max(70, "El nombre no debe contener mas de 70 carácteres")
        .required("Este campo es requerido")
    }),
    onSubmit: async (values) => {
      // values.date = moment().tz("America/Bogota").format("YYYY-MM-DD");
      //console.log(values);
      // domicilieFormik.setSubmitting(true);
      setIsOpenModShipping(false);
    }
  });

  let sumTotalShipping = () => {
    if (checkedShipping && shippingFormik.values) {
      return (
        Number(shippingFormik?.values?.shippingCost?.replaceAll(",", "")) +
        Number(shippingFormik?.values?.operationCost?.replaceAll(",", ""))
      );
    }
    return 0;
  };

  let sumTotalDomicilie = () => {
    if (checkedDomicilie && domicilieFormik.values) {
      return (
        Number(domicilieFormik?.values?.costDomicilie) +
        Number(domicilieFormik?.values?.shippingCost)
      );
    }
    return 0;
  };

  const filterByCategory = (e) => {
    setCategoryValue(e);
  };

  if (!categoryValue) {
    result = products;
  }

  if (
    categoryValue !== "all" &&
    products?.filter((x) => x?.category?.toString() === categoryValue?.toString())?.length > 0
  ) {
    result = products?.filter((x) => x?.category?.toString() === categoryValue?.toString());
  } else {
    if (!categoryValue) {
      result = products;
    }
    if (categoryValue === "all") {
      result = products;
    }
  }

  const searchData = (e) => {
    setSearch(e.target.value);
  };

  if (search && result.length > 0) {
    find = products?.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));
    if (find.length > 0) {
      console.log("RESULT ", result);
      result = find;
    } else {
      find = products?.filter((x) => x.reference.toLowerCase().includes(search.toLowerCase()));
      if (find?.length > 0) {
        result = find;
      } else {
        noData = true;
      }
    }
  }

  const maximum = Math.round(result?.length / forPage);

  const clearDataUser = () => {
    userFormik.resetForm();
    userFormik.values.email = "";
    userFormik.errors.email = false;
  };

  const getTotal = () => {
    let copyTotal = total;
    let subT = 0;
    let costShipping = 0;
    let discounts = 0;
    let pack = 0;
    subT =
      copyTotal -
      discountOfProducts.toString().replaceAll(",", "") -
      discountOfSales.toString().replaceAll(",", "") -
      wholesaleDiscont.toString().replaceAll(",", "");
    discounts =
      parseInt(
        discountOfProducts.toString().replaceAll(",", "")
          ? discountOfProducts.toString().replaceAll(",", "")
          : 0
      ) +
      parseInt(
        discountOfSales.toString().replaceAll(",", "")
          ? discountOfSales.toString().replaceAll(",", "")
          : 0
      ) +
      parseInt(
        wholesaleDiscont.toString().replaceAll(",", "")
          ? wholesaleDiscont.toString().replaceAll(",", "")
          : 0
      );

    costShipping =
      parseInt(
        shippingFormik.values.shippingCost
          ? shippingFormik.values.shippingCost.toString().replaceAll(",", "")
          : 0
      ) +
      parseInt(
        shippingFormik.values.operationCost
          ? shippingFormik.values.operationCost.toString().replaceAll(",", "")
          : 0
      ) +
      parseInt(
        domicilieFormik?.values?.costDomicilie
          ? domicilieFormik?.values?.costDomicilie.toString().replaceAll(",", "")
          : 0
      ) +
      parseInt(
        domicilieFormik?.values?.shippingCost
          ? domicilieFormik?.values?.shippingCost.toString().replaceAll(",", "")
          : 0
      );

    if (isPackaging === false) {
      if (generalConfigurations.length > 0 && generalConfigurations[0].valuePacking) {
        pack = generalConfigurations[0].valuePacking;
      } else {
        pack = 0;
      }
    }
    copyTotal += costShipping - discounts + pack;
    return { total: copyTotal, subtotal: subT };
  };

  const clearData = () => {
    domicilieFormik.resetForm();
    shippingFormik.resetForm();
    setClient("");
    setCategoryValue("all");
    setCheckedDomicilie(false);
    setCheckedShipping(false);
    setDiscountOfProducts(0);
    setDiscountOfSales(0);
    setEfective(0);
    setMoneyBack(0);
    setMoneyBackClient(0);
    setProductsOrderList([]);
    setTotal(0);
    setValueTransference(0);
    setTotalProducsCart(0);
    setWholesaleDiscount(0);
  };

  return (
    <Grid container xs={12} sm={12} md={12} style={{ margin: "10px" }} marginTop={3}>
      <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"space-between"}>
        <Grid xs={12} md={3}>
          <FormGroup>
            <Label for="categoria" className="labels">
              Categoría
            </Label>
            <SelectComponent
              optionsValues={categoriesMap}
              loading={categoriesMap?.length > 0 ? false : true}
              // loading={true}
              valueOp={categoryValue}
              handle={filterByCategory}
              onBlurFn={() => {}}
              placeHolder="Ejemp Piel"
              calssNameSelect={"select-order-category"}
              styles={stylesSelect}
              theme={themeSelect}
            />
            {/* {productFormik.touched.category && productFormik.errors.category && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.category && productFormik.errors.category}
                    </p>
                  </div>
                )} */}
          </FormGroup>
        </Grid>
        <Grid xs={12} md={3} sm={3}>
          <FormGroup>
            <Label for="reference">Buscar por referencia</Label>
            <Input
              className="form-control-input-ppal"
              value={search}
              onChange={searchData}
              onBlur={() => {}}
              placeholder="Ingrese la referencia"
              type="text"
            />
          </FormGroup>
        </Grid>
        <Grid xs={12} md={3} sm={3}>
          <FormGroup>
            <Label for="client" className="labels">
              Cliente
            </Label>
            <SelectComponent
              optionsValues={clients}
              loading={clients?.length > 0 ? false : true}
              //loading={true}
              valueOp={client}
              handle={(value) => setClient(value)}
              onBlurFn={() => {}}
              placeHolder="Selecione el cliente"
              calssNameSelect={""}
              styles={stylesSelect}
              theme={themeSelect}
            />
            {/* {productFormik.touched.category && productFormik.errors.category && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.category && productFormik.errors.category}
                    </p>
                  </div>
                )} */}
          </FormGroup>
        </Grid>
        <Grid xs={12} md={2} sm={2}>
          <FormGroup onClick={modalUser} className="cursor-pointer">
            <Label for="client" className="labels">
              {" "}
              Crear Cliente{" "}
            </Label>
            <Grid>{<FontAwesomeIcon icon={faUserPlus} />}</Grid>
          </FormGroup>
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12} md={12}>
        <Grid xs={12} sm={3} md={3}>
          <ul class="nav">
            <label for="domicilie" className="content-input cursor-pointer mr-6">
              <Input
                type="checkbox"
                id="domicilie"
                value="autopista"
                style={{ display: "none" }}
                checked={checkedDomicilie}
                className=""
                onChange={(e) => {
                  if (e.target.checked || checkedShipping) {
                    setCheckedShipping(false);
                    setCheckedDomicilie(true);
                    setIsOpenModDomicile(true);
                  } else {
                    setCheckedDomicilie(false);
                    setIsOpenModDomicile(false);
                    domicilieFormik.resetForm();
                  }
                }}
              />
              Domicilio<i className={"fondo-check"}></i>
            </label>
            <label for="shipping" class="content-input cursor-pointer">
              <input
                type="checkbox"
                id="shipping"
                value="autopista"
                checked={checkedShipping}
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.checked || checkedDomicilie) {
                    setCheckedDomicilie(false);
                    setCheckedShipping(true);
                    setIsOpenModDomicile(false);
                    setIsOpenModShipping(true);
                  } else {
                    setCheckedShipping(false);
                    setIsOpenModShipping(false);
                    shippingFormik.resetForm();
                  }
                }}
              />
              Envío<i class="fondo-check"></i>
            </label>
          </ul>
        </Grid>
        <Grid xs={12} sm={5} md={5}>
          <Pagination page={page} setPage={setPage} maximum={maximum} />
          {isLoadinProducts && (
            <Grid display={"flex"} alignContent={"center"} justifyContent={"center"}>
              <Typography
                variant="span"
                display={"flex"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                Cargando...
                <LoadingSpinner />
              </Typography>
            </Grid>
          )}
          {result?.length == 0 && (
            <Grid display={"flex"} alignContent={"center"} justifyContent={"center"}>
              <Typography
                variant="span"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                No hay datos <FontAwesomeIcon className="ml-1" icon={faMagnifyingGlass} />
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={8} sm={8} marginTop={-1}>
          <Grid className=" list-products text-center">
            {result
              ?.slice((page - 1) * forPage, (page - 1) * forPage + forPage)
              ?.map((product, i) => {
                return <OrderProduct product={product} addProduct={addProduct} i={i} />;
              })}
          </Grid>
        </Grid>
        <Grid xs={12} md={4} sm={4} className="div-actual-order text-center">
          {/* <Grid className="" display={"flex"} flexDirection={"column"}>
            <text className="text-xs p-1">PEDIDO ACTUAL</text>
            <text className="text-xs p-1">Usuario: Yirelison P.</text>
          </Grid> */}
          <Grid className="div-pedido-lista">
            {productsOrderList?.map((value, index) => {
              return (
                <ActualProduct
                  key={index}
                  product={value}
                  deleteProduct={deleteProduct}
                  updateQunatity={updateProduct}
                />
              );
            })}
          </Grid>
          <Grid xs={12} md={12} sm={12} class="content-packing" style={{ width: "97%" }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              display={"flex"}
              justifyContent={"space-between"}
              alignContent={"center"}
              alignItems={"center"}
              margin={"auto 0"}
            >
              <Grid>
                <Typography
                  variant="p"
                  style={{
                    fontFamily: "Roboto, cursive",
                    marginLeft: "3px",
                    fontSize: "11px"
                  }}
                >
                  Empaque
                </Typography>
              </Grid>
              <Grid>
                <div role="group" className="btn-group-conten btn-group btn-packing">
                  <button
                    type="button"
                    className={`${
                      isPackaging ? "button-packageOff" : "button-packageOn"
                    } btn btn-sm`}
                    onClick={() => {
                      setIsPackaging(true);
                    }}
                  >
                    No.
                  </button>
                  <button
                    type="button"
                    className={`${
                      isPackaging ? "button-packageOn" : "button-packageOff"
                    } btn  btn-sm`}
                    onClick={() => {
                      setIsPackaging(false);
                    }}
                  >
                    Si.
                  </button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} SM={12} md={12} style={{ width: "97%" }}>
            <FormGroup>
              {/* <Label for="categoria" className="labels">
                Categoría
              </Label> */}
              <SelectComponent
                optionsValues={methodpayments}
                loading={methodpayments?.length > 0 ? false : true}
                // loading={true}

                placeHolder={"MÉTODO PAGO"}
                valueOp={methodPayment}
                handle={(value) => {
                  setMethodPayment(value);
                }}
                onBlurFn={() => {}}
                calssNameSelect={""}
                styles={stylesSelect}
                theme={themeSelect}
              />
              {/* {productFormik.touched.category && productFormik.errors.category && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.category && productFormik.errors.category}
                    </p>
                  </div>
                )} */}
            </FormGroup>
          </Grid>
          <Grid
            xs={12}
            sm={11}
            md={11}
            display={"flex"}
            justifyContent={"space-between"}
            className="mb-1"
            style={{ marginTop: "-15px" }}
          >
            <Grid item>
              <Typography>Costo Envío</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {formatPrice(
                  checkedDomicilie && Object.keys(domicilieFormik.values).length > 0
                    ? sumTotalDomicilie()
                    : checkedShipping && Object.keys(shippingFormik.values).length > 0
                    ? sumTotalShipping()
                    : 0
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            sm={11}
            md={11}
            display={"flex"}
            justifyContent={"space-between"}
            style={{ marginTop: "-4px" }}
            className="mb-1"
          >
            <Grid item>
              <Typography>Desc sobre productos</Typography>
            </Grid>
            <Grid item>
              <Typography>{formatPrice(discountOfProducts)}</Typography>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            sm={11}
            md={11}
            display={"flex"}
            justifyContent={"space-between"}
            style={{ marginTop: "-4px" }}
            className="mb-1"
          >
            <Grid item className="cursor-pointer">
              <Typography
                onClick={() => productsOrderList.length > 0 && modalWholeSales()}
                style={{ borderRadius: "7px", color: "rgb(190, 28, 182)" }}
              >
                Desc sobre la venta
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{discountOfSales ? discountOfSales : "$0"}</Typography>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            sm={11}
            md={11}
            display={"flex"}
            justifyContent={"space-between"}
            style={{ marginTop: "-4px" }}
            className="mb-1"
          >
            <Grid item className="cursor-pointer">
              <Typography
                style={{ borderRadius: "7px", color: "rgb(134, 2, 192)" }}
                onClick={() => productsOrderList.length > 0 && modalWholeSalesDiscount()}
              >
                Desc al por mayor
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{wholesaleDiscont ? wholesaleDiscont : "$0"}</Typography>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            sm={11}
            md={11}
            display={"flex"}
            justifyContent={"space-between"}
            style={{ marginTop: "-4px" }}
            className="mb-1"
          >
            <Grid item className="cursor-pointer">
              <Typography>Subtotal</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {getTotal().subtotal ? formatPrice(getTotal().subtotal) : "$0"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            sm={11}
            md={11}
            display={"flex"}
            justifyContent={"space-between"}
            style={{ marginTop: "-4px" }}
            className="mb-1"
          >
            <Grid item className="cursor-pointer">
              <Typography>Total</Typography>
            </Grid>
            <Grid item>
              <Typography>{formatPrice(getTotal().total)}</Typography>
            </Grid>
          </Grid>
          {/* <Grid
            xs={12}
            sm={11}
            md={11}
            display={"flex"}
            justifyContent={"space-between"}
            style={{ marginTop: "-8px" }}
          >
            <Grid item className="cursor-pointer">
              <Typography>Cantidad Productos</Typography>
            </Grid>
            <Grid item>
              <Badge className="style-badge" color="secondary" badgeContent={"0"}>
                <ShoppingCartIcon sx={{ color: "text.primary" }} />
              </Badge>
            </Grid>
          </Grid> */}
          <Grid
            xs={12}
            sm={11}
            md={11}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            style={{ marginTop: "-16px" }}
          >
            <Grid>
              <ButtonComponent
                // icon={
                //   <FontAwesomeIcon
                //     style={{ marginRight: "7px" }}
                //     icon={
                //       mutationSaveProduct.isPending || mutationUpdateProduct.isPending
                //         ? faRotate
                //         : faSave
                //     }
                //     spin={
                //       mutationSaveProduct.isPending || mutationUpdateProduct.isPending ? true : false
                //     }
                //   />
                // }
                icon={
                  <FontAwesomeIcon
                    style={{ marginRight: "7px" }}
                    icon={mutationSaveOrder.isPending ? faRotate : faFloppyDisk}
                    spin={mutationSaveOrder.isPending ? true : false}
                  />
                }
                title={"Aceptar"}
                classButton={"button-order-save"}
                handle={validDataAndSendRequest}
              />
            </Grid>
            <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Badge
                onClick={() => productsOrderList.length > 0 && renderDetailOrderCart()}
                className="style-badge"
                color="secondary"
                badgeContent={totalProducsCart ? totalProducsCart : "0"}
              >
                <ShoppingCartIcon sx={{ color: "text.primary" }} />
              </Badge>
            </Grid>
            <Grid>
              <ButtonComponent title={"Cancelar"} classButton={"button-order-cancel "} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Modal para domicilios */}
      <ModalComponent open={isOpenModDomicile} title={"Foto Producto"} w100Modal={"w50Modal"}>
        <ModalHeader className="modal-title header-tyles">
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid>
              <FontAwesomeIcon icon={faTruckArrowRight} style={{ fontSize: "18px" }} />{" "}
              <span>Dimicilios</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  domicilieFormik.resetForm();
                  setIsOpenModDomicile(false);
                  setCheckedDomicilie(false);
                }}
              />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <Grid display={"flex"}>
            <Grid xs={12} md={6} sm={6} marginRight={1}>
              <FormGroup>
                <Label for="departament" className="labels">
                  Departamento
                </Label>
                <SelectComponent
                  optionsValues={departamentsMunicipies?.departamentsFilter}
                  //loading={options?.length > 0 ? false : true}
                  loading={isLoadingDepMuni}
                  valueOp={domicilieFormik.values.departament}
                  handle={(value) => {
                    let findMunicipies = [];
                    let copyMunicipies = [];
                    copyMunicipies = [...departamentsMunicipies?.departamentsMunicipies];

                    let findDepartament = find(departamentsMunicipies?.departamentsFilter, {
                      value: value
                    });
                    findMunicipies = find(copyMunicipies, {
                      _id: findDepartament.value
                    });
                    domicilieFormik.setFieldValue("departament", findDepartament.value);
                    domicilieFormik.setFieldValue("municipie", "");
                    setMunicipiesList(
                      findMunicipies.ciudades.map((el, i) => {
                        return {
                          value: i,
                          label: el
                        };
                      })
                    );
                  }}
                  onBlurFn={() => {}}
                  placeHolder="Ejemp Antioquia"
                  name="departament"
                  calssNameSelect={"select-order-departamentsMunicipies "}
                  styles={stylesSelect}
                  theme={themeSelect}
                />
                {domicilieFormik.touched.departament && domicilieFormik.errors.departament && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {domicilieFormik.touched.departament && domicilieFormik.errors.departament}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid xs={12} md={6} sm={6}>
              <FormGroup>
                <Label for="municipie" className="labels">
                  Municipio
                </Label>
                <SelectComponent
                  optionsValues={municipiesList}
                  loading={municipiesList?.length > 0 ? false : true}
                  valueOp={domicilieFormik.values.municipie}
                  handle={(value) => {
                    let _costDomicilie = {};
                    if (municipiesList[value]) {
                      domicilieFormik.values.municipie = municipiesList[value]?.value?.toString();
                    }
                    _costDomicilie = findValueInObject(costDomicilies, {
                      municipie: municipiesList[value].label
                    });
                    if (_costDomicilie !== undefined) {
                      domicilieFormik.setFieldValue("costDomicilie", _costDomicilie.costDomicilie);
                      domicilieFormik.setFieldValue("shippingCost", _costDomicilie.shippingCost);
                    } else {
                      domicilieFormik.setFieldValue("costDomicilie", "");
                      domicilieFormik.setFieldValue("shippingCost", "");
                    }
                  }}
                  onBlurFn={() => {}}
                  placeHolder="Ejemp Bello"
                  name="municipie"
                  calssNameSelect={"select-order-category"}
                  styles={stylesSelect}
                  theme={themeSelect}
                />
                {/* {domicilieFormik?.touched?.municipie?.label &&
                  domicilieFormik?.errors.municipie?.value && (
                    <div className="error-form">
                      <p style={{ color: "white" }}>
                        {domicilieFormik?.touched?.municipie?.label &&
                          domicilieFormik?.errors?.municipie?.value}
                      </p>
                    </div>
                  )} */}
                {domicilieFormik?.touched?.municipie && domicilieFormik?.errors.municipie && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {domicilieFormik?.touched?.municipie && domicilieFormik?.errors?.municipie}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={12}>
            <table class="table table-striped text-center tr-table-domicilies-shipping">
              <thead>
                <th>
                  <div class="MuiGrid-root css-rfnosa">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="circle-dollar-to-slot"
                      class="svg-inline--fa fa-circle-dollar-to-slot "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={{ marginRight: " 3px" }}
                    >
                      <path
                        fill="currentColor"
                        d="M326.7 403.7c-22.1 8-45.9 12.3-70.7 12.3s-48.7-4.4-70.7-12.3c-.3-.1-.5-.2-.8-.3c-30-11-56.8-28.7-78.6-51.4C70 314.6 48 263.9 48 208C48 93.1 141.1 0 256 0S464 93.1 464 208c0 55.9-22 106.6-57.9 144c-1 1-2 2.1-3 3.1c-21.4 21.4-47.4 38.1-76.3 48.6zM256 91.9c-11.1 0-20.1 9-20.1 20.1v6c-5.6 1.2-10.9 2.9-15.9 5.1c-15 6.8-27.9 19.4-31.1 37.7c-1.8 10.2-.8 20 3.4 29c4.2 8.8 10.7 15 17.3 19.5c11.6 7.9 26.9 12.5 38.6 16l2.2 .7c13.9 4.2 23.4 7.4 29.3 11.7c2.5 1.8 3.4 3.2 3.7 4c.3 .8 .9 2.6 .2 6.7c-.6 3.5-2.5 6.4-8 8.8c-6.1 2.6-16 3.9-28.8 1.9c-6-1-16.7-4.6-26.2-7.9l0 0 0 0 0 0c-2.2-.7-4.3-1.5-6.4-2.1c-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 25.3c1.2 .4 2.7 .9 4.4 1.5c7.9 2.7 20.3 6.9 29.8 9.1V304c0 11.1 9 20.1 20.1 20.1s20.1-9 20.1-20.1v-5.5c5.3-1 10.5-2.5 15.4-4.6c15.7-6.7 28.4-19.7 31.6-38.7c1.8-10.4 1-20.3-3-29.4c-3.9-9-10.2-15.6-16.9-20.5c-12.2-8.8-28.3-13.7-40.4-17.4l-.8-.2c-14.2-4.3-23.8-7.3-29.9-11.4c-2.6-1.8-3.4-3-3.6-3.5c-.2-.3-.7-1.6-.1-5c.3-1.9 1.9-5.2 8.2-8.1c6.4-2.9 16.4-4.5 28.6-2.6c4.3 .7 17.9 3.3 21.7 4.3c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-4.4-1.2-14.4-3.2-21-4.4V112c0-11.1-9-20.1-20.1-20.1zM48 352H64c19.5 25.9 44 47.7 72.2 64H64v32H256 448V416H375.8c28.2-16.3 52.8-38.1 72.2-64h16c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V400c0-26.5 21.5-48 48-48z"
                      ></path>
                    </svg>
                    Cost. Domicilio
                  </div>
                </th>
                <th>
                  <div class="MuiGrid-root css-rfnosa">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="motorcycle"
                      class="svg-inline--fa fa-motorcycle "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      style={{ marginRight: " 3px" }}
                    >
                      <path
                        fill="currentColor"
                        d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h57.7l16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7H64c-17.7 0-32 14.3-32 32v32h96c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32h70.4c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128H480c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H459.6c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26c-7-12.9-20.5-21-35.2-21H280zM462.7 311.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8zM187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40h66.4C242.5 268.8 190.5 224 128 224C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104H187.3zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                      ></path>
                    </svg>
                    Cost. Domiciliario
                  </div>
                </th>
                <th>
                  <div class="MuiGrid-root css-rfnosa">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="hand-holding-dollar"
                      class="svg-inline--fa fa-hand-holding-dollar "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      style={{ marginRight: " 3px" }}
                    >
                      <path
                        fill="currentColor"
                        d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z"
                      ></path>
                    </svg>
                    Total
                  </div>
                </th>
              </thead>
              <tbody>
                <tr>
                  <th scope="">
                    <h5
                      class="MuiTypography-root MuiTypography-h5 css-zq6grw"
                      style={{ color: "rgb(199, 82, 193)" }}
                    >
                      {domicilieFormik.values.costDomicilie
                        ? formatPrice(domicilieFormik.values.costDomicilie)
                        : "$0"}
                    </h5>
                  </th>
                  <td>
                    <h5
                      class="MuiTypography-root MuiTypography-h5 css-zq6grw"
                      style={{ color: "rgb(199, 82, 193)" }}
                    >
                      {domicilieFormik.values.shippingCost
                        ? formatPrice(domicilieFormik.values.shippingCost)
                        : "$0"}
                    </h5>
                  </td>
                  <td>
                    <h5
                      class="MuiTypography-root MuiTypography-h5 css-zq6grw"
                      style={{ color: "rgb(134, 2, 192)" }}
                    >
                      {domicilieFormik.values.shippingCost && domicilieFormik.values.costDomicilie
                        ? formatPrice(
                            Number(domicilieFormik.values.shippingCost) +
                              Number(domicilieFormik.values.costDomicilie)
                          )
                        : "$0"}
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid display={"flex"}>
            <Grid xs={12} md={4} sm={4} marginRight={1}>
              <FormGroup>
                <Label for="domiciliary" className="labels">
                  Domiciliario
                </Label>
                <SelectComponent
                  optionsValues={domiciliaryUsers}
                  loading={domiciliaryUsers?.length > 0 ? false : true}
                  // loading={true}
                  valueOp={domicilieFormik.values.domiciliary}
                  handle={(value) => domicilieFormik.setFieldValue("domiciliary", value)}
                  onBlurFn={() => {}}
                  placeHolder="Seleccione el domiciliario"
                  name="category"
                  calssNameSelect={"select-order-category"}
                  styles={stylesSelect}
                  theme={themeSelect}
                />
                {domicilieFormik.touched.domiciliary && domicilieFormik.errors.domiciliary && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {domicilieFormik.touched.domiciliary && domicilieFormik.errors.domiciliary}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid md={8} sm={8} xs={12}>
              <FormGroup>
                <Label for="adress">Direción envío</Label>
                <Input
                  className="form-control-input-ppal"
                  name="adress"
                  value={domicilieFormik.values.adress}
                  onChange={domicilieFormik.handleChange}
                  onBlur={domicilieFormik.handleBlur}
                  placeholder="Ingrese la direción de envío"
                  type="text"
                />
                {domicilieFormik.touched.adress && domicilieFormik.errors.adress && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {domicilieFormik.touched.adress && domicilieFormik.errors.adress}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Grid style={{ marginTop: "-25px" }}>
            <ButtonComponent
              classButton="button-ppal"
              title={"Aceptar"}
              icon={<FontAwesomeIcon style={{ marginRight: "7px" }} icon={faSave} />}
              handle={domicilieFormik.handleSubmit}
            />
          </Grid>
        </ModalFooter>
      </ModalComponent>
      {/* Modal para envios */}
      <ModalComponent open={isOpenModShipping} title={"Foto Producto"} w100Modal={"w50Modal"}>
        <ModalHeader className="modal-title header-tyles">
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid>
              <FontAwesomeIcon icon={faTruckArrowRight} style={{ fontSize: "18px" }} />{" "}
              <span>Envíos</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  shippingFormik.resetForm();
                  setIsOpenModShipping(false);
                  setCheckedShipping(false);
                }}
              />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <Grid display={"flex"}>
            <Grid xs={12} md={6} sm={6} marginRight={1}>
              <FormGroup>
                <Label for="departament" className="labels">
                  Departamento
                </Label>
                <SelectComponent
                  optionsValues={departamentsMunicipies?.departamentsFilter}
                  loading={departamentsMunicipies?.departamentsFilter?.length > 0 ? false : true}
                  valueOp={shippingFormik.values.departament}
                  handle={(value) => {
                    shippingFormik.values.municipie = "";
                    let copyMunicipies = [];
                    copyMunicipies = [...departamentsMunicipies?.departamentsMunicipies];
                    let findDepartament = find(departamentsMunicipies?.departamentsFilter, {
                      value: value
                    });
                    let findMunicipies = find(copyMunicipies, {
                      _id: findDepartament.value
                    });
                    shippingFormik.setFieldValue("departament", findDepartament.value);
                    setMunicipiesList(
                      findMunicipies.ciudades.map((el, i) => {
                        return {
                          value: i,
                          label: el
                        };
                      })
                    );
                  }}
                  onBlurFn={() => {}}
                  placeHolder="Ejemp Antioquia"
                  name="departament"
                  calssNameSelect={"select-order-category"}
                  styles={stylesSelect}
                  theme={themeSelect}
                />
                {shippingFormik.touched.departament && shippingFormik.errors.departament && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {shippingFormik.touched.departament && shippingFormik.errors.departament}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid xs={12} md={6} sm={6}>
              <FormGroup>
                <Label for="municipie" className="labels">
                  Municipio
                </Label>
                <SelectComponent
                  optionsValues={municipiesList}
                  loading={municipiesList?.length > 0 ? false : true}
                  valueOp={shippingFormik.values.municipie}
                  handle={(value) => {
                    shippingFormik.setFieldValue(
                      "municipie",
                      municipiesList[value]?.value?.toString()
                    );
                  }}
                  onBlurFn={() => {}}
                  placeHolder="Ejemp Antioquia"
                  name="municipie"
                  calssNameSelect={"select-order-category"}
                  styles={stylesSelect}
                  theme={themeSelect}
                />
                {shippingFormik.touched.municipie && shippingFormik.errors.municipie && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {shippingFormik.touched.municipie && shippingFormik.errors.municipie}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
          </Grid>
          <Grid md={12} sm={12} xs={12}>
            <FormGroup>
              <Label for="exampleEmail">Direción envío</Label>
              <Input
                className="form-control-input-ppal"
                name="adress"
                value={shippingFormik.values.adress}
                onChange={shippingFormik.handleChange}
                onBlur={shippingFormik.handleBlur}
                placeholder="Ingrese la direción de envío"
                type="text"
              />
              {shippingFormik.touched.adress && shippingFormik.errors.adress && (
                <div className="error-form">
                  <p style={{ color: "white" }}>
                    {shippingFormik.touched.adress && shippingFormik.errors.adress}
                  </p>
                </div>
              )}
            </FormGroup>
          </Grid>
          <Grid display={"flex"}>
            <Grid xs={12} md={6} sm={6} marginRight={1}>
              <FormGroup>
                <Label for="domiciliary" className="labels">
                  Costo operación
                </Label>
                <NumericFormat
                  placeholder="Ingrese el costo de operación"
                  thousandSeparator=","
                  allowLeadingZeros
                  onChange={(e) => {
                    shippingFormik.setFieldValue("operationCost", e.target.value);
                  }}
                  // onBlur={productFormik.handleBlur}
                  value={shippingFormik.values.operationCost}
                  className="form-control-input-ppal"
                />
                {shippingFormik.touched.operationCost && shippingFormik.errors.operationCost && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {shippingFormik.touched.operationCost && shippingFormik.errors.operationCost}
                    </p>
                  </div>
                )}
              </FormGroup>
            </Grid>
            <Grid xs={12} md={6} sm={6} marginRight={1}>
              <FormGroup>
                <Label for="domiciliary" className="labels">
                  Costo envío
                </Label>
                <NumericFormat
                  placeholder="Ingrese el costo de envío"
                  thousandSeparator=","
                  allowLeadingZeros
                  onChange={(e) => {
                    shippingFormik.setFieldValue("shippingCost", e.target.value);
                  }}
                  // onBlur={productFormik.handleBlur}
                  value={shippingFormik.values.shippingCost}
                  className="form-control-input-ppal"
                />
                {/* {productFormik.touched.category && productFormik.errors.category && (
                  <div className="error-form">
                    <p style={{ color: "white" }}>
                      {productFormik.touched.category && productFormik.errors.category}
                    </p>
                  </div>
                )} */}
              </FormGroup>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={12}>
            <table class="table table-striped text-center tr-table-domicilies-shipping">
              <thead>
                <th>
                  <div class="MuiGrid-root css-rfnosa">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="pen-to-square"
                      class="svg-inline--fa fa-pen-to-square "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={{ marginRight: "3px" }}
                    >
                      <path
                        fill="currentColor"
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                      ></path>
                    </svg>
                    Costo Operación
                  </div>
                </th>
                <th>
                  <div class="MuiGrid-root css-rfnosa">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="plane-departure"
                      class="svg-inline--fa fa-plane-departure "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      style={{ marginRight: "3px" }}
                    >
                      <path
                        fill="currentColor"
                        d="M381 114.9L186.1 41.8c-16.7-6.2-35.2-5.3-51.1 2.7L89.1 67.4C78 73 77.2 88.5 87.6 95.2l146.9 94.5L136 240 77.8 214.1c-8.7-3.9-18.8-3.7-27.3 .6L18.3 230.8c-9.3 4.7-11.8 16.8-5 24.7l73.1 85.3c6.1 7.1 15 11.2 24.3 11.2H248.4c5 0 9.9-1.2 14.3-3.4L535.6 212.2c46.5-23.3 82.5-63.3 100.8-112C645.9 75 627.2 48 600.2 48H542.8c-20.2 0-40.2 4.8-58.2 14L381 114.9zM0 480c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z"
                      ></path>
                    </svg>
                    Costo Envío
                  </div>
                </th>
                <th>
                  <div class="MuiGrid-root css-rfnosa">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="hand-holding-dollar"
                      class="svg-inline--fa fa-hand-holding-dollar "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      style={{ marginRight: "3px" }}
                    >
                      <path
                        fill="currentColor"
                        d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z"
                      ></path>
                    </svg>
                    Total
                  </div>
                </th>
              </thead>
              <tbody>
                <tr>
                  <th scope="">
                    <h5
                      class="MuiTypography-root MuiTypography-h5 css-zq6grw"
                      style={{ color: "rgb(199, 82, 193)" }}
                    >
                      {shippingFormik.values.operationCost.replaceAll(",", "") > 0
                        ? formatPrice(shippingFormik.values.operationCost)
                        : "$0"}
                    </h5>
                  </th>
                  <td>
                    {" "}
                    <h5
                      class="MuiTypography-root MuiTypography-h5 css-zq6grw"
                      style={{ color: "rgb(199, 82, 193)" }}
                    >
                      {shippingFormik.values.shippingCost.replaceAll(",", "") > 0
                        ? formatPrice(shippingFormik.values.shippingCost)
                        : "$0"}
                    </h5>
                  </td>
                  <td>
                    <h5
                      class="MuiTypography-root MuiTypography-h5 css-zq6grw"
                      style={{ color: "rgb(134, 2, 192)" }}
                    >
                      {shippingFormik.values.shippingCost.replaceAll(",", "") > 0 ||
                      shippingFormik.values.operationCost.replaceAll(",", "") > 0
                        ? formatPrice(
                            Number(shippingFormik.values.shippingCost.replaceAll(",", "")) +
                              Number(shippingFormik.values.operationCost.replaceAll(",", ""))
                          )
                        : "$0"}
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Grid style={{ marginTop: "-25px" }}>
            <ButtonComponent
              classButton="button-ppal"
              title={"Aceptar"}
              icon={<FontAwesomeIcon style={{ marginRight: "7px" }} icon={faSave} />}
              handle={shippingFormik.handleSubmit}
            />
          </Grid>
        </ModalFooter>
      </ModalComponent>
      {/* Modal para crear clientes */}
      <ModalComponent open={isOpen} title={"Clientes"} w100Modal={"w100Modal"}>
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
              icon={<FontAwesomeIcon style={{ marginRight: "7px" }} icon={faFloppyDisk} />}
              handle={userFormik.handleSubmit}
            />
          </Grid>
        </ModalFooter>
      </ModalComponent>
      {/* Modal para el descuento sobre la venta */}
      <ModalComponent open={isOpenMWholeSales} title={"Agregar descuento"} w100Modal={"w15Modal"}>
        <ModalHeader className="modal-title header-tyles">
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid>
              <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "18px" }} />{" "}
              <span>Agregar descuento</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} onClick={modalWholeSales} />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleEmail">Descuento sobre la venta</Label>
            <NumericFormat
              // placeholder="Ingrese el precio de compra"
              thousandSeparator=","
              allowLeadingZeros
              onChange={(e) => {
                setDiscountOfSales(e.target.value);
              }}
              // onBlur={productFormik.handleBlur}
              value={discountOfSales ? discountOfSales : 0}
              className="form-control-input-ppal"
            />
          </FormGroup>
          <Grid className="text-center">
            <Label className="text-center" for="exampleEmail">
              {calValuePercentageDicountOfWholesale(getTotal()?.total, discountOfSales)} (%)
            </Label>
          </Grid>
        </ModalBody>
      </ModalComponent>
      {/* Modal para el descuento sobre al X mayor*/}
      <ModalComponent
        open={isOpenMWholeSalesDiscount}
        title={"Agregar descuento"}
        w100Modal={"w15Modal"}
      >
        <ModalHeader className="modal-title header-tyles">
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid>
              <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "18px" }} />{" "}
              <span>Agregar descuento</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} onClick={modalWholeSalesDiscount} />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleEmail">Descuento al por mayor</Label>
            <NumericFormat
              // placeholder="Ingrese el precio de compra"
              thousandSeparator=","
              allowLeadingZeros
              onChange={(e) => {
                setWholesaleDiscount(e.target.value);
              }}
              // onBlur={productFormik.handleBlur}
              value={wholesaleDiscont ? wholesaleDiscont : 0}
              className="form-control-input-ppal"
            />
          </FormGroup>
          <Grid className="text-center">
            <Label className="text-center" for="exampleEmail">
              {calValuePercentageDicountOfWholesale(getTotal().total, wholesaleDiscont)} (%)
            </Label>
          </Grid>
        </ModalBody>
      </ModalComponent>
      {/* Modal para pagos parciales*/}
      <ModalComponent
        open={isOpenModalPartialPayment}
        title={"Pago parcial"}
        w100Modal={"w25Modal"}
      >
        <ModalHeader className="modal-title header-tyles">
          <Grid
            container
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            alignContent={"center"}
          >
            <Grid>
              <FontAwesomeIcon icon={faMoneyCheckDollar} style={{ fontSize: "18px" }} />{" "}
              <span>Pago parcial</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} onClick={modalPartialPayment} />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <Grid container md={12} xs={12}>
            <Grid sm={6} md={6} xs={12}>
              <FormGroup>
                <Label for="exampleEmail">
                  {" "}
                  <FontAwesomeIcon icon={faDollarSign} onClick={modalPartialPayment} /> Efectivo
                </Label>
                <NumericFormat
                  // placeholder="Ingrese el precio de compra"
                  disabled={true}
                  thousandSeparator=","
                  allowLeadingZeros
                  // onChange={(e) => {
                  //   setWholesaleDiscount(e.target.value);
                  // }}
                  // onBlur={productFormik.handleBlur}
                  value={efective}
                  className="form-control-input-ppal form-control-efective"
                />
              </FormGroup>
            </Grid>
            <Grid sm={6} md={6} xs={12}>
              <FormGroup>
                <Label for="exampleEmail">
                  {" "}
                  <FontAwesomeIcon icon={faCreditCard} onClick={modalPartialPayment} />{" "}
                  Transferencia
                </Label>
                <NumericFormat
                  // placeholder="Ingrese el precio de compra"
                  thousandSeparator=","
                  allowLeadingZeros
                  onChange={calValueTransference}
                  // onBlur={productFormik.handleBlur}
                  value={valueTransference}
                  className="form-control-input-ppal ml-1"
                />
              </FormGroup>
            </Grid>
            <Grid md={12} sm={12} className="text-center">
              <span style={{ fontWeight: "bold" }} className="text-center">
                Calcular devuelta del cliente
              </span>
              <hr class="hr-detail-payment" />
            </Grid>
          </Grid>
          <Grid container md={12} xs={12} marginBottom={-3}>
            <Grid sm={6} md={6} xs={12}>
              <FormGroup>
                <Label for="exampleEmail"> Ingresa el monto</Label>
                <NumericFormat
                  // placeholder="Ingrese el precio de compra"
                  thousandSeparator=","
                  allowLeadingZeros
                  onChange={calValueMoeyBack}
                  // onBlur={productFormik.handleBlur}
                  value={moneyBack}
                  className="form-control-input-ppal ml-1"
                />
              </FormGroup>
            </Grid>
            <Grid sm={6} md={6} xs={12}>
              <Label for="exampleEmail"></Label>
              <FormGroup>
                <Label className="ml-16 mt-3" for="exampleEmail">
                  {" "}
                  {moneyBackClient ? formatPrice(moneyBackClient) : "$0"}
                </Label>
              </FormGroup>
            </Grid>
          </Grid>
          {/* <Grid className="text-center">
            <Label className="text-center" for="exampleEmail">
              {calValuePercentageDicountOfWholesale(getTotal().total, wholesaleDiscont)} (%)
            </Label>
          </Grid> */}
        </ModalBody>
        <ModalFooter>
          <Grid style={{ marginTop: "-25px" }}>
            <ButtonComponent
              classButton="button-ppal"
              title={"Aceptar"}
              icon={<FontAwesomeIcon style={{ marginRight: "7px" }} icon={faFloppyDisk} />}
              handle={() => {
                saveOrder();
              }}
            />
          </Grid>
        </ModalFooter>
      </ModalComponent>
      {/* Modal para ver el carrito */}
      <ModalComponent open={isOpenOrderCart} title={"Detalle pedido"} w100Modal={"w100Modal"}>
        <ModalHeader className="modal-title header-tyles">
          <Grid
            container
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            alignContent={"center"}
          >
            <Grid>
              <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "18px" }} />{" "}
              <span>Detalle pedido</span>
            </Grid>
            <Grid title={"Cerrar"} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} onClick={modalOrderCart} />
            </Grid>
          </Grid>
        </ModalHeader>
        <ModalBody>
          <Grid container md={12} xs={12}>
            <Grid md={6} sm={6} className="">
              <Grid className="text-center">
                <span style={{ fontWeight: "bold" }}>Datos del cliente</span>
                <hr class="hr-detail-payment" style={{ width: "80%" }} />
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                style={{ marginTop: "-4px" }}
                className="mb-1"
              >
                <Grid item className="cursor-pointer">
                  <Typography>Nombre</Typography>
                </Grid>
                <Grid item marginRight={2}>
                  <Typography>{clientDetailOrder?.fullName}</Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                style={{ marginTop: "-4px" }}
                className="mb-1"
              >
                <Grid item className="cursor-pointer">
                  <Typography>Documento</Typography>
                </Grid>
                <Grid item marginRight={2}>
                  <Typography>{clientDetailOrder?.documentNumber}</Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                style={{ marginTop: "-4px" }}
                className="mb-1"
              >
                <Grid item className="cursor-pointer">
                  <Typography>Tipo documento</Typography>
                </Grid>
                <Grid item marginRight={2}>
                  <Typography>
                    {
                      findValueInObject(optionsDocumentType, {
                        value: clientDetailOrder?.documentType
                      })?.label
                    }
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                style={{ marginTop: "-4px" }}
                className="mb-1"
              >
                <Grid item className="cursor-pointer">
                  <Typography>Teléfono</Typography>
                </Grid>
                <Grid item marginRight={2}>
                  <Typography>{clientDetailOrder?.phone}</Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                style={{ marginTop: "-4px" }}
                className="mb-1"
              >
                <Grid item className="cursor-pointer">
                  <Typography>Indicativo</Typography>
                </Grid>
                <Grid item marginRight={2}>
                  <Typography>
                    {
                      findValueInObject(dataIndicatives, {
                        value: clientDetailOrder?.indicative
                      })?.label
                    }
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                style={{ marginTop: "-4px" }}
                className="mb-1"
              >
                <Grid item className="cursor-pointer">
                  <Typography>E-mail</Typography>
                </Grid>
                <Grid item marginRight={2}>
                  <Typography>{clientDetailOrder?.email}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={6} sm={6} className="">
              <Grid className="text-center">
                <span style={{ fontWeight: "bold" }}>Datos sobre el pedido</span>
                <hr class="hr-detail-payment" style={{ width: "80%" }} />
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                // style={{ marginTop: "-4px" }}
              >
                <Grid item className="cursor-pointer">
                  <Typography>Cantidad productos</Typography>
                </Grid>
                <Grid item className="stock-up mt-2">
                  <Badge color="secondary" badgeContent={totalProducsCart}></Badge>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                // style={{ marginTop: "-4px" }}
              >
                <Grid item className="cursor-pointer">
                  <Typography>Empaque</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {isPackaging === false &&
                    generalConfigurations.length > 0 &&
                    generalConfigurations[0].valuePacking
                      ? formatPrice(generalConfigurations[0].valuePacking)
                      : "$0"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                // style={{ marginTop: "-4px" }}
              >
                <Grid item className="cursor-pointer">
                  <Typography>Porcentaje descuento sobre Productos</Typography>
                </Grid>
                <Grid item>
                  <Typography>{"0%"}</Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                // style={{ marginTop: "-4px" }}
              >
                <Grid item className="cursor-pointer">
                  <Typography>Descuento sobre productos</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {discountOfProducts ? discountOfProducts.replaceAll(",", "") : "$0"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                // style={{ marginTop: "-4px" }}
              >
                <Grid item className="cursor-pointer">
                  <Typography>Porcentaje descuento sobre la venta</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {calValuePercentageDicountOfWholesale(getTotal().total, discountOfSales)}%
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                // style={{ marginTop: "-4px" }}
              >
                <Grid item className="cursor-pointer">
                  <Typography>Descuento sobre venta</Typography>
                </Grid>
                <Grid item>
                  <Typography>{discountOfSales ? discountOfSales : "$0"}</Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                // style={{ marginTop: "-4px" }}
              >
                <Grid item className="cursor-pointer">
                  <Typography>Porcentaje descuento al por mayor</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {calValuePercentageDicountOfWholesale(getTotal().total, wholesaleDiscont)}%
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                // style={{ marginTop: "-4px" }}
              >
                <Grid item className="cursor-pointer">
                  <Typography>Descuento al por mayor</Typography>
                </Grid>
                <Grid item>
                  <Typography>{wholesaleDiscont ? wholesaleDiscont : "$0"}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="text-center">
            <span style={{ fontWeight: "bold" }}>Datos productos</span>
            <hr class="hr-detail-payment" style={{ width: "80%" }} />
          </Grid>
          <Grid>
            <Grid className="detail-products-cart">
              <table class="table striped bordered text-center">
                <tbody>
                  <td>CANTIDAD.</td>
                  <td scope="col">PRODUCTO</td>
                  <td scope="col">UNIDAD.</td>
                  <td scope="col">TOTAL</td>
                  {productsOrderList?.map((product) => (
                    <tr>
                      <td>{product.quantity}</td>
                      <td>{product.name}</td>
                      <td>{formatPrice(product.salePrice)}</td>
                      <td>{formatPrice(product.quantity * product.salePrice)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <Box
                        component="span"
                        sx={(theme) => ({
                          backgroundColor: "rgb(199, 82, 193)",
                          borderRadius: "0.25rem",
                          color: "#fff",
                          maxWidth: "9ch",
                          p: "0.25rem"
                        })}
                      >
                        <FontAwesomeIcon className="mr-1" icon={faHandHoldingDollar} />
                        {/* {cell.getValue() == 0 ? "Inactivo" : "Activo"} */}
                        {formatPrice(
                          productsOrderList.reduce(
                            (sum, acc) => sum + acc.quantity * acc.salePrice,
                            0
                          )
                        )?.replace("$", "")}
                      </Box>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>

          {checkedDomicilie && (
            <Grid className="text-center">
              <span style={{ fontWeight: "bold" }}>Detalle envío domicilio</span>
              <hr class="hr-detail-payment" style={{ width: "80%" }} />
            </Grid>
          )}
          {checkedDomicilie && (
            <Grid>
              <table class="table striped bordered text-center">
                <tbody>
                  <td>DEPARTAMENTO</td>
                  <td scope="col">MUNICIPIO</td>
                  <td scope="col">DIRECCIÓN</td>
                  <td scope="col">COSTO ENVÍO</td>
                  <tr>
                    <td>
                      {
                        find(departamentsMunicipies?.departamentsFilter, {
                          value: domicilieFormik.values.departament
                        })?.label
                      }
                    </td>
                    <td>{municipiesList[domicilieFormik.values.municipie]?.label?.toString()}</td>
                    <td>{domicilieFormik.values.adress}</td>
                    <td>
                      {formatPrice(
                        Number(domicilieFormik.values.shippingCost) +
                          Number(domicilieFormik.values.costDomicilie)
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          )}

          {checkedShipping && (
            <Grid className="text-center">
              <span style={{ fontWeight: "bold" }}>Detalle envío</span>
              <hr class="hr-detail-payment" style={{ width: "80%" }} />
            </Grid>
          )}
          {checkedShipping && (
            <Grid>
              <table class="table striped bordered text-center">
                <tbody>
                  <td>DEPARTAMENTO</td>
                  <td scope="col">MUNICIPIO</td>
                  <td scope="col">DIRECCIÓN</td>
                  <td scope="col">COSTO OPERACIÓN</td>
                  <td scope="col">COSTO ENVÍO</td>
                  <td scope="col">TOTAL</td>
                  <tr>
                    <td>
                      {
                        find(departamentsMunicipies?.departamentsFilter, {
                          value: shippingFormik.values.departament
                        })?.label
                      }
                    </td>
                    <td>{municipiesList[shippingFormik.values.municipie]?.label?.toString()}</td>
                    <td>{shippingFormik.values.adress}</td>
                    <td>
                      {formatPrice(
                        Number(shippingFormik.values.operationCost.toString().replaceAll(",", ""))
                      )}
                    </td>
                    <td>
                      {formatPrice(
                        Number(shippingFormik.values.shippingCost.toString().replaceAll(",", ""))
                      )}
                    </td>
                    <td>
                      {formatPrice(
                        Number(shippingFormik.values.shippingCost.toString().replaceAll(",", "")) +
                          Number(shippingFormik.values.operationCost.toString().replaceAll(",", ""))
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          )}
          <Grid className="text-center">
            <Box
              component="span"
              sx={(theme) => ({
                backgroundColor: "rgb(199, 82, 193)",
                borderRadius: "0.25rem",
                color: "#fff",
                maxWidth: "9ch",
                p: "0.25rem"
              })}
            >
              TOTAL VENTA <FontAwesomeIcon className=" ml-1 mr-1" icon={faHandHoldingDollar} />{" "}
              {formatPrice(getTotal().total)?.replace("$", "")}
            </Box>
          </Grid>
        </ModalBody>
        {/* <ModalFooter>
          <Grid style={{ marginTop: "-25px" }}>
            <ButtonComponent
              classButton="button-ppal"
              title={"Aceptar"}
              icon={<FontAwesomeIcon style={{ marginRight: "7px" }} icon={faFloppyDisk} />}
              handle={() => {}}
            />
          </Grid>
        </ModalFooter> */}
      </ModalComponent>
    </Grid>
  );
};

export default Oder;
