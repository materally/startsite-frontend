import { useSelector, useDispatch } from "react-redux";
import { removeState } from "../../app/utils/localStorage";
import { setApiToken, setUser } from "../auth/slice";

function Home() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(setApiToken(""));
    dispatch(setUser({}));
    await removeState("api_token");
    await removeState("user");
    window.location.href = "/login";
  };

  return (
    <div className="">
      HOME, hello {user.username} -{" "}
      <button onClick={() => logout()}>KIJELENTKEZÉS</button>
    </div>
  );
}

export default Home;
