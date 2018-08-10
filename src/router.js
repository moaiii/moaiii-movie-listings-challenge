import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// components
import App from './views/App/App';

// routes
export default(
  <Router basename="/">
    <div className="Router__container">
      <Route 
        path={"/"}
        exact={true}
        component={App}/>
    </div>
  </Router>
)
