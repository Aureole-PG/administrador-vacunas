import { useContext, useEffect } from "react";
import { AuthContext } from "./auth/AuthContext";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { AdminRoutes } from "./routes/admin";
import { EmpleadoRoutes } from "./routes/empleado";
import { Login } from "./pages/general/Login";
export const MainRoute = () => {
  const { auth, verificaToken } = useContext(AuthContext);
  useEffect(() => {
    verificaToken();
  }, [verificaToken]);
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact={true}>
          {auth.logged ? <Redirect to={{ pathname: "/route" }} /> : <Login />}
        </Route>
        <PrivateRouter logged={auth.logged} path={"/route"}>
          <Dashboard rol={auth.rol} />
        </PrivateRouter>
      </Switch>
    </Router>
  );
};

const Dashboard = ({ rol }) => {
  if (rol == "administrador") {
    return <AdminRoutes />;
  }
  if (rol == "empleado") {
    return <EmpleadoRoutes />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

const PrivateRouter = ({ childern, logged, ...rest }) => {
  const isLogged = logged;
  console.log("000000000", logged);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          childern
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    ></Route>
  );
};
