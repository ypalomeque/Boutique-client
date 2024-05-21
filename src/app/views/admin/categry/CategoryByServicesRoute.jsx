import Loadable from "app/components/Loadable";
import { lazy } from "react";

const CategoryByServices = Loadable(lazy(() => import("./CategoryByServices")));

export const CategoryByServicesRoute = {
  path: "/categoria/servicios",
  element: <CategoryByServices />
};
