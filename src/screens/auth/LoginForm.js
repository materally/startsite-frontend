import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveState } from "../../app/utils/localStorage";

import { useSignInMutation } from "./api";
import { setApiToken, setUser } from "./slice";

function LoginForm() {
  const [signIn, { isLoading }] = useSignInMutation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const login = () => {
    if (title !== "" && body !== "") {
      signIn({ title, body })
        .unwrap()
        .then((response) => {
          if (response.id) {
            dispatch(setApiToken("123koroi2jrio32jroi32j" + response.id));
            dispatch(
              setUser({ username: response.title, email: response.body })
            );

            saveState("api_token", response.id);
            saveState("user", {
              username: response.title,
              email: response.body,
            });

            window.location.href = "/home";
          }
        });
    }
  };

  const renderAuth = () => {
    return (
      <div>
        Username
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        Password
        <input
          type="text"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {isLoading ? (
          "töltés..."
        ) : (
          <button onClick={() => login()}>LOGIN</button>
        )}
      </div>
    );
  };

  return <div className="">{renderAuth()}</div>;
}

export default LoginForm;
