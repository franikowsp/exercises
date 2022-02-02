import React, { useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";

import * as d3 from "d3";
import * as jstat from "jstat";

import useRegressionStore from "../../stores/useRegressionStore";

const regression = (x, beta0 = 0, beta1 = 1) => {
  const y = beta0 + beta1 * x;

  return y;
};

export default function Regression({
  domainX = [-3, 3],
  rangeX = [100, 900],
  domainY = [0, 1],
  rangeY = [900, 100],
}) {
  const { generatePath } = useMemo(() => {
    const xScale = d3.scaleLinear().domain(domainX).range(rangeX);
    const yScale = d3.scaleLinear().domain(domainY).range(rangeY);
    // window.yScale = yScale;
    // window.d3 = d3;

    const x = jstat(...domainX, 101)[0];

    const generatePath = (beta0, beta1) => {
      const values = x.map((x) => [
        xScale(x),
        yScale(regression(x, beta0, beta1, domainY)),
      ]);

      return d3.line()(values);
    };

    return { generatePath };
  }, [
    domainX.join("-"),
    domainY.join("-"),
    rangeX.join("-"),
    rangeY.join("-"),
  ]);

  //   const { beta0, beta1, gamma, lambda } = useRaschStore((state) => state);
  const { beta0, beta1 } = useRegressionStore((state) => state);

  const { d } = useSpring({
    d: generatePath(beta0, beta1),
  });

  return (
    <>
      <animated.path
        d={d}
        stroke="#12dcea"
        strokeWidth={5}
        fill="none"
        clipPath="url(#clip-id)"
      />
    </>
  );
}
