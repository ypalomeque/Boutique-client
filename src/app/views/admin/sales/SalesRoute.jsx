import Loadable from "app/components/Loadable";
import { lazy } from "react";

const Sales = Loadable(lazy(() => import("./Sales")));

export const SalesRoute = { path: "/ventas", element: <Sales /> };
