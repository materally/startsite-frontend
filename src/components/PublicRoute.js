import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

export default function PublicRoute({ children, ...rest }) {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
