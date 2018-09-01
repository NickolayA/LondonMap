import React, { Component } from "react";
import { connect } from "react-redux";
import MapGL from "react-map-gl";
import { changeViewport } from "../actions/actions";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlwejMiLCJhIjoiY2prd2hwcHVhMHF2bjNzcTIxejAzajdqeCJ9.6PIjSKbhi-qBHE9JHVkBeg"; // eslint-disable-line

if (!MAPBOX_TOKEN) {
  alert(
    'The mapbox token is not defined. Please export it in the terminal where you typed "npm start"'
  );
}

class Map extends Component {
  componentDidMount() {
    window.addEventListener("resize", this._resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this._onViewPortChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  _onViewPortChange = viewport => {
    this.props.changeViewport({ ...this.props.viewport, ...viewport });
  };

  render() {
    return (
      <MapGL
        {...this.props.viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={this._onViewPortChange}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeViewport: viewport => dispatch(changeViewport(viewport))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
