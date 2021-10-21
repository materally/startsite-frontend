import { useState, useCallback } from "react";
import { Route, Redirect } from "react-router";
import { useHistory } from "react-router-dom";

import {
  AppProvider,
  ActionList,
  Avatar,
  Frame,
  Icon,
  TopBar,
  VisuallyHidden,
} from "@shopify/polaris";
import { ArrowLeftMinor, CustomersMajor } from "@shopify/polaris-icons";

import { loadState } from "../app/utils/localStorage";

export default function Navbar() {
  const token = loadState("api_token");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: "Back to Shopify",
              icon: ArrowLeftMinor,
              onAction: () => alert("asd"),
            },
          ],
        },
        {
          items: [{ content: "Community forums" }],
        },
      ]}
      name="User"
      detail="Kulcsár Máté"
      initials="KM"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );
  const history = useHistory();

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={CustomersMajor} />
          <VisuallyHidden>Auth</VisuallyHidden>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [
            {
              content: "Bejelentkezés",
              url: "/login",
            },
            {
              content: "Regisztráció",
              url: "/register",
            },
          ],
        },
      ]}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={token && userMenuMarkup}
      secondaryMenu={!token && secondaryMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );
}
