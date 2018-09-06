import React, { Component } from "react";
import "./EnterPlace.css";
import { connect } from "react-redux";
import { addNeededPlaces } from "../actions/actions";
import {CLEAR_PATH} from '../actions/types';

class EnterPlace extends Component {
  state = {
    placeName: ""
  };

  _onSubmit = e => {
    e.preventDefault();
    if (this.state.placeName) {
      this.props.clearPath();
      this.props.addPlacesToStore(this.state.placeName);
    } else alert("Enter place name or address");
  };

  _onChange = e => {
    this.setState({
      placeName: e.target.value
    });
  };

  render() {
    return (
      <div className="EnterPlace">
        <form action="#" onSubmit={this._onSubmit}>
          <input
            type="text"
            onChange={this._onChange}
            placeholder="Enter place name or address"
            value={this.state.placeName}
            className={this.props.resultOfResponse}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const resultOfResponse = "error" in state.neededPlaces ? "error" : "good";

  return { resultOfResponse };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlacesToStore: placeName => {
      dispatch(addNeededPlaces(placeName));
    },
    clearPath: ()=> dispatch({type: CLEAR_PATH})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterPlace);
