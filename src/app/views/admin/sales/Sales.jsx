import { Card, Grid } from "@mui/material";
import { GetOrders } from "app/hooks/orders";
import moment from "moment";
import "moment-timezone";
import React from "react";

const Sales = () => {
  const { data: dataOrders } = GetOrders();
  // let newDataOrders = dataOrders?.map((x) => {
  //   x.date = moment.tz(x.date, "America/Bogota");
  //   return { ...x };
  // });
  console.log(
    "Orders >>>>>>>>>>>>>> ",
    dataOrders && moment(dataOrders[0]?.date).tz("America/Bogota").format()
  );
  //console.log("Orders >>>>>>>>>>>>>> ", moment.tz(dataOrders[0]?.date, "America/Bogota"));

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
                <small class="custom-small">$18,000</small>
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
                <small class="custom-small">$18,000</small>
              </h6>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Sales;
