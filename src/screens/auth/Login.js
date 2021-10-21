import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  Page,
  Card,
  Button,
  FormLayout,
  TextField,
  Banner,
  Link,
} from "@shopify/polaris";

import { firebaseMessage } from "../../app/utils/firebaseMessages";

import { setCurrentUser } from "./slice";
import { saveState } from "../../app/utils/localStorage";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);

  const auth = getAuth();

  function handleSubmit() {
    if (email.trim() === "" || password.trim() === "") {
      setError("Minden mező kitöltése kötelező!");
      return;
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setCurrentUser(userCredential.user));
        saveState("currentUser", userCredential.user);
        setIsLoading(false);
        history.replace("/");
      })
      .catch((error) => {
        setError(firebaseMessage(error.code));
        setIsLoading(false);
        console.log(error);
      });
  }

  return (
    <Page title="Bejelentkezés">
      <Card sectioned>
        {error.length > 0 && (
          <>
            <Banner title={error} status="critical" />
            <br />
          </>
        )}

        <FormLayout>
          <FormLayout.Group>
            <TextField
              value={email}
              label="Email"
              placeholder="example@email.com"
              onChange={handleEmailChange}
              autoComplete="email"
            />
            <TextField
              type="password"
              value={password}
              label="Jelszó"
              onChange={handlePasswordChange}
            />
          </FormLayout.Group>

          <Button
            type="submit"
            onClick={handleSubmit}
            primary
            loading={isLoading}
          >
            Bejelentkezés
          </Button>
          <Link url="/register">Nincs még felhasználód?</Link>
        </FormLayout>
      </Card>
    </Page>
  );
}

export default Login;
