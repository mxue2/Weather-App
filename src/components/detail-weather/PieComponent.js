import React from "react";

const PieComponent = props => {
  return (
    <div className={`pie progress-${props.piePercent}`}>
      <span className="pie-number">
        {props.pienum}
        <span className="pie-percent" style={props.label === "Wind" ? { display: "none" } : {}}>
          %
        </span>
      </span>
      <div className="pie-container">
        <div className="left-side half-circle"></div>
        <div className="right-side half-circle"></div>
      </div>
      <div
        className="pie-shadow"
        style={props.piePercent === 100 ? { borderColor: "#3498db" } : { borderColor: "#bdc3c7" }}
      ></div>
      <div className="pie-label">{props.label}</div>
    </div>
  );
};

export default PieComponent;
