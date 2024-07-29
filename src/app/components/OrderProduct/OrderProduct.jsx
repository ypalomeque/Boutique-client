import { useState } from "react";
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import { formatPrice } from "app/utils/utils";
import React from "react";
import { Card } from "reactstrap";
import { ButtonComponent } from "../Button/ButtonComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL_DEV } from "app/utils/constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { CircularProgress } from '@mui/material';

export const OrderProduct = ({ product, addProduct, i }) => {
  function handleAddProduct(product) {
    let actual = { ...product };
    actual.quantity = 1;
    addProduct(actual);
  }

  return (
    <Grid sx={{ marginTop: "15px", width: "50%" }} md={4} className="mb-2" key={i}>
      <Card className="card-style" style={{ width: "90%" }}>
        <CardActionArea>
          <Grid>
            <LazyLoadImage
              style={{ maxHeight: "30vh", width: "100% " }}
              component="img"
              src={`${BASE_URL_DEV}archivo/${product?.photo}`}
              alt="green iguana"
            />
          </Grid>

          <CardContent>
            <Grid sx={{ width: "100%", fontSize: "9px !important" }}>
              <Typography
                gutterBottom
                variant="span"
                sx={{ width: "100%", fontSize: "9px !important" }}
                component="div"
                style={{ fontWeight: "bold", fontSize: "11px" }}
              >
                {product?.name?.toString().toUpperCase()
                  ? product?.name?.toString().toUpperCase()
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid sx={12}>
              <text className="text-center" style={{ fontSize: "11px" }}>
                {product?.reference?.toString().toUpperCase()
                  ? product?.reference?.toString().toUpperCase()
                  : "N/A"}
              </text>
            </Grid>
            <Grid>
              <text
                className="text-center font-bold"
                style={{ fontSize: "11px", marginRight: "3px" }}
              >
                Descuento
              </text>
              <text
                class="text-center font-bold"
                style={{ fontWeight: "bold", color: "rgb(109, 40, 217)" }}
              >
                {product?.discount ? product?.discount : 0}%
              </text>
            </Grid>
            <Grid>
              <text
                class="text-center font-bold"
                style={{ fontWeight: "bold", color: "rgb(109, 40, 217)", fontSize: "13px" }}
              >
                {formatPrice(product?.salePrice) ? formatPrice(product?.salePrice) : 0} (
                {product?.stock})
              </text>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid xs={12} sm={12} md={12} marginTop={-6}>
            <ButtonComponent
              classButton={"button-shopping-orders button-ppal-w100 "}
              title={"Agregar"}
              handle={() => handleAddProduct(product)}
              icon={<FontAwesomeIcon icon={faCartPlus} style={{ marginRight: "3px" }} />}
            />
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};
