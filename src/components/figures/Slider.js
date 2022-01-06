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
  // updateValue,
  // value = mu
}) => {
  const { mu, update } = useRaschStore((state) => state);
  const value = mu;
  const updateValue = (value) => update("mu", value);

  // Rescaling
  const scaleValue = d3
    .scaleLinear()
    .domain([0, width]) // unit: pixels
    .range(range); // unit: parameter scale

  //   window.scaleValue = scaleValue;

  //   const gaugeStart = scaleValue.invert(0);
  //   const circleStart = scaleValue.invert(value);

  //   // Circle hover
  const [hover, setHover] = useState(false);

  //   // Circle position
  //   const [{ xCircle }, setXCircle] = useSpring(() => ({ xCircle: circleStart }));

  // Circle style (when hovering)
  const [circleStyle, apiCircleStyle] = useSpring(() => ({
    // cx: 0,
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

  const [gaugeStyle, apiGaugeStyle] = useSpring(() => ({
    stroke: "#800080",
    config: {
      mass: 0.1,
    },
  }));

  //   // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ xy, offset: [oX], initial: [iX] }) => {
      //   console.log(`iX: ${iX} oX: ${oX} x: ${x} oX - x: ${oX - iX}`);
      update("mu", scaleValue(oX));
      //   apiCircleStyle.start({ cx: oX });

      //   const valueToDisplay = scaleValue(oX);
      //   apiCircleStyle.start({ cx: oX });
      //   setLineProps({ x2: oX });
      //   setTextProps({ fill: passed >= 0 ? positive : negative });
      //   setLineProps({ stroke: passed >= 0 ? positive : negative });

      //   console.log(oX);
    },
    {
      bounds: { left: 0, right: width },
      //   axis: "x",
      //   from: () => [scaleValue.invert(mu).get(), 0],
    }
  );

  const toggleHover = () => {
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
          x={scaleValue.invert(mu)}
          textAnchor="middle"
          {...textStyle}
        >
          {mu.toFixed(2)}
        </animated.text>
        <animated.line
          x2={scaleValue.invert(mu)}
          {...gaugeStyle}
          strokeWidth="25"
          strokeLinecap="round"
        />
        <animated.circle
          cx={scaleValue.invert(mu)}
          stroke="#800080"
          {...circleStyle}
          {...bind()}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        />
      </g>
      {/* <animated.text x={x} {...textProps} textAnchor="middle">
        {Number(passed).toFixed(2)}
      </animated.text> */}
      {/* <animated.line
        y1={y}
        y2={y}
        x1={gaugeStart}
        x2={lineProps.x2}
        {...lineProps}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <animated.circle
        cx={x}
        cy={y}
        {...circleStyle}
        {...bind()}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      /> */}
    </>
  );
};

export default Slider;
