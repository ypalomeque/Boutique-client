import Loadable from "app/components/Loadable";
import { lazy } from "react";

const Order = Loadable(lazy(() => import("./Oder")));

export const OrderRoute = { path: "/pedidos", element: <Order /> };
