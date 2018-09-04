import React, { Component } from "react";
import { connect } from "react-redux";
class LinesLayer extends Component {
  render() {
    return <h1>Lines Layer</h1>;
  }
}

export default connect()(LinesLayer);
