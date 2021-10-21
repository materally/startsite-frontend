import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveState } from "../../app/utils/localStorage";

import { setApiToken, setUser } from "./slice";

function LoginForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const login = () => {
    if (title !== "" && body !== "") {
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
        <button onClick={() => login()}>LOGIN</button>
      </div>
    );
  };

  return <div className="">{renderAuth()}</div>;
}

export default LoginForm;
