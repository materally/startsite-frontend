import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Layout,
  Page,
  FooterHelp,
  Card,
  Link,
  Button,
  FormLayout,
  TextField,
  AccountConnection,
  ChoiceList,
  SettingToggle,
} from "@shopify/polaris";
import { ImportMinor } from "@shopify/polaris-icons";

import { saveState } from "../../app/utils/localStorage";

import { setApiToken, setUser } from "./slice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);

  const onSubmit = () => {
    alert("asd");
  };

  return (
    <Page title="Regisztráció">
      <Card sectioned>
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

          <Button onClick={() => onSubmit()} primary>
            Regisztráció
          </Button>
        </FormLayout>
      </Card>
    </Page>
  );
}

export default LoginForm;
