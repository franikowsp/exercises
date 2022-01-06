import React, { useMemo } from "react";

import * as d3 from "d3";

export default function Diagram({
  domainX = [-3, 3],
  rangeX = [100, 900],
  domainY = [0, 1],
  rangeY = [900, 100],
}) {
  const { ticksX, widthX } = useMemo(() => {
    const xScale = d3.scaleLinear().domain(domainX).range(rangeX);

    const widthX = Math.abs(rangeX[1] - rangeX[0]);
    const pixelsPerTickX = 50;
    const numberOfTicksTargetX = Math.max(
      1,
      Math.floor(widthX / pixelsPerTickX)
    );

    const ticksX = xScale.ticks(numberOfTicksTargetX).map((value) => ({
      value,
      scaleOffset: xScale(value),
    }));
    return { ticksX, widthX };
  }, [domainX.join("-"), rangeX.join("-")]);

  const { ticksY, widthY } = useMemo(() => {
    const yScale = d3.scaleLinear().domain(domainY).range(rangeY);

    const widthY = Math.abs(rangeY[1] - rangeY[0]);
    const pixelsPerTickY = 100;
    const numberOfTicksTargetY = Math.max(
      1,
      Math.floor(widthY / pixelsPerTickY)
    );
    const ticksY = yScale.ticks(numberOfTicksTargetY).map((value) => ({
      value,
      scaleOffset: yScale(value),
    }));

    return { ticksY, widthY };
  }, [domainY.join("-"), rangeY.join("-")]);

  return (
    <>
      <rect
        x={rangeX[0]}
        y={rangeY[1]}
        width={widthX}
        height={widthY}
        fill="#800080"
        opacity={0.1}
      />
      {/* x axis */}
      <g
        transform={`translate(${rangeX[0] + widthX / 2}, ${
          rangeY[1] + widthY + 70
        })`}
      >
        <text
          textAnchor="middle"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
          Personenfähigkeit θ
          <tspan dy={5} fontSize={20}>
            v
          </tspan>
        </text>
      </g>
      <path d={`M${rangeX[0]} ${rangeY[0]} h${widthX}`} stroke="#000000" />
      {ticksX.map(({ value, scaleOffset }) => {
        return (
          <g
            key={`x-${value}`}
            transform={`translate(${scaleOffset}, ${rangeY[0]})`}
          >
            <text y={40} textAnchor="middle" style={{ fontSize: "20px" }}>
              {value.toFixed(1)}
            </text>
            <line y2={20} stroke="black" />
          </g>
        );
      })}
      {/* y axis */}
      <g
        transform={`translate(${rangeX[0] - 70}, ${
          rangeY[1] + widthY / 2
        }) rotate(270)`}
      >
        <text
          textAnchor="middle"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
          Wahrscheinlichkeit(X
          <tspan dy={5} fontSize={20}>
            vi
          </tspan>
          = 1)
        </text>
      </g>
      <path d={`M${rangeX[0]} ${rangeY[0]} v${-widthY}`} stroke="#000000" />
      {ticksY.map(({ value, scaleOffset }) => {
        return (
          <g
            key={`y-${value}`}
            transform={`translate(${rangeX[0]}, ${scaleOffset})`}
          >
            <text x={-25} textAnchor="end" y={7} style={{ fontSize: "20px" }}>
              {value.toFixed(1)}
            </text>
            <line x2={-20} stroke="black" />
          </g>
        );
      })}
    </>
  );
}
