import Loadable from "app/components/Loadable";
import { lazy } from "react";

const Product = Loadable(lazy(() => import("./Product")));

export const ProductRoute = { path: "/productos", element: <Product /> };
