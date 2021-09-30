import { lazy } from "react";
export const paths = [
  {
    path: "",
    exact: true,
    component: lazy(() => import("../../pages/empleado")),
  },
  {
    path: "update",
    exact: true,
    component: lazy(() => import("../../pages/empleado/Form")),
  },
];
