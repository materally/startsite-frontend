export function firebaseMessage(id) {
  const params = {
    "auth/weak-password": "A jelszónak minimum 6 karakternek lennie kell!",
    "auth/email-already-in-use": "Ezzel az e-mail címmel már regisztráltak!",
    "auth/invalid-email": "Az e-mail formátuma nem megfelelő!",
    "auth/internal-error": "Szerver hiba!",
    "auth/user-not-found": "Nincs ilyen felhasználó!",
  };

  if (params[id]) {
    return params[id];
  }

  return "Hiba történt! Hibakód: " + id;
}
