import React from "react";
import { connect } from "react-redux";
import "./BackToCentroidButton.css";

const BackToCentroidButton = ({ label }) => {
  return (
    <button title="Click me" className="London">
      {label}
    </button>
  );
};

export default connect()(BackToCentroidButton);
