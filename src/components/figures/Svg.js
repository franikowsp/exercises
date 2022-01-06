import React from "react";

import Diagram from "./Diagram";
import Rasch from "./Rasch";
import Slider from "./Slider";

export default function Figure({
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
        <Slider />
        <Diagram
          domainX={[-3, 3]}
          rangeX={[margins.bottom, width - margins.right]}
          domainY={[0, 1]}
          rangeY={[height - margins.bottom, margins.top]}
        />
        <Rasch
          domainX={[-3, 3]}
          rangeX={[margins.bottom, width - margins.right]}
          domainY={[0, 1]}
          rangeY={[height - margins.bottom, margins.top]}
        />
      </svg>
    </>
  );
}
