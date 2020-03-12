import "./App.scss";

import Header from "./Header";
import Listings from "./Listings";
import { Provider } from "react-redux";
import React from "react";
import configureStore from "./store";

function App() {
  return (
    <Provider store={configureStore()}>
      <div className="App">
        {/* <Header /> */}
        <Listings />
      </div>
    </Provider>
  );
}

export default App;
