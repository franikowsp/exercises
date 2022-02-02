import React, { useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";

import * as d3 from "d3";
import * as jstat from "jstat";

import useRaschStore from "../../stores/useRaschStore";

const rasch = (x, mu = 0, beta = 1, gamma = 0, lambda = 0) => {
  const exponent = beta * (x - mu);
  const probability =
    gamma +
    ((1 - gamma - lambda) * Math.exp(exponent)) / (1 + Math.exp(exponent));

  return probability;
};

export default function Rasch({
  domainX = [-3, 3],
  rangeX = [100, 900],
  domainY = [0, 1],
  rangeY = [900, 100],
}) {
  const { generatePath } = useMemo(() => {
    const xScale = d3.scaleLinear().domain(domainX).range(rangeX);
    const yScale = d3.scaleLinear().domain(domainY).range(rangeY);

    const x = jstat(...domainX, 101)[0];

    const generatePath = (mu, beta, gamma, lambda) => {
      const values = x.map((x) => [
        xScale(x),
        yScale(rasch(x, mu, beta, gamma, lambda)),
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

  const { mu, beta, gamma, lambda } = useRaschStore((state) => state);

  const { d } = useSpring({
    d: generatePath(mu, beta, gamma, lambda),
  });

  return (
    <>
      <animated.path d={d} stroke="#12dcea" strokeWidth={5} fill="none" />
    </>
  );
}
