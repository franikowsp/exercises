import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Rasch from "./routes/Rasch";
import Basics from "./routes/Basics";

function Home() {
  return (
    <div>
      <div className="bg-teal-700/20 h-auto sm:h-screen w-[100%] p-0 m-0 absolute">
        <div className="bg-gray-50 sm:rounded-lg sm:w-[640px] sm:mx-auto sm:mt-10 sm:shadow-lg px-10 sm:px-20 py-10 relative">
          {/* <h3 className="text-teal-700 font-semibold">
            Testtheorie und Testkonstruktion
          </h3> */}
          <h2 className="font-bold text-4xl text-decoration-line: underline decoration-teal-600/20 decoration-[20px] underline-offset-[-10px] decoration-skip-ink">
            &nbsp;Übungsaufgaben&nbsp;
          </h2>
          <article className="leading-normal">
            <div>
              <p className="py-5">
                Auf dieser Seite können Sie Übungsaufgaben auswählen.
              </p>
              <p className="py-5">
                Mit fortschreitendem Semester werden mehr Übungsaufgaben
                verfügbar sein.
              </p>
              <div className="sm:grid sm:grid-cols-2">
                <Link to="/basics">
                  <div className="bg-slate-100 rounded-md shadow-sm mx-2 px-1 py-3 hover:shadow-md hover:bg-slate-200">
                    <div className="bg-teal-600 rounded-full w-5 h-5 text-center">
                      <p className="inline-block align-center">
                        {/* <FaBeer color="white" /> */}P
                      </p>
                    </div>
                    <h3 className="text-teal-600 text-xs font-semibold">
                      Seminar 2
                    </h3>
                    <h2 className="font-semibold text-gray-700 text-xl sm:text-lg">
                      Statistische Grundlagen
                    </h2>
                    <p className="text-xs">
                      Ein paar interaktive Beispiele zur Regression.
                    </p>
                  </div>
                </Link>
                <Link to="/rasch">
                  <div className="bg-slate-100 rounded-md shadow-sm mx-2 px-1 py-3 hover:shadow-md hover:bg-slate-200">
                    <h3 className="text-teal-600 text-xs font-semibold">
                      Seminar 12
                    </h3>
                    <h2 className="font-semibold text-gray-700 text-xl sm:text-lg">
                      Das Rasch-Modell
                    </h2>
                    <p className="text-xs">
                      Eine Einführung in das Rasch-Modell inklusive einer
                      interaktiven Übung.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/basics" element={<Basics />} />
      <Route path="/rasch" element={<Rasch />} />
    </Routes>
  );
}
