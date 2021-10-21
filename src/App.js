import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider, Frame } from "@shopify/polaris";

import Routes from "./app/routes";
import Navbar from "./components/Navbar";

import "@shopify/polaris/build/esm/styles.css";

import app from "./app/firebase";

function App() {
  return (
    <AppProvider>
      <Frame topBar={<Navbar />}>
        <Router>
          <Routes />
        </Router>
      </Frame>
    </AppProvider>
  );
}

export default App;
