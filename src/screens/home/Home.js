import { Page, Layout } from "@shopify/polaris";

import Bookmark from "./components/Bookmark/Bookmark";
import Note from "./components/Note/Note";

function Home() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section oneHalf>
          <Bookmark />
        </Layout.Section>
        <Layout.Section oneHalf>
          <Note />
        </Layout.Section>
        <Layout.Section oneHalf>todo..</Layout.Section>
      </Layout>
    </Page>
  );
}

export default Home;
