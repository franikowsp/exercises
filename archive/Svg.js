import React from "react";
import useRaschStore from "../../stores/useRaschStore";

import Diagram from "./Diagram";
import Rasch from "./Rasch";
import Slider from "./Slider";

export default function Figure({
  width = 1000,
  height = 1000,
  margins = { top: 200, bottom: 150, left: 150, right: 100 },
}) {
  const { mu, beta, gamma, lambda, update } = useRaschStore((state) => state);

  const parameterArray = [
    {
      id: "mu",
      parameter: mu,
      update: (value) => update("mu", value),
      x: 100,
      y: 70,
      width: 300,
      range: [-3, 3],
    },
    {
      id: "beta",
      parameter: beta,
      update: (value) => update("beta", value),
      x: 600,
      y: 70,
      width: 300,
      range: [-3, 3],
    },
    {
      id: "gamma",
      parameter: gamma,
      update: (value) => update("gamma", value),
      x: 100,
      y: 150,
      width: 300,
      range: [0, 1],
    },
    {
      id: "lambda",
      parameter: lambda,
      update: (value) => update("lambda", value),
      x: 600,
      y: 150,
      width: 300,
      range: [0, 1],
    },
  ];

  return (
    <>
      <svg
        preserveAspectRatio="xMaxYMid meet"
        viewBox={`0 0 ${width} ${height}`}
        // width={width}
        // height={height}
        className="bg-white rounded-lg mt-5"
      >
        {parameterArray.map((d) => {
          return (
            <React.Fragment key={d.id}>
              <Slider x={100} y={100} width={300} range={[-3, 3]} {...d} />
            </React.Fragment>
          );
        })}
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
