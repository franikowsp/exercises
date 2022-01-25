import React from "react";

import Diagram from "./Diagram";
import Regression from "./Regression";
import Points from "./Points";

export default function RegressionFigure({
  width = 1000,
  height = 1000,
  margins = { top: 200, bottom: 150, left: 150, right: 100 },
}) {
  return (
    <>
      <svg
        preserveAspectRatio="xMaxYMid meet"
        viewBox={`0 0 ${width} ${height}`}
        className="bg-white rounded-lg mt-5"
      >
        <clipPath id="clip-id">
          <rect
            x={margins.left}
            y={margins.top}
            width={width - margins.left - margins.right}
            height={height - margins.top - margins.bottom}
          />
        </clipPath>
        <Diagram
          domainX={[0, 20]}
          rangeX={[margins.bottom, width - margins.right]}
          domainY={[-20, 20]}
          rangeY={[height - margins.bottom, margins.top]}
        />
        <Regression
          domainX={[0, 20]}
          rangeX={[margins.bottom, width - margins.right]}
          domainY={[-20, 20]}
          rangeY={[height - margins.bottom, margins.top]}
        />
        <Points
          domainX={[0, 20]}
          rangeX={[margins.bottom, width - margins.right]}
          domainY={[-20, 20]}
          rangeY={[height - margins.bottom, margins.top]}
        />
      </svg>
    </>
  );
}
