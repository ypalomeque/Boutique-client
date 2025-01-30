import { faCartPlus, faEye, faHandHoldingDollar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Box, Card, Grid, ListItemIcon, MenuItem, Typography } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import TableComponentProvider from "app/components/Table/TableComponent";
import { GetOrders } from "app/hooks/orders";
import moment from "moment";
import "moment-timezone";
import React, { useState } from "react";
import { ModalComponent } from "app/components/Modal/ModalComponent";
import { ModalBody, ModalHeader } from "reactstrap";
import {
  calValuePercentageDicountOfWholesale,
  findValueInArray,
  findValueInObject,
  formatPrice
} from "app/utils/utils";
import { GetIndicativesCountriesAndCities } from "app/hooks/indicativesCountriesAndCities";
import { GetDepartamentsMunicipies } from "app/hooks/departmentsMunicipies";
import { GetUsers } from "app/hooks/users";

const Sales = () => {
  let clients = [];
  const { data: dataOrders, isLoadingDataOrders } = GetOrders();
  const { data: dataIndicatives } = GetIndicativesCountriesAndCities();
  const { data: departamentsMunicipies, isLoading: isLoadingDepMuni } = GetDepartamentsMunicipies();
  const { data: users } = GetUsers();
  const [isOpenOrderCart, setIsOpenOrderCart] = useState(false);
  const [orderRow, setOrderRow] = useState({});
  const modalOrderCart = async () => {
    setIsOpenOrderCart(!isOpenOrderCart);
  };

  clients = findValueInArray(users, { rol: { name: "User" } })?.map((x) => ({
    value: x._id,
    label: x.fullName
  }));

  const [optionsDocumentType] = useState([
    { value: 1, label: "CC" },
    { value: 2, label: "CE" },
    { value: 3, label: "PASAPORTE" }
  ]);
  // let newDataOrders = dataOrders?.map((x) => {
  //   x.date = moment.tz(x.date, "America/Bogota");
  //   return { ...x };
  // });
  // console.log("Orders >>>>>>>>>>>>>> ", dataOrders, orderRow);
  //console.log("Orders >>>>>>>>>>>>>> ", moment.tz(dataOrders[0]?.date, "America/Bogota"));

  const columns = [
    {
      accessorKey: "clientId.fullName", //accessorFn used to join multiple data into a single cell
      header: "Nombre",
      size: 90
    },
    {
      accessorKey: "_id", //hey a simple column for once
      // accessorFn: (row) => `${row.state == 1 ? "Activo" : "Inactivo"}`,
      header: "Pedido",
      size: 70,
      Cell: ({ cell, row }) => (
        <Box
          onClick={() => {
            console.log(row?.original);
            setOrderRow(row?.original);
            modalOrderCart();
          }}
          component="span"
          sx={(theme) => ({
            backgroundColor: "rgb(134, 2, 192)",
            borderRadius: "4rem",
            color: "#fff",
            maxWidth: "9ch",
            p: "0.26rem"
          })}
        >
          {/* {cell.getValue() == 0 ? "Inactivo" : "Activo"} */}
          <FontAwesomeIcon style={{ marginRight: "7px" }} icon={faEye} />
          {cell.getValue().toString().slice(0, 8)}
        </Box>
      )
    },

    {
      accessorFn: (row) =>
        moment(dataOrders[0]?.date).tz("America/Bogota").format("YYYY-MM-DD h:mm a"),
      // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
      header: "Fecha",
      size: 70
      //custom conditional format and styling
    },
    {
      accessorKey: "totalSales",
      // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
      filterFn: "between",
      header: "Valor Pedido",
      size: 80,
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
    }
  ];

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
        closeMenu();
      }}
      sx={{ m: 0 }}
    >
      <ListItemIcon>
        <LocalPrintshopIcon />
      </ListItemIcon>
      Imprimir factura
    </MenuItem>
  ];

  const getTotalSales = () => {
    let totalSalesEfective = 0;
    let totalSalesForTransfer = 0;
    let totalSalesShipping = 0;
    let totalSales = 0;

    dataOrders?.forEach((e) => {
      if (e.paymentMethod === "EFECTIVO") {
        totalSalesEfective = e.products.reduce(
          (sum, accu) => sum + accu.quantity * accu.salePrice,
          0
        );
      }
    });
    totalSales += totalSalesEfective + totalSalesForTransfer + totalSalesShipping;
    return { totalSalesEfective, totalSales };
  };

  return (
    <Grid container xs={12} sm={12} md={12} style={{ textAlign: "center" }} marginTop={2}>
      <Grid xs={12} md={3}>
        <Card class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-150jhgd">
          <div class="MuiBox-root css-biwl9p">
            <span
              class="material-icons notranslate MuiIcon-root MuiIcon-fontSizeMedium icon css-1jgtvd5"
              aria-hidden="true"
            >
              attach_money
            </span>
            <div class="MuiBox-root css-1qhmto6">
              <small class="MuiBox-root css-1xmtdg5">Ventas efectivo</small>
              <h6 class="css-1y4groy">
                <small class="custom-small">
                  {formatPrice(getTotalSales().totalSalesEfective)}
                </small>
              </h6>
            </div>
          </div>
        </Card>
      </Grid>
      <Grid xs={12} md={3}>
        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-150jhgd">
          <div class="MuiBox-root css-biwl9p">
            <span
              class="material-icons notranslate MuiIcon-root MuiIcon-fontSizeMedium icon css-1jgtvd5"
              aria-hidden="true"
            >
              credit_card
            </span>
            <div class="MuiBox-root css-1qhmto6">
              <div class="MuiGrid-root css-rfnosa">
                <small class="MuiBox-root css-1xmtdg5">Ventas transferencia</small>
              </div>
              <h6 class="css-1y4groy">
                <small class="custom-small">$0</small>
              </h6>
            </div>
          </div>
        </div>
      </Grid>
      <Grid xs={12} md={3}>
        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-150jhgd">
          <div class="MuiBox-root css-biwl9p">
            <span
              class="material-icons notranslate MuiIcon-root MuiIcon-fontSizeMedium icon css-1jgtvd5"
              aria-hidden="true"
            >
              loyalty
            </span>
            <div class="MuiBox-root css-1qhmto6">
              <small class="MuiBox-root css-1xmtdg5">Ganancia envios</small>
              <h6 class="css-1y4groy">
                <small class="custom-small">$0</small>
              </h6>
            </div>
          </div>
        </div>
      </Grid>
      <Grid xs={12} md={3}>
        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation6 MuiCard-root css-150jhgd">
          <div class="MuiBox-root css-biwl9p">
            <span
              class="material-icons notranslate MuiIcon-root MuiIcon-fontSizeMedium icon css-1jgtvd5"
              aria-hidden="true"
            >
              point_of_sale
            </span>
            <div class="MuiBox-root css-1qhmto6">
              <small class="MuiBox-root css-1xmtdg5">Total Ventas</small>
              <h6 class="css-1y4groy">
                <small class="custom-small">{formatPrice(getTotalSales().totalSales)}</small>
              </h6>
            </div>
          </div>
        </div>
      </Grid>
      <Grid className="mt-16" style={{ margin: "10px" }}>
        <TableComponentProvider
          columns={columns}
          data={dataOrders}
          isLoading={isLoadingDataOrders ? true : false}
          enableColumnFilterModes={false}
          enableRowActions={true}
          enableRowSelection={false}
          enableSelectAll={false}
          renderRowActionMenuItems={renderRowActionMenuItems}
          columnPinning={{
            left: ["mrt-row-expand", "mrt-row-select"],
            right: ["mrt-row-actions"],
            expanded: true
          }}
        />
      </Grid>
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
                  <Typography>{orderRow?.clientId?.fullName}</Typography>
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
                  <Typography>{orderRow?.clientId?.documentNumber}</Typography>
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
                        value: orderRow?.clientId?.documentType
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
                  <Typography>{orderRow?.clientId?.phone}</Typography>
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
                        value: orderRow?.clientId?.indicative
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
                  <Typography>{orderRow?.clientId?.email}</Typography>
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
                  <Badge color="secondary" badgeContent={orderRow?.cantProducts}></Badge>
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
                  <Typography>{orderRow > 0 ? formatPrice(orderRow.Packing) : "$0"}</Typography>
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
                    {orderRow?.discountForProducts ? orderRow?.discountForProducts : "$0"}
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
                  <Typography>{orderRow?.percentageDiscountOnSale}%</Typography>
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
                  <Typography>
                    {orderRow?.discountOfSale ? orderRow?.discountOfSale : "$0"}
                  </Typography>
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
                  <Typography>{orderRow?.percentageDiscountOnWoleSales}%</Typography>
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
                  <Typography>
                    {orderRow?.discountWoleSales ? orderRow?.discountWoleSales : "$0"}
                  </Typography>
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
                  {orderRow?.products?.map((product) => (
                    <tr>
                      <td>{product?.quantity}</td>
                      <td>{product?.name}</td>
                      <td>{formatPrice(product?.salePrice)}</td>
                      <td>{formatPrice(product?.quantity * product?.salePrice)}</td>
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
                          orderRow?.products?.reduce(
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

          {orderRow.domicilie && (
            <Grid className="text-center">
              <span style={{ fontWeight: "bold" }}>Detalle envío domicilio</span>
              <hr class="hr-detail-payment" style={{ width: "80%" }} />
            </Grid>
          )}
          {orderRow.domicilie && (
            <Grid>
              <table class="table striped bordered text-center">
                <tbody>
                  <td>DEPARTAMENTO</td>
                  <td scope="col">MUNICIPIO</td>
                  <td scope="col">DIRECCIÓN</td>
                  <td scope="col">COSTO ENVÍO</td>
                  <tr>
                    <td>{orderRow.domicilie?.departament}</td>
                    <td>{orderRow.domicilie?.municipie}</td>
                    <td>{orderRow.domicilie?.adress}</td>
                    <td>
                      {formatPrice(
                        Number(orderRow.domicilie?.shippingCost) +
                          Number(orderRow.domicilie?.costDomicilie)
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          )}

          {orderRow?.shipping && (
            <Grid className="text-center">
              <span style={{ fontWeight: "bold" }}>Detalle envío</span>
              <hr class="hr-detail-payment" style={{ width: "80%" }} />
            </Grid>
          )}
          {orderRow?.shipping && (
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
                    <td>{orderRow.shipping?.departament}</td>
                    <td>{orderRow.shipping?.municipie}</td>
                    <td>{orderRow.shipping?.adress}</td>
                    <td>
                      {formatPrice(
                        Number(orderRow?.shipping?.operationCost.toString().replaceAll(",", ""))
                      )}
                    </td>
                    <td>
                      {formatPrice(
                        Number(orderRow?.shipping?.shippingCost.toString().replaceAll(",", ""))
                      )}
                    </td>
                    <td>
                      {formatPrice(
                        Number(orderRow?.shipping?.shippingCost.toString().replaceAll(",", "")) +
                          Number(orderRow?.shipping?.operationCost.toString().replaceAll(",", ""))
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
              {formatPrice(orderRow?.totalSales)}
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

export default Sales;
