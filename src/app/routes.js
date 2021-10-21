import { Switch } from "react-router";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";

//
import LoginForm from "../screens/auth/LoginForm";
import Register from "../screens/auth/Register";

// authenticated routes
import Home from "../screens/home/Home";

const ROUTES = [
  {
    path: "/home",
    component: Home,
    exact: true,
    isPublic: false,
  },
  {
    path: "/login",
    component: LoginForm,
    exact: true,
    isPublic: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
    isPublic: true,
  },
];

export default function Routes() {
  return (
    <Switch>
      {ROUTES.map(({ path, component: Component, exact, isPublic }) => {
        if (isPublic) {
          return (
            <PublicRoute key={path} exact={exact} path={path}>
              <Component />
            </PublicRoute>
          );
        }
        return (
          <PrivateRoute key={path} exact={exact} path={path}>
            <Component />
          </PrivateRoute>
        );
      })}
    </Switch>
  );
}
