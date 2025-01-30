import Loadable from "app/components/Loadable";
import { lazy } from "react";

// const Account = Loadable(lazy(async () => (await import('./Account'))));
const SingOut = Loadable(lazy(async () => import("./SingOut")));

const SingOutRoute = { path: "/session/sigout", element: <SingOut /> };

export default SingOutRoute;
