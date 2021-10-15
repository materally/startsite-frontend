import { useSelector, useDispatch } from "react-redux";

import { setApiToken, setUser, setIsLogged } from "./features/auth/slice";

function App() {
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = () => {
    dispatch(setApiToken("123koroi2jrio32jroi32j"));
    dispatch(
      setUser({ username: "materally", email: "kulcsarmate@gmail.com" })
    );
    dispatch(setIsLogged(true));
  };

  const logout = () => {
    dispatch(setApiToken(""));
    dispatch(setUser({}));
    dispatch(setIsLogged(false));
  };

  const renderAuth = () => {
    if (isLogged) {
      return <button onClick={() => logout()}>LOGOUT</button>;
    }

    return <button onClick={() => login()}>LOGIN</button>;
  };

  return <div className="">{renderAuth()}</div>;
}

export default App;
