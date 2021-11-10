import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  Modal,
  Stack,
  FormLayout,
  TextField,
  Banner,
  Form,
} from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";

function NoteModal({ isOpen, onClose, getData, note, id }) {
  const db = getFirestore();
  const { currentUser } = useSelector((state) => state.auth);
  const [newData, setNewData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createNote = async () => {
    setError("");
    if (newData.trim() === "") {
      setError("Üres jegyzet nem hozható létre!");
      return;
    }
    setIsLoading(true);
    try {
      await addDoc(collection(db, "note"), {
        note: newData,
        uid: currentUser.uid,
      });
      setIsLoading(false);
      setNewData("");
      getData();
      onClose();
    } catch (e) {
      setError("Szerver hiba lépett fel!");
      setIsLoading(false);
    }
  };

  const updateNote = async () => {
    setError("");
    if (newData.trim() === "") {
      setError("Üres jegyzet nem menthető!");
      return;
    }
    setIsLoading(true);
    const ref = doc(db, "note", id);
    try {
      await updateDoc(ref, {
        note: newData,
      });
      setIsLoading(false);
      getData();
      alert("Sikeres mentés!");
    } catch (e) {
      setError("Szerver hiba lépett fel!");
      setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setIsLoading(true);
    await deleteDoc(doc(db, "note", id)).then((res) => {
      getData();
      onClose();
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (id !== -1 && note.length > 0) {
      setNewData(note);
    } else {
      setNewData("");
    }
  }, [id, note]);

  return (
    <div style={{ height: "500px" }}>
      <Modal
        large
        open={isOpen}
        onClose={onClose}
        title={id && note ? "Jegyzet " : "Új jegyzet"}
        primaryAction={{
          content: id && note ? "Módosítások mentése" : "Létrehozás",
          onAction: id && note ? updateNote : createNote,
          loading: isLoading,
        }}
        secondaryActions={[
          {
            content: "Jegyet törlése",
            onAction: () =>
              window.confirm("Biztosan törlöd?") && deleteNote(id),
            disabled: id && note ? false : true,
            destructive: true,
            icon: DeleteMajor,
          },
          {
            content: id && note ? "Bezárás" : "Mégsem",
            onAction: onClose,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
            {error.length > 0 && <Banner title={error} status="critical" />}
            <Form onSubmit={createNote}>
              <FormLayout>
                <TextField
                  autoFocus
                  value={newData}
                  label="Tartalom"
                  placeholder="..."
                  onChange={(value) => setNewData(value)}
                  multiline={5}
                />
              </FormLayout>
            </Form>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default NoteModal;
