import React, { useMemo } from "react";
import { useSprings, animated } from "@react-spring/web";

import * as d3 from "d3";
import * as jstat from "jstat";

import useRegressionStore from "../../stores/useRegressionStore";

window.jstat = jstat;

const regression = (x, beta0 = 0, beta1 = 1) => {
  const y = beta0 + beta1 * x;

  return y;
};

export default function Points({
  domainX = [-3, 3],
  rangeX = [100, 900],
  domainY = [0, 1],
  rangeY = [900, 100],
}) {
  const { beta0, beta1, points } = useRegressionStore((state) => state);

  const xScale = d3.scaleLinear().domain(domainX).range(rangeX);
  const yScale = d3.scaleLinear().domain(domainY).range(rangeY);

  const pointsArray = points.map(({ x, y }) => {
    return {
      cx: xScale(x),
      cy: yScale(y),
      errorY: yScale(beta0 + beta1 * x),
    };
  });

  const springs = useSprings(
    pointsArray.length,
    pointsArray.map((d) => ({
      cx: d.cx,
      cy: d.cy,
      x1: d.cx,
      x2: d.cx,
      y1: d.cy,
      y2: d.errorY,
    }))
  );

  //   const { d } = useSpring({
  //     d: generatePath(beta0, beta1),
  //   });

  return (
    <>
      {springs.map((animation, i) => {
        return (
          <React.Fragment key={`point-line-pair-${i}`}>
            <g clipPath="url(#clip-id)">
              <animated.circle
                cx={animation.cx}
                cy={animation.cy}
                r={7}
                // stroke="purple"
                // strokeWidth={5}
                // fill="none"
              />
              <animated.line
                x1={animation.x1}
                x2={animation.cx}
                y1={animation.cy}
                y2={animation.y2}
                stroke="#12dcea"
                opacity={0.9}
              />
            </g>
          </React.Fragment>
        );
      })}
    </>
  );
}
