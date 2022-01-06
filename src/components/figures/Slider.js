import React, { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import * as d3 from "d3";
import useRaschStore from "../../stores/useRaschStore";

const Slider = ({
  x = 100,
  y = 100,
  width = 300,
  range = [-3, 3],
  parameter,
  update,
}) => {
  const [svgWidth, setSvgWidth] = useState(500);

  //   const { mu, update } = useRaschStore((state) => state);
  const value = parameter;
  //   const update = (value) => update("mu", value);

  // Rescaling
  const scaleValue = d3
    .scaleLinear()
    .domain([0, width]) // unit: pixels
    .range(range); // unit: parameter scale

  // Circle hover
  const [hover, setHover] = useState(false);

  // Circle style (when hovering)
  const [circleStyle, apiCircleStyle] = useSpring(() => ({
    r: 15,
    fill: "#800080",
    strokeWidth: 0,
    config: {
      mass: 0.1,
    },
  }));

  // Text style when hovering
  const [textStyle, apiTextStyle] = useSpring(() => ({
    y: -30,
    fill: "black",
    fontSize: "20px",
    config: {
      mass: 0.1,
    },
  }));

  //   // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ offset: [oX, oY] }) => {
      update(scaleValue(oX));
    },
    {
      bounds: { left: 0, right: width },
      axis: "x",
      transform: ([oX, oY]) => [(oX * 1000) / svgWidth, oY],
      from: () => [scaleValue.invert(parameter), 0],
    }
  );

  const toggleHover = (e) => {
    setSvgWidth(e.target.parentElement.parentElement.clientWidth);
    setHover(!hover);
    if (hover) {
      apiCircleStyle.start({ fill: "#800080", r: 15, strokeWidth: 0 });
      apiTextStyle.start({ y: -30 });
    } else {
      apiCircleStyle.start({ fill: "white", r: 20, strokeWidth: 5 });
      apiTextStyle.start({ y: -40 });
    }
  };

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <text x={-20} y={10} textAnchor="end" fontSize={30}>
          {range[0]}
        </text>
        <text x={width + 20} y={10} textAnchor="start" fontSize={30}>
          {range[1]}
        </text>
        <line
          x1={0}
          x2={width}
          stroke="#cccccc"
          strokeWidth="25"
          strokeLinecap="round"
        />
        <animated.text
          x={scaleValue.invert(parameter)}
          textAnchor="middle"
          {...textStyle}
        >
          {parameter.toFixed(2)}
        </animated.text>
        <animated.line
          x2={scaleValue.invert(parameter)}
          stroke="#800080"
          strokeWidth="25"
          strokeLinecap="round"
        />
        <animated.circle
          cx={scaleValue.invert(parameter)}
          stroke="#800080"
          style={{ touchAction: "pan-y" }}
          {...circleStyle}
          {...bind()}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        />
      </g>
    </>
  );
};

export default Slider;
