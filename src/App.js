import React, { Component } from "react";
import EnterPlace from "./components/EnterPlace";
import Map from "./components/Map";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Map className="Map" />
          <EnterPlace />
        </div>
      </Provider>
    );
  }
}

export default App;
