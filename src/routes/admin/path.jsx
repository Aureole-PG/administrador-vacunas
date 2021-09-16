import { lazy } from "react";
export const paths = [
  {
    path: "",
    exact: true,
    component: lazy(() => import("../../pages/admin/dashboard/index")),
  },
  {
    path: "create",
    exact: true,
    component: lazy(() => import("../../pages/admin/form/Create")),
  },
  {
    path: "edit/:CI",
    exact: true,
    component: lazy(() => import("../../pages/admin/form/View")),
  },
];
