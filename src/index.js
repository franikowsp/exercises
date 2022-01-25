import App from "./App";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import ScrollToTop from "./components/convenience/ScrollToTop";

import "./index.css";
import "katex/dist/katex.min.css";

ReactDOM.render(
  <HashRouter>
    <ScrollToTop />
    <App />
  </HashRouter>,
  document.getElementById("root")
);
