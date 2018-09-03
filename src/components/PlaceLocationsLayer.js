import React, { Component } from "react";
import DeckGL, { HexagonLayer, HexagonCellLayer } from "deck.gl";
import { connect } from "react-redux";

// in RGB
const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const elevationScale = 100;

class PlaceLocationsLayer extends Component {
  _onHover = ({ x, y, object }) => {
    alert("hello owlrd");

    this.setState({ x, y, hoveredObject: object });
  };

  getElevationValue = points => {
    return points.length * 100000;
  };

  render() {
    console.log(this.props.neededPlaces);
    if ("error" in this.props.neededPlaces) {
      return null;
    }

    // let layers = [];

    // try {
    //   layers = this.props.neededPlaces.map(el => {
    //     return new HexagonLayer({
    //       id: el.display_name,
    //       hexagonVertices: [el.centroid],
    //       radius: 50,
    //       angle: 3.14,
    //       getColor: () => [255, 255, 255],
    //       getElevation: () => el.elevation
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    const layer = new HexagonCellLayer({
      id: "hexagon-cell-layer",
      data: this.props.neededPlaces,
      radius: 50,
      angle: 3.14,
      getColor: () => [255, 255, 255],
      getElevation: d => {
        console.log(d);
        return d.elevation;
      }
    });

    //   new HexagonLayer({
    //     id: "heatmap",
    //     data: this.props.neededPlaces,
    //     radius: 1000,
    //     opacity: 1,
    //     extruded: true,
    //     getElevationValue: d => {
    //       console.log(d[0].height);
    //       return d[0].height;
    //     }
    //getPosition: d => d.position

    // getElevationValue: d => 500,
    // extruded: true,
    // getPosition: d => d.position,
    // lightSettings: LIGHT_SETTINGS,
    // opacity: 1,
    // pickable: true,
    // radius: 100

    return (
      <DeckGL
        {...this.props.viewport}
        layers={[layer]}
        onWebGLInitialized={this._initialize}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    neededPlaces: state.neededPlaces
  };
};

export default connect(mapStateToProps)(PlaceLocationsLayer);
