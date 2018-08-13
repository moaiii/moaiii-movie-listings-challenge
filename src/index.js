// node modules
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

// components
import store from "./store";
import router from "./router";

// styles
import "./stylesheet/main.css";

// connect redux to the react app at router level
ReactDOM.render(<Provider store={store}>{router}</Provider>,
  document.getElementById("root"));
