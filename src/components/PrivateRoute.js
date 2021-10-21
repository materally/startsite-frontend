import { Route, Redirect } from "react-router";
import { loadState } from "../app/utils/localStorage";

export default function PrivateRoute({ children, ...rest }) {
  const token = loadState("api_token");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
