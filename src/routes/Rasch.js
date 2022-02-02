import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import RaschFigure from "../components/figures/RaschFigure";
import Slider from "../components/controls/Slider";

import useRaschStore from "../stores/useRaschStore";

export default function Rasch() {
  const { mu, beta, gamma, lambda, update } = useRaschStore((state) => state);

  const parameterArray = [
    {
      id: "mu",
      parameter: mu,
      update: (value) => update("mu", value),
      min: -3,
      max: 3,
      label: "μ",
    },
    {
      id: "beta",
      parameter: beta,
      update: (value) => update("beta", value),
      min: -3,
      max: 3,
      label: "β",
    },
    {
      id: "gamma",
      parameter: gamma,
      update: (value) => update("gamma", value),
      min: 0,
      max: 1,
      label: "γ",
    },
    {
      id: "lambda",
      parameter: lambda,
      update: (value) => update("lambda", value),
      min: 0,
      max: 1,
      label: "λ",
    },
  ];

  return (
    <div>
      <div className="bg-teal-700/20 w-[100%] p-0 m-0 absolute">
        <div className="bg-gray-50 sm:rounded-lg sm:w-[640px] sm:mx-auto sm:mt-10 sm:mb-10 sm:shadow-lg px-10 sm:px-20 py-10 relative">
          {/* <h3 className="text-teal-700 font-semibold">
            Testtheorie und Testkonstruktion
          </h3> */}
          <h2 className="font-bold text-3xl sm:text-4xl">
            <span className="underlined">&nbsp;Das Rasch-Modell&nbsp;</span>
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
            </div>
            <div>
              <SyntaxHighlighter
                language="r"
                style={vscDarkPlus}
                showLineNumbers={true}
                className="rounded-lg"
              >
                {`library("rasch")
rasch(1+2)
summary(fit)`}
              </SyntaxHighlighter>
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
            <RaschFigure />
          </article>
        </div>
      </div>
    </div>
  );
}
