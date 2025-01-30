import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import useAuth from "app/hooks/useAuth";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { ButtonComponent } from "app/components/Button/ButtonComponent";

import "./logincss.css";
import { BASE_URL_PROD, MAILFORMAT } from "app/utils/constant";
import { NotificationAlert } from "app/components/NotificationAlert/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faRightToBracket,
  faRotate
} from "@fortawesome/free-solid-svg-icons";
import { GetGeneralConfigurations } from "app/hooks/generalConfigurations";

export default function JwtLogin() {
  const { data: generalConfigurations } = GetGeneralConfigurations();
  // console.log(generalConfigurations);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();

  const formikLigin = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es requerido")
        .matches(MAILFORMAT, "Dirección de email invàlida"),
      password: Yup.string()
        .min(6, "La contraseña debe de tener al menos 6 dìgitos")
        .required("La contraseña es requerida")
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        let { user: userLogin } = await login({
          data: { user: { email: values.email, password: values.password } }
        });
        if (userLogin !== null) {
          if (userLogin.rol.name === "User") {
            //navigate("/pedidos");
          }
          if (userLogin.rol.name === "Admin") {
            navigate("/ventas");
          }
        }
      } catch (e) {
        setLoading(false);
        if (e.message === "Network Error") {
          NotificationAlert(
            "warning",
            "Login",
            "Lo sentimos el sistema no esta diponible en estos momentos."
          );
        } else {
          NotificationAlert("error", "Login", "Usuario o contraseña inválida.");
        }
      }
    }
  });

  return (
    <Grid container>
      <Grid className="MuiGrid-root content-login css-rfnosa">
        <div className="wrapper">
          <div className="inner">
            <form action="" className="width-container">
              <div className="content-no-img">
                <div className="img">
                  <img
                    src={
                      `${BASE_URL_PROD}archivo/${
                        generalConfigurations && generalConfigurations[0]?.logo
                      }`
                        ? `${BASE_URL_PROD}archivo/${
                            generalConfigurations && generalConfigurations[0]?.noLogo
                          }`
                        : `${BASE_URL_PROD}archivo/${
                            generalConfigurations && generalConfigurations[0]?.noLogo
                          }}`
                    }
                    alt=""
                  />
                </div>
              </div>
              <Grid sm={12} md={12}>
                <Form>
                  <FormGroup className="mb-1">
                    <Label className="color-inputs" style={{ fontSize: "12px" }}>
                      Email
                    </Label>
                    <Input
                      name="email"
                      placeholder="boutique@gmail.com"
                      type="email"
                      onChange={formikLigin.handleChange}
                      onBlur={formikLigin.handleBlur}
                      value={formikLigin.values.email}
                      className="form-control-login place-holder"
                    />
                    {formikLigin.touched.email && formikLigin.errors.email && (
                      <div className="error-form-login">
                        <p>{formikLigin.touched.email && formikLigin.errors.email}</p>
                      </div>
                    )}
                  </FormGroup>
                </Form>
              </Grid>
              <Grid>
                <Form>
                  <FormGroup className="mb-1">
                    <Label className="color-inputs" style={{ fontSize: "12px" }}>
                      Password
                    </Label>
                    <Input
                      placeholder="**********"
                      name="password"
                      type="password"
                      className="form-control-login place-holder"
                      onChange={formikLigin.handleChange}
                      onBlur={formikLigin.handleBlur}
                      value={formikLigin.values.password}
                    />
                    {formikLigin.touched.password && formikLigin.errors.password && (
                      <div className="error-form-login">
                        <p>{formikLigin.touched.password && formikLigin.errors.password}</p>
                      </div>
                    )}
                  </FormGroup>
                </Form>
              </Grid>
              <Grid className="">
                <ButtonComponent
                  title={loading ? "Login..." : "Login"}
                  classButton="button-form form-control-login"
                  disable={loading ? true : false}
                  icon={
                    <FontAwesomeIcon
                      className="mr-3"
                      icon={loading ? faRotate : faArrowRightToBracket}
                      spin={loading ? true : false}
                    />
                  }
                  handle={formikLigin.handleSubmit}
                />
              </Grid>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
