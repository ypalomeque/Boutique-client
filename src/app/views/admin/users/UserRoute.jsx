import Loadable from "app/components/Loadable";
import { lazy } from "react";

const USER = Loadable(lazy(() => import("./User")));

export const userRoute = { path: "/usuarios", element: <USER /> };
