import React, { Component } from "react";
import DeckGL, {
  HexagonCellLayer,
  PathLayer,
  IconLayer,
  ScatterplotLayer
} from "deck.gl";
import { connect } from "react-redux";
import "./PlaceLocationsLayer.css";

class PlaceLocationsLayer extends Component {
  state = {
    hoveredObject: null
  };

  _onHover = ({ x, y, object }) => {
    this.setState({ x, y, hoveredObject: object });
  };

  _renderTooltip = () => {
    const { x, y, hoveredObject } = this.state;
    return (
      hoveredObject && (
        <div className="tooltip" style={{ left: x, top: y }}>
          <div>{hoveredObject.display_name}</div>
        </div>
      )
    );
  };

  render() {
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
    console.log(this.props.routesReducer.data);
    const layers = [
      new ScatterplotLayer({
        id: "scatterplot-layer",
        data: this.props.routesReducer.data,
        pickable: true,
        opacity: 0.8,
        radiusScale: 6,
        radiusMinPixels: 1,
        radiusMaxPixels: 100,
        getPosition: d => {
          console.log([d[0].lat, d[0].lon]);
          return [d[0].lat, d[0].lon];
        },
        getRadius: d => Math.sqrt(d.exits),
        getColor: d => [255, 140, 0]
      }),

      new HexagonCellLayer({
        id: "hexagon-cell-layer",
        data: this.props.neededPlaces,
        radius: 70,
        angle: 3.14,
        pickable: true,
        getColor: () => [155, 155, 155],
        getElevation: d => {
          return d.elevation;
        },
        onHover: this._onHover
      })
    ];

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
        layers={layers}
        onWebGLInitialized={this._initialize}
      >
        {this._renderTooltip}
      </DeckGL>
    );
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    neededPlaces: state.neededPlaces,
    routesReducer: state.routesReducer
  };
};

export default connect(mapStateToProps)(PlaceLocationsLayer);
