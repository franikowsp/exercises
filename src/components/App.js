import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as d3 from "d3";
import * as jstat from "jstat";

const rasch = (x, mu = 0, beta = 1, gamma = 0, lambda = 0) => {
  const exponent = beta * (x - mu);
  const probability =
    gamma +
    ((1 - gamma - lambda) * Math.exp(exponent)) / (1 + Math.exp(exponent));

  return probability;
};

const xScale = d3.scaleLinear().domain([-3, 3]).range([100, 900]);
const yScale = d3.scaleLinear().domain([0, 1]).range([900, 100]);

const x = jstat(-3, 3, 101)[0];

const generatePath = (mu, beta, gamma, lambda) => {
  const values = x.map((x) => [
    xScale(x),
    yScale(rasch(x, mu, beta, gamma, lambda)),
  ]);

  return d3.line()(values);
};

export default function App() {
  const [mu, setMu] = useState(0);
  const [beta, setBeta] = useState(1);
  const [gamma, setGamma] = useState(0);
  const [lambda, setLambda] = useState(0);

  const { d } = useSpring({ d: generatePath(mu, beta, gamma, lambda) });

  //   console.log(path);

  return (
    <div>
      <div className="bg-purple-100 h-screen w-[100%] p-0 m-0 absolute">
        <div className="bg-gray-50 sm:rounded-lg sm:w-[640px] sm:mx-auto sm:mt-10 sm:shadow-lg px-10 sm:px-20 py-10 relative">
          <h3 className="text-purple-800 font-semibold">
            Testtheorie und Testkonstruktion
          </h3>
          <h2 className="font-semibold text-4xl text-gray-700">
            Das Rasch-Modell
          </h2>
          <article className="leading-normal pt-5">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa <strong>strong</strong>.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Donec quam felis, ultricies nec,
              pellentesque eu, pretium quis, sem. Nulla consequat massa quis
              enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
              eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
              vitae, justo. Nullam dictum felis eu pede{" "}
              <a className="external ext" href="#">
                link
              </a>
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
              porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
              ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
              viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
              imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
              ultricies nisi.
            </p>
            <SyntaxHighlighter
              language="r"
              style={vscDarkPlus}
              showLineNumbers={true}
              className="rounded-lg"
            >
              {`library("rasch")`}
            </SyntaxHighlighter>
            <input
              type="range"
              min="-3"
              max="3"
              step=".001"
              value={mu}
              onChange={(e) => {
                setMu(+e.target.value);
              }}
            />
            <input
              type="range"
              min="-3"
              max="3"
              step=".001"
              value={beta}
              onChange={(e) => {
                setBeta(+e.target.value);
              }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step=".001"
              value={gamma}
              onChange={(e) => {
                setGamma(+e.target.value);
              }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step=".001"
              value={lambda}
              onChange={(e) => {
                setLambda(+e.target.value);
              }}
            />
            <svg
              preserveAspectRatio="xMaxYMid meet"
              viewBox="0 0 1000 1000"
              className="bg-white rounded-lg mt-5"
            >
              <animated.path
                d={d}
                stroke="purple"
                strokeWidth={5}
                fill="none"
              />
            </svg>
          </article>
        </div>
      </div>
    </div>
  );
}
