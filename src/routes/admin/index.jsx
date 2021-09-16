import { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AdminLayout } from "./layout";
import { paths } from "./path";
export const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <AdminLayout>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          {paths.map((route, id) => (
            <Route key={id} exact={route.exact} path={`${url}/${route.path}`}>
              <route.component />
            </Route>
          ))}

          <Route path={`${url}/users`}>
            <div>ingreso</div>
          </Route>
        </Switch>
      </Suspense>
    </AdminLayout>
  );
};
