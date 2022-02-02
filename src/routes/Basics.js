import React from "react";

import RegressionFigure from "../components/figures/RegressionFigure";
import Slider from "../components/controls/Slider";
import { BlockMath, InlineMath } from "react-katex";

import * as jstat from "jstat";

import useRegressionStore from "../stores/useRegressionStore";

const getCoefficient = (points, beta0, beta1) => {
  const yArray = points.map((d) => {
    const { x, y } = d;
    const yPred = beta0 + beta1 * x;

    return { y, yPred };
  });

  console.log(yArray);

  const y = yArray.map((d) => d.y);
  const yPred = yArray.map((d) => d.yPred);
  return jstat.corrcoeff(y, yPred);
};

export default function Basics() {
  const { beta0, beta1, points, update } = useRegressionStore((state) => state);

  const parameterArray = [
    {
      id: "beta0",
      parameter: beta0,
      update: (value) => update("beta0", value),
      min: -20,
      max: 20,
      label: (
        // <p>
        //   &beta;<sub>0</sub>
        // </p>
        <InlineMath>\beta_0</InlineMath>
      ),
    },
    {
      id: "beta1",
      parameter: beta1,
      update: (value) => update("beta1", value),
      min: -10,
      max: 10,
      label: <InlineMath>\beta_1</InlineMath>,
    },
  ];

  return (
    <div>
      <div className="bg-teal-700/20 w-[100%] p-0 m-0 absolute">
        <div className="bg-gray-50 sm:rounded-lg sm:w-[640px] sm:mx-auto sm:mt-10 sm:mb-10 sm:shadow-lg px-10 sm:px-20 py-10 relative">
          {/* <h3 className="text-teal-700 font-semibold">
            Testtheorie und Testkonstruktion
          </h3> */}
          <h2 className="font-bold text-2xl sm:text-4xl">
            <p className="underlined">
              <span>&nbsp;Statistische Grundlagen&nbsp;</span>
            </p>
          </h2>
          <article className="leading-normal">
            <div>
              <p className="py-5">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa <strong>strong</strong>.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Donec quam felis, ultricies nec,
                pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
                eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
                vitae, justo. Nullam dictum felis eu pede mollis pretium.
                Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor
                eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
                nisi.
              </p>
              <div className="text-center">
                <BlockMath>{`\\hat{y} = \\beta_0 + \\beta_1 x`}</BlockMath>
                <BlockMath>{`y = \\beta_0 + \\beta_1 x + \\varepsilon`}</BlockMath>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-2">
              {parameterArray.map((d) => {
                return (
                  <React.Fragment key={d.id}>
                    <Slider {...d} />
                  </React.Fragment>
                );
              })}
            </div>
            <RegressionFigure />
            <p>{getCoefficient(points, beta0, beta1)}</p>
          </article>
        </div>
      </div>
    </div>
  );
}
