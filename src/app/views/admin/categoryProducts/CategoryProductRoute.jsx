import Loadable from "app/components/Loadable";
import { lazy } from "react";

const CategoryProduct = Loadable(lazy(() => import("./CategoryProduct")));

export const CategoryProductRoute = { path: "/categoria/productos", element: <CategoryProduct /> };
