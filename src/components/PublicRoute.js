import { Route, Redirect } from "react-router";
import { loadState } from "../app/utils/localStorage";

export default function PublicRoute({ children, ...rest }) {
  const token = loadState("api_token");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
