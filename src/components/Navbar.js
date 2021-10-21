import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, TopBar, VisuallyHidden } from "@shopify/polaris";
import { ExitMajor, CustomersMajor } from "@shopify/polaris-icons";
import { textToAvatar } from "../app/utils/textToAvatar";
import { setCurrentUser } from "../screens/auth/slice";
import { removeState } from "../app/utils/localStorage";

export default function Navbar() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
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

  const logout = () => {
    dispatch(setCurrentUser({}));
    removeState("currentUser");
    window.location.href = "/login";
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: "Kijelentkezés",
              icon: ExitMajor,
              onAction: logout,
            },
          ],
        },
      ]}
      name={currentUser && currentUser?.displayName}
      detail={currentUser && currentUser?.email}
      initials={currentUser && textToAvatar(currentUser?.displayName, 2)}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

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
      userMenu={currentUser && userMenuMarkup}
      secondaryMenu={!currentUser && secondaryMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );
}
