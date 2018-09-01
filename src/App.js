import React, { Component } from "react";
import BackToCentroidButton from "./components/BackToCentroidButton";
import Map from "./components/Map";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Map />
          <BackToCentroidButton />
        </div>
      </Provider>
    );
  }
}

export default App;
