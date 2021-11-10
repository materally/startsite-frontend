import { useState } from "react";
import { useSelector } from "react-redux";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import {
  Modal,
  Stack,
  FormLayout,
  TextField,
  Banner,
  Form,
} from "@shopify/polaris";

function BookmarkModal({ isOpen, onClose, getData }) {
  const db = getFirestore();
  const { currentUser } = useSelector((state) => state.auth);
  const [newData, setNewData] = useState({ title: "", url: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createBookmark = async () => {
    setError("");
    if (newData.title.trim() === "" || newData.url.trim() === "") {
      setError("Minden mező kitöltése kötelező!");
      return;
    }
    setIsLoading(true);
    try {
      await addDoc(collection(db, "bookmark"), {
        title: newData.title,
        url: newData.url,
        uid: currentUser.uid,
      });
      setIsLoading(false);
      setNewData({});
      getData();
      onClose();
    } catch (e) {
      setError("Szerver hiba lépett fel!");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: "500px" }}>
      <Modal
        large
        open={isOpen}
        onClose={onClose}
        title="Új könyvjelző"
        primaryAction={{
          content: "Hozzáadás",
          onAction: createBookmark,
          loading: isLoading,
        }}
        secondaryActions={[
          {
            content: "Mégsem",
            onAction: onClose,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
            {error.length > 0 && <Banner title={error} status="critical" />}
            <Form onSubmit={createBookmark}>
              <FormLayout>
                <TextField
                  autoFocus
                  value={newData.title}
                  label="Megnevezés"
                  placeholder="pl. Heti menük"
                  onChange={(value) => setNewData({ ...newData, title: value })}
                />
                <TextField
                  value={newData.url}
                  label="Link"
                  placeholder="pl. https://menuzz.hu/city/Debrecen"
                  onChange={(value) => setNewData({ ...newData, url: value })}
                />
              </FormLayout>
            </Form>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default BookmarkModal;
