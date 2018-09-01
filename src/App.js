import React, { Component } from "react";
import logo from "./logo.svg";
import MapGL from "react-map-gl";
import { div } from "gl-matrix/src/gl-matrix/vec4";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlwejMiLCJhIjoiY2prd2hwcHVhMHF2bjNzcTIxejAzajdqeCJ9.6PIjSKbhi-qBHE9JHVkBeg"; // eslint-disable-line

if (!MAPBOX_TOKEN) {
  alert(
    'The mapbox token is not defined. Please export it in the terminal where you typed "npm start"'
  );
}
class App extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: -0.1275,
      latitude: 51.507222,
      zoom: 9,
      maxZoom: 20,
      minZoom: 9
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
  }

  _resize = () => {
    this._onViewPortChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  _onViewPortChange = viewport => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        ...viewport
      }
    });
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={this._onViewPortChange}
      />
    );
  }
}

export default App;
