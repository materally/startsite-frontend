import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

window.addEventListener(
  "storage",
  function (event) {
    if (event.storageArea === localStorage) {
      console.log(this.localStorage);
    }
  },
  false
);
