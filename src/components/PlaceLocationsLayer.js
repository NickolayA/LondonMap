import React, { Component } from "react";
import DeckGL, {
  HexagonCellLayer,
  PathLayer,
  IconLayer,
  ScatterplotLayer
} from "deck.gl";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import "./PlaceLocationsLayer.css";
import { findPath, filterCheckedPlace } from "../actions/actions";
import { LOOKING_FOR_PATH } from "../actions/types";
import store from "../store";
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
          {"instruction" in hoveredObject ? (
            <div>{hoveredObject.instruction.detailed}</div>
          ) : null}
          {"displayName" in hoveredObject ? (
            <div>{hoveredObject.displayName}</div>
          ) : null}
        </div>
      )
    );
  };

  _convertPathData = pathLineString => {
    return JSON.parse(pathLineString).map(el => el.reverse());
  };

  _makePathLayers = data => {
    const layers = [];
    try {
      data.journeys[0].legs.forEach((el, index) => {
        layers.push(
          new PathLayer({
            id: `path-layer${index}`,
            data: [el],
            pickable: true,
            widthScale: 10,
            widthMinPixels: 3,
            getPath: d => this._convertPathData(d.path.lineString),
            getColor: d => [255, 0, 0, 50],
            getWidth: d => 20,
            autoHighlight: true,
            highlightColor: [0, 0, 0, 100],
            onHover: d => {
              //d.object.displayName = el.instruction.detailed;
              //d.object = { ...d.object, displayName: el.instruction.detailed };
              this._onHover(d);
            }
          })
        );
      });
      return layers;
    } catch (err) {}
  };

  render() {
    if ("error" in this.props.neededPlaces) {
      return null;
    }

    const layers = [
      // new PathLayer({
      //   id: "path-layer",
      //   data: [this.props.routesReducer],
      //   pickable: true,
      //   widthScale: 2,
      //   widthMinPixels: 3,
      //   getPath: d => {
      //     let resultT = [];
      //     d.journeys[0].legs
      //       .map(el => {
      //         return JSON.parse(el.path.lineString).map(el2 => el2.reverse());
      //       })
      //       .forEach(el => resultT.push(...el));

      //     return resultT;
      //     // TODO Refactoring
      //   },
      //   getColor: d => [255, 0, 0],
      //   getWidth: d => 5,
      //   onHover: d => console.log("hell", d),
      //   autoHighlight: true,
      //   highlightColor: [0, 0, 0, 100]
      // }),
      new HexagonCellLayer({
        id: "hexagon-cell-layer",
        data: this.props.neededPlaces,
        radius: 100,
        angle: 3.14,
        pickable: true,
        getColor: d => d.color,
        getElevation: d => {
          return d.elevation;
        },
        onHover: this._onHover,
        onClick: d => {
          console.log(d);
          if (d.index === this.props.neededPlaces.length - 1) {
          } else {
            this.props.filterCheckedPlace(d.index);

            store.dispatch({ type: LOOKING_FOR_PATH });

            this.props.findPath(
              this.props.neededPlaces[
                this.props.neededPlaces.length - 1
              ].centroid.concat(d.lngLat)
            );
          }
        }
      })
    ].concat(this._makePathLayers(this.props.routesReducer));

    return (
      <React.Fragment>
        <DeckGL
          {...this.props.viewport}
          layers={layers}
          onWebGLInitialized={this._initialize}
        >
          {this._renderTooltip}
        </DeckGL>

        {"loading" in this.props.routesReducer ? (
          <Spinner name="folding-cube" className="spinner" />
        ) : null}
      </React.Fragment>
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
