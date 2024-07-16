import { Grid } from "@mui/material";
import { calValueDiscountOnProduct, formatPrice } from "app/utils/utils";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NotificationAlert } from "../NotificationAlert/Notification";

export const ActualProduct = ({ key, product, deleteProduct, updateQunatity }) => {
  const [eventAddQuantity, setEventAddQuantity] = useState(false);
  const [_quantity, setQuantity] = useState(product.quantity);
  function handleQuantity(e) {
    const quantity = parseInt(e.target.value);
    if (quantity === 0) {
      deleteProduct(product);
    } else if (quantity) {
      updateQunatity(product, quantity);
    }
  }

  function handleQuantityButton(operation) {
    setQuantity(product.quantity);
    let copy = parseInt(_quantity);
    if (operation === "sum") {
      copy = copy + 1;
      if (copy > product.stock) {
        NotificationAlert("info", "Agregar producto", "Cantidad no disponible");
        copy = 1;
        setEventAddQuantity(false);
      } else {
        setEventAddQuantity(true);
      }
      setQuantity(copy);
    } else if (operation === "rest") {
      copy = copy - 1;
      if (copy === 0 || copy === 1) {
        copy = 1;
        setEventAddQuantity(false);
      }
    }
    setQuantity(copy);
    updateQunatity(product, copy);
  }

  return (
    <ListGroup key={key}>
      <ListGroupItem>
        <Grid className="div-list-products-order-ListGroupItem">
          <Grid container spacing={1} className="width-items-actual-product">
            <Grid md={7} sm={8} xs={8}>
              <Grid md={12} item display={"flex"}>
                <text class="txt-product" tyle={{ fontSize: "13px" }}>
                  <text style={{ fontSize: "13px" }}>Paleta Beauty glazed</text>
                </text>
              </Grid>
              <Grid item display={"flex"}>
                <text class="txt-product" tyle={{ fontSize: "13px" }}>
                  Desc:{" "}
                  {formatPrice(product.discount != undefined || product.discount !== null)
                    ? formatPrice(product.discount)
                    : 0}
                </text>
              </Grid>
              <Grid item display={"flex"}>
                <text className="txt-product" tyle={{ fontSize: "13px" }}>
                  Precio: {formatPrice(product.salePrice) ? formatPrice(product.salePrice) : 0}
                </text>
              </Grid>
              <Grid item display={"flex"}>
                <text className="txt-product" tyle={{ fontSize: "13px" }}>
                  Precio desc:{" "}
                  {/* {calValueDiscountOnProduct(
                    product.quantity,
                    product.salePrice,
                    product.discount != undefined || product.discount !== null
                      ? product.discount
                      : 0
                  )} */}
                  {calValueDiscountOnProduct(product)}
                </text>
              </Grid>
            </Grid>
            <Grid item xs={3} sm={3} md={3} className="txt-cantidad-product text-center">
              <NumericFormat
                allowLeadingZeros
                allowNegative={false}
                valueIsNumericString={true}
                onChange={handleQuantity}
                // onBlur={productFormik.handleBlur}
                value={product.quantity}
                className="form-control-input-ppal text-center"
              />
            </Grid>
            <Grid
              xs={1}
              sm={1}
              md={2}
              className="div-list-products-order-ListGroupItem-content-buttons"
            >
              <div
                item
                xs={1}
                sm={1}
                md={1}
                class="tooltip1 cursor-pointer"
                onClick={() => handleQuantityButton("sum")}
              >
                <span
                  className="tooltip-content mt-tooltip-car-shipping"
                  style={{ fontSize: "12px", marginLeft: "-110px" }}
                >
                  Agregar cantidad
                </span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="30"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "rgb(199, 82, 193)", cursor: "pointer" }}
                >
                  <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224H272v74.5c0 8.8-7.2 16-16 16-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3V272h-74.5c-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3 0-8.8 7.2-16 16-16H240v-74.5c0-8.8 7.2-16 16-16s16 7.2 16 16V240h74.5c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
                </svg>
              </div>
              <div item xs={1} sm={1} md={1}>
                {!eventAddQuantity ? (
                  <Grid className="tooltip1">
                    <span
                      className="tooltip-content mt-tooltip-car-shipping-delete"
                      style={{ fontSize: "12px", display: "flex" }}
                    >
                      Eliminar item cantidad
                    </span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="28"
                      width="28"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "rgb(199, 82, 193)", cursor: "pointer" }}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                    </svg>
                  </Grid>
                ) : (
                  <Grid
                    className="tooltip1 cursor-pointer"
                    onClick={() => handleQuantityButton("rest")}
                  >
                    <span
                      class="tooltip-content mt-tooltip-car-shipping"
                      style={{ fontSize: "12px", marginLeft: "-110px" }}
                    >
                      Restar cantidad
                    </span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "color: rgb(199, 82, 193)", cursor: "pointer" }}
                    >
                      <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224h-181c-8.5 0-16-6-16-16s7.2-16 16-16h181c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
                    </svg>
                  </Grid>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </ListGroupItem>
    </ListGroup>
  );
};
