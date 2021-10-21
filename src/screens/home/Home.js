import { useSelector, useDispatch } from "react-redux";
import { removeState } from "../../app/utils/localStorage";
import { setApiToken, setUser } from "../auth/slice";
import { useGetUserPostQuery } from "../auth/api";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetUserPostQuery(2);

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
      {isLoading ? (
        <h3>tartalom töltése...</h3>
      ) : (
        <>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </>
      )}
    </div>
  );
}

export default Home;
