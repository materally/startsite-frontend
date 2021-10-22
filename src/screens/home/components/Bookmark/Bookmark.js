import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  where,
  query,
  getFirestore,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card, ResourceList, TextStyle } from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";

import BookmarkModal from "./Modal";

function Bookmark() {
  const db = getFirestore();
  const { currentUser } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "bookmark"),
      where("uid", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let temp = [];
    querySnapshot.forEach((doc) => {
      const newData = {
        id: doc.id,
        title: doc.data().title,
        url: doc.data().url,
      };
      temp.push(newData);
    });
    setData(temp);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteBookmark = async (id) => {
    setIsLoading(true);
    await deleteDoc(doc(db, "bookmark", id)).then((res) => {
      getData();
    });
  };

  return (
    <>
      <Card
        title="Könyvjelzők"
        actions={[
          { content: "+ Új könyvjelző", onAction: () => setShowModal(true) },
        ]}
      >
        <Card.Section>
          <ResourceList
            loading={isLoading}
            resourceName={{ singular: "product", plural: "products" }}
            items={data}
            emptyState="Nincs még könyvjelződ!"
            renderItem={(item) => {
              const { id, title, url } = item;

              return (
                <ResourceList.Item
                  shortcutActions={[
                    {
                      icon: DeleteMajor,
                      onAction: () => deleteBookmark(id),
                      destructive: true,
                    },
                  ]}
                  onClick={() => {
                    window.open(url);
                  }}
                >
                  <h3>
                    <TextStyle variation="strong">{title}</TextStyle>
                  </h3>
                  <div>{url}</div>
                </ResourceList.Item>
              );
            }}
          />
        </Card.Section>
      </Card>
      <BookmarkModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        getData={() => getData()}
      />
    </>
  );
}

export default Bookmark;
