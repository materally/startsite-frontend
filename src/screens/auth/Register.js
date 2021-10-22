import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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
import { saveState } from "../../app/utils/localStorage";
import { setCurrentUser } from "./slice";

function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordre, setPasswordre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleNameChange = useCallback((value) => setName(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);
  const handlePasswordreChange = useCallback(
    (value) => setPasswordre(value),
    []
  );
  const auth = getAuth();

  function handleSubmit() {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      passwordre.trim() === ""
    ) {
      setError("Minden mező kitöltése kötelező!");
      return;
    }
    if (password !== passwordre) {
      setError("A jelszavak nem egyeznek!");
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        })
          .then(() => {
            dispatch(setCurrentUser(userCredential.user));
            saveState("currentUser", userCredential.user);
            setIsLoading(false);
            history.replace("/");
          })
          .catch((error) => {
            setError(firebaseMessage(error.code));
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setError(firebaseMessage(error.code));
        setIsLoading(false);
      });
  }

  return (
    <Page title="Regisztráció">
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
              value={name}
              label="Neved"
              placeholder="John Doe"
              onChange={handleNameChange}
            />
            <TextField
              value={email}
              label="Email"
              placeholder="example@email.com"
              onChange={handleEmailChange}
              autoComplete="email"
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField
              type="password"
              value={password}
              label="Jelszó"
              onChange={handlePasswordChange}
            />
            <TextField
              type="password"
              value={passwordre}
              label="Jelszó újra"
              onChange={handlePasswordreChange}
            />
          </FormLayout.Group>

          <Button
            type="submit"
            onClick={handleSubmit}
            primary
            loading={isLoading}
          >
            Regisztráció
          </Button>
          <Link url="/login">Már van felhasználód?</Link>
        </FormLayout>
      </Card>
    </Page>
  );
}

export default Register;
