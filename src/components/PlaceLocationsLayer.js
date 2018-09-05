import React, { Component } from "react";
import DeckGL, {
  HexagonCellLayer,
  PathLayer,
  IconLayer,
  ScatterplotLayer
} from "deck.gl";
import { connect } from "react-redux";
import "./PlaceLocationsLayer.css";
import { findPath, filterCheckedPlace } from "../actions/actions";

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
          <div>{hoveredObject.displayName}</div>
        </div>
      )
    );
  };

  render() {
    if ("error" in this.props.neededPlaces) {
      return null;
    }

    console.log("About PathLayer", this.props.routesReducer);

    const layers = [
      new PathLayer({
        id: "path-layer",
        data: [this.props.routesReducer],
        pickable: true,
        widthScale: 2,
        widthMinPixels: 2,
        getPath: d => {
          let resultT = [];
          d.journeys[0].legs
            .map(el => {
              return JSON.parse(el.path.lineString).map(el2 => el2.reverse());
            })
            .forEach(el => resultT.push(...el));

          return resultT;
          // TODO Refactoring
        },
        getColor: d => [255, 0, 0],
        getWidth: d => 5
      }),
      new HexagonCellLayer({
        id: "hexagon-cell-layer",
        data: this.props.neededPlaces,
        radius: 70,
        angle: 3.14,
        pickable: true,
        getColor: d => d.color,
        getElevation: d => {
          return d.elevation;
        },
        onHover: this._onHover,
        onClick: d => {
          if (d.index === this.props.neededPlaces.length - 1) {
            console.log(d.index);
          } else {
            this.props.filterCheckedPlace(d.index);
            this.props.findPath(
              this.props.neededPlaces[
                this.props.neededPlaces.length - 1
              ].centroid.concat(d.lngLat)
            );
          }
        }
      })
    ];

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

const mapDispatchToProps = dispatch => {
  return {
    filterCheckedPlace: index => dispatch(filterCheckedPlace(index)),
    findPath: coordinates => dispatch(findPath(coordinates))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceLocationsLayer);
