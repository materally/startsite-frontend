import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  where,
  query,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { Card, ResourceList } from "@shopify/polaris";

import { stringSlice } from "../../../../app/utils/stringSlice";
import NoteModal from "./Modal";

function Note() {
  const db = getFirestore();
  const { currentUser } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(-1);

  const getData = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "note"),
      where("uid", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let temp = [];
    querySnapshot.forEach((doc) => {
      const newData = {
        id: doc.id,
        note: doc.data().note,
      };
      temp.push(newData);
    });
    setData(temp);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Card
        title="Jegyzetek"
        actions={[
          {
            content: "+ Új jegyzet",
            onAction: () => {
              setSelectedNote("");
              setSelectedNoteId(-1);
              setShowModal(true);
            },
          },
        ]}
      >
        <Card.Section>
          <ResourceList
            loading={isLoading}
            resourceName={{ singular: "product", plural: "products" }}
            items={data}
            emptyState="Nincs még jegyzet!"
            renderItem={(item) => {
              const { id, note } = item;

              return (
                <ResourceList.Item
                  onClick={() => {
                    setSelectedNote(note);
                    setSelectedNoteId(id);
                    setShowModal(true);
                  }}
                >
                  {stringSlice(note, 200)}
                </ResourceList.Item>
              );
            }}
          />
        </Card.Section>
      </Card>
      <NoteModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedNoteId(-1);
          setSelectedNote("");
        }}
        getData={() => getData()}
        note={selectedNote}
        id={selectedNoteId}
      />
    </>
  );
}

export default Note;
