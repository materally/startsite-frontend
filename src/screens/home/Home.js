import { Page, Layout } from "@shopify/polaris";

import Bookmark from "./components/Bookmark/Bookmark";

function Home() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section oneHalf>
          <Bookmark />
        </Layout.Section>
        <Layout.Section oneHalf>asd</Layout.Section>
        <Layout.Section oneHalf>asd</Layout.Section>
        <Layout.Section oneHalf>asd</Layout.Section>
        <Layout.Section oneHalf>asd</Layout.Section>
      </Layout>
    </Page>
  );
}

export default Home;
