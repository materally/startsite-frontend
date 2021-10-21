import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

export default function PrivateRoute({ children, ...rest }) {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
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
